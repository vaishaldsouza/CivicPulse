import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

function MapController({ center }) {
    const map = useMap();
    useEffect(() => { if (center) map.flyTo(center, 13); }, [center, map]);
    return null;
}

export default function ReportIssueTab({ user, onReportSubmitted }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Roads & Potholes');
    const [position, setPosition] = useState(null);
    const [image, setImage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]);

    // Try to get user location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setMapCenter([latitude, longitude]);
                },
                () => console.log("Location access denied, using default.")
            );
        }
    }, []);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result);
        if (file) reader.readAsDataURL(file);
    };

    const LocationPicker = () => {
        useMapEvents({ click(e) { setPosition(e.latlng); } });
        return position ? <Marker position={position} /> : null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!position) return alert("Please select a location on the map.");
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/issues/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    reporter: user.name,
                    email: user.email,
                    title,
                    category,
                    description,
                    image,
                    location: { lat: position.lat, lng: position.lng }
                }),
            });
            if (res.ok) {
                alert("Report submitted successfully!");
                setTitle(""); setDescription(""); setPosition(null); setImage("");
                if (onReportSubmitted) onReportSubmitted();
            } else {
                const errorData = await res.json();
                alert(`Submission failed: ${errorData.msg || "Unknown error"}`);
            }
        } catch (err) {
            console.error(err);
            alert("Submission failed. Check console for details.");
        } finally { setIsSubmitting(false); }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
                <h2 className="font-bold text-xl">New Issue Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Issue Title (e.g., Broken Streetlight)"
                        className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                    <select className="w-full p-3 border rounded-xl bg-gray-50" value={category} onChange={e => setCategory(e.target.value)}>
                        <option>Roads & Potholes</option>
                        <option>Sanitation & Waste</option>
                        <option>Street Lighting</option>
                        <option>Water Supply</option>
                        <option>Other</option>
                    </select>
                    {category === 'Other' && (
                        <input
                            type="text"
                            placeholder="Specify Category..."
                            className="w-full p-3 border rounded-xl bg-gray-50 mb-2"
                            onChange={e => setDescription(`[Category: ${e.target.value}] ${description.replace(/^\[Category: .*\] /, '')}`)}
                        />
                    )}
                    <textarea className="w-full p-3 border rounded-xl bg-gray-50 h-32" placeholder="Describe the issue..." value={description} onChange={e => setDescription(e.target.value)} required />
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">Attach Evidence</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                        {isSubmitting ? "Submitting..." : "Submit Report"}
                    </button>
                </form>
            </div>
            <div className="lg:col-span-2 h-[500px] rounded-2xl overflow-hidden border shadow-sm z-0">
                <MapContainer center={mapCenter} zoom={5} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MapController center={mapCenter} />
                    <LocationPicker />
                </MapContainer>
            </div>
        </div>
    );
}
