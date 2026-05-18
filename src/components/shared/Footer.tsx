import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Linkedin, Twitter, Github, Mail, ArrowRight, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('ta') ? 'ta' : 'en';
  const toggleLanguage = () => i18n.changeLanguage(currentLang === 'en' ? 'ta' : 'en');

  const socialLinks = [
    { icon: Linkedin, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Youtube, href: '#' },
    { icon: Github, href: '#' },
  ];

  const linkColumns = [
    {
      title: 'Courses',
      links: [
        { name: 'AI & ML', path: '/courses?category=ai' },
        { name: 'Robotics', path: '/courses?category=robotics' },
        { name: 'Programming', path: '/courses?category=programming' },
        { name: 'Free Courses', path: '/courses?filter=free' },
      ]
    },
    {
      title: 'Platform',
      links: [
        { name: 'How it Works', path: '/how-it-works' },
        { name: 'Trainers', path: '/trainers' },
        { name: 'Certificates', path: '/certificates' },
        { name: 'Blog', path: '/blog' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Press', path: '/press' },
        { name: 'Contact', path: '/contact' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookies' },
      ]
    }
  ];

  return (
    <footer className="bg-offWhite border-t border-borderSubtle pt-24 pb-12 text-textSecondary font-inter">
      <div className="page-container">

        {/* TOP ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">

          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col">
            <Link to="/" className="flex items-center gap-3 mb-6 group inline-block w-max">
              <img src="/logo.png" alt="ThiranOli Logo" className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
              <div className="flex flex-col leading-none">
                <span className="font-tamil font-bold text-[32px] leading-tight text-textPrimary group-hover:text-brandOrange transition-all duration-300">
                  திறனொளி
                </span>
                <span className="font-jakarta font-bold text-[13px] tracking-[0.1em] uppercase text-textSecondary group-hover:text-brandOrange mt-1 transition-colors">
                  ThiranOli
                </span>
              </div>
            </Link>
            <p className="text-[16px] leading-relaxed text-textSecondary mb-8 max-w-sm">
              Tamil Nadu's leading EdTech platform for 1-on-1 doorstep learning in AI, Robotics, and Coding.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-12 h-12 rounded-2xl bg-white border border-borderSubtle flex items-center justify-center text-textSecondary hover:text-white hover:bg-brandOrange hover:border-brandOrange hover:shadow-premium-elevated transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Cols */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {linkColumns.slice(0, 3).map((col, idx) => (
              <div key={idx} className="flex flex-col">
                <h4 className="font-jakarta font-bold text-[14px] text-textPrimary tracking-widest mb-6 uppercase">{col.title}</h4>
                <div className="flex flex-col gap-4">
                  {col.links.map(link => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-[15px] text-textSecondary hover:text-brandOrange transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Col */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-jakarta font-bold text-[14px] text-textPrimary tracking-widest mb-6 uppercase">Join the Future</h4>
            <p className="text-[15px] text-textSecondary mb-6 leading-relaxed">
              Get the latest updates on robotics kits and coding sessions.
            </p>
            <form className="relative flex items-center w-full" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white border border-borderSubtle rounded-2xl py-4 pl-6 pr-14 text-[15px] text-textPrimary placeholder:text-textSecondary/50 focus:border-brandOrange focus:ring-1 focus:ring-brandOrange transition-all outline-none"
                required
              />
              <button
                type="submit"
                className="absolute right-2 w-10 h-10 rounded-xl bg-brandOrange flex items-center justify-center text-white hover:bg-vividOrange transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="w-full h-px bg-borderSubtle mb-10" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-[14px] font-medium text-textSecondary">
              © 2026 Tamizh Tech Pvt Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-[13px] hover:text-brandOrange transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-[13px] hover:text-brandOrange transition-colors">Terms of Use</Link>
            </div>
          </div>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-borderSubtle text-[13px] font-jakarta font-bold text-textPrimary hover:bg-offWhite transition-all"
          >
            <Globe className="w-4 h-4" />
            <span>{currentLang === 'en' ? 'தமிழ்' : 'English'}</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
