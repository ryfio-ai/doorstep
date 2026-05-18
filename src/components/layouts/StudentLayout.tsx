import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, Calendar, Folder, User, LogOut, Bell, Menu, X, Coins, BarChart2, ShieldCheck } from 'lucide-react';
import { MobileBottomNav } from '../shared/MobileBottomNav';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';
import EduBot from '../student/EduBot';

export const StudentLayout: React.FC = () => {
  const location = useLocation();
  const { user, signOut, isParent } = useAuth();
  const { stats } = useGamification();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/student/dashboard', icon: Home },
    { name: 'Discover Courses', path: '/student/courses', icon: Search },
    { name: 'My Classes', path: '/student/classes', icon: Calendar },
    { name: 'Study Materials', path: '/student/materials', icon: Folder },
    { name: 'Learning Reports', path: '/student/reports', icon: BarChart2 },
    { name: 'EduCoins Wallet', path: '/student/wallet', icon: Coins },
    { name: 'Profile Settings', path: '/student/profile', icon: User },
  ];

  if (isParent) {
    navItems.splice(1, 0, { name: 'Parent View', path: '/student/parent-view', icon: ShieldCheck });
  }

  const SidebarContent = () => (
    <>
      <div className="p-8">
        <Link to="/" className="flex items-center gap-3 mb-12">
          <img src="/logo.png" alt="ThiranOli Logo" className="h-10 w-auto object-contain brightness-0 invert" />
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
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${isActive
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
        <div className="bg-white/5 border border-white/10 rounded-[28px] p-6 mb-8 backdrop-blur-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brandOrange/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-brandOrange/20 transition-all"></div>
          <div className="text-[10px] font-jakarta font-extrabold text-brandOrange uppercase tracking-[0.2em] mb-3">Live Session</div>
          <div className="font-jakarta font-extrabold text-[16px] text-white italic leading-tight">Robotics Engineering v2</div>
          <div className="text-[12px] font-jakarta font-extrabold text-white/40 mt-1 uppercase tracking-widest">Today, 4:00 PM</div>
        </div>

        <button
          onClick={() => signOut()}
          className="flex items-center gap-4 px-5 py-4 rounded-2xl text-white/40 hover:bg-destructive/10 hover:text-white transition-all duration-300 w-full text-left group"
        >
          <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="font-jakarta font-extrabold text-[11px] uppercase tracking-widest">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-offWhite flex font-inter text-textPrimary">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[300px] bg-brandBlue fixed top-0 h-screen z-20 shadow-2xl border-r border-white/5 overflow-y-auto scrollbar-hide">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 w-full h-16 bg-white border-b border-borderSubtle z-40 px-6 flex items-center justify-between">
        <button 
          onClick={() => setMobileSidebarOpen(true)}
          className="p-2 -ml-2 text-textPrimary"
        >
          <Menu className="w-6 h-6" />
        </button>
        <img src="/logo.png" alt="ThiranOli" className="h-6 w-auto object-contain" />
        <button className="p-2 -mr-2 text-textPrimary relative">
          <Bell className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-brandOrange rounded-full border-2 border-white"></span>
        </button>
      </header>

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
      <main className="flex-1 md:ml-[300px] pt-16 md:pt-0 pb-[72px] md:pb-0 flex flex-col min-h-screen">
        {/* Page Content */}
        <div className="flex-1 p-6 md:p-12 overflow-x-hidden">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav portal="student" />

      {/* AI Assistant */}
      <EduBot />
    </div>
  );
};

export default StudentLayout;
