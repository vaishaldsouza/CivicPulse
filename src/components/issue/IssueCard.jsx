import React, { useState } from 'react';
import { ThumbsUp, MapPin, Calendar, User } from 'lucide-react';

// ============================================
// 1️⃣ StatusBadge Component
// ============================================
function StatusBadge({ status }) {
  const statusConfig = {
    Submitted: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: 'Submitted'
    },
    Review: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      label: 'In Review'
    },
    Resolved: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'Resolved'
    }
  };

  const config = statusConfig[status] || statusConfig.Submitted;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}

// ============================================
// 2️⃣ UpvoteButton Component
// ============================================
function UpvoteButton({ count = 0, isUpvoted = false }) {
  const [upvoted, setUpvoted] = useState(isUpvoted);
  const [voteCount, setVoteCount] = useState(count);

  const handleUpvote = () => {
    if (upvoted) {
      setUpvoted(false);
      setVoteCount(voteCount - 1);
    } else {
      setUpvoted(true);
      setVoteCount(voteCount + 1);
    }
  };

  return (
    <button
      onClick={handleUpvote}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
        upvoted
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <ThumbsUp className={`w-4 h-4 ${upvoted ? 'fill-current' : ''}`} />
      <span>{voteCount}</span>
    </button>
  );
}

// ============================================
// 3️⃣ IssueCard Component (THE CENTERPIECE)
// ============================================
function IssueCard({ issue }) {
  const {
    id,
    title,
    description,
    category,
    status,
    upvotes,
    location,
    createdAt,
    author,
    isUpvoted
  } = issue;

  // Category color mapping
  const categoryColors = {
    Infrastructure: 'bg-orange-100 text-orange-800',
    Safety: 'bg-red-100 text-red-800',
    Environment: 'bg-green-100 text-green-800',
    Transportation: 'bg-purple-100 text-purple-800',
    Healthcare: 'bg-pink-100 text-pink-800',
    Education: 'bg-indigo-100 text-indigo-800',
    Other: 'bg-gray-100 text-gray-800'
  };

  const categoryColor = categoryColors[category] || categoryColors.Other;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
      {/* Header: Status + Category */}
      <div className="flex items-center justify-between mb-3">
        <StatusBadge status={status} />
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColor}`}>
          {category}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {description}
      </p>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
        {location && (
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{location}</span>
          </div>
        )}
        {createdAt && (
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{createdAt}</span>
          </div>
        )}
        {author && (
          <div className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            <span>{author}</span>
          </div>
        )}
      </div>

      {/* Footer: Upvote Button */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <UpvoteButton count={upvotes} isUpvoted={isUpvoted} />
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View Details →
        </button>
      </div>
    </div>
  );
}

// ============================================
// Demo Component (Shows All Components)
// ============================================
export default function IssueComponentsDemo() {
  // Sample issue data
  const sampleIssues = [
    {
      id: 1,
      title: "Broken streetlight on Main Street causing safety concerns",
      description: "The streetlight at the corner of Main Street and 5th Avenue has been out for two weeks. This is creating a safety hazard for pedestrians at night.",
      category: "Safety",
      status: "Submitted",
      upvotes: 24,
      location: "Main St & 5th Ave",
      createdAt: "2 days ago",
      author: "Sarah Chen",
      isUpvoted: false
    },
    {
      id: 2,
      title: "Pothole on Highway 101 needs immediate repair",
      description: "Large pothole appearing on the northbound lane of Highway 101 near exit 23. Multiple vehicles have reported damage.",
      category: "Infrastructure",
      status: "Review",
      upvotes: 156,
      location: "Highway 101, Exit 23",
      createdAt: "5 days ago",
      author: "Mike Johnson",
      isUpvoted: true
    },
    {
      id: 3,
      title: "Park cleanup completed - thank you volunteers!",
      description: "The community park cleanup initiative has been completed successfully. Over 50 volunteers participated in removing litter and planting new trees.",
      category: "Environment",
      status: "Resolved",
      upvotes: 89,
      location: "Central Park",
      createdAt: "1 week ago",
      author: "Emily Rodriguez",
      isUpvoted: false
    },
    {
      id: 4,
      title: "Bus route 42 experiencing frequent delays",
      description: "Route 42 has been consistently 15-20 minutes late during morning rush hour for the past month. Commuters are requesting schedule review.",
      category: "Transportation",
      status: "Review",
      upvotes: 67,
      location: "Downtown Route",
      createdAt: "3 days ago",
      author: "James Wilson",
      isUpvoted: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Issue Components Demo</h1>
          <p className="text-gray-600">Complete issue lifecycle UI components</p>
        </div>

        {/* Individual Component Demos */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Individual Components</h2>
          
          {/* StatusBadge Demo */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">StatusBadge Component:</h3>
            <div className="flex gap-3">
              <StatusBadge status="Submitted" />
              <StatusBadge status="Review" />
              <StatusBadge status="Resolved" />
            </div>
          </div>

          {/* UpvoteButton Demo */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">UpvoteButton Component:</h3>
            <div className="flex gap-3">
              <UpvoteButton count={24} isUpvoted={false} />
              <UpvoteButton count={156} isUpvoted={true} />
            </div>
          </div>
        </div>

        {/* IssueCard Grid */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">IssueCard Component (Full View)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sampleIssues.map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}