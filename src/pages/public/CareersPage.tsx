import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Mail, Zap, Brain, Rocket, Heart } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { SEO } from '../../components/shared/SEO';
import { Button } from '../../components/ui/button';

const CareersPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="bg-white min-h-screen pt-40 pb-24 font-inter text-textPrimary">
        <SEO 
          title="Careers"
          description="Join the ThiranOli team. We are looking for passionate innovators, educators, and engineers to build the future of education."
          keywords="Careers at ThiranOli, EdTech jobs, teaching jobs Tamil Nadu"
        />

        <div className="page-container max-w-4xl mx-auto text-center mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brandOrange/5 border border-brandOrange/10 mb-8 shadow-sm text-brandOrange font-jakarta font-extrabold text-[13px] uppercase tracking-widest">
              <Briefcase className="w-4 h-4" /> Join Our Mission
            </div>
            <h1 className="font-jakarta text-[48px] md:text-[72px] font-extrabold text-textPrimary mb-8 tracking-tighter leading-tight">
              Build the <span className="text-gradient-orange italic">Future of Education</span>
            </h1>
            <p className="text-[20px] text-textSecondary leading-relaxed mb-12">
              We're on a mission to bring world-class tech education to every doorstep. We need passionate individuals to make this a reality.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="premium-card p-12 bg-offWhite border-brandOrange/20"
          >
            <h2 className="font-jakarta text-[28px] font-extrabold mb-4">Current Openings</h2>
            <p className="text-[18px] text-textSecondary mb-8">
              There are no current openings at this time, but we are always on the lookout for great talent!
            </p>
            <div className="flex flex-col items-center gap-4">
              <p className="font-medium text-textPrimary">Mail your resume to:</p>
              <a href="mailto:contact@thiranoli.com" className="inline-flex items-center gap-3 text-[22px] font-jakarta font-extrabold text-brandOrange hover:underline">
                <Mail className="w-6 h-6" /> contact@thiranoli.com
              </a>
            </div>
          </motion.div>
        </div>

        <div className="page-container max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-jakarta text-[36px] font-extrabold">Who We Look For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Passionate Educators", desc: "You love breaking down complex tech concepts into simple, engaging lessons.", icon: Heart },
              { title: "Tech Innovators", desc: "You have hands-on experience in Robotics, AI, or Coding and love building things.", icon: Rocket },
              { title: "Lifelong Learners", desc: "You are constantly updating your skills and eager to learn the latest technologies.", icon: Brain },
              { title: "High Energy", desc: "You bring enthusiasm to every interaction and inspire students to achieve more.", icon: Zap }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[32px] border border-borderSubtle bg-white hover:shadow-premium-elevated transition-all flex gap-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-brandOrange/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-7 h-7 text-brandOrange" />
                </div>
                <div>
                  <h3 className="font-jakarta text-[22px] font-extrabold mb-2">{item.title}</h3>
                  <p className="text-textSecondary leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default CareersPage;
