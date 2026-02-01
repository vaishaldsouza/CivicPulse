import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';


export default function StatCard({ title, value, icon: Icon, trend, color = "blue" }) {
    const colorClasses = {
        blue: "bg-blue-100 text-blue-600",
        green: "bg-green-100 text-green-600",
        yellow: "bg-yellow-100 text-yellow-600",
        red: "bg-red-100 text-red-600",
        purple: "bg-purple-100 text-purple-600",
    };

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
                <div className={`p-2 rounded-lg ${colorClasses[color] || colorClasses.blue}`}>
                    {Icon && <Icon className="w-5 h-5" />}
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">{value}</span>
                {trend && (
                    <span className="text-xs text-gray-400 mt-1 font-medium">
                        {trend}
                    </span>
                )}
            </div>
        </div>
    );
}
