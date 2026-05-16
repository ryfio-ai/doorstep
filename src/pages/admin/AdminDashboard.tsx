import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  IndianRupee, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight,
  Activity,
  Zap,
  Briefcase
} from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../context/AuthContext';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Revenue', value: '₹0', icon: IndianRupee, color: 'text-success', bg: 'bg-success/10' },
    { label: 'Active Students', value: '0', icon: GraduationCap, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Verified Trainers', value: '0', icon: Users, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Active Courses', value: '0', icon: BookOpen, color: 'text-brandOrange', bg: 'bg-brandOrange/10' },
  ];

  return (
    <PageTransition>
      <div className="max-w-[1400px] mx-auto space-y-8 font-inter">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="font-jakarta font-extrabold text-[36px] text-textPrimary tracking-tight italic leading-tight capitalize">Platform Command</h1>
            <p className="font-inter text-[16px] text-textSecondary font-medium opacity-60">Welcome back, {user?.name || 'Admin'}. System operations are optimal.</p>
          </div>
          <Button className="btn-primary h-14 px-8 rounded-2xl font-jakarta font-extrabold uppercase tracking-widest text-[12px] shadow-premium-card">
            Manage System Config
          </Button>
        </div>

        {/* Real-time Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="premium-card p-8 border-none shadow-premium-card bg-white hover:shadow-premium-elevated transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div className="flex items-center gap-1 text-textSecondary/20 font-jakarta font-extrabold text-[12px] bg-offWhite px-2 py-1 rounded-lg">
                  <TrendingUp className="w-3 h-3" /> +0%
                </div>
              </div>
              <div className="font-jakarta font-extrabold text-[36px] text-textPrimary tracking-tighter leading-none italic mb-1">{stat.value}</div>
              <div className="font-jakarta font-extrabold text-[12px] text-textSecondary/40 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Management Feed */}
          <div className="xl:col-span-2 space-y-8">
            <div className="premium-card p-10 border-none shadow-premium-card bg-white min-h-[500px] flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-brandOrange/10"></div>
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-brandOrange" />
                  <h3 className="font-jakarta font-extrabold text-[20px] text-textPrimary uppercase tracking-widest opacity-50 italic">System Activity</h3>
                </div>
                <Button variant="ghost" className="text-[12px] font-jakarta font-extrabold uppercase tracking-widest text-textSecondary">View Logs</Button>
              </div>

              {/* Premium Empty State */}
              <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
                <div className="w-24 h-24 bg-brandOrange/5 rounded-[40px] flex items-center justify-center mb-8">
                  <Globe className="w-12 h-12 text-brandOrange/20 animate-pulse" />
                </div>
                <h4 className="font-jakarta font-extrabold text-[22px] text-textPrimary mb-4 italic">No Active Events</h4>
                <p className="font-inter text-[15px] text-textSecondary font-medium opacity-60 leading-relaxed mb-10">
                  The system pipelines are currently clear. Real-time enrollment and session activity will appear here as it happens.
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-offWhite rounded-xl border border-borderSubtle">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                    <span className="text-[12px] font-jakarta font-extrabold text-textPrimary uppercase tracking-widest text-[10px]">Primary DB: Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panels: Health & Pending */}
          <div className="space-y-8">
            <div className="premium-card p-8 bg-navy-dark border-none shadow-premium-card text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
              <h3 className="font-jakarta font-extrabold text-[14px] text-white/40 uppercase tracking-widest italic mb-8 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent" /> System Integrity
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[12px] font-jakarta font-extrabold uppercase tracking-widest text-white/60">Server Load</span>
                    <span className="text-[12px] font-jakarta font-extrabold text-accent italic">Optimized (0%)</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[2%] rounded-full shadow-[0_0_10px_rgba(255,102,0,0.5)]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="premium-card p-8 border-none shadow-premium-card bg-white space-y-6">
              <h3 className="font-jakarta font-extrabold text-[14px] text-textPrimary uppercase tracking-widest opacity-40 italic flex items-center gap-2">
                <Clock className="w-4 h-4 text-brandOrange" /> Pending Tasks
              </h3>
              
              <div className="space-y-4">
                 <div className="p-4 bg-offWhite rounded-[24px] border border-borderSubtle flex items-center justify-between group hover:border-brandOrange/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-textPrimary/20">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-jakarta font-extrabold text-[13px] text-textPrimary">Mentors to Verify</div>
                      <div className="text-[11px] text-textSecondary font-medium">0 applications</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-textSecondary/20 group-hover:text-brandOrange transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminDashboard;
