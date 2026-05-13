import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Heart, Globe } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';

const FadeIn: React.FC<{ children: React.ReactNode, delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }}>
    {children}
  </motion.div>
);

const AboutPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="bg-white min-h-screen pt-32 pb-24 font-inter">
        
        {/* Hero */}
        <div className="page-container mb-24">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="font-tamil font-bold text-[32px] text-brandOrange mb-2" style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>திறனொளி</h1>
              <h2 className="font-grotesk text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Empowering <span className="text-transparent bg-clip-text bg-orange-gradient">Tamil Innovation.</span> <br/>
                Inspiring Global Excellence.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                ThiranOli (Light of Skills) was born out of a simple idea: High-end technology education like AI and Robotics shouldn't be restricted by language or location. We bring world-class hardware kits and bilingual instruction directly to your doorstep.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats Image Replacement */}
        <div className="page-container mb-24">
          <FadeIn>
            <div className="w-full aspect-[21/9] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 relative">
              <img src="https://picsum.photos/seed/about/1200/500" alt="Students learning" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
                  {[
                    { label: 'Happy Learners', val: '12,000+' },
                    { label: 'Expert Trainers', val: '150+' },
                    { label: 'Cities Covered', val: '38+' },
                    { label: 'Hardware Kits Shipped', val: '5,000+' }
                  ].map((stat, i) => (
                    <div key={i}>
                      <p className="font-grotesk text-3xl font-bold text-white mb-1">{stat.val}</p>
                      <p className="text-slate-300 font-medium text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Core Values */}
        <div className="page-container">
          <div className="text-center mb-16">
            <h2 className="font-grotesk text-4xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-500 max-w-xl mx-auto">The principles that drive every course we design and every kit we ship.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Globe, title: 'Bilingual Approach', desc: 'Deep tech concepts taught in both Tamil and English for maximum comprehension.' },
              { icon: Target, title: 'Practical First', desc: 'Less theory on a blackboard, more hands-on coding and hardware building.' },
              { icon: Users, title: 'Community Driven', desc: 'Building an ecosystem where learners help learners across the state.' },
              { icon: Heart, title: 'Accessible Quality', desc: 'Premium education shouldn\'t cost a fortune. We make it affordable.' }
            ].map((value, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 h-full hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6">
                    <value.icon className="w-6 h-6 text-brandOrange" />
                  </div>
                  <h3 className="font-grotesk text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{value.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default AboutPage;
