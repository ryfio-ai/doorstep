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
      <div className="max-w-[1100px] mx-auto space-y-12 font-inter">
        <div className="flex flex-col space-y-4">
          <h1 className="font-jakarta text-[36px] md:text-[48px] font-extrabold text-textPrimary leading-none tracking-tighter italic">
            Learning <span className="text-brandOrange underline decoration-brandOrange/10">Analytics</span>
          </h1>
          <p className="font-inter text-[18px] text-textSecondary font-medium opacity-60 italic">Track your growth, attendance, and competitive standing.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
          <div className="space-y-12">
            {/* Progress Chart */}
            <div className="bg-white p-10 rounded-[48px] border border-borderSubtle shadow-premium-card relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandOrange/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brandOrange/10 transition-all"></div>
              
              <div className="flex items-center justify-between mb-10 relative z-10">
                <h3 className="font-jakarta font-extrabold text-[22px] text-textPrimary italic">Assessment Performance</h3>
                <div className="flex items-center gap-2 px-4 py-1.5 bg-brandOrange/10 text-brandOrange rounded-full font-jakarta font-extrabold text-[11px] uppercase tracking-widest">
                  Live Updates
                </div>
              </div>

              <div className="h-[350px] relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 700 }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 700 }} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '24px', 
                        border: 'none', 
                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                        padding: '16px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#EA580C" 
                      strokeWidth={5} 
                      dot={{ r: 8, fill: '#EA580C', strokeWidth: 3, stroke: '#fff' }} 
                      activeDot={{ r: 10, shadow: '0 0 20px rgba(234,88,12,0.4)' }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-10 p-6 bg-offWhite rounded-[32px] border border-borderSubtle/50 flex items-center justify-between group-hover:border-brandOrange/20 transition-all">
                <p className="font-inter text-[15px] text-textSecondary font-medium italic opacity-70">
                  Total improvement this month:
                </p>
                <div className="flex items-center gap-2 text-green-600 font-jakarta font-extrabold text-[20px] italic">
                  <TrendingUp size={20} /> +34.2%
                </div>
              </div>
            </div>

            {/* Attendance & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-brandBlue rounded-[40px] p-8 text-white relative overflow-hidden shadow-premium-elevated group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brandOrange/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-jakarta font-extrabold text-brandOrange uppercase tracking-widest">Attendance</span>
                    <h3 className="text-[32px] font-jakarta font-extrabold leading-none italic tracking-tighter">98.5%</h3>
                    <p className="text-white/40 text-[13px] font-medium italic">Perfect streak: 12 weeks</p>
                  </div>
                  <div className="relative w-24 h-24">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="3.7" className="text-brandOrange shadow-glow-orange" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-jakarta font-extrabold text-[14px]">
                      A+
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[40px] p-8 border border-borderSubtle shadow-premium-card flex flex-col justify-between group">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-jakarta font-extrabold text-textSecondary/40 uppercase tracking-widest">Global Rank</span>
                  <Award size={24} className="text-amberGold" />
                </div>
                <div className="mt-4">
                  <h3 className="text-[32px] font-jakarta font-extrabold leading-none italic tracking-tighter text-textPrimary">#42 <span className="text-[14px] text-textSecondary opacity-40 font-medium">/ 5,200</span></h3>
                  <p className="text-textSecondary text-[13px] font-medium italic mt-2">Top 1% of international learners</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
             <div className="bg-white rounded-[40px] border border-borderSubtle shadow-premium-card overflow-hidden">
                <div className="p-8 border-b border-borderSubtle/30 bg-offWhite/50">
                  <h4 className="font-jakarta font-extrabold text-[18px] text-textPrimary italic">Weekly Progress</h4>
                </div>
                <WeeklyReport />
             </div>
             
             <div className="bg-brandBlue rounded-[40px] shadow-premium-elevated overflow-hidden p-2">
                <Leaderboard />
             </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ReportsPage;
