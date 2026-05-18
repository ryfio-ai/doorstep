import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Map, ArrowRight, Brain, Code, CheckCircle, Trophy, BookOpen, Cpu, Sparkles, Zap, Lightbulb, Rocket, MonitorPlay, Smartphone } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { SEO } from '../../components/shared/SEO';

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
  { color: "bg-brandOrange", light: "bg-brandOrange/5", text: "text-brandOrange" },
  { color: "bg-amberGold", light: "bg-amberGold/5", text: "text-amberGold" },
  { color: "bg-vividOrange", light: "bg-vividOrange/5", text: "text-vividOrange" },
  { color: "bg-orange-600", light: "bg-orange-600/5", text: "text-orange-600" },
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white font-jakarta font-bold text-brandOrange">
      <div className="flex flex-col items-center gap-4">
        <Cpu className="w-12 h-12 animate-pulse" />
        <span>Loading Learning Path...</span>
      </div>
    </div>
  );
  if (!course) return <div className="min-h-screen flex items-center justify-center bg-white font-jakarta">Course not found</div>;

  return (
    <PageTransition>
      <div className="bg-white min-h-screen pt-40 pb-24 font-inter">
        <SEO 
          title={`${course.title} Learning Path`}
          description={`Explore the ${course.title} curriculum at ThiranOli. A curated learning path to master skills from beginner to advanced levels.`}
          keywords={`${course.title}, curriculum, syllabus, tech education, learning path`}
        />
        
        {/* Header Section */}
        <div className="page-container text-center mb-24">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brandOrange/5 border border-brandOrange/10 mb-8">
            <Map className="w-4 h-4 text-brandOrange" />
            <span className="text-[13px] font-jakarta font-extrabold text-brandOrange tracking-widest uppercase">Curated Learning Path</span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-jakarta text-[48px] md:text-[80px] font-extrabold text-textPrimary mb-8 tracking-tighter leading-[0.9]">
            {course.title.split(' ').slice(0, -1).join(' ')} <br />
            <span className="italic text-gradient-orange underline decoration-brandOrange/10">{course.title.split(' ').pop()}</span>
          </motion.h1>
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex justify-center flex-wrap gap-4 md:gap-8 text-[14px] md:text-[18px] font-jakarta font-extrabold text-textSecondary/40 uppercase tracking-[0.3em] mb-12">
            <span>Learn</span> <span>•</span> <span>Build</span> <span>•</span> <span>Innovate</span> <span>•</span> <span>Lead</span>
          </motion.div>
        </div>

        {/* Roadmap Visualization */}
        <div className="page-container max-w-5xl">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brandOrange via-amberGold to-transparent opacity-20 hidden md:block" />

            {course.levels.map((lvl: any, i: number) => {
              const style = colorSequence[i % colorSequence.length];
              const Icon = iconMap[lvl.title] || Sparkles;
              
              return (
                <motion.div 
                  key={lvl.level}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-12 mb-20 md:mb-32 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Level Circle */}
                  <div className="absolute left-[0px] md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-10">
                    <div className={`w-[64px] h-[64px] rounded-2xl ${style.color} text-white flex flex-col items-center justify-center shadow-premium-elevated border-4 border-white rotate-3 hover:rotate-0 transition-transform duration-500`}>
                      <span className="text-[10px] font-jakarta font-extrabold uppercase leading-none opacity-80">Lv.</span>
                      <span className="text-[26px] font-jakarta font-extrabold leading-none">{lvl.level}</span>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-[45%] pl-20 md:pl-0">
                    <div className="premium-card p-10 group">
                      <div className="flex items-center gap-5 mb-8">
                        <div className={`w-14 h-14 rounded-2xl ${style.light} flex items-center justify-center ${style.text} group-hover:scale-110 transition-transform`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <h3 className="font-jakarta text-[22px] md:text-[28px] font-extrabold text-textPrimary leading-tight">
                          {lvl.title}
                        </h3>
                      </div>
                      
                      <ul className="space-y-4 mb-10">
                        {lvl.topics.map((topic: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-4 text-textSecondary text-[16px] leading-relaxed">
                            <div className={`w-6 h-6 rounded-full ${style.light} flex items-center justify-center shrink-0 mt-0.5`}>
                              <CheckCircle className={`w-3.5 h-3.5 ${style.text}`} />
                            </div>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-8 border-t border-offWhite">
                        <Button asChild className="btn-primary w-full h-14 text-[16px]">
                          <Link to={`/courses/${id}`}>Start Level {lvl.level}</Link>
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
        <div className="page-container mt-32">
          <div className="w-full rounded-[60px] p-12 md:p-24 text-center overflow-hidden relative shadow-premium-elevated">
            <div className="absolute inset-0 bg-orange-gradient"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent)]"></div>
            
            <div className="relative z-10">
              <div className="flex flex-wrap justify-center gap-8 md:gap-20 mb-16">
                {[
                  { icon: Lightbulb, label: "Dream" },
                  { icon: Sparkles, label: "Design" },
                  { icon: Code, label: "Build" },
                  { icon: Cpu, label: "Code" },
                  { icon: Rocket, label: "Innovate" },
                  { icon: Trophy, label: "Lead" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center group hover:bg-white/20 transition-all">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="font-jakarta font-extrabold text-[12px] uppercase tracking-widest text-white/80">{item.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="max-w-3xl mx-auto">
                <h2 className="font-jakarta text-[32px] md:text-[48px] font-extrabold text-white mb-6 leading-tight">Empowering the <br />Next Generation of Innovators!</h2>
                <p className="text-white/80 font-inter text-[18px]">Our mission is to bring world-class tech education to every doorstep in Tamil Nadu.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default LearningPathsPage;

