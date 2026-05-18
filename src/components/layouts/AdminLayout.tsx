import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, GraduationCap, User, LogOut, Bell, Menu, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/admin/students', icon: GraduationCap },
    { name: 'Trainers', path: '/admin/trainers', icon: Users },
    { name: 'Profile', path: '/admin/profile', icon: User },
  ];

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
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-brandOrange text-white font-jakarta font-extrabold shadow-premium-card scale-[1.02] uppercase tracking-widest text-[11px]' 
                    : 'text-white/40 hover:bg-white/5 hover:text-white font-jakarta font-extrabold uppercase tracking-widest text-[11px]'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-white/40'}`} />
                <span>{item.name}</span>
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
          <span className="font-jakarta font-extrabold text-[11px] uppercase tracking-widest">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-offWhite flex font-inter text-textPrimary">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[300px] bg-brandBlue fixed top-0 h-screen z-20 shadow-2xl border-r border-white/5">
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
      <main className="flex-1 md:ml-[300px] pt-16 md:pt-0 flex flex-col min-h-screen">
        {/* Page Content */}
        <div className="flex-1 p-6 md:p-12 overflow-x-hidden">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;
