import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import IssueCard from '../components/issue/IssueCard';

// ... (inside component)


import LeaderboardTab from '../components/dashboard/LeaderboardTab';
import MyReportsTab from '../components/dashboard/MyReportsTab';
import IssueFeedTab from '../components/dashboard/IssueFeedTab';
import ReportIssueTab from '../components/dashboard/ReportIssueTab';

export default function Dashboard() {
  const { user } = useAuth();
  console.log("Dashboard Rendered. User:", user);
  const [allReports, setAllReports] = useState([]);
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'report' | 'my-reports' | 'leaderboard'
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    fetchReports();
    fetchUserPoints();
  }, []);

  const fetchUserPoints = async () => {
    // Calculated from reports for now
  };

  const myReports = allReports.filter(item => item.email === user?.email);

  useEffect(() => {
    setUserPoints(myReports.length * 10);
  }, [myReports]);

  const fetchReports = async () => {
    try {
      const res = await fetch('/api/issues/all');
      const data = await res.json();
      setAllReports(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); }
  };

  const handleUpvote = async (issueId) => {
    try {
      const res = await fetch(`/api/issues/${issueId}/upvote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?._id || user?.id })
      });
      if (res.ok) {
        fetchReports(); // Refresh data to show new vote count
      }
    } catch (err) { console.error("Upvote error:", err); }
  };

  const handleReportSubmitted = () => {
    fetchReports();
    setActiveTab('my-reports');
  };

  if (!user) return <div className="p-10 text-center">Loading User Data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 space-y-6">
      <div className="max-w-7xl mx-auto">

        {/* Tabs and Gamification Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-gray-200 pb-2">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('feed')}
              className={`pb-2 px-4 font-bold transition-colors ${activeTab === 'feed' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Community Feed
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`pb-2 px-4 font-bold transition-colors ${activeTab === 'report' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Report Issue
            </button>
            <button
              onClick={() => setActiveTab('my-reports')}
              className={`pb-2 px-4 font-bold transition-colors ${activeTab === 'my-reports' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              My Reports
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`pb-2 px-4 font-bold transition-colors ${activeTab === 'leaderboard' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Leaderboard
            </button>
          </div>

          <div className="flex items-center gap-2 mt-4 md:mt-0 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200 text-yellow-800 font-bold">
            <span>🏆</span>
            <span>{userPoints} Civic Points</span>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'feed' && (
          <IssueFeedTab allReports={allReports} handleUpvote={handleUpvote} user={user} />
        )}

        {activeTab === 'report' && (
          <ReportIssueTab user={user} onReportSubmitted={handleReportSubmitted} />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardTab currentUser={user} />
        )}

        {activeTab === 'my-reports' && (
          <MyReportsTab myReports={myReports} />
        )}
      </div>
    </div>
  );
}