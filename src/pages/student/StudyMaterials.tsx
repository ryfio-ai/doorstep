import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, FileText, Download, Play, ChevronRight, Filter, FolderOpen } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

export const StudyMaterials: React.FC = () => {
  const [search, setSearch] = useState('');
  const materials: any[] = []; // Empty for fresh account

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

        {materials.length === 0 ? (
          <div className="bg-white rounded-[48px] p-16 md:p-24 border-2 border-dashed border-borderSubtle flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full bg-offWhite flex items-center justify-center mb-8 text-textSecondary/20">
              <FolderOpen size={48} />
            </div>
            <h2 className="font-jakarta font-extrabold text-[28px] text-textPrimary italic mb-4">No Materials Yet</h2>
            <p className="font-inter text-[17px] text-textSecondary font-medium italic opacity-60 mb-10 max-w-md">Resources will appear here once you enroll in a course and start your learning journey.</p>
            <Link to="/student/courses">
              <Button className="btn-primary h-14 rounded-2xl px-12 text-[16px]">
                Browse Courses
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {materials.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="premium-card p-8 border-none shadow-premium-card group hover:bg-brandBlue transition-all duration-500"
              >
                {/* Item content */}
              </motion.div>
            ))}
          </div>
        )}

        <div className="bg-brandBlue rounded-[40px] p-10 md:p-16 text-white relative overflow-hidden shadow-premium-elevated mt-12">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brandOrange/10 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-jakarta text-[32px] md:text-[42px] font-extrabold italic leading-tight tracking-tighter mb-6">Need specific help?</h2>
            <p className="font-inter text-[18px] text-white/60 leading-relaxed mb-10 italic font-medium">Ask your personal AI tutor or message your human mentor for custom study plans.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary h-14 rounded-2xl px-10 text-[16px]">
                Ask EduBot
              </Button>
              <Button variant="outline" className="h-14 rounded-2xl px-10 text-[16px] border-white/40 text-white bg-transparent hover:bg-white/10 hover:text-white transition-all">
                Contact Mentor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default StudyMaterials;
