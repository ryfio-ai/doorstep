import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, CheckCircle, MapPin, Users, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../../components/shared/PageTransition';

const FadeIn: React.FC<{ children: React.ReactNode, delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }}>
    {children}
  </motion.div>
);

const TrainersPage: React.FC = () => {
  const trainers = [
    { name: 'Tamizharasan K', role: 'Founder of ThiranOli', company: 'Tamizh Tech Pvt Ltd', companyUrl: 'https://www.tamizhtech.in/', location: 'Tamil Nadu', courses: 12, students: '100+', rating: 5.0, image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=200&auto=format&fit=crop', bio: '5+ years of experience in Robotics and Electronics.' },
  ];

  return (
    <PageTransition>
      <div className="bg-white min-h-screen pt-40 pb-24 font-inter text-textPrimary">
        
        {/* Header */}
        <div className="page-container mb-24 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brandOrange/5 border border-brandOrange/10 mb-8 shadow-sm">
            <Award className="w-4 h-4 text-brandOrange" />
            <span className="text-[13px] font-jakarta font-extrabold text-brandOrange tracking-widest uppercase">Elite Mentorship</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-jakarta text-[48px] md:text-[72px] font-extrabold text-textPrimary mb-8 tracking-tighter leading-tight">
            Learn from <span className="text-gradient-orange italic">Industry Leaders</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[20px] text-textSecondary max-w-2xl mx-auto leading-relaxed">
            Our trainers are top engineers and innovators who have built real products. Experience world-class learning in both regional languages and English.
          </motion.p>
        </div>

        {/* Trainers Grid */}
        <div className="page-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
          {trainers.map((trainer, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="premium-card p-8 text-center relative overflow-hidden group hover:shadow-premium-elevated transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-brandOrange/5 to-transparent"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-24 h-24 mx-auto rounded-[24px] p-1 bg-white shadow-sm mb-6 border border-borderSubtle flex items-center justify-center group-hover:rotate-6 transition-transform">
                    {trainer.image ? (
                      <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover rounded-[20px]" />
                    ) : (
                      <div className="w-full h-full rounded-[20px] bg-offWhite flex items-center justify-center text-brandOrange/30">
                        <User className="w-10 h-10" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 mb-1.5">
                    <h3 className="font-jakarta text-[20px] font-extrabold text-textPrimary group-hover:text-brandOrange transition-colors leading-tight">{trainer.name}</h3>
                    <CheckCircle className="w-4 h-4 text-green-500 fill-green-50 shrink-0" />
                  </div>
                  <p className="text-[11px] font-jakarta font-extrabold text-brandOrange mb-4 uppercase tracking-[0.2em]">Lead Robotics Expert</p>
                  
                  <p className="text-[14px] font-medium text-textSecondary mb-4">
                    {trainer.role} <br />
                    <span className="text-textPrimary text-[13px] opacity-60">at</span>{" "}
                    <a 
                      href={trainer.companyUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brandOrange hover:underline font-bold"
                    >
                      {trainer.company}
                    </a>
                  </p>
                  
                  <p className="text-[14px] text-textSecondary leading-relaxed mb-6 italic px-4">
                    "{trainer.bio}"
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-offWhite text-[13px] font-jakarta font-bold text-textPrimary flex justify-center">
                    <span className="flex items-center gap-2 bg-brandOrange/5 px-4 py-2 rounded-full text-brandOrange"><MapPin className="w-4 h-4"/> {trainer.location}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <div className="page-container mt-32">
          <div className="w-full rounded-[60px] p-12 md:p-24 text-center overflow-hidden relative shadow-premium-elevated">
            <div className="absolute inset-0 bg-brandBlue"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(249,115,22,0.2),_transparent)]"></div>
            
            <div className="relative z-10">
              <h2 className="font-jakarta text-[32px] md:text-[56px] font-extrabold text-white mb-6 leading-tight">Empowering Future <br />Innovators?</h2>
              <p className="text-white/60 mb-12 max-w-2xl mx-auto text-[18px]">Join our elite network of mentors and build your professional brand while helping students right in your neighborhood.</p>
              <Link to="/signup" className="inline-flex items-center justify-center btn-primary h-16 px-12 text-[18px] rounded-full">
                Apply as a Mentor
              </Link>
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default TrainersPage;
