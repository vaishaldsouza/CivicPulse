import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

export default function AdminDashBoard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewPhoto, setViewPhoto] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [messageText, setMessageText] = useState({});
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'map' | 'analytics'

  useEffect(() => { fetchIssues(); }, []);

  const fetchIssues = async () => {
    try {
      const res = await fetch('/api/issues/all');
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setReports(data);
      } else {
        console.error("Expected array but got:", data);
        setReports([]);
      }
    } catch (err) {
      console.error("Fetch issues failed:", err);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    await fetch(`/api/issues/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchIssues();
  };

  const sendMessage = async (id) => {
    if (!messageText[id]) return;
    try {
      await fetch(`/api/issues/${id}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: messageText[id], sender: 'Admin' }),
      });
      setMessageText({ ...messageText, [id]: "" });
      fetchIssues();
      alert("Update sent to citizen.");
    } catch (err) { alert("Error sending message."); }
  };

  const downloadCSV = () => {
    const headers = ["Reporter,Email,Category,Description,Status,Date\n"];
    const rows = filteredReports.map(r =>
      `"${r.reporter}","${r.email}","${r.category}","${r.description.replace(/"/g, '""')}","${r.status}","${new Date(r.createdAt).toLocaleDateString()}"`
    );
    const blob = new Blob([headers + rows.join("\n")], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CivicPulse_Export.csv`;
    a.click();
  };

  console.log("AdminDashboard Render - Loading:", loading, "Reports:", reports.length);

  const filteredReports = reports.filter(r => {
    const reporter = r.reporter || "";
    const description = r.description || "";
    const matchesSearch = reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || r.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'Pending').length,
    progress: reports.filter(r => r.status === 'In Progress').length,
    resolved: reports.filter(r => r.status === 'Resolved').length,
  };

  // Analytics Data
  const categoryCounts = reports.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  if (loading) return <div className="p-10 text-center font-bold">Loading Reports...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-black text-gray-900">Admin Console</h1>
          <div className="flex gap-3">
            <div className="bg-white border rounded-lg p-1 flex">
              {['list', 'map', 'analytics'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-md text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button onClick={downloadCSV} className="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg hover:bg-green-700 transition-all">
              Export CSV
            </button>
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border"><p className="text-[10px] font-bold text-gray-400 uppercase">Total</p><p className="text-2xl font-black">{stats.total}</p></div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-yellow-400"><p className="text-[10px] font-bold text-yellow-600 uppercase">Pending</p><p className="text-2xl font-black">{stats.pending}</p></div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-blue-400"><p className="text-[10px] font-bold text-blue-600 uppercase">Active</p><p className="text-2xl font-black">{stats.progress}</p></div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-green-400"><p className="text-[10px] font-bold text-green-600 uppercase">Resolved</p><p className="text-2xl font-black">{stats.resolved}</p></div>
        </div>

        {activeTab === 'list' && (
          <>
            <div className="flex flex-col md:row gap-4">
              <input type="text" placeholder="Search reporter or details..." className="flex-1 p-3 rounded-xl border bg-white outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <select className="p-3 rounded-xl border bg-white outline-none" value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
                <option value="All">All Categories</option>
                <option value="Roads & Potholes">Roads & Potholes</option>
                <option value="Sanitation & Waste">Sanitation & Waste</option>
                <option value="Street Lighting">Street Lighting</option>
                <option value="Water Supply">Water Supply</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr className="text-[10px] font-bold text-gray-400 uppercase">
                    <th className="p-4">Citizen Info</th>
                    <th className="p-4">Evidence</th>
                    <th className="p-4">Messaging</th>
                    <th className="p-4 text-right">Status Control</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredReports.map(r => (
                    <tr key={r._id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <p className="font-bold text-gray-900">{r.reporter}</p>
                        <p className="text-[10px] text-gray-400">{r.category}</p>
                        <p className="text-[10px] italic whitespace-pre-wrap">{r.description}</p>
                      </td>
                      <td className="p-4">
                        {r.image ? <button onClick={() => setViewPhoto(r.image)} className="text-blue-600 font-bold text-xs hover:underline">View Photo</button> : <span className="text-gray-300">None</span>}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          <input type="text" className="border p-1 text-[10px] rounded w-full outline-none" placeholder="Reply to citizen..." value={messageText[r._id] || ""} onChange={e => setMessageText({ ...messageText, [r._id]: e.target.value })} />
                          <button onClick={() => sendMessage(r._id)} className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold">Send</button>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <select className="text-[10px] border rounded p-1 font-bold outline-none" value={r.status} onChange={e => updateStatus(r._id, e.target.value)}>
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredReports.length === 0 && <div className="p-10 text-center text-gray-400">No reports found matching your criteria.</div>}
            </div>
          </>
        )}

        {activeTab === 'map' && (
          <div className="h-[600px] rounded-2xl overflow-hidden border shadow-sm z-0">
            <MapContainer center={[12.9141, 74.8560]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {reports.map((r, i) => (
                r.location && r.location.lat && (
                  <Marker key={i} position={[r.location.lat, r.location.lng]}>
                    <Popup>
                      <div className="w-48 text-sm">
                        <p className="font-bold text-blue-600">{r.category}</p>
                        <p className="font-bold text-gray-900 border-b pb-1 mb-1">{r.status}</p>
                        <p className="text-gray-600">{r.description}</p>
                        {r.image && <img src={r.image} className="mt-2 rounded" alt="Evidence" />}
                      </div>
                    </Popup>
                  </Marker>
                )
              ))}
            </MapContainer>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Issues by Category</h3>
              <div className="space-y-4">
                {Object.entries(categoryCounts).map(([cat, count]) => (
                  <div key={cat}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{cat}</span>
                      <span className="font-bold text-gray-500">{count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(count / stats.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center justify-center text-center">
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">AI Insights (Beta)</h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto mb-4">
                  Our AI system is analyzing patterns to suggest proactive maintenance.
                </p>
                <div className="inline-block px-4 py-2 bg-purple-50 text-purple-700 font-bold rounded-lg text-sm border border-purple-100">
                  ⚡ 3 High-Priority Zones Detected
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {viewPhoto && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[1000]" onClick={() => setViewPhoto(null)}>
          <div className="max-w-4xl p-2 bg-white rounded-xl shadow-2xl" onClick={e => e.stopPropagation()}>
            <img src={viewPhoto} className="max-h-[80vh] rounded-lg" alt="Evidence" />
            <button onClick={() => setViewPhoto(null)} className="w-full mt-2 py-2 text-gray-500 font-bold text-xs uppercase tracking-widest">Close Preview</button>
          </div>
        </div>
      )}
    </div>
  );
}