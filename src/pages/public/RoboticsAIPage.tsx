import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Package, ArrowRight } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';

const RoboticsAIPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="bg-white min-h-screen pt-40 pb-24 font-inter text-textPrimary">
        
        {/* Header */}
        <div className="page-container mb-24 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brandOrange/5 border border-brandOrange/10 mb-8 shadow-sm">
            <Cpu className="w-4 h-4 text-brandOrange" />
            <span className="text-[13px] font-jakarta font-extrabold text-brandOrange tracking-widest uppercase">Hands-on Technology</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-jakarta text-[48px] md:text-[80px] font-extrabold text-textPrimary mb-8 leading-[0.9] tracking-tighter">
            Build the Future with <br/>
            <span className="text-transparent bg-clip-text bg-orange-gradient italic underline decoration-brandOrange/10">Hardware & AI</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[20px] text-textSecondary max-w-3xl mx-auto leading-relaxed">
            ThiranOli brings physical robotics kits to your doorstep. Learn coding by building actual robots that move, see, and react in the real world.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="page-container grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="premium-card p-12">
            <div className="w-16 h-16 rounded-3xl bg-brandOrange/5 flex items-center justify-center mb-8">
              <Cpu className="w-8 h-8 text-brandOrange" />
            </div>
            <h2 className="font-jakarta text-[32px] font-extrabold text-textPrimary mb-6">Arduino & IoT Labs</h2>
            <p className="text-textSecondary text-[18px] mb-8 leading-relaxed">
              Start with the basics of electronics. Wire sensors, program microcontrollers, and connect physical devices to the internet.
            </p>
            <ul className="space-y-4 mb-10">
              {['Smart Home Automation', 'Weather Stations', 'Bluetooth Cars'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-textPrimary font-bold">
                  <div className="w-2 h-2 rounded-full bg-brandOrange" /> {item}
                </li>
              ))}
            </ul>
            <button className="text-brandOrange font-jakarta font-extrabold flex items-center gap-2 hover:gap-4 transition-all">
              Explore Kits <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-[40px] p-12 bg-brandBlue text-white shadow-premium-elevated relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brandOrange/20 blur-[120px] pointer-events-none"></div>
            <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 relative z-10">
              <Zap className="w-8 h-8 text-brandOrange" />
            </div>
            <h2 className="font-jakarta text-[32px] font-extrabold text-white mb-6 relative z-10">Advanced AI Robotics</h2>
            <p className="text-white/60 text-[18px] mb-8 leading-relaxed relative z-10">
              Combine Python and Computer Vision. Build robots that can recognize faces, follow lines, and navigate autonomously using Raspberry Pi.
            </p>
            <ul className="space-y-4 mb-10 relative z-10">
              {['Object Detection Drones', 'Autonomous Rovers', 'Voice-Controlled Bots'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-white/80 font-bold">
                  <div className="w-2 h-2 rounded-full bg-brandOrange" /> {item}
                </li>
              ))}
            </ul>
            <button className="text-brandOrange font-jakarta font-extrabold flex items-center gap-2 hover:gap-4 transition-all relative z-10">
              Explore Advanced Courses <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
          
        </div>

        {/* Kit Delivery Banner */}
        <div className="page-container">
          <div className="bg-offWhite rounded-[40px] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 border border-borderSubtle">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="w-24 h-24 bg-white rounded-3xl shadow-premium-card flex items-center justify-center shrink-0 border border-borderSubtle">
                <Package className="w-12 h-12 text-brandOrange" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-jakarta text-[28px] md:text-[32px] font-extrabold text-textPrimary mb-4 leading-tight">Home Delivery Kits</h3>
                <p className="text-textSecondary text-[18px] max-w-xl">All necessary hardware components are shipped directly to your home anywhere in Tamil Nadu.</p>
              </div>
            </div>
            <button className="btn-primary h-16 px-12 text-[18px] shrink-0">
              Order Starter Kit
            </button>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default RoboticsAIPage;
