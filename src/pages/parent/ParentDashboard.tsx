// src/pages/parent/ParentDashboard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ShieldCheck, CreditCard, ChevronRight, Bell, Calendar } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import WeeklyReport from '../../components/student/WeeklyReport';

const ParentDashboard: React.FC = () => {
  return (
    <PageTransition>
      <div className="max-w-[1100px] mx-auto space-y-8 pb-20">
        
        {/* Live Status Header */}
        <div className="bg-success/10 border border-success/20 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center relative">
              <span className="text-3xl animate-pulse">🧒</span>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success border-2 border-white rounded-full" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary font-poppins">Arjun is in Class</h2>
              <p className="text-sm text-success font-medium flex items-center gap-1">
                 <Clock size={14} /> Started 45 mins ago • Live Tracking Active
              </p>
            </div>
          </div>
          <div className="flex gap-3">
             <button className="bg-white text-primary border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2 hover:bg-gray-50">
               <MapPin size={16} className="text-accent" /> Track Live
             </button>
             <button className="bg-success text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2">
               <ShieldCheck size={16} /> Mark Safe
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group cursor-pointer hover:border-accent transition-all">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                     <CreditCard size={24} />
                   </div>
                   <div>
                     <h4 className="font-bold text-primary">Pending Fees</h4>
                     <p className="text-xs text-gray-500">Next due: Feb 05</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <div className="font-bold text-primary">₹2,400</div>
                   <div className="text-[10px] text-accent font-bold uppercase">Pay Now</div>
                 </div>
               </div>

               <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group cursor-pointer hover:border-accent transition-all">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                     <Calendar size={24} />
                   </div>
                   <div>
                     <h4 className="font-bold text-primary">Schedule Change</h4>
                     <p className="text-xs text-gray-500">Request a new time</p>
                   </div>
                 </div>
                 <ChevronRight size={20} className="text-gray-300 group-hover:text-accent" />
               </div>
            </div>

            {/* Attendance & Recent Activity */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                <Bell size={20} className="text-accent" /> Recent Activity
              </h3>
              <div className="space-y-6">
                {[
                  { title: 'Class Completed', desc: 'Mathematics with Ravi Kumar', time: 'Yesterday, 5:30 PM', status: 'success' },
                  { title: 'New Badge Earned!', desc: 'Arjun earned the "Problem Solver" badge', time: 'Jan 22', status: 'badge' },
                  { title: 'Fee Paid', desc: 'Payment for Jan received', time: 'Jan 15', status: 'payment' },
                ].map((activity, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <div>
                      <div className="font-bold text-sm text-primary">{activity.title}</div>
                      <div className="text-xs text-gray-600 mb-1">{activity.desc}</div>
                      <div className="text-[10px] text-gray-400">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 text-sm font-bold text-accent hover:underline">
                View All Notifications
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <WeeklyReport />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ParentDashboard;
