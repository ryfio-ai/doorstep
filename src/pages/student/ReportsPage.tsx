// src/pages/student/ReportsPage.tsx
import React from 'react';
import { PageTransition } from '../../components/shared/PageTransition';
import WeeklyReport from '../../components/student/WeeklyReport';
import Leaderboard from '../../components/student/Leaderboard';
import { TrendingUp, Award, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

const ReportsPage: React.FC = () => {
  const data: any[] = []; // Empty for fresh account

  return (
    <PageTransition>
      <div className="max-w-[1100px] mx-auto space-y-12 font-inter">
        <div className="flex flex-col space-y-4">
          <h1 className="font-jakarta text-[36px] md:text-[48px] font-extrabold text-textPrimary leading-none tracking-tighter italic">
            Learning <span className="text-brandOrange underline decoration-brandOrange/10">Analytics</span>
          </h1>
          <p className="font-inter text-[18px] text-textSecondary font-medium opacity-60 italic">Track your growth, attendance, and competitive standing.</p>
        </div>
        
        {data.length === 0 ? (
          <div className="bg-white rounded-[48px] p-16 md:p-24 border-2 border-dashed border-borderSubtle flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full bg-offWhite flex items-center justify-center mb-8 text-textSecondary/20">
              <BarChart2 size={48} />
            </div>
            <h2 className="font-jakarta font-extrabold text-[28px] text-textPrimary italic mb-4">No Data Available</h2>
            <p className="font-inter text-[17px] text-textSecondary font-medium italic opacity-60 mb-10 max-w-md">Complete your first assessment or attend a few classes to see your growth analytics here.</p>
            <Link to="/student/dashboard">
              <Button className="btn-primary h-14 rounded-2xl px-12 text-[16px]">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        ) : (
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
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 700 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 700 }} />
                      <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', padding: '16px' }} />
                      <Line type="monotone" dataKey="score" stroke="#EA580C" strokeWidth={5} dot={{ r: 8, fill: '#EA580C', strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 10 }} />
                    </LineChart>
                  </ResponsiveContainer>
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
        )}
      </div>
    </PageTransition>
  );
};

export default ReportsPage;
