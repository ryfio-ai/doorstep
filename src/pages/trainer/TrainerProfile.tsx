// src/pages/trainer/TrainerProfile.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Bell, Shield, Camera, Edit3, Globe, Award, BookOpen, GraduationCap, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../context/AuthContext';

export const TrainerProfile: React.FC = () => {
  const { user, trainerProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');

  return (
    <PageTransition>
      <div className="max-w-[1200px] mx-auto space-y-8 font-inter">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
          <div className="flex items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[40px] bg-brandOrange flex items-center justify-center font-jakarta font-extrabold text-[48px] text-white shadow-premium-elevated rotate-3 group-hover:rotate-0 transition-transform duration-500">
                {user?.name?.charAt(0) || 'T'}
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl shadow-xl flex items-center justify-center text-brandOrange border border-offWhite hover:scale-110 transition-transform">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <div>
              <h2 className="font-jakarta font-extrabold text-[32px] text-textPrimary tracking-tight italic leading-tight">{user?.name || 'ThiranOli Trainer'}</h2>
              <p className="font-inter text-[16px] text-textSecondary font-medium opacity-60 flex items-center gap-2">
                <Award className="w-4 h-4 text-brandOrange" /> Level 1 Engineering Mentor
              </p>
              <div className="flex gap-4 mt-4">
                <span className="bg-brandOrange/10 text-brandOrange font-jakarta font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest border border-brandOrange/10 italic">Professional</span>
                <span className="bg-green-500/10 text-green-500 font-jakarta font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest border border-green-500/10 italic">Verified</span>
              </div>
            </div>
          </div>
          <Button className="btn-primary h-14 px-10 rounded-2xl font-jakarta font-extrabold uppercase tracking-widest text-[12px] shadow-premium-card">
            Edit My Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column: Contact & Verification */}
          <div className="space-y-8">
            <div className="premium-card p-8 border-none shadow-premium-card space-y-6">
              <h3 className="font-jakarta font-extrabold text-[14px] text-textPrimary uppercase tracking-widest opacity-40 italic">Contact Intelligence</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-offWhite rounded-2xl border border-borderSubtle group hover:border-brandOrange/30 transition-all">
                  <Mail className="w-5 h-5 text-brandOrange" />
                  <div>
                    <div className="text-[10px] text-textSecondary/40 font-jakarta font-extrabold uppercase tracking-widest">Email Address</div>
                    <div className="text-[14px] text-textPrimary font-bold">{user?.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-offWhite rounded-2xl border border-borderSubtle group hover:border-brandOrange/30 transition-all">
                  <Phone className="w-5 h-5 text-brandOrange" />
                  <div>
                    <div className="text-[10px] text-textSecondary/40 font-jakarta font-extrabold uppercase tracking-widest">Phone Number</div>
                    <div className="text-[14px] text-textPrimary font-bold">{trainerProfile?.phone || '+91 98765 43210'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification & KYC Section */}
            <div className="premium-card p-8 border-none shadow-premium-card space-y-6 bg-white">
              <h3 className="font-jakarta font-extrabold text-[14px] text-textPrimary uppercase tracking-widest opacity-40 italic">Verification & KYC</h3>
              <div className="space-y-3">
                {[
                  { label: 'Aadhaar Card', status: 'verified', icon: Shield },
                  { label: 'PAN Card', status: 'verified', icon: Shield },
                  { label: 'Voter ID', status: 'pending', icon: Clock }
                ].map((kyc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-offWhite rounded-2xl border border-borderSubtle">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${kyc.status === 'verified' ? 'bg-green-500/10 text-green-500' : 'bg-brandOrange/10 text-brandOrange'}`}>
                        <kyc.icon className="w-4 h-4" />
                      </div>
                      <span className="font-jakarta font-extrabold text-[13px] text-textPrimary">{kyc.label}</span>
                    </div>
                    <span className={`text-[10px] font-jakarta font-extrabold uppercase tracking-widest ${kyc.status === 'verified' ? 'text-green-500' : 'text-brandOrange'}`}>
                      {kyc.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full h-12 rounded-xl border-brandOrange/20 text-brandOrange font-jakarta font-extrabold uppercase tracking-widest text-[10px]">
                Update KYC Documents
              </Button>
            </div>

            <div className="premium-card p-8 bg-brandBlue border-none shadow-premium-card text-white">
              <h3 className="font-jakarta font-extrabold text-[14px] text-white/40 uppercase tracking-widest italic mb-6">Expertise Stack</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Robotics', 'Embedded C', 'IoT', '3D Printing'].map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-white/10 rounded-xl text-[12px] font-bold border border-white/5">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Academic Background */}
          <div className="xl:col-span-2 space-y-8">
            {/* Bio Card */}
            <div className="premium-card p-10 border-none shadow-premium-card min-h-[300px] flex items-center justify-center relative overflow-hidden bg-white">
              <div className="absolute top-0 left-0 w-full h-2 bg-brandOrange/10"></div>
              <div className="text-center max-w-sm">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-16 h-16 bg-brandOrange/5 rounded-[24px] flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-brandOrange" />
                </motion.div>
                <h3 className="font-jakarta font-extrabold text-[20px] text-textPrimary mb-3 italic">Professional Bio</h3>
                <p className="font-inter text-[14px] text-textSecondary font-medium mb-8 opacity-60 leading-relaxed">
                  Tell your story as an engineer and mentor. A strong bio builds instant trust with parents.
                </p>
                <Button className="h-14 rounded-2xl bg-brandBlue text-white hover:bg-brandBlue/90 font-jakarta font-extrabold uppercase tracking-widest text-[11px] shadow-lg px-10">
                  Write My Story
                </Button>
              </div>
            </div>

            {/* Academic Background Card */}
            <div className="premium-card p-10 border-none shadow-premium-card bg-white relative overflow-hidden">
              <h3 className="font-jakarta font-extrabold text-[14px] text-textPrimary uppercase tracking-widest opacity-40 italic mb-8">Academic Background</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-offWhite rounded-[32px] border border-borderSubtle relative group hover:border-brandOrange/30 transition-all">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-brandOrange" />
                  </div>
                  <div className="text-[10px] text-textSecondary/40 font-jakarta font-extrabold uppercase tracking-widest mb-1">College / University</div>
                  <div className="font-jakarta font-extrabold text-[16px] text-textPrimary italic">Add Degree Details</div>
                  <div className="font-inter text-[12px] text-textSecondary font-medium mt-1">B.E / B.Tech / M.Tech</div>
                  <button className="absolute top-6 right-6 p-2 text-textSecondary/20 hover:text-brandOrange transition-colors"><Edit3 className="w-4 h-4" /></button>
                </div>

                <div className="p-6 bg-offWhite rounded-[32px] border border-borderSubtle relative group hover:border-brandOrange/30 transition-all">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6 text-brandOrange" />
                  </div>
                  <div className="text-[10px] text-textSecondary/40 font-jakarta font-extrabold uppercase tracking-widest mb-1">School / Higher Secondary</div>
                  <div className="font-jakarta font-extrabold text-[16px] text-textPrimary italic">Add School Details</div>
                  <div className="font-inter text-[12px] text-textSecondary font-medium mt-1">10th / 12th Standard</div>
                  <button className="absolute top-6 right-6 p-2 text-textSecondary/20 hover:text-brandOrange transition-colors"><Edit3 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TrainerProfile;
