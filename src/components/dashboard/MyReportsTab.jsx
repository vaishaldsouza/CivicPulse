import React from 'react';

export default function MyReportsTab({ myReports }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-[10px] uppercase text-gray-400 border-b">
                        <th className="p-4">Category</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Latest Admin Feedback</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {myReports.length > 0 ? myReports.map(r => (
                        <tr key={r._id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-semibold text-gray-800">{r.category}</td>
                            <td className="p-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${r.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                    r.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {r.status}
                                </span>
                            </td>
                            <td className="p-4 text-xs italic text-gray-500 max-w-xs truncate">
                                {r.comments?.length > 0 ? r.comments[r.comments.length - 1].text : "Waiting for review"}
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan="3" className="p-10 text-center text-gray-400 italic">No reports found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
