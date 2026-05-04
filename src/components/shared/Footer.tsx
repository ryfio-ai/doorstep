import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Linkedin, Twitter, MapPin, Mail, Phone, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-navy-darker text-white pt-16 pb-8 border-t border-navy-dark">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18"></path><path d="M19 21v-4"></path><path d="M19 17a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v4"></path><path d="M15 5h-6a2 2 0 0 0-2 2v8h14V7a2 2 0 0 0-2-2z"></path><path d="M14 11v2"></path>
              </svg>
              <span className="text-[32px] font-poppins font-bold tracking-tight text-white">EduDoor</span>
            </div>
            <p className="text-inter text-[15px] text-white/60 mb-2">Education at Your Doorstep</p>
            <p className="text-inter text-[13px] text-white/40 mb-6">Powered by Tamizh Tech Pvt Ltd</p>
            
            <div className="flex gap-2.5">
              {[Facebook, Instagram, Youtube, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-colors duration-200">
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h4 className="font-poppins font-semibold text-[14px] text-white tracking-[0.05em] mb-6">QUICK LINKS</h4>
            <div className="flex flex-col gap-3">
              {['Home', 'Courses', 'How It Works', 'Trainers', 'About', 'Blog'].map(link => (
                <Link key={link} to="#" className="font-inter font-normal text-[14px] text-white/55 hover:text-accent transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: For Students */}
          <div className="flex flex-col">
            <h4 className="font-poppins font-semibold text-[14px] text-white tracking-[0.05em] mb-6">FOR STUDENTS</h4>
            <div className="flex flex-col gap-3">
              {['Book Demo', 'My Dashboard', 'Study Materials', 'Payments', 'Refer a Friend'].map(link => (
                <Link key={link} to="#" className="font-inter font-normal text-[14px] text-white/55 hover:text-accent transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Our Cities */}
          <div className="flex flex-col">
            <h4 className="font-poppins font-semibold text-[14px] text-white tracking-[0.05em] mb-6">OUR CITIES</h4>
            <div className="flex flex-col gap-3">
              {['Coimbatore', 'Chennai', 'Madurai', 'Trichy', 'Bangalore'].map(city => (
                <Link key={city} to={`/courses?city=${city}`} className="font-inter font-normal text-[14px] text-white/55 hover:text-accent transition-colors">
                  {city}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 5: Contact */}
          <div className="flex flex-col">
            <h4 className="font-poppins font-semibold text-[14px] text-white tracking-[0.05em] mb-6">CONTACT US</h4>
            <div className="flex flex-col gap-3.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span className="font-inter font-normal text-[14px] text-white/60">Chennai, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href="mailto:hello@edudoor.in" className="font-inter font-normal text-[14px] text-white/60 hover:text-accent">hello@edudoor.in</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:+919876543210" className="font-inter font-normal text-[14px] text-white/60 hover:text-accent">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <span className="font-inter font-normal text-[14px] text-white/60">Mon–Sat: 9AM – 7PM IST</span>
              </div>
            </div>
          </div>

        </div>

        <div className="w-full h-px bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-inter font-normal text-[13px] text-white/40 text-center md:text-left">
            &copy; 2026 Tamizh Tech Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2 font-inter font-normal text-[13px] text-white/40">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>&middot;</span>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>&middot;</span>
            <Link to="#" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
