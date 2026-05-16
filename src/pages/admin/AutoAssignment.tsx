import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Search, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Users, 
  GraduationCap, 
  ArrowRight,
  Filter,
  ShieldCheck,
  BrainCircuit
} from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';

export const AutoAssignment: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);

  return (
    <PageTransition>
      <div className="max-w-[1400px] mx-auto space-y-8 font-inter">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="font-jakarta font-extrabold text-[32px] text-textPrimary tracking-tight italic">Intelligence Matching</h1>
            <p className="font-inter text-[16px] text-textSecondary font-medium opacity-60">AI-driven assignment of trainers to students based on location, availability and expertise.</p>
          </div>
          <Button 
            onClick={() => {
              setIsScanning(true);
              setTimeout(() => setIsScanning(false), 3000);
            }}
            disabled={isScanning}
            className="btn-primary h-16 px-10 rounded-2xl font-jakarta font-extrabold uppercase tracking-widest text-[13px] shadow-premium-card group overflow-hidden"
          >
            <Zap className={`w-5 h-5 mr-2 transition-transform duration-500 ${isScanning ? 'animate-ping' : 'group-hover:scale-125'}`} />
            {isScanning ? 'Scanning Network...' : 'Run Auto-Assignment'}
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Logic View */}
          <div className="xl:col-span-2 space-y-8">
            <div className="premium-card p-12 border-none shadow-premium-card bg-white min-h-[600px] flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-brandOrange/10"></div>
              
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <BrainCircuit className="w-6 h-6 text-brandOrange" />
                  <h3 className="font-jakarta font-extrabold text-[20px] text-textPrimary uppercase tracking-widest opacity-50 italic">Assignment Queue</h3>
                </div>
                <div className="flex gap-2">
                  <span className="px-4 py-1.5 bg-offWhite rounded-full border border-borderSubtle text-[11px] font-jakarta font-extrabold text-textSecondary uppercase tracking-widest">Unassigned: 0</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
                <motion.div 
                  animate={isScanning ? { rotate: 360 } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-24 h-24 bg-brandOrange/5 rounded-[40px] flex items-center justify-center mb-8"
                >
                  <Search className="w-12 h-12 text-brandOrange/20" />
                </motion.div>
                <h4 className="font-jakarta font-extrabold text-[22px] text-textPrimary mb-4 italic">System Synchronized</h4>
                <p className="font-inter text-[15px] text-textSecondary font-medium opacity-60 leading-relaxed mb-10">
                  All active students are currently matched with suitable trainers. No pending assignments require intervention.
                </p>
                <div className="p-6 bg-offWhite rounded-[32px] border border-borderSubtle w-full">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[12px] font-jakarta font-extrabold text-textSecondary/40 uppercase tracking-widest">Matching Algorithm</span>
                    <span className="text-[12px] font-jakarta font-extrabold text-green-500 italic">Optimized</span>
                  </div>
                  <div className="flex -space-x-3 overflow-hidden justify-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="inline-block h-10 w-10 rounded-full ring-4 ring-white bg-brandOrange/10 border border-brandOrange/20 flex items-center justify-center text-[10px] font-bold text-brandOrange uppercase">
                        AI
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Config & Filters */}
          <div className="space-y-8">
            <div className="premium-card p-8 bg-brandBlue border-none shadow-premium-card text-white">
              <h3 className="font-jakarta font-extrabold text-[14px] text-white/40 uppercase tracking-widest italic mb-8">Optimization Rules</h3>
              <div className="space-y-6">
                {[
                  { label: 'Proximity Filter', value: '5km Radius', active: true },
                  { label: 'Expertise Match', value: 'High Precision', active: true },
                  { label: 'Time Sync', value: 'Enabled', active: true },
                  { label: 'Load Balancing', value: '2 Classes/Day', active: true }
                ].map((rule, i) => (
                  <div key={i} className="flex justify-between items-center pb-4 border-b border-white/5 last:border-none">
                    <div>
                      <div className="text-[14px] font-jakarta font-extrabold italic leading-none">{rule.label}</div>
                      <div className="text-[11px] text-white/40 font-medium mt-1">{rule.value}</div>
                    </div>
                    <div className="w-10 h-6 bg-accent rounded-full p-1 relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-card p-8 bg-white border-none shadow-premium-card space-y-6">
              <h3 className="font-jakarta font-extrabold text-[14px] text-textPrimary uppercase tracking-widest opacity-40 italic flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brandOrange" /> Manual Overrides
              </h3>
              <p className="text-[13px] text-textSecondary font-medium leading-relaxed">
                If the intelligence engine fails to find a perfect match, you can manually link a student to any available trainer.
              </p>
              <Button variant="outline" className="w-full h-14 rounded-2xl border-borderSubtle text-[11px] font-jakarta font-extrabold uppercase tracking-widest text-textPrimary">
                Open Link Manager
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AutoAssignment;
