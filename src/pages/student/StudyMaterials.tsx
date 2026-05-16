import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, FileText, Download, Play, ChevronRight, Filter } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';

const materials = [
  { id: 1, title: 'Python Basics Cheat Sheet', type: 'PDF', size: '2.4 MB', course: 'Python Mastery', icon: FileText },
  { id: 2, title: 'Robotics Circuit Design Guide', type: 'PDF', size: '5.1 MB', course: 'Robotics Pro', icon: FileText },
  { id: 3, title: 'Introduction to Logic Building', type: 'Video', size: '15:20', course: 'Python Mastery', icon: Play },
  { id: 4, title: 'Sensors & Actuators Handbook', type: 'PDF', size: '3.8 MB', course: 'Robotics Pro', icon: FileText },
];

export const StudyMaterials: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <PageTransition>
      <div className="max-w-[1100px] mx-auto space-y-10 font-inter">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <h1 className="font-jakarta text-[36px] md:text-[48px] font-extrabold text-textPrimary leading-none tracking-tighter italic">
              Knowledge <span className="text-brandOrange underline decoration-brandOrange/10">Vault</span>
            </h1>
            <p className="font-inter text-[18px] text-textSecondary font-medium opacity-60 italic">Access all your course resources and study guides.</p>
          </div>

          <div className="relative w-full md:w-[350px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-textSecondary/40 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-borderSubtle rounded-2xl h-14 pl-14 pr-6 focus:outline-none focus:border-brandOrange transition-all font-medium text-[15px] shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {materials.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="premium-card p-8 border-none shadow-premium-card group hover:bg-brandBlue transition-all duration-500"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-[24px] bg-brandOrange/10 flex items-center justify-center group-hover:bg-brandOrange group-hover:rotate-6 transition-all duration-500">
                  <item.icon className="w-7 h-7 text-brandOrange group-hover:text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-jakarta font-extrabold text-brandOrange uppercase tracking-widest">{item.course}</span>
                  </div>
                  <h3 className="font-jakarta font-extrabold text-[20px] text-textPrimary group-hover:text-white transition-colors leading-tight italic">{item.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-[13px] font-medium text-textSecondary group-hover:text-white/60 transition-colors italic">
                    <span>{item.type}</span>
                    <span className="w-1 h-1 rounded-full bg-borderSubtle group-hover:bg-white/20"></span>
                    <span>{item.size}</span>
                  </div>
                </div>

                <button className="w-12 h-12 rounded-full border border-borderSubtle group-hover:border-white/20 flex items-center justify-center text-textPrimary group-hover:text-white transition-all hover:bg-brandOrange hover:border-brandOrange">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-brandBlue rounded-[40px] p-10 md:p-16 text-white relative overflow-hidden shadow-premium-elevated mt-12">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brandOrange/10 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-jakarta text-[32px] md:text-[42px] font-extrabold italic leading-tight tracking-tighter mb-6">Need specific help?</h2>
            <p className="font-inter text-[18px] text-white/60 leading-relaxed mb-10 italic font-medium">Ask your personal AI tutor or message your human mentor for custom study plans.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary h-14 rounded-2xl px-10 text-[16px]">
                Ask EduBot
              </Button>
              <Button variant="outline" className="h-14 rounded-2xl px-10 text-[16px] border-white/20 text-white hover:bg-white/5">
                Contact Mentor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
