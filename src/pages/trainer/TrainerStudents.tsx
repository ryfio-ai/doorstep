// src/pages/trainer/TrainerStudents.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, MessageCircle, UserPlus, Mail, GraduationCap } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';

export const TrainerStudents: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]); // Empty for fresh account
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <PageTransition>
      <div className="max-w-[1200px] mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="font-jakarta font-extrabold text-[32px] text-textPrimary tracking-tight italic">My Scholars</h2>
            <p className="font-inter text-[16px] text-textSecondary font-medium opacity-60">Manage your active students and their progress.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary/40" />
              <input 
                type="text" 
                placeholder="Search scholars..." 
                className="w-full h-14 pl-12 pr-6 bg-white border border-borderSubtle rounded-2xl font-inter text-[14px] focus:ring-4 focus:ring-brandOrange/5 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-14 px-6 rounded-2xl border-borderSubtle hover:bg-offWhite">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="premium-card p-12 border-none shadow-premium-card min-h-[500px] flex items-center justify-center relative overflow-hidden bg-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brandOrange/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
          
          <div className="text-center max-w-sm relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-24 h-24 bg-brandOrange/5 rounded-[40px] flex items-center justify-center mx-auto mb-8"
            >
              <Users className="w-12 h-12 text-brandOrange" />
            </motion.div>
            <h3 className="font-jakarta font-extrabold text-[24px] text-textPrimary mb-4 italic leading-tight">Your Classroom is Ready</h3>
            <p className="font-inter text-[16px] text-textSecondary font-medium mb-10 opacity-60 leading-relaxed">
              You haven't been assigned any students yet. This usually happens while we verify your background or after your first demo.
            </p>
            <div className="space-y-4">
              <div className="bg-offWhite p-6 rounded-3xl border border-borderSubtle flex items-start gap-4 text-left">
                <div className="w-10 h-10 bg-brandOrange/10 rounded-xl flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-brandOrange" />
                </div>
                <div>
                  <div className="font-jakarta font-extrabold text-[14px] text-textPrimary italic">Complete Your Profile</div>
                  <div className="font-inter text-[12px] text-textSecondary mt-1 leading-relaxed font-medium">Add certifications and projects to attract more students.</div>
                </div>
              </div>
              <Button className="w-full h-16 rounded-2xl bg-brandBlue text-white hover:bg-brandBlue/90 font-jakarta font-extrabold uppercase tracking-widest text-[13px] shadow-lg">
                View Onboarding Status
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TrainerStudents;
