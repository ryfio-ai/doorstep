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
    <footer className="bg-brandBlue border-t border-white/5 pt-20 pb-8 text-white/80 font-inter">
      <div className="page-container">

        {/* TOP ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand Col (Spans 3/12 on desktop) */}
          <div className="lg:col-span-3 flex flex-col">
            <Link to="/" className="flex flex-col leading-none mb-4 group inline-block w-max">
              <span className="font-tamil font-bold text-[32px] leading-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-orange-gradient transition-all duration-300">
                திறனொளி
              </span>
              <span className="font-grotesk font-medium text-[11px] tracking-[0.15em] uppercase text-brandOrange mt-1">
                ThiranOli
              </span>
            </Link>
            <p className="text-[15px] leading-relaxed text-white/60 mb-6 max-w-sm">
              Light of Skills & Talent. Empowering Tamil Innovation. Inspiring Global Excellence.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/70 hover:text-white hover:bg-brandOrange/10 hover:border-brandOrange/30 hover:shadow-glow-orange transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Cols (Spans 6/12 on desktop) */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {linkColumns.map((col, idx) => (
              <div key={idx} className="flex flex-col">
                <h4 className="font-grotesk font-semibold text-[14px] text-white tracking-wider mb-5 uppercase">{col.title}</h4>
                <div className="flex flex-col gap-3">
                  {col.links.map(link => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-[14px] text-white/50 hover:text-brandOrange transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Col (Spans 3/12 on desktop) */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-grotesk font-semibold text-[14px] text-white tracking-wider mb-5 uppercase">Stay Updated</h4>
            <p className="text-[14px] text-white/50 mb-4">
              Join 12,000+ innovators getting weekly insights on AI & Robotics.
            </p>
            <form className="relative flex items-center w-full" onSubmit={e => e.preventDefault()}>
              <Mail className="absolute left-4 w-4 h-4 text-white/40" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-12 text-[14px] text-white placeholder:text-white/30 focus:border-brandOrange focus:ring-1 focus:ring-brandOrange transition-all"
                required
              />
              <button
                type="submit"
                className="absolute right-2 w-8 h-8 rounded-lg bg-orange-gradient flex items-center justify-center text-white hover:scale-105 transition-transform"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="w-full h-px bg-white/5 mb-8" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-white/40">
            &copy; 2026 Tamizh Tech Pvt Ltd. All rights reserved.
          </p>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-[13px] text-white/40 hover:text-white transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>Language: {currentLang === 'en' ? 'English' : 'தமிழ்'}</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
