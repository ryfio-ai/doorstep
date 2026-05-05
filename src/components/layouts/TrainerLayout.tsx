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
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 mb-8">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
          <span className="text-[22px] font-poppins font-bold tracking-tight text-white">
            Trainer Hub
          </span>
        </Link>

        <div className="space-y-2">
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
                    ? 'bg-accent text-white font-poppins font-medium shadow-orange' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white font-inter font-normal'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/70'}`} />
                <span className="text-[14px]">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-auto p-6">
        <button 
          onClick={() => signOut()}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200 w-full text-left"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-inter text-[14px]">Log Out</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[260px] bg-primary fixed h-screen z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-navy-darker/60 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
          <motion.div 
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-[260px] bg-primary h-full flex flex-col z-10"
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white" onClick={() => setMobileSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
            <SidebarContent />
          </motion.div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[260px] flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-primary" onClick={() => setMobileSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="font-poppins font-bold text-[20px] text-primary hidden sm:block">
              {navItems.find(i => location.pathname.includes(i.path))?.name || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative text-gray-500 hover:text-primary transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="font-poppins font-semibold text-[14px] text-primary leading-tight">{user?.name || 'Trainer'}</div>
                <div className="font-inter text-[12px] text-gray-500">Trainer Account</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center font-poppins font-bold text-[16px]">
                {(user?.name || 'T').charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </div>

      </main>

    </div>
  );
};

export default TrainerLayout;
