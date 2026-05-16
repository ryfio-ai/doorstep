import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, BookOpen, CheckCircle2, ChevronDown, MonitorPlay, FileText, ChevronLeft, Calendar, ShieldCheck, Award, Zap } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { supabase } from '../../lib/supabase';

export const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('courses').select('*').eq('id', parseInt(id || '0')).single();
      if (data) setCourse(data);
      setLoading(false);
    };
    fetchCourse();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>;
  if (!course) return <div className="min-h-screen flex items-center justify-center bg-white">Course not found</div>;

  return (
    <PageTransition>
      <div className="bg-white min-h-screen">
        {/* Course Header Area - Light Gray Background */}
        <div className="bg-[#1C1D1F] text-white py-12 md:py-16">
          <div className="page-container">
            <Link to="/student/courses" className="inline-flex items-center gap-1 text-gray-400 hover:text-white font-inter text-[14px] mb-8 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back to Catalog
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-accent text-white font-grotesk font-bold text-[12px] px-3 py-1 rounded uppercase tracking-wider">{course.category}</span>
                  <div className="flex items-center gap-1 text-orange-400 font-inter font-bold text-[14px]">
                    <Star className="w-4 h-4 fill-orange-400" /> {course.rating}
                    <span className="text-gray-400 font-normal underline">(1,240 ratings)</span>
                  </div>
                  <span className="text-gray-400 text-[14px]">{course.students} students enrolled</span>
                </div>

                <h1 className="font-grotesk font-bold text-[36px] md:text-[48px] leading-[1.1] tracking-tight">
                  {course.title}
                </h1>
                
                <p className="font-inter text-[18px] text-gray-300 leading-[1.6] max-w-2xl">
                  {course.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-4 text-[14px]">
                  <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-accent" /> {course.duration}</div>
                  <div className="flex items-center gap-2"><Zap className="w-5 h-5 text-accent" /> {course.diff}</div>
                  <div className="flex items-center gap-2 text-success"><ShieldCheck className="w-5 h-5" /> 100% Verified Program</div>
                </div>
              </div>

              {/* Mobile Only Preview Card placeholder if needed, usually Udemy has it on the right */}
            </div>
          </div>
        </div>

        <div className="page-container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 relative">
            
            {/* Left Column: Course Content */}
            <div className="space-y-12">
              
              {/* Learning Outcomes */}
              <div className="border border-gray-200 rounded-xl p-8">
                <h2 className="font-grotesk font-bold text-[24px] text-primary mb-6">What you'll learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    "Master core engineering concepts through hands-on practice",
                    "Build professional-grade robotics and electronics projects",
                    "Understand industry-standard software and hardware tools",
                    "Develop critical thinking and problem-solving skills",
                    "Work with real sensors, controllers, and mechanical parts",
                    "Complete a final innovation project for certification"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <span className="font-inter text-[14px] text-gray-700 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum - Level Based */}
              <div>
                <h2 className="font-grotesk font-bold text-[28px] text-primary mb-2">Program Curriculum</h2>
                <p className="text-gray-500 text-[14px] mb-6">{course.levels.length} levels • {course.levels.reduce((acc: any, curr: any) => acc + curr.topics.length, 0)} topics</p>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {course.levels.map((level: any, idx: number) => (
                    <div key={idx} className="border-b border-gray-200 last:border-0">
                      <button 
                        onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                        className="w-full bg-[#F7F9FA] flex items-center justify-between p-5 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-4 text-left">
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${activeAccordion === idx ? 'rotate-180 text-accent' : ''}`} />
                          <div className="font-grotesk font-bold text-[16px] text-primary">
                            Level {level.level}: {level.title}
                          </div>
                        </div>
                        <span className="text-[13px] text-gray-500 font-inter">{level.topics.length} topics</span>
                      </button>
                      <AnimatePresence>
                        {activeAccordion === idx && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="bg-white overflow-hidden"
                          >
                            <div className="p-2">
                              {level.topics.map((topic: string, i: number) => (
                                <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 rounded-lg transition-colors cursor-default">
                                  <FileText className="w-4 h-4 text-gray-400" />
                                  <span className="font-inter text-[14px] text-gray-700 underline underline-offset-4 decoration-gray-100">{topic}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description Detail */}
              <div>
                <h2 className="font-grotesk font-bold text-[24px] text-primary mb-4">Description</h2>
                <div className="font-inter text-[15px] text-gray-700 space-y-4 leading-relaxed">
                  <p>
                    This TTRC program is an intensive, level-based learning experience designed to take you from foundational basics to expert-level engineering. Each level builds upon the previous one, ensuring a solid grasp of both theory and practical application.
                  </p>
                  <p>
                    Our trainers are industry experts who provide personalized guidance at your doorstep. You'll receive all necessary hardware kits and study materials as part of the enrollment.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Pricing/Booking Card - Udemy Style */}
            <div className="hidden lg:block">
              <div className="sticky top-[100px] bg-white border border-gray-200 shadow-xl rounded-sm overflow-hidden flex flex-col z-20">
                <div className="aspect-video relative">
                  <img src={course.image_url} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      <MonitorPlay className="w-8 h-8 text-primary ml-1" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-grotesk font-bold text-[32px] text-primary">{course.price.split('/')[0]}</span>
                    <span className="text-gray-400 line-through text-[16px]">{course.original_price}</span>
                    <span className="text-accent font-inter text-[14px] font-bold">20% off</span>
                  </div>

                  <div className="space-y-3">
                    <Button asChild className="w-full bg-accent hover:bg-accent-600 text-white font-grotesk font-bold text-[16px] h-12 rounded-none shadow-md">
                      <Link to={`/student/book-demo/${id}`}>
                        Book Free Demo
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full border-primary text-primary font-grotesk font-bold text-[16px] h-12 rounded-none hover:bg-gray-50">
                      Enroll Now
                    </Button>
                  </div>

                  <p className="text-[12px] text-gray-500 text-center">30-Day Money-Back Guarantee</p>

                  <div className="space-y-4">
                    <div className="font-grotesk font-bold text-[14px] text-primary">This course includes:</div>
                    <div className="grid gap-3">
                      {[
                        { icon: MonitorPlay, text: "20 hours on-demand video" },
                        { icon: FileText, text: "8 Level-wise assignments" },
                        { icon: BookOpen, text: "Printed study materials" },
                        { icon: Award, text: "Certificate of completion" },
                        { icon: Calendar, text: "Flexible schedule" }
                      ].map((inc, i) => (
                        <div key={i} className="flex items-center gap-3 text-gray-600 text-[13px]">
                          <inc.icon className="w-4 h-4" /> {inc.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CourseDetail;

