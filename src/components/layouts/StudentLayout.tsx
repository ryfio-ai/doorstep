import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, Calendar, Folder, User, LogOut, Bell, Menu, X } from 'lucide-react';
import { MobileBottomNav } from '../shared/MobileBottomNav';
import { useAuth } from '../../context/AuthContext';

export const StudentLayout: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/student/dashboard', icon: Home },
    { name: 'Discover Courses', path: '/student/courses', icon: Search },
    { name: 'My Classes', path: '/student/classes', icon: Calendar },
    { name: 'Study Materials', path: '/student/materials', icon: Folder },
    { name: 'Profile Settings', path: '/student/profile', icon: User },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 mb-8">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18"></path><path d="M19 21v-4"></path><path d="M19 17a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v4"></path><path d="M15 5h-6a2 2 0 0 0-2 2v8h14V7a2 2 0 0 0-2-2z"></path><path d="M14 11v2"></path>
          </svg>
          <span className="text-[22px] font-poppins font-bold tracking-tight text-white">
            EduDoor
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
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
          <div className="text-[12px] font-inter text-white/50 uppercase tracking-wider mb-2">Next Class</div>
          <div className="font-poppins font-semibold text-[14px] text-white">Python Basics</div>
          <div className="text-[12px] font-inter text-accent mt-1">Today, 4:00 PM</div>
        </div>

        <button 
          onClick={() => logout()}
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
      <aside className="hidden md:flex flex-col w-[260px] bg-navy-dark fixed h-screen z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-navy-darker/60 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
          <motion.div 
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-[260px] bg-navy-dark h-full flex flex-col z-10"
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white" onClick={() => setMobileSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
            <SidebarContent />
          </motion.div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[260px] pb-[72px] md:pb-0 flex flex-col min-h-screen">
        
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
                <div className="font-poppins font-semibold text-[14px] text-primary leading-tight">{user?.name || 'Student'}</div>
                <div className="font-inter text-[12px] text-gray-500">Student Account</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center font-poppins font-bold text-[16px]">
                {(user?.name || 'S').charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </div>

      </main>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav portal="student" />

    </div>
  );
};
