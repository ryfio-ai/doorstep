import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Heart, Globe, ShieldCheck, Zap, Sparkles, MapPin, CheckCircle } from 'lucide-react';
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
        
        {/* Hero Section */}
        <div className="page-container mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brandOrange/10 text-brandOrange font-grotesk font-bold text-[14px] uppercase tracking-widest mb-6">
                Our Story & Vision
              </div>
              <h1 className="font-grotesk text-4xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight tracking-tighter">
                Bridging Skilled Trainers <br />
                <span className="text-transparent bg-clip-text bg-orange-gradient">& Eager Learners.</span>
              </h1>
              <p className="text-[20px] md:text-[24px] text-slate-500 leading-relaxed font-light">
                <strong>திறனொளி (Doorstep)</strong> is a smart learning platform dedicated to making quality education accessible, flexible, and convenient. We believe that instead of students traveling to tuition centers, <strong>education should come home.</strong>
              </p>
            </motion.div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="bg-slate-50 py-24 mb-24">
          <div className="page-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <FadeIn>
                <div className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 h-full">
                  <Target className="w-12 h-12 text-brandOrange mb-6" />
                  <h2 className="font-grotesk text-[32px] font-bold text-slate-900 mb-4">Our Mission</h2>
                  <ul className="space-y-4 text-slate-600 text-[18px]">
                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-brandOrange shrink-0 mt-1" /> Connect verified trainers with students</li>
                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-brandOrange shrink-0 mt-1" /> Promote personalized learning at home</li>
                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-brandOrange shrink-0 mt-1" /> Make skill development accessible in every locality</li>
                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-brandOrange shrink-0 mt-1" /> Build a trusted trainer-student ecosystem</li>
                  </ul>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="bg-brandBlue p-12 rounded-[40px] text-white h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brandOrange/20 blur-[100px] pointer-events-none" />
                  <Sparkles className="w-12 h-12 text-brandOrange mb-6" />
                  <h2 className="font-grotesk text-[32px] font-bold mb-4">Our Vision</h2>
                  <p className="text-white/70 text-[20px] leading-relaxed">
                    To become India’s most trusted doorstep learning platform and empower every learner through personalized education.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* How We Connect (The 5-Step Process) */}
        <div className="page-container mb-24">
          <div className="text-center mb-16">
            <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-slate-900">How We Connect</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-[18px]">Simplifying the journey from matching to mastering skills.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: "01", title: "Registration", desc: "Students select their subject and location." },
              { step: "02", title: "Smart Matching", desc: "We find the best nearby verified trainer." },
              { step: "03", title: "Demo Session", desc: "A free demo class is scheduled at home." },
              { step: "04", title: "Regular Classes", desc: "Structured doorstep learning begins." },
              { step: "05", title: "Monitoring", desc: "Continuous feedback and progress system." }
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative group p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all h-full">
                  <span className="font-grotesk text-5xl font-bold text-slate-200 group-hover:text-brandOrange/20 transition-colors block mb-6">{step.step}</span>
                  <h3 className="font-grotesk text-[20px] font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Core Values / Standards */}
        <div className="page-container">
          <div className="bg-slate-900 rounded-[60px] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-brandOrange/10 to-transparent pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-grotesk text-4xl font-bold mb-8">Our Quality Standards</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { title: "Verified Trainers", icon: ShieldCheck },
                    { title: "Safe Learning", icon: Heart },
                    { title: "Transparent Pricing", icon: Zap },
                    { title: "Structured Content", icon: Globe }
                  ].map((val, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <val.icon className="w-5 h-5 text-brandOrange" />
                      </div>
                      <span className="font-grotesk font-bold text-[18px]">{val.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brandOrange/20 text-brandOrange font-grotesk font-bold text-[14px] uppercase tracking-widest mb-6">
                  Community Focused
                </div>
                <h3 className="font-grotesk text-[24px] font-bold mb-4 italic text-white/90">
                  "Safe & Reliable. Trusted Network. Quality-Focused. Technology-Driven."
                </h3>
              </div>
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default AboutPage;

