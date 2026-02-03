import React from 'react';
import IssueCard from '../issue/IssueCard';

export default function IssueFeedTab({ allReports, handleUpvote, user }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allReports.map(issue => (
                <IssueCard
                    key={issue._id}
                    issue={issue}
                    onUpvote={handleUpvote}
                    currentUserId={user._id || user.id}
                />
            ))}
            {allReports.length === 0 && <div className="col-span-full text-center py-10 text-gray-400">No issues reported yet.</div>}
        </div>
    );
}
