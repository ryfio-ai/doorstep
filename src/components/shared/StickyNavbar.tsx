import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, Cpu, ArrowRight, Code, Sparkles, MonitorPlay, BookOpen, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

export const StickyNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { i18n } = useTranslation();
  const { user, signOut } = useAuth();

  const currentLang = i18n.language?.startsWith('ta') ? 'ta' : 'en';
  const toggleLanguage = () => i18n.changeLanguage(currentLang === 'en' ? 'ta' : 'en');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => setActiveDropdown(null), [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const categories = [
    { icon: Cpu, name: 'Robotics', desc: 'Drones, Robo-Race, Soccer Bots' },
    { icon: Code, name: 'Coding', desc: 'Python, Automation, AI Logic' },
    { icon: BookOpen, name: 'Embedded Systems', desc: 'Arduino, Sensors, IoT' },
    { icon: Layers, name: '3D Design', desc: 'Modeling, Printing, Creativity' },
  ];

  const popularCourses = [
    { name: 'Young Robotics Engineers', tag: 'HOT', color: 'bg-red-100 text-red-600' },
    { name: 'Future Coders with Python', tag: 'POPULAR', color: 'bg-blue-100 text-blue-600' },
    { name: 'ROS Robotics Engineering', tag: 'NEW', color: 'bg-blue-100 text-blue-600' },
    { name: 'Drone Engineering Lab', tag: 'PRO', color: 'bg-blue-100 text-blue-600' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'h-[80px] bg-white shadow-premium-elevated border-b border-borderSubtle' 
            : 'h-[100px] bg-transparent'
        }`}
      >
        <div className="page-container h-full flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group relative z-10">
            <img src="/logo.png" alt="ThiranOli Logo" className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            <span className="font-tamil font-bold text-[32px] md:text-[36px] text-textPrimary transition-all duration-500 italic">
              திறனொளி
            </span>
          </Link>

          {/* MAIN NAV */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            <div 
              className="relative h-[80px] flex items-center"
              onMouseEnter={() => setActiveDropdown('courses')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`flex items-center gap-1.5 font-jakarta font-bold text-[15px] transition-all duration-300 ${
                activeDropdown === 'courses' ? 'text-brandOrange' : 'text-textSecondary hover:text-brandOrange'
              }`}>
                Courses
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'courses' ? 'rotate-180' : ''} ${activeDropdown === 'courses' ? 'text-brandOrange' : 'text-brandOrange/60'}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'courses' && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[900px] bg-white rounded-[32px] shadow-premium-elevated border border-borderSubtle overflow-hidden grid grid-cols-12"
                  >
                    {/* Categories */}
                    <div className="col-span-5 p-10 space-y-8">
                      <h4 className="text-textSecondary/40 text-[10px] font-jakarta font-extrabold tracking-[0.2em] uppercase">Categories</h4>
                      <div className="space-y-6">
                        {categories.map((cat, i) => (
                          <Link key={i} to="/courses" className="flex items-center gap-4 group/item">
                            <div className="w-12 h-12 rounded-full bg-offWhite flex items-center justify-center text-textSecondary group-hover/item:bg-brandOrange/10 group-hover/item:text-brandOrange transition-all">
                              <cat.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-textPrimary font-jakarta font-extrabold text-[15px] leading-tight group-hover/item:text-brandOrange transition-colors">{cat.name}</p>
                              <p className="text-textSecondary/60 text-[11px] font-inter mt-1 leading-tight">{cat.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Popular */}
                    <div className="col-span-4 p-10 space-y-8 border-l border-offWhite">
                      <h4 className="text-textSecondary/40 text-[10px] font-jakarta font-extrabold tracking-[0.2em] uppercase">Popular Courses</h4>
                      <div className="space-y-6">
                        {popularCourses.map((course, i) => (
                          <Link key={i} to="/courses" className="flex items-center justify-between group/course">
                            <span className="text-textSecondary font-jakarta font-bold text-[14px] group-hover/course:text-brandOrange transition-colors">{course.name}</span>
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-jakarta font-extrabold tracking-wider ${course.color}`}>{course.tag}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Free Resources */}
                    <div className="col-span-3 bg-offWhite/50 p-10 flex flex-col justify-between">
                      <div className="space-y-8">
                        <h4 className="text-textSecondary/40 text-[10px] font-jakarta font-extrabold tracking-[0.2em] uppercase">Free Resources</h4>
                        <div className="space-y-6">
                          <Link to="/courses?filter=free" className="flex items-center gap-3 text-textSecondary hover:text-brandOrange transition-colors group/free">
                            <MonitorPlay className="w-4 h-4 opacity-60 group-hover/free:opacity-100" />
                            <span className="text-[14px] font-jakarta font-bold">Free Masterclasses</span>
                          </Link>
                          <Link to="/courses?filter=free" className="flex items-center gap-3 text-textSecondary hover:text-brandOrange transition-colors group/free">
                            <Sparkles className="w-4 h-4 opacity-60 group-hover/free:opacity-100" />
                            <span className="text-[14px] font-jakarta font-bold">Project Guides</span>
                          </Link>
                        </div>
                      </div>

                      <Link to="/courses" className="flex items-center gap-2 text-brandOrange font-jakarta font-extrabold text-[13px] hover:translate-x-1 transition-transform">
                        View All Courses <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {[
              { name: 'Learning Paths', path: '/paths' },
              { name: 'Trainers', path: '/trainers' },
              { name: 'About', path: '/about' },
            ].map(link => (
              <Link
                key={link.name}
                to={link.path}
                className="font-jakarta font-bold text-[15px] text-textSecondary hover:text-brandOrange transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-borderSubtle text-textSecondary hover:bg-offWhite transition-all"
            >
              <Globe className="w-4 h-4" />
              <span className="text-[14px] font-jakarta font-bold">தமிழ்</span>
            </button>

            {user ? (
              <Link to="/student/dashboard" className="text-textSecondary font-jakarta font-bold text-[15px] hover:text-brandOrange transition-colors">
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="text-textSecondary font-jakarta font-bold text-[15px] hover:text-brandOrange transition-colors">
                Login
              </Link>
            )}

            <Link 
              to="/signup" 
              className="px-8 py-3.5 rounded-full bg-orange-gradient text-white font-jakarta font-extrabold text-[15px] shadow-glow-orange hover:shadow-premium-elevated hover:scale-[1.05] transition-all flex items-center gap-2 group"
            >
              Start Learning <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button className="lg:hidden p-2 text-textPrimary" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-7 h-7" />
          </button>

        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[80%] bg-white p-10 flex flex-col shadow-2xl"
            >
              <button onClick={() => setMobileMenuOpen(false)} className="self-end p-2 mb-10"><X className="w-8 h-8" /></button>
              <div className="flex flex-col gap-8">
                {['Courses', 'Learning Paths', 'Trainers', 'About'].map(item => (
                  <Link key={item} to="/" className="text-[20px] font-jakarta font-extrabold text-textPrimary">{item}</Link>
                ))}
                <div className="h-px bg-offWhite w-full my-4"></div>
                <Link to="/login" className="text-[20px] font-jakarta font-extrabold text-textPrimary">Login</Link>
                <Link to="/signup" className="px-8 py-5 rounded-full bg-brandOrange text-white text-center font-jakarta font-extrabold text-[18px]">Start Learning</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
