// src/pages/student/ReportsPage.tsx
import React from 'react';
import { PageTransition } from '../../components/shared/PageTransition';
import WeeklyReport from '../../components/student/WeeklyReport';
import Leaderboard from '../../components/student/Leaderboard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Week 1', score: 65 },
  { name: 'Week 2', score: 72 },
  { name: 'Week 3', score: 85 },
  { name: 'Week 4', score: 78 },
  { name: 'Week 5', score: 92 },
];

const ReportsPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="max-w-[1100px] mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-primary font-poppins">Learning Analytics</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-8">
            {/* Progress Chart */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-primary mb-6">Assessment Performance</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#F47820" strokeWidth={4} dot={{ r: 6, fill: '#F47820', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-center text-sm text-gray-500 mt-4">
                You've improved <span className="text-success font-bold">34%</span> since you started! 🚀
              </p>
            </div>

            {/* Attendance Progress */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
               <div>
                 <h3 className="font-bold text-primary mb-1">Attendance Rate</h3>
                 <p className="text-sm text-gray-500">Perfect attendance for 3 months</p>
               </div>
               <div className="relative w-24 h-24 flex items-center justify-center">
                 <svg className="w-full h-full -rotate-90">
                   <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                   <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="25.1" className="text-accent" />
                 </svg>
                 <span className="absolute text-xl font-bold text-primary">92%</span>
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <WeeklyReport />
            <Leaderboard />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ReportsPage;
