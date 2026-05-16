import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Mail, 
  GraduationCap, 
  Calendar, 
  UserPlus,
  Download,
  ShieldAlert
} from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';

export const StudentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const students: any[] = []; // Empty for fresh account

  return (
    <PageTransition>
      <div className="max-w-[1400px] mx-auto space-y-8 font-inter">
        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="font-jakarta font-extrabold text-[32px] text-textPrimary tracking-tight italic">Student Directory</h1>
            <p className="font-inter text-[16px] text-textSecondary font-medium opacity-60">Monitor and manage all enrolled students across the platform.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="h-14 px-6 rounded-2xl border-borderSubtle font-jakarta font-extrabold uppercase tracking-widest text-[11px]">
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
            <Button className="btn-primary h-14 px-8 rounded-2xl font-jakarta font-extrabold uppercase tracking-widest text-[12px] shadow-premium-card">
              <Plus className="w-5 h-5 mr-2" /> Register Student
            </Button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="premium-card p-4 bg-white border-none shadow-premium-card flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary/40 group-focus-within:text-brandOrange transition-colors" />
            <input 
              type="text" 
              placeholder="Search students by name, email or ID..." 
              className="w-full pl-14 pr-6 py-4 bg-offWhite border border-borderSubtle rounded-xl focus:outline-none focus:border-brandOrange transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-14 px-6 rounded-xl border-borderSubtle flex items-center gap-2 text-textSecondary">
            <Filter className="w-5 h-5" /> Filters
          </Button>
        </div>

        {/* Students Table / Empty State */}
        <div className="premium-card border-none shadow-premium-card bg-white overflow-hidden min-h-[600px] flex flex-col">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-brandOrange/10"></div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-offWhite/50 border-b border-borderSubtle">
                  <th className="px-8 py-5 text-[11px] font-jakarta font-extrabold uppercase tracking-[0.2em] text-textSecondary/50">Student Identity</th>
                  <th className="px-8 py-5 text-[11px] font-jakarta font-extrabold uppercase tracking-[0.2em] text-textSecondary/50">Enrolled Course</th>
                  <th className="px-8 py-5 text-[11px] font-jakarta font-extrabold uppercase tracking-[0.2em] text-textSecondary/50">Joined Date</th>
                  <th className="px-8 py-5 text-[11px] font-jakarta font-extrabold uppercase tracking-[0.2em] text-textSecondary/50">Status</th>
                  <th className="px-8 py-5 text-[11px] font-jakarta font-extrabold uppercase tracking-[0.2em] text-textSecondary/50">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Empty State when no students */}
                {students.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-32">
                      <div className="flex flex-col items-center justify-center text-center max-w-sm mx-auto">
                        <div className="w-20 h-20 bg-brandOrange/5 rounded-[32px] flex items-center justify-center mb-8">
                          <UserPlus className="w-10 h-10 text-brandOrange/30" />
                        </div>
                        <h4 className="font-jakarta font-extrabold text-[20px] text-textPrimary mb-3 italic">Directory Empty</h4>
                        <p className="font-inter text-[15px] text-textSecondary font-medium opacity-60 leading-relaxed mb-8">
                          The student roster is currently blank. New enrollments will appear here automatically after payment verification.
                        </p>
                        <Button variant="outline" className="h-14 px-10 rounded-2xl border-brandOrange/20 text-brandOrange font-jakarta font-extrabold uppercase tracking-widest text-[11px] hover:bg-brandOrange/5">
                          Manually Invite Student
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default StudentManagement;
