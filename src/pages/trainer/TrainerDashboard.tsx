import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, IndianRupee, Users, TrendingUp, Clock, CheckCircle2, ChevronRight, MessageCircle, FileText, Camera, ShieldAlert, Star, Search, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

export const TrainerDashboard: React.FC = () => {
  const { user, trainerProfile, isVerifiedTrainer } = useAuth();
  const [sessions, setSessions] = useState<any[]>([]);
  const [demos, setDemos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      const [sessionsRes, demosRes] = await Promise.all([
        supabase.from('sessions').select('*').eq('trainer_id', user.id).limit(5),
        supabase.from('demo_requests').select('*').eq('trainer_id', user.id).eq('status', 'pending')
      ]);

      if (sessionsRes.data) setSessions(sessionsRes.data);
      if (demosRes.data) setDemos(demosRes.data);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const stats = [
    { label: 'Total Students', value: trainerProfile?.total_students || 0, icon: Users, color: 'text-brandOrange', bg: 'bg-brandOrange/5' },
    { label: 'Weekly Sessions', value: sessions.length || 0, icon: Calendar, color: 'text-brandOrange', bg: 'bg-brandOrange/5' },
    { label: 'Total Hours', value: trainerProfile?.total_hours || 0, icon: Clock, color: 'text-brandOrange', bg: 'bg-brandOrange/5' },
    { label: 'Expert Rating', value: trainerProfile?.rating || '0.0', icon: Star, color: 'text-amberGold', bg: 'bg-amberGold/5' },
  ];

  return (
    <PageTransition>
      <div className="max-w-[1200px] mx-auto space-y-12 font-inter text-textPrimary">
        
        {/* Welcome & Earnings Overview */}
        <div className="bg-brandBlue rounded-[40px] p-10 md:p-12 border-none shadow-premium-elevated flex flex-col md:flex-row justify-between items-center gap-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brandOrange/10 rounded-full blur-[140px] pointer-events-none"></div>
          
          <div className="relative z-10 flex-1">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className={`inline-flex items-center gap-2 font-jakarta font-extrabold text-[11px] px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest ${
                isVerifiedTrainer ? 'bg-brandOrange/20 text-brandOrange' : 'bg-white/10 text-white/60'
              }`}>
                {isVerifiedTrainer ? (
                  <><CheckCircle2 className="w-4 h-4" /> Professional Tier Certified</>
                ) : (
                  <><Clock className="w-4 h-4" /> Verification In Progress</>
                )}
              </div>
              <h2 className="font-jakarta font-extrabold text-[36px] md:text-[48px] text-white leading-[0.9] tracking-tighter italic mb-4">
                Welcome back, <br/>
                <span className="text-brandOrange underline decoration-white/10">{user?.name?.split(' ')[0] || 'Trainer'}</span>! 👋
              </h2>
              <p className="font-inter text-[17px] text-white/60 mt-4 max-w-lg font-medium">
                {isVerifiedTrainer 
                  ? "Your expert teaching is empowering students today. View your schedule below."
                  : "We are currently validating your engineering credentials. You will be live soon!"}
              </p>
            </motion.div>
          </div>
          
          <div className="relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 w-full md:w-[320px] shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <span className="font-jakarta font-extrabold text-[12px] text-white/40 uppercase tracking-widest">Available Payout</span>
              <div className="w-10 h-10 rounded-2xl bg-brandOrange/20 flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-brandOrange" />
              </div>
            </div>
            <div className="font-jakarta font-extrabold text-[40px] text-white flex items-baseline gap-2 tracking-tighter leading-none mb-8">
              ₹{trainerProfile?.pending_payout || 0}
            </div>
            <Button 
              disabled={!trainerProfile?.pending_payout}
              className="w-full btn-primary h-14 rounded-2xl text-[15px] shadow-premium-card"
            >
              Withdraw Funds
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="premium-card p-8 border-none shadow-premium-card hover:shadow-premium-elevated group transition-all"
            >
              <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center mb-6 ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div className="font-jakarta font-extrabold text-[32px] text-textPrimary tracking-tighter leading-none mb-1">{stat.value}</div>
              <div className="font-jakarta font-extrabold text-[11px] text-textPrimary/40 uppercase tracking-[0.2em]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          
          {/* Timeline Schedule (Left 2/3) */}
          <div className="xl:col-span-2 space-y-8">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-jakarta font-extrabold text-[20px] text-textPrimary flex items-center gap-3 uppercase tracking-widest opacity-50">
                <Calendar className="w-5 h-5 text-brandOrange" /> Session Timeline
              </h3>
              <Link to="/trainer/schedule" className="text-brandOrange font-jakarta font-extrabold text-[14px] p-0 h-auto flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-widest">
                Full Calendar <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="premium-card p-10 relative border-none shadow-premium-card min-h-[300px] flex items-center justify-center overflow-hidden">
              {sessions.length > 0 ? (
                <div className="w-full">
                  <div className="absolute left-[59px] top-12 bottom-12 w-0.5 bg-offWhite"></div>
                  <div className="space-y-12">
                    {sessions.map((session, i) => (
                      <div key={i} className="flex gap-10 relative z-10">
                        <div className="w-5 h-5 rounded-full bg-brandOrange ring-[12px] ring-brandOrange/10 border-4 border-white mt-1.5 shadow-sm"></div>
                        <div className="flex-1">
                          <div className="font-jakarta font-extrabold text-[16px] text-brandOrange mb-3 tracking-widest uppercase italic">Upcoming</div>
                          <div className="bg-white border-2 border-brandOrange/10 rounded-[32px] p-8 shadow-sm">
                            <div className="font-jakarta font-extrabold text-[22px] text-textPrimary italic mb-1">{session.course_title}</div>
                            <div className="font-inter text-[14px] text-textSecondary font-medium">Session with Student ID: {session.student_id}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 bg-brandOrange/5 rounded-[32px] flex items-center justify-center mx-auto mb-6"
                  >
                    <Calendar className="w-10 h-10 text-brandOrange/40" />
                  </motion.div>
                  <h4 className="font-jakarta font-extrabold text-[20px] text-textPrimary mb-2 italic">Quiet Day Ahead?</h4>
                  <p className="font-inter text-[15px] text-textSecondary font-medium max-w-xs mx-auto mb-8 opacity-60">
                    No sessions scheduled for today. Why not update your resources or check demo requests?
                  </p>
                  <Button variant="outline" className="h-14 px-10 rounded-2xl border-brandOrange/20 text-brandOrange font-jakarta font-extrabold uppercase tracking-widest text-[12px] hover:bg-brandOrange/5">
                    Update Availability
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* New Demo Requests (Right 1/3) */}
          <div className="space-y-8">
            <h3 className="font-jakarta font-extrabold text-[20px] text-textPrimary flex items-center gap-3 uppercase tracking-widest opacity-50 px-2">
              <Sparkles className="w-5 h-5 text-brandOrange" /> Opportunity Hub
            </h3>

            <div className="premium-card p-8 border-none shadow-premium-elevated bg-white min-h-[400px] flex flex-col items-center justify-center">
              {demos.length > 0 ? (
                <div className="w-full space-y-6">
                  {demos.map((demo, i) => (
                    <div key={i} className="bg-offWhite rounded-[32px] p-6 border border-borderSubtle group hover:border-brandOrange/30 transition-all">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-brandOrange text-white rounded-2xl flex items-center justify-center font-jakarta font-extrabold text-[16px] shadow-lg">?</div>
                          <div>
                            <div className="font-jakarta font-extrabold text-[16px] text-textPrimary">New Demo Request</div>
                            <div className="font-inter text-[12px] text-textSecondary font-medium italic">Pending Approval</div>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full btn-primary h-12 rounded-xl text-[12px] uppercase tracking-widest font-jakarta font-extrabold">View Details</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-offWhite rounded-[24px] flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-textSecondary/20" />
                  </div>
                  <h4 className="font-jakarta font-extrabold text-[18px] text-textPrimary mb-2 italic">Ready for Growth?</h4>
                  <p className="font-inter text-[14px] text-textSecondary font-medium mb-8 opacity-60">
                    No new demo requests at the moment. High ratings attract more students!
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-28 flex flex-col items-center justify-center gap-3 border-borderSubtle text-textPrimary/60 hover:border-brandOrange hover:text-brandOrange rounded-[28px] bg-white transition-all shadow-premium-card hover:scale-105">
                      <MessageCircle className="w-6 h-6" />
                      <span className="font-jakarta font-extrabold text-[11px] uppercase tracking-widest">Inbox</span>
                    </Button>
                    <Button variant="outline" className="h-28 flex flex-col items-center justify-center gap-3 border-borderSubtle text-textPrimary/60 hover:border-brandOrange hover:text-brandOrange rounded-[28px] bg-white transition-all shadow-premium-card hover:scale-105">
                      <FileText className="w-6 h-6" />
                      <span className="font-jakarta font-extrabold text-[11px] uppercase tracking-widest">Files</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default TrainerDashboard;
