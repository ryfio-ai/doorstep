import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Camera, Shield, Bell, Globe, ChevronRight } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../context/AuthContext';

export const StudentProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <PageTransition>
      <div className="max-w-[1000px] mx-auto space-y-12 font-inter">
        <div className="flex flex-col space-y-4">
          <h1 className="font-jakarta text-[36px] md:text-[48px] font-extrabold text-textPrimary leading-none tracking-tighter italic">
            Profile <span className="text-brandOrange underline decoration-brandOrange/10">Settings</span>
          </h1>
          <p className="font-inter text-[18px] text-textSecondary font-medium opacity-60 italic">Manage your identity and learning preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12">
          {/* Left Column: Avatar & Quick Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-[48px] p-10 border border-borderSubtle shadow-premium-card text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandOrange/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brandOrange/10 transition-all"></div>
              
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-[40px] bg-brandBlue flex items-center justify-center text-[48px] font-jakarta font-extrabold text-white shadow-premium-elevated rotate-[-3deg] group-hover:rotate-0 transition-transform">
                  {user?.name?.[0] || 'S'}
                </div>
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-brandOrange rounded-2xl flex items-center justify-center text-white shadow-lg border-4 border-white hover:scale-110 transition-all">
                  <Camera size={18} />
                </button>
              </div>

              <h2 className="font-jakarta font-extrabold text-[24px] text-textPrimary italic leading-tight">{user?.name}</h2>
              <p className="text-[14px] font-jakarta font-extrabold text-brandOrange uppercase tracking-widest mt-2">Level 12 Expert</p>
              
              <div className="mt-8 pt-8 border-t border-borderSubtle/30 space-y-4">
                <div className="flex items-center justify-between text-[14px]">
                  <span className="text-textSecondary/40 font-jakarta font-extrabold uppercase tracking-widest text-[10px]">Member Since</span>
                  <span className="text-textPrimary font-bold italic">Oct 2025</span>
                </div>
                <div className="flex items-center justify-between text-[14px]">
                  <span className="text-textSecondary/40 font-jakarta font-extrabold uppercase tracking-widest text-[10px]">Courses Enrolled</span>
                  <span className="text-textPrimary font-bold italic">4 Active</span>
                </div>
              </div>
            </div>

            <div className="bg-brandBlue rounded-[40px] p-8 text-white shadow-premium-elevated relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandOrange/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <h4 className="font-jakarta font-extrabold text-[18px] italic mb-4 relative z-10">Security Status</h4>
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <Shield size={20} className="text-brandOrange" />
                  <div>
                    <div className="text-[13px] font-bold">Two-Factor Auth</div>
                    <div className="text-[11px] text-white/40">Enabled via Mobile</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Forms */}
          <div className="bg-white rounded-[48px] p-10 md:p-12 border border-borderSubtle shadow-premium-card space-y-12">
            <section className="space-y-8">
              <h3 className="font-jakarta font-extrabold text-[22px] text-textPrimary flex items-center gap-3 italic">
                <User className="text-brandOrange w-6 h-6" /> Personal Identity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-jakarta font-extrabold text-textSecondary/40 uppercase tracking-widest ml-4">Full Legal Name</label>
                  <input type="text" defaultValue={user?.name} className="w-full h-14 bg-offWhite border-none rounded-2xl px-6 font-bold text-textPrimary focus:ring-2 focus:ring-brandOrange transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-jakarta font-extrabold text-textSecondary/40 uppercase tracking-widest ml-4">Email Address</label>
                  <input type="email" defaultValue={user?.email} className="w-full h-14 bg-offWhite border-none rounded-2xl px-6 font-bold text-textPrimary focus:ring-2 focus:ring-brandOrange transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-jakarta font-extrabold text-textSecondary/40 uppercase tracking-widest ml-4">Phone Number</label>
                  <input type="tel" defaultValue="+91 98765 43210" className="w-full h-14 bg-offWhite border-none rounded-2xl px-6 font-bold text-textPrimary focus:ring-2 focus:ring-brandOrange transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-jakarta font-extrabold text-textSecondary/40 uppercase tracking-widest ml-4">Native Language</label>
                  <select className="w-full h-14 bg-offWhite border-none rounded-2xl px-6 font-bold text-textPrimary focus:ring-2 focus:ring-brandOrange transition-all appearance-none">
                    <option>Tamil</option>
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Telugu</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="space-y-8 pt-8 border-t border-borderSubtle/30">
              <h3 className="font-jakarta font-extrabold text-[22px] text-textPrimary flex items-center gap-3 italic">
                <Bell className="text-brandOrange w-6 h-6" /> Preferences
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'Class Reminders', desc: 'Get notified 30 mins before every session', icon: Bell },
                  { title: 'Learning Analytics', desc: 'Weekly reports sent to your email', icon: Globe },
                ].map((pref, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-offWhite rounded-[32px] group hover:bg-brandOrange/5 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-brandOrange shadow-sm group-hover:bg-brandOrange group-hover:text-white transition-all">
                        <pref.icon size={20} />
                      </div>
                      <div>
                        <div className="text-[15px] font-jakarta font-extrabold text-textPrimary italic">{pref.title}</div>
                        <div className="text-[12px] text-textSecondary opacity-60 font-medium">{pref.desc}</div>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-brandOrange/20 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-brandOrange rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="pt-8 flex justify-end">
              <Button className="btn-primary h-14 rounded-2xl px-12 text-[15px]">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
