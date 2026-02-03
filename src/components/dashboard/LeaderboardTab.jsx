import React, { useState, useEffect } from 'react';

export default function LeaderboardTab({ currentUser }) {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const res = await fetch('/api/auth/leaderboard');
            if (res.ok) {
                const data = await res.json();
                setLeaderboard(data);
            }
        } catch (err) {
            console.error("Leaderboard fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden max-w-2xl mx-auto">
            <div className="p-6 bg-yellow-50 border-b border-yellow-100 text-center">
                <h2 className="text-2xl font-black text-yellow-800">Community Leaderboard</h2>
                <p className="text-yellow-700">Recognition for our most active citizens!</p>
            </div>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-xs uppercase text-gray-500 border-b bg-gray-50">
                        <th className="p-4 text-center w-16">Rank</th>
                        <th className="p-4">Citizen</th>
                        <th className="p-4 text-right">Points</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {loading ? (
                        <tr><td colSpan="3" className="p-8 text-center text-gray-400">Loading rankings...</td></tr>
                    ) : leaderboard.length > 0 ? (
                        leaderboard.map((u, i) => (
                            <tr key={u._id} className="border-b hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-center font-bold text-gray-400">
                                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                                </td>
                                <td className="p-4 font-bold text-gray-800">
                                    {u.name} {u.email === currentUser?.email && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">You</span>}
                                </td>
                                <td className="p-4 text-right font-mono font-bold text-blue-600">{u.points}</td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="3" className="p-8 text-center text-gray-400">No data available.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
