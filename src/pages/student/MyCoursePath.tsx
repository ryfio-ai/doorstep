// src/pages/student/MyCoursePath.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Info, Trophy, MessageCircle } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import SkillTree from '../../components/student/SkillTree';

const MyCoursePath: React.FC = () => {
  const { id } = useParams();

  // Mock data for topics
  const topics = [
    { id: '1', title: 'Python Basics', status: 'completed' as const },
    { id: '2', title: 'Variables & Types', status: 'completed' as const },
    { id: '3', title: 'Loops & Conditions', status: 'completed' as const },
    { id: '4', title: 'Functions & Modules', status: 'in_progress' as const },
    { id: '5', title: 'Lists & Dictionaries', status: 'available' as const },
    { id: '6', title: 'Object Oriented Programming', status: 'locked' as const },
    { id: '7', title: 'Final Project', status: 'locked' as const },
  ];

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto pb-20">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/student/classes" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft size={24} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-primary font-poppins">Python Mastery Path</h1>
              <p className="text-sm text-gray-500">Visual Learning Journey</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-xl flex items-center gap-2 border border-orange-100">
               <Trophy size={18} />
               <span className="font-bold">45% Done</span>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
          {/* Skill Tree */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 overflow-x-auto">
            <SkillTree topics={topics} />
          </div>

          {/* Details Panel */}
          <div className="space-y-6">
            <div className="bg-navy-dark rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-orange-400">
                <Info size={18} /> Current Topic
              </h3>
              <h4 className="text-xl font-bold mb-2">Functions & Modules</h4>
              <p className="text-sm text-white/70 mb-6">
                Learn how to write reusable code using functions and organize them into modules for better structure.
              </p>
              <div className="space-y-3">
                <button className="w-full py-3 bg-accent hover:bg-accent-600 text-white rounded-xl font-bold text-sm transition-all">
                  Quiz Yourself
                </button>
                <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                  <MessageCircle size={18} /> Ask EduBot
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold mb-4 text-primary">Trainer Notes</h3>
              <p className="text-xs text-gray-500 italic mb-4">
                "Arjun is doing great with logic. Next session we will focus on recursive functions."
              </p>
              <span className="text-[10px] text-gray-400">— Ravi Kumar, 2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default MyCoursePath;
