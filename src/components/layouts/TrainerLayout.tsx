import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Calendar, IndianRupee, User, LogOut, Bell, Menu, X, Users, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const TrainerLayout: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/trainer/dashboard', icon: Home },
    { name: 'My Schedule', path: '/trainer/schedule', icon: Calendar },
    { name: 'My Students', path: '/trainer/students', icon: Users },
    { name: 'Earnings', path: '/trainer/earnings', icon: IndianRupee },
    { name: 'Settings', path: '/trainer/settings', icon: Settings },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-8">
        <Link to="/" className="flex items-center gap-3 mb-12">
           <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
          <span className="text-[24px] font-jakarta font-extrabold tracking-tight text-white italic">
            திறனொளி
          </span>
        </Link>

        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-brandOrange text-white font-jakarta font-extrabold shadow-premium-card scale-[1.02]' 
                    : 'text-white/40 hover:bg-white/5 hover:text-white font-jakarta font-extrabold uppercase tracking-widest text-[11px]'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-white/40'}`} />
                <span className={isActive ? 'text-[15px]' : ''}>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-auto p-8">
        <button 
          onClick={() => signOut()}
          className="flex items-center gap-4 px-5 py-4 rounded-2xl text-white/40 hover:bg-destructive/10 hover:text-destructive transition-all duration-300 w-full text-left group"
        >
          <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="font-jakarta font-extrabold text-[11px] uppercase tracking-widest">End Session</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-offWhite flex font-inter text-textPrimary">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[300px] bg-brandBlue fixed top-[80px] h-[calc(100vh-80px)] z-20 shadow-2xl border-r border-white/5">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-brandBlue/60 backdrop-blur-md" onClick={() => setMobileSidebarOpen(false)} />
          <motion.div 
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[300px] bg-brandBlue h-full flex flex-col z-10"
          >
            <button className="absolute top-8 right-8 text-white/40 hover:text-white" onClick={() => setMobileSidebarOpen(false)}>
              <X className="w-7 h-7" />
            </button>
            <SidebarContent />
          </motion.div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[300px] flex flex-col min-h-screen">
        {/* Page Content */}
        <div className="flex-1 p-6 md:p-12 overflow-x-hidden">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default TrainerLayout;
