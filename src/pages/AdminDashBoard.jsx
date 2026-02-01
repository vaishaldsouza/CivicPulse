import React, { useState } from 'react';
import { AlertTriangle, Clock, CheckCircle, Search, Filter } from 'lucide-react';
import { useIssues } from '../context/IssueContext';
import StatCard from '../components/dashboard/StatCard';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function AdminDashBoard() {
    const { issues, updateIssueStatus } = useIssues();
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const handleExport = () => {
        try {
            console.log("Starting PDF generation...");
            const doc = new jsPDF();
            console.log("jsPDF instance created:", doc);

            // Add Title
            doc.setFontSize(18);
            doc.text('CivicPulse Community Issues Report', 14, 22);

            // Add Date
            doc.setFontSize(11);
            doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

            // Create Table
            const tableColumn = ["Issue Title", "Location", "Category", "Priority", "Status", "Date"];
            const tableRows = [];

            if (!issues || issues.length === 0) {
                console.warn("No issues to export!");
            }

            issues.forEach(issue => {
                const dateStr = issue.createdAt
                    ? new Date(issue.createdAt).toLocaleDateString()
                    : (issue.timestamp ? new Date(issue.timestamp).toLocaleDateString() : 'N/A');

                const issueData = [
                    issue.title,
                    issue.location || 'Unknown Location',
                    issue.category,
                    issue.priority,
                    issue.status,
                    dateStr
                ];
                tableRows.push(issueData);
            });

            if (typeof autoTable !== 'function') {
                console.error("autoTable import is not a function:", autoTable);
                throw new Error("autoTable plugin failed to load correctly.");
            }

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 40,
            });

            console.log("Saving PDF...");
            doc.save('community-issues-report.pdf');
            console.log("PDF saved.");

        } catch (error) {
            console.error("PDF Export failed:", error);
            alert(`PDF Export Failed: ${error.message}. Check console for details.`);
        }
    };

    // Calculate Stats
    const criticalCount = issues.filter(i => i.priority === 'Critical' || i.priority === 'High').length;
    const pendingCount = issues.filter(i => i.status === 'Open').length;
    const resolvedCount = issues.filter(i => i.status === 'Resolved').length;

    const handleStatusChange = async (id, newStatus) => {
        const success = await updateIssueStatus(id, newStatus);
        if (!success) {
            alert('Failed to update status. Please try again.');
        }
    };

    const filteredIssues = issues.filter(issue => {
        const matchesFilter = filter === 'All' || issue.status === filter;
        const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            issue.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            issue.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Critical': return 'bg-red-100 text-red-800';
            case 'High': return 'bg-orange-100 text-orange-800';
            case 'Medium': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-blue-100 text-blue-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Console</h1>
                        <p className="mt-2 text-gray-600">Manage, track, and resolve community issues.</p>
                    </div>
                    <button
                        onClick={handleExport}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                    >
                        Export Report
                    </button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Critical & High Priority"
                        value={criticalCount}
                        icon={AlertTriangle}
                        color="red"
                        trend="Needs immediate action"
                    />
                    <StatCard
                        title="Pending Resolution"
                        value={pendingCount}
                        icon={Clock}
                        color="yellow"
                        trend={`${pendingCount} open tickets`}
                    />
                    <StatCard
                        title="Total Resolved"
                        value={resolvedCount}
                        icon={CheckCircle}
                        color="green"
                        trend="Keep it up"
                    />
                </div>

                {/* Management Table Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* Filters Bar */}
                    <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
                        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 w-full sm:w-auto">
                            <Search className="w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search issues..."
                                className="text-sm border-none focus:ring-0 w-full sm:w-64 placeholder-gray-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                            {['All', 'Open', 'In Progress', 'Resolved'].map((stat) => (
                                <button
                                    key={stat}
                                    onClick={() => setFilter(stat)}
                                    className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${filter === stat
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {stat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                    <th className="px-6 py-4">Issue</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Priority</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredIssues.map((issue) => (
                                    <tr key={issue._id || issue.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900 line-clamp-1">{issue.title}</span>
                                                <span className="text-xs text-gray-500 mt-0.5">
                                                    {issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : (issue.timestamp ? new Date(issue.timestamp).toLocaleDateString() : 'N/A')} • {issue.category}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {issue.location || 'Unknown'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                                                {issue.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={issue.status}
                                                onChange={(e) => handleStatusChange(issue._id || issue.id, e.target.value)}
                                                className="text-xs border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-1 px-2"
                                            >
                                                <option value="Open">Open</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Resolved">Resolved</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination (Visual only) */}
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
                        <span>Showing {filteredIssues.length} of {issues.length} issues</span>
                        <div className="flex gap-2">
                            <button disabled className="px-3 py-1 bg-white border border-gray-200 rounded-md opacity-50 cursor-not-allowed">Previous</button>
                            <button disabled className="px-3 py-1 bg-white border border-gray-200 rounded-md opacity-50 cursor-not-allowed">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
