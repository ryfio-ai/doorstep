import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, BookOpen, Cpu, Users, ArrowRight, Code, Trophy, Sparkles, Video } from 'lucide-react';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const StickyNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language?.startsWith('ta') ? 'ta' : 'en';
  const toggleLanguage = () => i18n.changeLanguage(currentLang === 'en' ? 'ta' : 'en');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Close dropdown on route change
  useEffect(() => setActiveDropdown(null), [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  // Mega Dropdown Data
  const courseCategories = [
    { icon: Cpu, name: 'AI & Machine Learning', desc: 'Neural networks, deep learning, NLP' },
    { icon: Code, name: 'Robotics & Hardware', desc: 'Arduino, Raspberry Pi, Drones' },
    { icon: BookOpen, name: 'Software Development', desc: 'Full-stack web and mobile apps' },
  ];
  const popularCourses = [
    { name: 'Python for AI Mastery', badge: 'HOT' },
    { name: 'IoT Automation with ESP32', badge: 'NEW' },
    { name: 'Computer Vision Basics', badge: '' },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-xl border-b border-slate-200"
      >
        <div className="page-container h-[80px] flex items-center justify-between">
          
          {/* LOGO AREA */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="flex flex-col leading-none">
              <span className="font-tamil font-bold text-[28px] leading-tight text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-orange-gradient transition-all duration-300 relative">
                திறனொளி
                <span className="absolute -right-3 top-1 w-2 h-2 rounded-full bg-brandOrange animate-pulse-orange"></span>
              </span>
              <span className="font-grotesk font-medium text-[11px] tracking-[0.15em] uppercase text-slate-500 group-hover:text-brandOrange transition-colors">
                ThiranOli
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden lg:flex items-center gap-8 h-full">
            {/* Mega Dropdown Trigger */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown('courses')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`flex items-center gap-1.5 font-inter font-medium text-[15px] transition-colors duration-200 ${
                isActive('/courses') || activeDropdown === 'courses' ? 'text-brandOrange' : 'text-slate-600 hover:text-slate-900'
              }`}>
                Courses
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'courses' ? 'rotate-180 text-brandOrange' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {activeDropdown === 'courses' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scaleY: 0.95 }}
                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                    exit={{ opacity: 0, y: 5, scaleY: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[800px] bg-white border border-slate-200 rounded-2xl shadow-xl p-6 grid grid-cols-3 gap-8 origin-top"
                  >
                    {/* Categories Column */}
                    <div className="flex flex-col gap-4">
                      <h4 className="text-slate-400 text-[12px] font-grotesk font-semibold tracking-wider uppercase mb-1">Categories</h4>
                      {courseCategories.map((cat, i) => (
                        <Link key={i} to="/courses" className="flex items-start gap-3 group">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 group-hover:text-brandOrange group-hover:bg-brandOrange/10 transition-colors">
                            <cat.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-slate-900 font-inter text-[15px] font-medium group-hover:text-brandOrange transition-colors">{cat.name}</p>
                            <p className="text-slate-500 font-inter text-[12px] leading-snug mt-0.5">{cat.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Popular Column */}
                    <div className="flex flex-col gap-4">
                      <h4 className="text-slate-400 text-[12px] font-grotesk font-semibold tracking-wider uppercase mb-1">Popular Courses</h4>
                      {popularCourses.map((course, i) => (
                        <Link key={i} to="/courses" className="flex items-center justify-between group">
                          <span className="text-slate-700 font-inter text-[14px] group-hover:text-brandOrange transition-colors">{course.name}</span>
                          {course.badge && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              course.badge === 'HOT' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            }`}>
                              {course.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>

                    {/* Resources Column */}
                    <div className="flex flex-col gap-4 bg-slate-50 -m-6 p-6 rounded-r-2xl border-l border-slate-100">
                      <h4 className="text-slate-400 text-[12px] font-grotesk font-semibold tracking-wider uppercase mb-1">Free Resources</h4>
                      <Link to="/how-it-works" className="flex items-center gap-2 text-slate-700 hover:text-brandOrange text-[14px] transition-colors"><Video className="w-4 h-4"/> Free Masterclasses</Link>
                      <Link to="/" className="flex items-center gap-2 text-slate-700 hover:text-brandOrange text-[14px] transition-colors"><Sparkles className="w-4 h-4"/> Project Guides</Link>
                      
                      <div className="mt-auto">
                        <Link to="/courses" className="flex items-center gap-2 text-brandOrange font-grotesk font-semibold text-[14px] group">
                          View All Courses <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Normal Links */}
            {[
              { name: 'Learning Paths', path: '/paths' },
              { name: 'Robotics & AI', path: '/robotics' },
              { name: 'Trainers', path: '/trainers' },
              { name: 'About', path: '/about' },
            ].map(link => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-inter font-medium text-[15px] transition-colors duration-200 group h-full flex items-center ${
                  isActive(link.path) ? 'text-brandOrange' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div layoutId="navbar-underline" className="absolute bottom-0 left-0 w-full h-[3px] bg-brandOrange rounded-t-full" />
                )}
                <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brandOrange opacity-0 group-hover:opacity-100 transition-opacity ${isActive(link.path) ? 'hidden' : ''}`} />
              </Link>
            ))}
          </div>

          {/* CTA AREA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 text-[13px] font-grotesk font-medium hover:border-slate-400 hover:text-slate-900 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>{currentLang === 'en' ? 'தமிழ்' : 'EN'}</span>
            </button>

            <Link to="/login" className="text-slate-600 hover:text-slate-900 font-inter font-medium text-[15px] px-2 transition-colors">
              Login
            </Link>

            <Link 
              to="/signup" 
              className="group relative flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-gradient text-white font-grotesk font-semibold text-[15px] shadow-glow-orange hover:scale-105 transition-all duration-300"
            >
              Start Learning
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* MOBILE HAMBURGER */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-white/20 text-white text-[12px] font-grotesk"
            >
              <Globe className="w-3.5 h-3.5" />
              {currentLang === 'en' ? 'தமிழ்' : 'EN'}
            </button>
            <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-white hover:text-brandOrange transition-colors">
              <Menu className="w-7 h-7" />
            </button>
          </div>

        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[85%] max-w-[360px] bg-white border-l border-slate-200 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <span className="font-tamil font-bold text-[22px] text-slate-900">திறனொளி</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-slate-900 p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-2 p-6 flex-1 overflow-y-auto">
                {['Courses', 'Learning Paths', 'Robotics & AI', 'Trainers', 'About'].map((item, i) => (
                  <motion.div key={item} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link to={`/${item.toLowerCase().replace(/ & | /g, '-')}`} onClick={() => setMobileMenuOpen(false)} className="block py-4 text-[18px] font-grotesk font-medium text-slate-800 border-b border-slate-100 hover:text-brandOrange">
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="p-6 space-y-4 border-t border-slate-100 bg-slate-50">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center w-full h-12 rounded-xl border border-slate-200 text-slate-700 font-grotesk font-semibold text-[16px] hover:bg-white">
                  Login
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center w-full h-12 rounded-xl bg-orange-gradient text-white font-grotesk font-semibold text-[16px] shadow-glow-orange">
                  Start Learning
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
