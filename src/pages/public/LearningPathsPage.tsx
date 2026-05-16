import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Map, ArrowRight, Brain, Code, CheckCircle, Trophy, BookOpen, Cpu, Sparkles, Zap, Lightbulb, Rocket, MonitorPlay, Smartphone } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const iconMap: Record<string, any> = {
  "Robotics Foundations": Lightbulb,
  "Smart Circuits & Components": Zap,
  "Beginner Coding with Arduino": Code,
  "Robot Building Essentials": Cpu,
  "Sensor-Based Robotics": Brain,
  "Automation & Smart Robotics": Smartphone,
  "AI & Future Technologies": Sparkles,
  "Innovation Master Project": Rocket,
  "Electronics Foundations": Lightbulb,
  "Power & Energy Systems": Zap,
  "IoT & Future Electronics": Globe,
  "Coding Foundations": Lightbulb,
  "Python Basics": Code,
  "Logic Building": Brain,
  "Games & Interactive Projects": Target,
  "Introduction to Drones": Plane,
  "Drone Frame Building": Wrench,
  "Autonomous Robotics": Zap,
  "Linux & ROS Foundations": MonitorPlay
};

import { Globe, Target, Plane, Wrench } from 'lucide-react';

const colorSequence = [
  { color: "bg-green-500", light: "bg-green-50", text: "text-green-600" },
  { color: "bg-blue-500", light: "bg-blue-50", text: "text-blue-600" },
  { color: "bg-purple-500", light: "bg-purple-50", text: "text-purple-600" },
  { color: "bg-orange-500", light: "bg-orange-50", text: "text-orange-600" },
  { color: "bg-red-500", light: "bg-red-50", text: "text-red-600" },
  { color: "bg-amber-500", light: "bg-amber-50", text: "text-amber-600" },
  { color: "bg-slate-700", light: "bg-slate-50", text: "text-slate-700" },
  { color: "bg-indigo-900", light: "bg-indigo-50", text: "text-indigo-900" },
];

const LearningPathsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      const { data } = await supabase.from('courses').select('*').eq('id', parseInt(id || '1')).single();
      setCourse(data);
      setLoading(false);
    };
    fetchCourse();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Path...</div>;
  if (!course) return <div className="min-h-screen flex items-center justify-center">Course not found</div>;

  return (
    <PageTransition>
      <div className="bg-white min-h-screen pt-32 pb-24 font-inter">
        
        {/* Header Section */}
        <div className="page-container text-center mb-16">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-brandOrange/20 mb-6">
            <Map className="w-4 h-4 text-brandOrange" />
            <span className="text-[13px] font-bold text-brandOrange tracking-widest uppercase">Official Learning Path</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-grotesk text-4xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tighter">
            {course.title.split(' ').slice(0, -1).join(' ')} <span className="text-transparent bg-clip-text bg-orange-gradient">{course.title.split(' ').pop()}</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex justify-center gap-4 text-[14px] md:text-[18px] font-grotesk font-bold text-slate-400 uppercase tracking-[0.2em] mb-12">
            <span>Learn</span> • <span>Build</span> • <span>Innovate</span> • <span>Lead</span>
          </motion.div>
        </div>

        {/* Roadmap Visualization */}
        <div className="page-container max-w-5xl">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-orange-500 to-indigo-900 opacity-20 hidden md:block" />

            {course.levels.map((lvl: any, i: number) => {
              const style = colorSequence[i % colorSequence.length];
              const Icon = iconMap[lvl.title] || Sparkles;
              
              return (
                <motion.div 
                  key={lvl.level}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 mb-16 md:mb-24 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Level Circle */}
                  <div className="absolute left-[0px] md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-10">
                    <div className={`w-[60px] h-[60px] rounded-full ${style.color} text-white flex flex-col items-center justify-center shadow-lg border-4 border-white`}>
                      <span className="text-[10px] font-bold uppercase leading-none">Level</span>
                      <span className="text-[22px] font-bold leading-none">{lvl.level}</span>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-[45%] pl-20 md:pl-0">
                    <div className={`bg-white rounded-3xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 group`}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-xl ${style.light} flex items-center justify-center ${style.text}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className={`font-grotesk text-[20px] md:text-[24px] font-bold text-slate-900 group-hover:${style.text} transition-colors leading-tight`}>
                          {lvl.title}
                        </h3>
                      </div>
                      
                      <ul className="space-y-3">
                        {lvl.topics.map((topic: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-600 text-[15px]">
                            <CheckCircle className={`w-5 h-5 ${style.text} shrink-0 mt-0.5`} />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 pt-6 border-t border-gray-50">
                        <Button asChild className={`bg-slate-900 hover:${style.color} text-white w-full rounded-xl font-grotesk font-bold h-12`}>
                          <Link to={`/courses/${id}`}>View Level Materials</Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden md:block w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar - Core Philosophy */}
        <div className="page-container mt-20">
          <div className="bg-slate-900 rounded-[40px] p-8 md:p-12 text-white overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brandOrange/20 to-transparent pointer-events-none" />
            
            <div className="relative z-10 flex flex-wrap justify-center gap-8 md:gap-16">
              {[
                { icon: Lightbulb, label: "Dream" },
                { icon: Sparkles, label: "Design" },
                { icon: Code, label: "Build" },
                { icon: Cpu, label: "Code" },
                { icon: Rocket, label: "Innovate" },
                { icon: Trophy, label: "Lead" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-brandOrange" />
                  </div>
                  <span className="font-grotesk font-bold text-[14px] uppercase tracking-wider">{item.label}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <h2 className="font-grotesk text-[24px] md:text-[32px] font-bold text-white mb-2 uppercase">Empowering the Next Generation!</h2>
              <p className="text-white/60 font-inter">Join our mission to shape the future of tech education at your doorstep.</p>
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default LearningPathsPage;

