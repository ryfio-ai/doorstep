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
      <div className="max-w-[1100px] mx-auto space-y-8">
        
        {/* Welcome & Earnings Overview */}
        <div className="bg-navy-dark rounded-2xl p-8 border border-navy-dark shadow-modal flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
          <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 flex-1">
            <div className={`inline-flex items-center gap-2 font-inter font-medium text-[11px] px-3 py-1 rounded-full mb-3 ${
              isVerifiedTrainer ? 'bg-success/20 text-success-light' : 'bg-orange-500/20 text-orange-400'
            }`}>
              {isVerifiedTrainer ? (
                <><CheckCircle2 className="w-3.5 h-3.5" /> Verified Profile</>
              ) : (
                <><Clock className="w-3.5 h-3.5" /> Pending Verification</>
              )}
            </div>
            <h2 className="font-poppins font-bold text-[28px] text-white leading-tight">
              Welcome back, {user?.name?.split(' ')[0] || 'Trainer'}! 👋
            </h2>
            <p className="font-inter text-[15px] text-white/70 mt-1">
              {isVerifiedTrainer 
                ? "You're all set! Check your schedule for upcoming classes."
                : "Our team is reviewing your profile. We'll notify you once you're verified."}
            </p>
          </div>
          
          <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 w-full md:w-[280px]">
            <div className="flex justify-between items-center mb-2">
              <span className="font-inter text-[13px] text-white/80">Pending Payout</span>
              <IndianRupee className="w-4 h-4 text-accent" />
            </div>
            <div className="font-poppins font-bold text-[32px] text-white flex items-baseline gap-2">
              ₹{trainerProfile?.pending_payout || 0}
              {trainerProfile?.pending_payout ? (
                <span className="font-inter font-medium text-[12px] text-success-light flex items-center bg-success/20 px-1.5 py-0.5 rounded">
                  <TrendingUp className="w-3 h-3 mr-0.5" /> +12%
                </span>
              ) : null}
            </div>
            <Button 
              disabled={!trainerProfile?.pending_payout}
              className="w-full mt-4 bg-accent hover:bg-accent-600 text-white font-poppins font-semibold text-[13px] h-10 rounded-lg"
            >
              Withdraw Funds
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Students', value: '14', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Classes this week', value: '8', icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-50' },
            { label: 'Total Hours', value: '124', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-50' },
            { label: 'Average Rating', value: '4.9', icon: TrendingUp, color: 'text-success', bg: 'bg-success/10' },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-hover transition-shadow">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="font-poppins font-bold text-[24px] text-primary">{stat.value}</div>
              <div className="font-inter text-[13px] text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Timeline Schedule (Left 2/3) */}
          <div className="xl:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-poppins font-bold text-[18px] text-primary flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" /> Today's Schedule
              </h3>
              <Button variant="outline" className="text-gray-600 border-gray-200 font-inter text-[13px] h-9">
                View Calendar
              </Button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 relative">
              {/* Vertical line connecting timeline */}
              <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-gray-100"></div>

              <div className="space-y-8">
                {/* Class 1 (Completed) */}
                <div className="flex gap-6 relative z-10">
                  <div className="w-4 h-4 rounded-full bg-success ring-4 ring-white mt-1"></div>
                  <div className="flex-1 opacity-60">
                    <div className="font-poppins font-bold text-[15px] text-primary">10:00 AM - 11:30 AM</div>
                    <div className="bg-gray-50 rounded-xl p-4 mt-2">
                      <div className="font-poppins font-semibold text-[14px] text-primary">Mathematics (10th Std)</div>
                      <div className="font-inter text-[13px] text-gray-500">Student: Aryan M.</div>
                      <div className="inline-flex items-center gap-1 mt-2 text-success font-inter font-medium text-[11px] bg-success/10 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3" /> Class Completed
                      </div>
                    </div>
                  </div>
                </div>

                {/* Class 2 (Upcoming/Current) */}
                <div className="flex gap-6 relative z-10">
                  <div className="w-4 h-4 rounded-full bg-accent ring-4 ring-white mt-1 shadow-[0_0_10px_rgba(244,120,32,0.5)]"></div>
                  <div className="flex-1">
                    <div className="font-poppins font-bold text-[15px] text-accent">04:00 PM - 05:00 PM</div>
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mt-2 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-poppins font-semibold text-[15px] text-primary">Python Programming</div>
                          <div className="font-inter text-[13px] text-gray-600 flex items-center gap-1 mt-1">
                            <Users className="w-3.5 h-3.5" /> Student: Arjun S.
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="h-8 text-[12px] border-orange-200 text-orange-600">
                            <MapPin className="w-3.5 h-3.5 mr-1" /> Nav
                          </Button>
                          <Button size="sm" className="bg-accent text-white h-8 text-[12px] px-3">Start Class</Button>
                        </div>
                      </div>
                      
                      {/* Safety Actions */}
                      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-orange-200/50">
                        <div className="flex-1">
                          <input 
                            type="text" 
                            placeholder="Enter 4-digit code" 
                            maxLength={4}
                            className="w-full h-8 bg-white border border-orange-200 rounded px-3 text-[12px] focus:ring-1 focus:ring-accent outline-none"
                          />
                        </div>
                        <Button size="sm" variant="ghost" className="h-8 text-destructive hover:bg-destructive/10">
                          <ShieldAlert className="w-4 h-4 mr-1" /> SOS
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 text-blue-600 hover:bg-blue-50">
                          <Camera className="w-4 h-4 mr-1" /> Selfie
                        </Button>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="font-inter text-[12px] text-gray-500">Flat 4B, Ruby Enclave, Anna Nagar West</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* New Demo Requests (Right 1/3) */}
          <div className="space-y-6">
            <h3 className="font-poppins font-bold text-[18px] text-primary flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" /> New Requests
            </h3>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
              
              {/* Request Item */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-[13px]">K</div>
                    <div>
                      <div className="font-poppins font-semibold text-[14px] text-primary">Karthik R.</div>
                      <div className="font-inter text-[11px] text-gray-500">2.4 km away (T Nagar)</div>
                    </div>
                  </div>
                  <span className="bg-accent/10 text-accent font-inter font-medium text-[10px] px-2 py-0.5 rounded uppercase">Demo</span>
                </div>
                
                <div className="font-inter text-[13px] text-gray-700 mb-3">
                  Requested: <span className="font-medium">Python Masterclass</span><br/>
                  Time: <span className="font-medium text-accent">Tomorrow, 6:00 PM</span>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1 bg-success hover:bg-success/90 text-white h-8 text-[12px] font-poppins">Accept</Button>
                  <Button variant="outline" className="flex-[0.5] h-8 border-gray-200 text-gray-500 hover:text-destructive hover:border-destructive"><span className="sr-only">Decline</span> X</Button>
                </div>
              </div>

            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 border-gray-200 text-gray-600 hover:border-accent hover:text-accent rounded-xl">
                <MessageCircle className="w-5 h-5" />
                <span className="font-inter font-medium text-[12px]">Messages</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 border-gray-200 text-gray-600 hover:border-accent hover:text-accent rounded-xl">
                <FileText className="w-5 h-5" />
                <span className="font-inter font-medium text-[12px]">Upload Notes</span>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default TrainerDashboard;
