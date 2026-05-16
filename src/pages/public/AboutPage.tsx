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
      <div className="bg-white min-h-screen pt-40 pb-24 font-inter text-textPrimary">
        
        {/* Hero Section */}
        <div className="page-container mb-32">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brandOrange/5 text-brandOrange font-jakarta font-extrabold text-[13px] uppercase tracking-widest mb-8 border border-brandOrange/10">
                Our Story & Vision
              </div>
              <h1 className="font-jakarta text-[48px] md:text-[88px] font-extrabold text-textPrimary mb-10 leading-[0.9] tracking-tighter">
                Bridging Skilled Trainers <br />
                <span className="text-gradient-orange italic underline decoration-brandOrange/10">& Eager Learners.</span>
              </h1>
              <p className="text-[20px] md:text-[28px] text-textSecondary leading-relaxed font-medium max-w-4xl mx-auto">
                <span className="text-brandOrange font-extrabold">திறனொளி (ThiranOli)</span> is a smart learning platform dedicated to making quality education accessible, flexible, and convenient. We believe that instead of students traveling to centers, <span className="text-textPrimary font-extrabold italic">education should come home.</span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="bg-offWhite py-32 mb-32 border-y border-borderSubtle">
          <div className="page-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <FadeIn>
                <div className="premium-card p-16 h-full border-none shadow-premium-elevated">
                  <div className="w-16 h-16 rounded-3xl bg-brandOrange/5 flex items-center justify-center mb-8">
                    <Target className="w-8 h-8 text-brandOrange" />
                  </div>
                  <h2 className="font-jakarta text-[36px] font-extrabold text-textPrimary mb-8">Our Mission</h2>
                  <ul className="space-y-6 text-textSecondary text-[18px] font-medium">
                    <li className="flex items-start gap-4"><div className="w-6 h-6 rounded-full bg-brandOrange/10 flex items-center justify-center shrink-0 mt-1"><CheckCircle className="w-3.5 h-3.5 text-brandOrange" /></div> Connect verified trainers with students</li>
                    <li className="flex items-start gap-4"><div className="w-6 h-6 rounded-full bg-brandOrange/10 flex items-center justify-center shrink-0 mt-1"><CheckCircle className="w-3.5 h-3.5 text-brandOrange" /></div> Promote personalized learning at home</li>
                    <li className="flex items-start gap-4"><div className="w-6 h-6 rounded-full bg-brandOrange/10 flex items-center justify-center shrink-0 mt-1"><CheckCircle className="w-3.5 h-3.5 text-brandOrange" /></div> Make skill development accessible in every locality</li>
                    <li className="flex items-start gap-4"><div className="w-6 h-6 rounded-full bg-brandOrange/10 flex items-center justify-center shrink-0 mt-1"><CheckCircle className="w-3.5 h-3.5 text-brandOrange" /></div> Build a trusted trainer-student ecosystem</li>
                  </ul>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="rounded-[48px] bg-brandBlue p-16 text-white h-full relative overflow-hidden shadow-premium-elevated">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-brandOrange/20 blur-[120px] pointer-events-none" />
                  <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8">
                    <Sparkles className="w-8 h-8 text-brandOrange" />
                  </div>
                  <h2 className="font-jakarta text-[36px] font-extrabold mb-8">Our Vision</h2>
                  <p className="text-white/70 text-[22px] leading-relaxed font-medium">
                    To become India’s most trusted doorstep learning platform and empower every learner through personalized, technology-driven education.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* How We Connect (The 5-Step Process) */}
        <div className="page-container mb-32">
          <div className="text-center mb-20">
            <h2 className="font-jakarta text-[40px] md:text-[56px] font-extrabold text-textPrimary tracking-tight">How We Connect</h2>
            <p className="text-textSecondary mt-4 max-w-2xl mx-auto text-[20px] font-medium">Simplifying the journey from matching to mastering skills.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { step: "01", title: "Registration", desc: "Students select their subject and location." },
              { step: "02", title: "Smart Matching", desc: "We find the best nearby verified trainer." },
              { step: "03", title: "Demo Session", desc: "A free demo class is scheduled at home." },
              { step: "04", title: "Regular Classes", desc: "Structured doorstep learning begins." },
              { step: "05", title: "Monitoring", desc: "Continuous feedback and progress system." }
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative group p-10 rounded-[40px] bg-white border border-borderSubtle hover:shadow-premium-elevated transition-all h-full">
                  <span className="font-jakarta text-[64px] font-extrabold text-offWhite group-hover:text-brandOrange/10 transition-colors block mb-4 leading-none">{step.step}</span>
                  <h3 className="font-jakarta text-[22px] font-extrabold text-textPrimary mb-4 leading-tight">{step.title}</h3>
                  <p className="text-textSecondary text-[15px] leading-relaxed font-medium">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Core Values / Standards */}
        <div className="page-container">
          <div className="w-full rounded-[60px] p-12 md:p-24 text-center overflow-hidden relative shadow-premium-elevated">
            <div className="absolute inset-0 bg-brandBlue"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(249,115,22,0.2),_transparent)]"></div>
            
            <div className="relative z-10">
              <div className="max-w-4xl mx-auto mb-16">
                <h2 className="font-jakarta text-[32px] md:text-[48px] font-extrabold text-white mb-10 leading-tight">Our Quality Standards</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { title: "Verified Trainers", icon: ShieldCheck },
                    { title: "Safe Learning", icon: Heart },
                    { title: "Transparent Pricing", icon: Zap },
                    { title: "Structured Content", icon: Globe }
                  ].map((val, i) => (
                    <div key={i} className="flex flex-col items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                        <val.icon className="w-6 h-6 text-brandOrange" />
                      </div>
                      <span className="font-jakarta font-extrabold text-[15px] text-white/90">{val.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-12 border-t border-white/10">
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-brandOrange/20 text-brandOrange font-jakarta font-extrabold text-[13px] uppercase tracking-widest mb-8 border border-brandOrange/20">
                  Community Focused
                </div>
                <h3 className="font-jakarta text-[24px] md:text-[32px] font-extrabold italic text-white/80 leading-relaxed max-w-3xl mx-auto">
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

