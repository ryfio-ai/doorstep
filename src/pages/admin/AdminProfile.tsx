import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  ShieldCheck, 
  Mail, 
  Lock, 
  Bell, 
  Activity, 
  Globe, 
  Smartphone,
  ChevronRight,
  Camera
} from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';

export const AdminProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <PageTransition>
      <div className="max-w-[1200px] mx-auto space-y-8 font-inter pb-20">
        
        {/* Profile Header */}
        <div className="relative h-[240px] bg-brandBlue rounded-[40px] overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-brandBlue to-navy-dark opacity-90"></div>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brandOrange/10 rounded-full blur-[100px] -mr-20 -mt-20"></div>
          
          <div className="absolute -bottom-16 left-12 flex items-end gap-8">
            <div className="relative group">
              <div className="w-40 h-40 rounded-[48px] bg-white border-[6px] border-offWhite shadow-2xl flex items-center justify-center overflow-hidden">
                <User className="w-20 h-20 text-brandBlue/20" />
              </div>
              <button className="absolute bottom-2 right-2 w-10 h-10 bg-brandOrange text-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-20">
              <h1 className="font-jakarta font-extrabold text-[36px] text-white italic leading-tight capitalize">{user?.name || 'Admin'}</h1>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/10 w-fit backdrop-blur-md mt-3">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span className="text-[10px] font-jakarta font-extrabold text-white uppercase tracking-[0.2em]">Platform Architect</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="premium-card p-10 bg-white border-none shadow-premium-card space-y-10">
              <div className="flex justify-between items-center">
                <h3 className="font-jakarta font-extrabold text-[20px] text-textPrimary italic uppercase tracking-widest opacity-40">Account Details</h3>
                <Button variant="outline" className="h-10 px-6 rounded-xl border-borderSubtle text-[11px] font-jakarta font-extrabold uppercase tracking-widest">Edit Profile</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-jakarta font-extrabold text-textSecondary/40 uppercase tracking-widest">Full Name</label>
                  <div className="flex items-center gap-3 p-4 bg-offWhite rounded-2xl border border-borderSubtle">
                    <User className="w-5 h-5 text-brandOrange" />
                    <span className="font-inter font-bold text-textPrimary">{user?.name || 'Super Admin'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-jakarta font-extrabold text-textSecondary/40 uppercase tracking-widest">Access Email</label>
                  <div className="flex items-center gap-3 p-4 bg-offWhite rounded-2xl border border-borderSubtle">
                    <Mail className="w-5 h-5 text-brandOrange" />
                    <span className="font-inter font-bold text-textPrimary">{user?.email}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-borderSubtle">
                <div className="flex justify-between items-center group cursor-pointer p-4 hover:bg-offWhite rounded-2xl transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brandOrange/5 rounded-2xl flex items-center justify-center">
                      <Lock className="w-6 h-6 text-brandOrange" />
                    </div>
                    <div>
                      <div className="font-jakarta font-extrabold text-[15px] text-textPrimary italic">Security & Credentials</div>
                      <div className="text-[12px] text-textSecondary font-medium opacity-60">Manage 2FA and administrative passwords</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-textSecondary/20 group-hover:text-brandOrange transition-all" />
                </div>
              </div>
            </div>

            {/* Access Logs */}
            <div className="premium-card p-10 bg-white border-none shadow-premium-card">
               <h3 className="font-jakarta font-extrabold text-[20px] text-textPrimary italic uppercase tracking-widest opacity-40 mb-10">System Access Logs</h3>
               <div className="space-y-4">
                 {[
                   { event: 'Console Login', location: 'Chennai, IN', time: 'Just now', icon: Globe },
                   { event: 'Configuration Update', location: 'Dashboard', time: '2h ago', icon: Activity },
                   { event: 'Session Refresh', location: 'Mobile Device', time: 'Yesterday', icon: Smartphone },
                 ].map((log, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-offWhite rounded-2xl border border-borderSubtle">
                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                         <log.icon className="w-5 h-5 text-textPrimary/20" />
                       </div>
                       <div>
                         <div className="font-jakarta font-extrabold text-[14px] text-textPrimary">{log.event}</div>
                         <div className="text-[11px] text-textSecondary font-medium opacity-60">{log.location}</div>
                       </div>
                     </div>
                     <span className="text-[11px] font-jakarta font-extrabold text-textSecondary/30">{log.time}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-8">
            <div className="premium-card p-8 bg-brandBlue border-none shadow-premium-card text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
              <h3 className="font-jakarta font-extrabold text-[14px] text-white/40 uppercase tracking-widest italic mb-8">Role Capabilities</h3>
              <div className="space-y-4">
                {['Global Access', 'DB Modification', 'Trainer Verification', 'Financial Control'].map((cap, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span className="font-jakarta font-extrabold text-[13px] italic">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-card p-8 bg-white border-none shadow-premium-card">
              <h3 className="font-jakarta font-extrabold text-[14px] text-textPrimary uppercase tracking-widest opacity-40 italic mb-8 flex items-center gap-2">
                <Bell className="w-4 h-4 text-brandOrange" /> Admin Notifications
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-jakarta font-extrabold italic text-textPrimary">System Alerts</span>
                  <div className="w-10 h-6 bg-brandOrange rounded-full p-1 flex justify-end">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-jakarta font-extrabold italic text-textPrimary">Payout Requests</span>
                  <div className="w-10 h-6 bg-brandOrange rounded-full p-1 flex justify-end">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};
