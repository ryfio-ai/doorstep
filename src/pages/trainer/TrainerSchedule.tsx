import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronLeft, ChevronRight, Plus, MapPin, Users, Info } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';

export const TrainerSchedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sessions, setSessions] = useState<any[]>([]); // Empty for fresh account

  return (
    <PageTransition>
      <div className="max-w-[1200px] mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="font-jakarta font-extrabold text-[32px] text-textPrimary tracking-tight italic">Teaching Schedule</h2>
            <p className="font-inter text-[16px] text-textSecondary font-medium opacity-60">Plan your sessions and manage availability.</p>
          </div>
          <Button className="btn-primary h-14 px-8 rounded-2xl shadow-premium-elevated font-jakarta font-extrabold uppercase tracking-widest text-[12px]">
            <Plus className="w-5 h-5 mr-2" /> Block Time Slot
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Mini Calendar / Stats */}
          <div className="xl:col-span-1 space-y-8">
            <div className="premium-card p-8 border-none shadow-premium-card">
              <div className="flex justify-between items-center mb-6">
                <span className="font-jakarta font-extrabold text-[14px] text-textPrimary italic">May 2026</span>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-offWhite rounded-xl transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                  <button className="p-2 hover:bg-offWhite rounded-xl transition-colors"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                  <div key={d} className="text-center text-[10px] font-jakarta font-extrabold text-textSecondary/40 uppercase tracking-widest">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(31)].map((_, i) => (
                  <div key={i} className={`h-10 flex items-center justify-center rounded-xl font-jakarta font-extrabold text-[13px] transition-all cursor-pointer ${
                    i + 1 === 16 ? 'bg-brandOrange text-white shadow-lg scale-110' : 'hover:bg-brandOrange/5 text-textPrimary/60'
                  }`}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-card p-8 bg-brandBlue border-none shadow-premium-card text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandOrange/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <Info className="w-8 h-8 text-brandOrange mb-6" />
              <h4 className="font-jakarta font-extrabold text-[18px] mb-2 italic leading-tight">Pro Tip</h4>
              <p className="font-inter text-[14px] text-white/60 font-medium leading-relaxed">
                Updating your availability 2 weeks in advance increases your profile visibility by 40%.
              </p>
            </div>
          </div>

          {/* Main Schedule View */}
          <div className="xl:col-span-3 space-y-6">
            <div className="premium-card p-12 border-none shadow-premium-card min-h-[600px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-brandOrange/10"></div>
              
              <div className="text-center max-w-sm">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-24 h-24 bg-brandOrange/5 rounded-[40px] flex items-center justify-center mx-auto mb-8"
                >
                  <Calendar className="w-12 h-12 text-brandOrange" />
                </motion.div>
                <h3 className="font-jakarta font-extrabold text-[24px] text-textPrimary mb-4 italic leading-tight">No Classes Yet</h3>
                <p className="font-inter text-[16px] text-textSecondary font-medium mb-10 opacity-60">
                  Your schedule is looking clean! Once students book demos or enroll, your sessions will appear here in chronological order.
                </p>
                <div className="flex flex-col gap-4">
                  <Button className="h-16 rounded-2xl bg-brandBlue text-white hover:bg-brandBlue/90 font-jakarta font-extrabold uppercase tracking-widest text-[13px] shadow-lg">
                    Check Demo Requests
                  </Button>
                  <Button variant="ghost" className="h-14 rounded-2xl text-brandOrange font-jakarta font-extrabold uppercase tracking-widest text-[12px] hover:bg-brandOrange/5">
                    Sync with Google Calendar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TrainerSchedule;
