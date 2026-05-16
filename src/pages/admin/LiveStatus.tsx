import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  MapPin, 
  Users, 
  GraduationCap, 
  Circle, 
  ArrowUpRight,
  Globe,
  Zap,
  Clock
} from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';

export const LiveStatus: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'trainers'>('students');

  return (
    <PageTransition>
      <div className="max-w-[1600px] mx-auto space-y-8 font-inter pb-20">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="font-jakarta font-extrabold text-[36px] text-textPrimary tracking-tight italic leading-tight">Live Platform Pulse</h1>
            <p className="font-inter text-[16px] text-textSecondary font-medium opacity-60">Real-time monitoring of all active learners and mentors across India.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-borderSubtle shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[13px] font-jakarta font-extrabold text-textPrimary uppercase tracking-widest">Global Status: Active</span>
            </div>
          </div>
        </div>

        {/* Big India Map Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 premium-card p-10 bg-navy-darker border-none shadow-premium-card text-white relative overflow-hidden min-h-[700px] flex flex-col">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div>
                <h3 className="font-jakarta font-extrabold text-[24px] italic text-white mb-2">Live Deployment Map</h3>
                <p className="text-white/40 text-[14px] font-medium">Tracking technical education distribution in real-time.</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span className="text-[11px] font-jakarta font-extrabold uppercase tracking-widest text-white/60">Mentors</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-[11px] font-jakarta font-extrabold uppercase tracking-widest text-white/60">Students</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center py-10 relative">
              <div className="relative w-full max-w-[550px] opacity-40 grayscale brightness-200">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/India_location_map.svg" alt="India Map" className="w-full h-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]" />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                 {/* Chennai */}
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute bottom-[20%] right-[38%]">
                  <div className="w-4 h-4 bg-accent rounded-full animate-ping opacity-75 absolute -inset-2"></div>
                  <div className="w-4 h-4 bg-accent rounded-full border-4 border-navy-darker shadow-lg"></div>
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-navy-dark px-3 py-1 rounded-lg text-[10px] font-jakarta font-extrabold whitespace-nowrap border border-white/10">CHENNAI (42)</div>
                </motion.div>

                {/* Bangalore */}
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="absolute bottom-[25%] left-[45%]">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse absolute -inset-2"></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full border-2 border-navy-darker"></div>
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-navy-dark px-3 py-1 rounded-lg text-[10px] font-jakarta font-extrabold whitespace-nowrap border border-white/10">BANGALORE (28)</div>
                </motion.div>

                {/* Delhi */}
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }} className="absolute top-[25%] left-[42%]">
                  <div className="w-4 h-4 bg-accent rounded-full animate-ping opacity-75 absolute -inset-2"></div>
                  <div className="w-4 h-4 bg-accent rounded-full border-4 border-navy-darker shadow-lg"></div>
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-navy-dark px-3 py-1 rounded-lg text-[10px] font-jakarta font-extrabold whitespace-nowrap border border-white/10">DELHI (34)</div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="space-y-8 flex flex-col">
            <div className="premium-card p-8 bg-white border-none shadow-premium-card flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-jakarta font-extrabold text-[14px] text-textPrimary uppercase tracking-widest opacity-40 italic flex items-center gap-2">
                  <Activity className="w-4 h-4 text-brandOrange" /> Real-time Activity
                </h3>
                <div className="flex bg-offWhite p-1 rounded-xl">
                  <button onClick={() => setActiveTab('students')} className={`px-4 py-2 rounded-lg text-[11px] font-jakarta font-extrabold uppercase transition-all ${activeTab === 'students' ? 'bg-white shadow-sm text-brandOrange' : 'text-textSecondary opacity-60'}`}>Students</button>
                  <button onClick={() => setActiveTab('trainers')} className={`px-4 py-2 rounded-lg text-[11px] font-jakarta font-extrabold uppercase transition-all ${activeTab === 'trainers' ? 'bg-white shadow-sm text-brandBlue' : 'text-textSecondary opacity-60'}`}>Mentors</button>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                {activeTab === 'students' ? (
                  <>
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="p-5 bg-offWhite rounded-2xl border border-borderSubtle flex items-center justify-between group hover:border-brandOrange/30 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white font-jakarta font-extrabold text-[12px]">ON</div>
                          <div>
                            <div className="font-jakarta font-extrabold text-[14px] text-textPrimary leading-none mb-1 italic">Active Student #{i}</div>
                            <div className="text-[11px] text-textSecondary font-medium">Session in Progress</div>
                          </div>
                        </div>
                        <Circle className="w-2 h-2 text-green-500 fill-green-500 animate-pulse" />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {[1, 2].map((i) => (
                      <div key={i} className="p-5 bg-offWhite rounded-2xl border border-borderSubtle flex items-center justify-between group hover:border-brandBlue/30 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-brandBlue rounded-xl flex items-center justify-center text-white">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-jakarta font-extrabold text-[14px] text-textPrimary leading-none mb-1 italic">Mentor Master #{i}</div>
                            <div className="text-[11px] text-textSecondary font-medium">Live Class Active</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-green-500 font-jakarta font-extrabold text-[10px] bg-green-500/5 px-2 py-1 rounded-lg">LIVE</div>
                      </div>
                    ))}
                  </>
                )}
                
                <div className="pt-6 border-t border-borderSubtle mt-auto">
                   <div className="flex justify-between items-center">
                     <span className="text-[12px] font-jakarta font-extrabold text-textSecondary/40 uppercase tracking-widest italic">Total Live Sessions</span>
                     <span className="text-[18px] font-jakarta font-extrabold text-brandOrange">42</span>
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

export default LiveStatus;
