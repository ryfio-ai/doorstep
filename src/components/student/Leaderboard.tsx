// src/components/student/Leaderboard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Target, TrendingUp } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const leaders = [
    { id: 1, name: 'Aditya S.', points: 1250, level: 12, trend: 'up' },
    { id: 2, name: 'Meera K.', points: 1100, level: 11, trend: 'up' },
    { id: 3, name: 'Rahul V.', points: 950, level: 10, trend: 'down' },
    { id: 4, name: 'Sana M.', points: 880, level: 9, trend: 'up' },
    { id: 5, name: 'Arjun S. (You)', points: 820, level: 8, trend: 'up', isUser: true },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-bold text-primary flex items-center gap-2">
          <Trophy size={20} className="text-yellow-500" /> Top Learners
        </h3>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Chennai Region</span>
      </div>

      <div className="divide-y divide-gray-50">
        {leaders.map((leader, i) => (
          <motion.div
            key={leader.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
              leader.isUser ? 'bg-orange-50/50' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 text-center font-poppins font-bold text-gray-400">
                {i === 0 ? <Medal className="text-yellow-500 mx-auto" /> : 
                 i === 1 ? <Medal className="text-gray-400 mx-auto" /> :
                 i === 2 ? <Medal className="text-orange-400 mx-auto" /> : i + 1}
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 uppercase">
                {leader.name.charAt(0)}
              </div>
              <div>
                <div className={`font-bold text-sm ${leader.isUser ? 'text-orange-600' : 'text-primary'}`}>
                  {leader.name}
                </div>
                <div className="text-[10px] text-gray-400">Level {leader.level}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-bold text-primary text-sm">{leader.points} XP</div>
              <div className={`text-[10px] flex items-center justify-end gap-1 ${
                leader.trend === 'up' ? 'text-success' : 'text-destructive'
              }`}>
                {leader.trend === 'up' ? <TrendingUp size={10} /> : <Target size={10} />}
                {leader.trend === 'up' ? '+12%' : '-2%'}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full p-4 text-xs font-bold text-accent hover:bg-orange-50 transition-colors border-t border-gray-100">
        View Global Leaderboard
      </button>
    </div>
  );
};

export default Leaderboard;
