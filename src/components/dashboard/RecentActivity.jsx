import React from 'react';

/**
 * @param {Object} props
 * @param {Array} props.activities - List of activity/issue objects
 */
export default function RecentActivity({ activities }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">What's Happening Now?</h2>
            </div>
            <div className="divide-y divide-gray-100">
                {activities.map((activity) => (
                    <div key={activity._id || activity.id} className="p-5 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-medium text-gray-900 line-clamp-1">{activity.title}</h4>
                                <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                                <div className="flex items-center gap-3 mt-3">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${activity.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                                            activity.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                                'bg-orange-100 text-orange-800'}`}>
                                        {activity.status}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {new Date(activity.createdAt || activity.timestamp).toLocaleString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                        <span className="truncate max-w-[100px]" title={activity.location}>
                                            {activity.location || 'Unknown Location'}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
