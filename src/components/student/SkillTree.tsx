// src/components/student/SkillTree.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Lock, Play } from 'lucide-react';

interface TopicNode {
  id: string;
  title: string;
  status: 'locked' | 'available' | 'in_progress' | 'completed' | 'mastered';
}

interface SkillTreeProps {
  topics: TopicNode[];
}

const SkillTree: React.FC<SkillTreeProps> = ({ topics }) => {
  return (
    <div className="flex flex-col items-center gap-8 py-10">
      {topics.map((topic, index) => (
        <React.Fragment key={topic.id}>
          {/* Node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 transition-all duration-500 shadow-lg ${
              topic.status === 'completed' ? 'bg-green-500 border-green-200 text-white' :
              topic.status === 'mastered' ? 'bg-yellow-400 border-yellow-200 text-white' :
              topic.status === 'in_progress' ? 'bg-orange-500 border-orange-200 text-white ring-4 ring-orange-100 animate-pulse' :
              topic.status === 'available' ? 'bg-white border-orange-500 text-orange-500' :
              'bg-gray-100 border-gray-200 text-gray-400'
            }`}>
              {topic.status === 'completed' && <Check size={32} />}
              {topic.status === 'mastered' && <Star size={32} fill="white" />}
              {topic.status === 'in_progress' && <Play size={32} fill="white" />}
              {topic.status === 'available' && <div className="w-4 h-4 bg-orange-500 rounded-full" />}
              {topic.status === 'locked' && <Lock size={24} />}
            </div>

            {/* Label */}
            <div className="absolute left-24 top-1/2 -translate-y-1/2 w-48">
              <h4 className={`font-poppins font-bold text-sm ${
                topic.status === 'locked' ? 'text-gray-400' : 'text-primary'
              }`}>
                {topic.title}
              </h4>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                {topic.status.replace('_', ' ')}
              </p>
            </div>

            {/* Connecting Line (except for the last node) */}
            {index < topics.length - 1 && (
              <div className="absolute top-20 left-1/2 -translate-x-1/2 w-1 h-8 bg-gray-100 overflow-hidden">
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className={`w-full ${topic.status === 'completed' || topic.status === 'mastered' ? 'bg-green-500' : 'bg-gray-100'}`}
                />
              </div>
            )}
          </motion.div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SkillTree;
