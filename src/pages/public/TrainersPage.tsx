import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, CheckCircle, MapPin, Users, User } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';

const FadeIn: React.FC<{ children: React.ReactNode, delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }}>
    {children}
  </motion.div>
);

const TrainersPage: React.FC = () => {
  const trainers = [
    { name: 'Tamizharasan K', role: 'Founder of ThiranOli', company: 'Tamizh Tech Pvt Ltd', companyUrl: 'https://www.tamizhtech.in/', location: 'Tamil Nadu', courses: 12, students: '100+', rating: 5.0, image: '', bio: '5+ years of experience in Robotics and Electronics.' },
  ];

  return (
    <PageTransition>
      <div className="bg-slate-50 min-h-screen pt-32 pb-24 font-inter">
        
        {/* Header */}
        <div className="page-container mb-20 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 mb-6 shadow-sm">
            <Award className="w-4 h-4 text-brandOrange" />
            <span className="text-[13px] font-semibold text-slate-700 tracking-wide uppercase">World-Class Mentors</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-grotesk text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Learn from <span className="text-transparent bg-clip-text bg-orange-gradient">Industry Leaders</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-slate-500 max-w-2xl mx-auto">
            Our trainers are top engineers and academicians who have built real products. They teach complex concepts seamlessly in both Tamil and English.
          </motion.p>
        </div>

        {/* Trainers Grid */}
        <div className="page-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group text-center relative overflow-hidden">
                {/* Header background */}
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-orange-50 to-white"></div>
                
                <div className="relative z-10">
                  <div className="w-24 h-24 mx-auto rounded-full p-1 bg-white shadow-md mb-4 border border-slate-100 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <User className="w-12 h-12" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <h3 className="font-grotesk text-xl font-bold text-slate-900 group-hover:text-brandOrange transition-colors">{trainer.name}</h3>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-sm font-bold text-brandOrange mb-1 uppercase tracking-wider">Lead Robotics Expert</p>
                  <p className="text-sm font-medium text-slate-600 mb-2 px-4">
                    {trainer.role} &{" "}
                    <a 
                      href={trainer.companyUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline inline-block"
                    >
                      {trainer.company}
                    </a>
                  </p>
                  <p className="text-[13px] text-slate-500 font-inter px-4 mb-4">
                    {trainer.bio}
                  </p>
                  
                  <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {trainer.location}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <div className="page-container mt-24">
          <div className="bg-slate-900 rounded-3xl p-12 text-center relative overflow-hidden border border-slate-800 shadow-2xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brandOrange/20 blur-[100px]"></div>
            <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">Want to become a Trainer?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto relative z-10">Join our elite network of mentors and help empower the next generation of innovators in Tamil Nadu.</p>
            <button className="px-8 py-4 bg-brandOrange hover:bg-orange-600 text-white rounded-xl font-grotesk font-bold shadow-lg shadow-brandOrange/30 transition-all relative z-10">
              Apply as a Mentor
            </button>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default TrainersPage;
