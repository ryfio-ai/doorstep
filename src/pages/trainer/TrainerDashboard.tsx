import { Calendar, IndianRupee, Users, TrendingUp, Clock, CheckCircle2, ChevronRight, MessageCircle, MapPin, FileText, Camera, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';

export const TrainerDashboard: React.FC = () => {
  const { user, trainerProfile, isVerifiedTrainer } = useAuth();

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
              {trainerProfile?.pending_payout ? (
                <span className="font-jakarta font-extrabold text-[12px] text-brandOrange flex items-center bg-brandOrange/10 px-2 py-1 rounded-full border border-brandOrange/20">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" /> +12%
                </span>
              ) : null}
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
          {[
            { label: 'Active Students', value: '14', icon: Users, color: 'text-brandOrange', bg: 'bg-brandOrange/5' },
            { label: 'Classes this week', value: '08', icon: Calendar, color: 'text-brandOrange', bg: 'bg-brandOrange/5' },
            { label: 'Total Hours', value: '124', icon: Clock, color: 'text-brandOrange', bg: 'bg-brandOrange/5' },
            { label: 'Expert Rating', value: '4.9', icon: Star, color: 'text-amberGold', bg: 'bg-amberGold/5' },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
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
              <Button variant="link" className="text-brandOrange font-jakarta font-extrabold text-[14px] p-0 h-auto flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-widest">
                Full Calendar <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="premium-card p-10 relative border-none shadow-premium-card">
              {/* Vertical line connecting timeline */}
              <div className="absolute left-[59px] top-12 bottom-12 w-0.5 bg-offWhite"></div>

              <div className="space-y-12">
                {/* Class 1 (Completed) */}
                <div className="flex gap-10 relative z-10">
                  <div className="w-5 h-5 rounded-full bg-brandOrange/20 border-4 border-white mt-1.5 shadow-sm"></div>
                  <div className="flex-1 opacity-40 grayscale-[0.5]">
                    <div className="font-jakarta font-extrabold text-[16px] text-textPrimary mb-3 tracking-widest uppercase">10:00 AM — 11:30 AM</div>
                    <div className="bg-offWhite rounded-[28px] p-6 border border-borderSubtle">
                      <div className="font-jakarta font-extrabold text-[18px] text-textPrimary italic">Advanced Mathematics (10th Std)</div>
                      <div className="font-inter text-[14px] text-textSecondary font-medium mt-1">Student: Aryan M. • Anna Nagar</div>
                      <div className="inline-flex items-center gap-2 mt-4 text-brandOrange font-jakarta font-extrabold text-[11px] bg-brandOrange/5 px-3 py-1 rounded-full uppercase tracking-widest border border-brandOrange/10">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Session Logged
                      </div>
                    </div>
                  </div>
                </div>

                {/* Class 2 (Upcoming/Current) */}
                <div className="flex gap-10 relative z-10">
                  <div className="w-5 h-5 rounded-full bg-brandOrange ring-[12px] ring-brandOrange/10 border-4 border-white mt-1.5 shadow-[0_0_30px_rgba(234,88,12,0.4)]"></div>
                  <div className="flex-1">
                    <div className="font-jakarta font-extrabold text-[16px] text-brandOrange mb-3 tracking-widest uppercase">04:00 PM — 05:00 PM</div>
                    <div className="bg-white border-2 border-brandOrange/20 rounded-[32px] p-8 shadow-premium-elevated relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brandOrange/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                      
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <div>
                          <div className="font-jakarta font-extrabold text-[22px] text-textPrimary italic mb-1">Physical Computing & Python</div>
                          <div className="font-inter text-[14px] text-textSecondary font-medium flex items-center gap-2">
                            <Users className="w-4 h-4 text-brandOrange" /> Engineering Scholar: Arjun S.
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button size="sm" variant="outline" className="h-12 px-6 rounded-xl border-borderSubtle text-textPrimary font-jakarta font-extrabold text-[12px] uppercase tracking-widest hover:bg-offWhite">
                            <MapPin className="w-4 h-4 mr-2 text-brandOrange" /> View Map
                          </Button>
                          <Button size="sm" className="btn-primary h-12 px-8 rounded-xl font-jakarta font-extrabold text-[12px] uppercase tracking-widest shadow-premium-card">
                            Initiate Class
                          </Button>
                        </div>
                      </div>
                      
                      {/* Safety Actions */}
                      <div className="flex flex-col md:flex-row items-center gap-4 pt-8 border-t border-offWhite">
                        <div className="flex-1 w-full">
                          <input 
                            type="text" 
                            placeholder="Student Verification Code" 
                            maxLength={6}
                            className="w-full h-14 bg-offWhite border border-borderSubtle rounded-2xl px-6 text-[15px] font-jakarta font-extrabold text-center tracking-[0.5em] focus:ring-4 focus:ring-brandOrange/5 outline-none transition-all placeholder:tracking-normal placeholder:font-medium"
                          />
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                          <Button size="lg" variant="ghost" className="h-14 flex-1 rounded-2xl text-brandBlue hover:bg-brandBlue/5 font-jakarta font-extrabold text-[13px] uppercase tracking-widest border border-brandBlue/10">
                            <Camera className="w-5 h-5 mr-3" /> Check-in
                          </Button>
                          <Button size="lg" className="h-14 flex-1 rounded-2xl bg-destructive hover:bg-destructive/90 text-white font-jakarta font-extrabold text-[13px] uppercase tracking-widest shadow-lg shadow-destructive/20">
                            <ShieldAlert className="w-5 h-5 mr-3" /> SOS Help
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-6 p-4 bg-brandOrange/5 rounded-2xl border border-brandOrange/10">
                        <MapPin className="w-5 h-5 text-brandOrange" />
                        <span className="font-inter text-[14px] text-textPrimary font-medium italic">Flat 4B, Ruby Enclave, Anna Nagar West, Chennai - 600040</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* New Demo Requests (Right 1/3) */}
          <div className="space-y-8">
            <h3 className="font-jakarta font-extrabold text-[20px] text-textPrimary flex items-center gap-3 uppercase tracking-widest opacity-50 px-2">
              <Users className="w-5 h-5 text-brandOrange" /> Opportunity Hub
            </h3>

            <div className="premium-card p-8 border-none shadow-premium-elevated bg-white space-y-6">
              
              {/* Request Item */}
              <div className="bg-offWhite rounded-[32px] p-6 border border-borderSubtle group hover:border-brandOrange/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brandOrange text-white rounded-2xl flex items-center justify-center font-jakarta font-extrabold text-[16px] shadow-lg rotate-3 group-hover:rotate-0 transition-transform">K</div>
                    <div>
                      <div className="font-jakarta font-extrabold text-[16px] text-textPrimary">Karthik R.</div>
                      <div className="font-inter text-[12px] text-textSecondary font-medium">2.4 km away • T Nagar</div>
                    </div>
                  </div>
                  <span className="bg-brandOrange/10 text-brandOrange font-jakarta font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest border border-brandOrange/10">New Demo</span>
                </div>
                
                <div className="font-inter text-[14px] text-textSecondary mb-6 font-medium leading-relaxed italic">
                  Requested: <span className="text-textPrimary font-bold">Python Masterclass</span><br/>
                  Time Slot: <span className="text-brandOrange font-bold">Tomorrow, 6:00 PM</span>
                </div>
                
                <div className="flex gap-3">
                  <Button className="flex-1 btn-primary h-12 rounded-xl text-[12px] uppercase tracking-widest font-jakarta font-extrabold">Accept</Button>
                  <Button variant="outline" className="w-12 h-12 rounded-xl border-borderSubtle text-textPrimary/40 hover:text-destructive hover:border-destructive transition-colors">X</Button>
                </div>
              </div>

            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-28 flex flex-col items-center justify-center gap-3 border-borderSubtle text-textPrimary/60 hover:border-brandOrange hover:text-brandOrange rounded-[28px] bg-white transition-all shadow-premium-card hover:shadow-premium-elevated hover:scale-105">
                <MessageCircle className="w-6 h-6" />
                <span className="font-jakarta font-extrabold text-[11px] uppercase tracking-widest">Messages</span>
              </Button>
              <Button variant="outline" className="h-28 flex flex-col items-center justify-center gap-3 border-borderSubtle text-textPrimary/60 hover:border-brandOrange hover:text-brandOrange rounded-[28px] bg-white transition-all shadow-premium-card hover:shadow-premium-elevated hover:scale-105">
                <FileText className="w-6 h-6" />
                <span className="font-jakarta font-extrabold text-[11px] uppercase tracking-widest">Resources</span>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default TrainerDashboard;
