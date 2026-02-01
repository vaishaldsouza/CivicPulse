import React from 'react';
import { Activity, CheckCircle, AlertCircle, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useIssues } from '../context/IssueContext';
import StatCard from '../components/dashboard/StatCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import L from 'leaflet';

// Fix for default Leaflet icon not showing
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

export default function Dashboard() {
    const { issues } = useIssues();

    // Calculate Stats
    const totalIssues = issues.length;
    const activeIssues = issues.filter(i => i.status !== 'Resolved').length;
    const resolvedIssues = issues.filter(i => i.status === 'Resolved').length;

    return (
        <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Community Dashboard</h1>
                    <p className="mt-2 text-gray-600">Real-time insights into civic issues and community progress.</p>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Total Reported Issues"
                        value={totalIssues}
                        icon={AlertCircle}
                        color="blue"
                        trend="+12% this month"
                    />
                    <StatCard
                        title="Active Issues"
                        value={activeIssues}
                        icon={Activity}
                        color="orange"
                        trend="Needs attention"
                    />
                    <StatCard
                        title="Resolved Issues"
                        value={resolvedIssues}
                        icon={CheckCircle}
                        color="green"
                        trend="Great job community!"
                    />
                </div>

                {/* Content Grid: Map + Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Map Section - Takes up 2 columns on large screens */}
                    <div className="lg:col-span-2 h-full">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden h-full">
                            <div className="p-5 flex items-center justify-between border-b border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-gray-500" />
                                    Issue Map
                                </h2>
                                <span className="text-sm text-gray-500">Visualizing reported concerns</span>
                            </div>
                            <div className="flex-1 min-h-[500px] w-full relative z-0">
                                <MapContainer
                                    center={[12.9141, 74.8560]}
                                    zoom={13}
                                    scrollWheelZoom={false}
                                    className="h-full w-full"
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    {issues.map(issue => (
                                        <Marker key={issue._id || issue.id} position={issue.coordinates || [0, 0]}>
                                            <Popup>
                                                <div className="p-1">
                                                    <div className="font-bold text-sm mb-1">{issue.title}</div>
                                                    <div className="text-xs text-gray-600 mb-1">{issue.category}</div>
                                                    <div className="text-xs text-gray-500 mb-2">{issue.location}</div>
                                                    <div className={`text-xs px-2 py-0.5 rounded-full inline-block ${issue.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                                                        }`}>
                                                        {issue.status}
                                                    </div>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    ))}
                                </MapContainer>
                            </div>
                        </div>
                    </div>

                    {/* Activity Feed - Takes up 1 column */}
                    <div className="lg:col-span-1">
                        <RecentActivity activities={issues} />
                    </div>

                </div>
            </div>
        </div>
    );
}
