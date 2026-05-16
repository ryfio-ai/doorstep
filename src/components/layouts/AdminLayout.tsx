import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, GraduationCap, BookOpen, Settings, LogOut, Bell, Menu, X, ShieldCheck, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/admin/students', icon: GraduationCap },
    { name: 'Trainers', path: '/admin/trainers', icon: Users },
    { name: 'Courses', path: '/admin/courses', icon: BookOpen },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-orange">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[20px] font-poppins font-bold tracking-tight text-white leading-none">
              திறனொளி
            </span>
            <span className="text-[10px] font-inter font-medium text-accent uppercase tracking-widest mt-1">
              Admin Portal
            </span>
          </div>
        </Link>

        <div className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-white/10 text-accent font-poppins font-medium border border-white/10 shadow-lg' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white font-inter font-normal border border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-white/60'}`} />
                <span className="text-[14px]">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-white/5">
        <button 
          onClick={() => signOut()}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 w-full text-left group"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-inter text-[14px]">Exit Portal</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[280px] bg-navy-darker fixed top-[80px] h-[calc(100vh-80px)] z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-navy-darker/60 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
          <motion.div 
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-[280px] bg-navy-darker h-full flex flex-col z-10"
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white" onClick={() => setMobileSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
            <SidebarContent />
          </motion.div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[280px] flex flex-col min-h-screen">
        {/* Page Content */}
        <div className="flex-1 p-6 md:p-10 overflow-x-hidden">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;
