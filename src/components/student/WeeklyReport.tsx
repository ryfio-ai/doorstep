// src/components/student/WeeklyReport.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, CheckCircle2, FileText, Share2, Calendar } from 'lucide-react';

const WeeklyReport: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-navy-dark p-6 text-white relative">
        <div className="relative z-10">
          <p className="text-orange-400 font-bold text-xs uppercase tracking-widest mb-1">Weekly Learning Report</p>
          <h3 className="text-2xl font-bold font-poppins">Jan 20 - Jan 26, 2025</h3>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20">
          <TrendingUp size={80} />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-2xl">
            <div className="text-gray-400 mb-1 flex items-center gap-1"><CheckCircle2 size={14} /> Classes</div>
            <div className="text-2xl font-bold text-primary">4/4 <span className="text-xs text-success">Perfect!</span></div>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl">
            <div className="text-gray-400 mb-1 flex items-center gap-1"><Clock size={14} /> Study Time</div>
            <div className="text-2xl font-bold text-primary">4.5 hrs</div>
          </div>
        </div>

        {/* Topics Covered */}
        <div>
          <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
            <FileText size={18} className="text-orange-500" /> Topics Covered
          </h4>
          <ul className="space-y-2">
            {[
              { day: 'Mon', topic: 'Python — Functions and parameters' },
              { day: 'Wed', topic: 'Python — List comprehensions' },
              { day: 'Fri', topic: 'Python — Error handling' },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <span className="w-10 font-bold text-gray-400">{item.day}</span>
                <span className="text-gray-700">{item.topic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Trainer Feedback */}
        <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
          <h4 className="font-bold text-orange-600 text-sm mb-2">Trainer's Feedback</h4>
          <p className="text-xs text-gray-700 leading-relaxed italic">
            "Arjun is showing great improvement in problem-solving. Recommend extra practice on recursion this week."
          </p>
          <p className="text-[10px] text-gray-500 mt-2">— Ravi Kumar, Verified Trainer</p>
        </div>

        {/* Next Week */}
        <div>
          <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
            <Calendar size={18} className="text-blue-500" /> Next Week Preview
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-xs p-3 bg-blue-50 rounded-xl border border-blue-100">
              <span className="font-bold text-blue-700">OOP Basics</span>
              <span className="text-gray-500">Tuesday 10 AM</span>
            </div>
          </div>
        </div>

        <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
          <Share2 size={16} /> Share on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default WeeklyReport;
