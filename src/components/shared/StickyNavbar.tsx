import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';

export const StickyNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-[0_2px_20px_rgba(0,0,0,0.08)]'
            : 'bg-white border-b-transparent shadow-none'
        }`}
      >
        <div className="page-container h-[60px] md:h-[68px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col w-[200px]">
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F47820" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18"></path><path d="M19 21v-4"></path><path d="M19 17a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v4"></path><path d="M15 5h-6a2 2 0 0 0-2 2v8h14V7a2 2 0 0 0-2-2z"></path><path d="M14 11v2"></path>
              </svg>
              <span className="text-[26px] font-poppins font-bold tracking-tight">
                <span className="text-accent">Edu</span>
                <span className="text-primary">Door</span>
              </span>
            </div>
            <span className="text-inter font-normal text-[10px] text-muted-foreground ml-8 -mt-1">
              by Tamizh Tech
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative text-inter font-medium text-[15px] text-gray-600 hover:text-accent transition-colors duration-200 group"
              >
                {link.name}
                <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity ${location.pathname === link.path ? 'opacity-100' : ''}`} />
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4 w-[200px] justify-end">
            <Button variant="outline" asChild className="border-[1.5px] border-primary text-primary hover:bg-primary hover:text-white font-poppins font-medium text-[14px] px-5 py-2 h-auto rounded-lg">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-accent hover:bg-accent-600 text-white font-poppins font-semibold text-[14px] px-6 py-2 h-auto rounded-lg shadow-[0_2px_8px_rgba(244,120,32,0.35)]">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-primary p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div 
            className="absolute inset-0 bg-navy-darker/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-[80%] max-w-[320px] bg-white h-full flex flex-col px-6 py-8 animate-slide-in-right">
            <button 
              className="absolute top-6 right-6 text-gray-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex flex-col gap-12 mt-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="font-poppins font-semibold text-[20px] text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-4">
              <Button variant="outline" asChild className="w-full border-[1.5px] border-primary text-primary font-poppins font-medium text-[16px] h-12 rounded-lg">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              </Button>
              <Button asChild className="w-full bg-accent text-white font-poppins font-semibold text-[16px] h-12 rounded-lg shadow-orange">
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
