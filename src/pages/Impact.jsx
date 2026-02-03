import React, { useState, useEffect } from 'react';

export default function Impact() {
  const [stats, setStats] = useState({ total: 0, resolved: 0 });
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchImpactData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/issues/all');
        const data = await res.json();
        
        const resolved = data.filter(r => r.status === 'Resolved').length;
        setStats({ total: data.length, resolved });

        const counts = data.reduce((acc, report) => {
          if (report.status === 'Resolved') {
            acc[report.reporter] = (acc[report.reporter] || 0) + 1;
          }
          return acc;
        }, {});

        const sortedLeaders = Object.entries(counts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setLeaders(sortedLeaders);
      } catch (err) {
        console.error("Impact fetch error:", err);
      }
    };
    fetchImpactData();
  }, []);

  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-black text-blue-900 mb-2">Our Collective Impact</h2>
          <p className="text-gray-500 font-medium">Real progress made by citizens like you.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 shadow-sm">
            <p className="text-5xl font-black text-blue-600">{stats.total}</p>
            <p className="text-xs font-bold text-blue-900 uppercase tracking-widest mt-2">Issues Reported</p>
          </div>
          <div className="p-8 bg-green-50 rounded-3xl border border-green-100 shadow-sm">
            <p className="text-5xl font-black text-green-600">{stats.resolved}</p>
            <p className="text-xs font-bold text-green-900 uppercase tracking-widest mt-2">Problems Solved</p>
          </div>
          <div className="p-8 bg-yellow-50 rounded-3xl border border-yellow-100 shadow-sm">
            <p className="text-5xl font-black text-yellow-600">
              {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%
            </p>
            <p className="text-xs font-bold text-yellow-900 uppercase tracking-widest mt-2">Success Rate</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-[2rem] border border-gray-100 shadow-inner">
          <h3 className="text-xl font-bold text-center mb-6 flex items-center justify-center gap-2">
            <span>🏆</span> Community Heroes
          </h3>
          <div className="space-y-3">
            {leaders.length > 0 ? leaders.map((hero, index) => (
              <div key={index} className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-4">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full font-black text-xs ${index === 0 ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {index + 1}
                  </span>
                  <span className="font-bold text-gray-800">{hero.name}</span>
                </div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                  {hero.count} Resolved
                </span>
              </div>
            )) : (
              <p className="text-center text-gray-400 text-sm italic py-4">Be the first to get an issue resolved!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}