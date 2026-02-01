import React from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import RoleSelectionModal from '../components/auth/RoleSelectionModal';
import { useAuth } from '../context/AuthContext';

// Map Hero Component
const CommunityMapHero = () => {
    // Default center: Sullya, Karnataka (adjust coordinates as needed)
    const position = [12.8406, 75.3947];

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Map Background */}
            <MapContainer
                center={position}
                zoom={12}
                zoomControl={false}
                scrollWheelZoom={false}
                className="absolute  w-full h-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="bottomright" />
            </MapContainer>

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white z-[500] pointer-events-none">
                <div className="text-center px-4 animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg tracking-tight">
                        CivicPulse
                    </h1>
                    <p className="text-lg md:text-2xl font-light drop-shadow-md max-w-2xl mx-auto">
                        CivicPulse is a community-driven platform that lets citizens report local issues, support public concerns, and promote civic transparency through shared updates and collective participation..
                    </p>
                    <div className="mt-8 pointer-events-auto">
                        <Link to="/report-issue" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105">
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Home = () => {
    return (
        <div id='home' className="min-h-screen bg-gray-50 pt-16">
            <RoleSelectionModal />
            {/* Map Hero Section */}
            <CommunityMapHero />

        </div>
    );
};

export default Home