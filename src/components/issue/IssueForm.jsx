import React, { useState } from 'react';
import { Camera, MapPin, Send } from 'lucide-react';

export default function IssueForm({ onSubmit, locationSelected }) {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Infrastructure',
        description: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Issue Title</label>
                <input
                    type="text"
                    name="title"
                    required
                    placeholder="e.g. Broken Street Light"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                    name="category"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="Infrastructure">Infrastructure (Roads, Potholes)</option>
                    <option value="Lighting">Street Lighting</option>
                    <option value="Sanitation">Sanitation & Garbage</option>
                    <option value="Water Supply">Water Supply</option>
                    <option value="Public Amenities">Public Amenities (Parks, Benches)</option>
                    <option value="Others">Others</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                    name="description"
                    required
                    rows={4}
                    placeholder="Describe the issue in detail..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className={`p-3 rounded-lg border flex items-center gap-3 ${locationSelected ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-500'
                    }`}>
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">
                        {locationSelected ? (locationSelected.address || `Selected: ${locationSelected.lat.toFixed(4)}, ${locationSelected.lng.toFixed(4)}`) : 'Please click on the map to set location'}
                    </span>
                </div>
            </div>

            <button
                type="submit"
                disabled={!locationSelected}
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-white transition-all transform
          ${locationSelected
                        ? 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] shadow-lg'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
            >
                <Send className="w-4 h-4" />
                Submit Report
            </button>
        </form>
    );
}
