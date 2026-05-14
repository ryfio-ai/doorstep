import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Package, ArrowRight } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';

const RoboticsAIPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="bg-white min-h-screen pt-32 pb-24 font-inter">
        
        {/* Header */}
        <div className="page-container mb-20 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-grotesk text-4xl md:text-6xl font-bold text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
            Build the Future with <br/>
            <span className="text-transparent bg-clip-text bg-orange-gradient">Hardware & AI</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-slate-500 max-w-2xl mx-auto">
            ThiranOli brings physical robotics kits to your doorstep. Learn coding by building actual robots that move, see, and react.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="page-container grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-slate-50 rounded-3xl p-10 border border-slate-200">
            <Cpu className="w-12 h-12 text-brandOrange mb-6" />
            <h2 className="font-grotesk text-3xl font-bold text-slate-900 mb-4">Arduino & IoT Labs</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Start with the basics of electronics. Wire sensors, program microcontrollers, and connect physical devices to the internet.
            </p>
            <ul className="space-y-3 mb-8">
              {['Smart Home Automation', 'Weather Stations', 'Bluetooth Cars'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-brandOrange" /> {item}
                </li>
              ))}
            </ul>
            <button className="text-brandOrange font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              Explore Kits <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-slate-900 text-white rounded-3xl p-10 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brandOrange/20 blur-[80px]"></div>
            <Zap className="w-12 h-12 text-brandOrange mb-6 relative z-10" />
            <h2 className="font-grotesk text-3xl font-bold text-white mb-4 relative z-10">Advanced AI Robotics</h2>
            <p className="text-slate-400 mb-8 leading-relaxed relative z-10">
              Combine Python and Computer Vision. Build robots that can recognize faces, follow lines, and navigate autonomously using Raspberry Pi.
            </p>
            <ul className="space-y-3 mb-8 relative z-10">
              {['Object Detection Drones', 'Autonomous Rovers', 'Voice-Controlled Bots'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-brandOrange" /> {item}
                </li>
              ))}
            </ul>
            <button className="text-brandOrange font-semibold flex items-center gap-2 hover:gap-3 transition-all relative z-10">
              Explore Advanced Courses <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
          
        </div>

        {/* Kit Delivery Banner */}
        <div className="page-container">
          <div className="bg-orange-50 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-brandOrange/20">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
                <Package className="w-10 h-10 text-brandOrange" />
              </div>
              <div>
                <h3 className="font-grotesk text-2xl font-bold text-slate-900 mb-2">Home Delivery Kits</h3>
                <p className="text-slate-600">All necessary hardware components are shipped directly to your home anywhere in Tamil Nadu.</p>
              </div>
            </div>
            <button className="shrink-0 px-8 py-4 bg-brandOrange hover:bg-orange-600 text-white rounded-xl font-grotesk font-bold shadow-lg shadow-brandOrange/30 transition-all">
              Order a Starter Kit
            </button>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default RoboticsAIPage;
