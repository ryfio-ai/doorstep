import React from 'react';
import { motion } from 'framer-motion';
import { Map, ArrowRight, Brain, Code, CheckCircle, Trophy, BookOpen } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';

const FadeIn: React.FC<{ children: React.ReactNode, delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }}>
    {children}
  </motion.div>
);

const LearningPathsPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="bg-white min-h-screen pt-32 pb-24 font-inter">
        
        {/* Header */}
        <div className="page-container text-center mb-20">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-brandOrange/20 mb-6">
            <Map className="w-4 h-4 text-brandOrange" />
            <span className="text-[13px] font-semibold text-brandOrange tracking-wide uppercase">Curated Journeys</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-grotesk text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Your Roadmap to <span className="text-transparent bg-clip-text bg-orange-gradient">Excellence</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-slate-500 max-w-2xl mx-auto">
            Don't just take random courses. Follow our expertly designed learning paths from absolute beginner to industry-ready professional.
          </motion.p>
        </div>

        {/* Path 1 */}
        <div className="page-container mb-24">
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 relative z-10">
              <div>
                <h2 className="font-grotesk text-3xl font-bold text-slate-900 mb-2">AI & Machine Learning Mastery</h2>
                <p className="text-slate-500">From Python basics to building Neural Networks.</p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Duration</p>
                <p className="font-grotesk text-xl font-bold text-brandOrange">8 Months</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {[
                { step: '01', title: 'Python Foundation', desc: 'Syntax, Data Structures, OOP', icon: Code },
                { step: '02', title: 'Data Science', desc: 'Pandas, NumPy, Data Viz', icon: BookOpen },
                { step: '03', title: 'Machine Learning', desc: 'Algorithms, TensorFlow, Projects', icon: Brain }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-brandOrange">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <span className="font-grotesk text-2xl font-bold text-slate-200">{item.step}</span>
                    </div>
                    <h3 className="font-grotesk text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-sm flex-1">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10">
              <div className="flex items-center gap-4 text-sm text-slate-600 font-medium">
                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500"/> 12 Projects</span>
                <span className="flex items-center gap-1"><Trophy className="w-4 h-4 text-yellow-500"/> Job Guarantee</span>
              </div>
              <button className="px-8 py-3 bg-slate-900 hover:bg-brandOrange text-white rounded-xl font-grotesk font-bold transition-colors flex items-center gap-2">
                Start This Path <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default LearningPathsPage;
