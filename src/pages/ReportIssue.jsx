import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import IssueForm from '../components/issue/IssueForm';
import { useIssues } from '../context/IssueContext';
import L from 'leaflet';
import { Search } from 'lucide-react';

// Fix icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

function MapUpdater({ center }) {
    const map = useMap();
    React.useEffect(() => {
        if (center) {
            map.flyTo(center, 15);
        }
    }, [center, map]);
    return null;
}

function LocationMarker({ position, setPosition }) {
    useMapEvents({
        click(e) {
            // Fetch address from Nominatim
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`)
                .then(res => res.json())
                .then(data => {
                    setPosition({
                        lat: e.latlng.lat,
                        lng: e.latlng.lng,
                        address: data.display_name || `Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}`
                    });
                })
                .catch(() => {
                    setPosition({
                        lat: e.latlng.lat,
                        lng: e.latlng.lng,
                        address: `Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}`
                    });
                });
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
}

export default function ReportIssue() {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const { addIssue } = useIssues();
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();

            if (data && data.length > 0) {
                const result = data[0];
                const lat = parseFloat(result.lat);
                const lng = parseFloat(result.lon);

                setSelectedLocation({
                    lat: lat,
                    lng: lng,
                    address: result.display_name,
                    autoSet: true // Flag to distinguish from manual click if needed
                });
            } else {
                alert('Location not found. Please try a different search term.');
            }
        } catch (error) {
            console.error('Search failed:', error);
            alert('Failed to search location. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleFormSubmit = async (formData) => {
        if (!selectedLocation) return;

        const newIssue = {
            id: Date.now(), // Simple ID generation (backend will replace this mostly)
            ...formData,
            location: selectedLocation.address, // Use the fetched address
            coordinates: [selectedLocation.lat, selectedLocation.lng],
            status: 'Open',
            upvotes: 0,
            timestamp: new Date().toISOString(),
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400", // Placeholder image
            priority: 'Medium' // Default priority
        };

        const success = await addIssue(newIssue);
        if (success) {
            navigate('/dashboard');
        } else {
            alert('Failed to submit issue. Please check your connection or try again later.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Report an Issue</h1>
                    <p className="mt-2 text-gray-600">Spot a problem? Search for the location or click on the map.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Size Map Column */}
                    <div className="flex flex-col gap-4">
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Search location (e.g. MG Road, Mangaluru)"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={isSearching}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:bg-blue-400"
                            >
                                <Search className="w-4 h-4" />
                                {isSearching ? '...' : 'Search'}
                            </button>
                        </form>

                        <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200 h-[400px] lg:h-[600px] relative z-0">
                            <MapContainer
                                center={[12.9141, 74.8560]} // Mangaluru
                                zoom={13}
                                className="h-full w-full"
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <MapUpdater center={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : null} />
                                <LocationMarker position={selectedLocation} setPosition={setSelectedLocation} />
                            </MapContainer>

                            {!selectedLocation && (
                                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-sm font-medium text-blue-700 z-[400] pointer-events-none">
                                    👆 Tap on the map select location
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="">
                        <IssueForm
                            onSubmit={handleFormSubmit}
                            locationSelected={selectedLocation}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
