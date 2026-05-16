import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Calendar, 
  Clock, 
  User, 
  BookOpen, 
  CheckCircle2, 
  XCircle,
  MapPin,
  Phone,
  Search,
  Filter
} from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';

export const DemoManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'scheduled' | 'completed'>('pending');
  const demos: any[] = []; // Empty for fresh account

  return (
    <PageTransition>
      <div className="max-w-[1400px] mx-auto space-y-8 font-inter">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="font-jakarta font-extrabold text-[32px] text-textPrimary tracking-tight italic">Demo Request Pipeline</h1>
            <p className="font-inter text-[16px] text-textSecondary font-medium opacity-60">Triaging and scheduling trial sessions for potential students.</p>
          </div>
          <div className="flex bg-white p-2 rounded-[24px] shadow-sm border border-borderSubtle">
            {(['pending', 'scheduled', 'completed'] as const).map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-2xl font-jakarta font-extrabold text-[11px] uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-brandBlue text-white shadow-lg' : 'text-textSecondary hover:bg-offWhite'}`}
              >
                {tab} (0)
              </button>
            ))}
          </div>
        </div>

        <div className="premium-card p-12 border-none shadow-premium-card bg-white min-h-[600px] flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-brandOrange/10"></div>
          
          <div className="text-center max-w-sm relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-24 h-24 bg-brandOrange/5 rounded-[40px] flex items-center justify-center mx-auto mb-8"
            >
              <Bell className="w-12 h-12 text-brandOrange/20 animate-bounce" />
            </motion.div>
            <h4 className="font-jakarta font-extrabold text-[22px] text-textPrimary mb-4 italic">No Pending Requests</h4>
            <p className="font-inter text-[15px] text-textSecondary font-medium opacity-60 leading-relaxed mb-10">
              Your demo queue is currently clear. Incoming trial requests from the public landing page will appear here instantly.
            </p>
            <Button variant="outline" className="h-14 px-10 rounded-2xl border-brandOrange/20 text-brandOrange font-jakarta font-extrabold uppercase tracking-widest text-[11px] hover:bg-brandOrange/5">
              Check Website Traffic
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default DemoManagement;
