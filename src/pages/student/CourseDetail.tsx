import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, BookOpen, CheckCircle2, ChevronDown, MonitorPlay, FileText, ChevronLeft, Calendar } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';

export const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const curriculum = [
    { title: "Introduction & Setup", lessons: 4, hours: "2 hrs", content: ["What is Python?", "Installing IDEs", "Your first program", "Variables & Types"] },
    { title: "Control Flow & Loops", lessons: 5, hours: "3 hrs", content: ["If/Else statements", "For loops", "While loops", "Break & Continue", "Practical project"] },
    { title: "Functions & Modules", lessons: 4, hours: "4 hrs", content: ["Defining functions", "Arguments & Returns", "Lambda functions", "Importing modules"] },
    { title: "Data Structures", lessons: 6, hours: "5 hrs", content: ["Lists & Tuples", "Dictionaries", "Sets", "List comprehensions", "Data manipulation"] },
    { title: "Final Project", lessons: 2, hours: "6 hrs", content: ["Project planning", "Building a complete application"] },
  ];

  return (
    <PageTransition>
      <div className="max-w-[1200px] mx-auto pb-20">
        
        {/* Back Link */}
        <Link to="/student/courses" className="inline-flex items-center gap-1 text-gray-500 hover:text-primary font-inter text-[14px] mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 xl:gap-12">
          
          {/* Left Column: Course Content */}
          <div className="space-y-10">
            
            {/* Header section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-cat-ai/20 text-accent font-inter font-semibold text-[12px] px-3 py-1 rounded-full uppercase tracking-wider">AI & ML</span>
                <span className="flex items-center gap-1 text-warning font-inter font-semibold text-[13px] bg-warning/10 px-2 py-1 rounded-full"><Star className="w-3.5 h-3.5 fill-warning" /> 4.8 (120 reviews)</span>
              </div>
              <h1 className="font-poppins font-bold text-[32px] md:text-[40px] text-primary leading-[1.2] mb-4">
                Python & Machine Learning Masterclass
              </h1>
              <p className="font-inter text-[16px] text-gray-500 leading-[1.6] mb-6">
                Master Python from scratch and dive into Machine Learning. This comprehensive home tutoring course is designed for beginners to build real-world AI applications.
              </p>
              <div className="flex flex-wrap items-center gap-6 border-y border-gray-100 py-4">
                <div className="flex items-center gap-2 font-inter text-[14px] text-gray-600"><Clock className="w-5 h-5 text-accent" /> 3 Months</div>
                <div className="flex items-center gap-2 font-inter text-[14px] text-gray-600"><BookOpen className="w-5 h-5 text-accent" /> 21 Lessons</div>
                <div className="flex items-center gap-2 font-inter text-[14px] text-gray-600"><MonitorPlay className="w-5 h-5 text-accent" /> 20 Hours of teaching</div>
              </div>
            </div>

            {/* What you'll learn */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8">
              <h2 className="font-poppins font-bold text-[20px] text-primary mb-6">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Write clean, professional Python code",
                  "Understand complex data structures",
                  "Build complete machine learning models",
                  "Work with Pandas, NumPy & Scikit-Learn",
                  "Complete 3 real-world portfolio projects",
                  "Interview preparation for Python roles"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="font-inter text-[14px] text-gray-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Accordion */}
            <div>
              <h2 className="font-poppins font-bold text-[24px] text-primary mb-6">Course Curriculum</h2>
              <div className="space-y-3">
                {curriculum.map((section, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button 
                      onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                      className="w-full bg-white flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4 text-left">
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${activeAccordion === idx ? 'rotate-180 text-accent' : ''}`} />
                        <div>
                          <div className="font-poppins font-semibold text-[16px] text-primary">{section.title}</div>
                          <div className="font-inter text-[13px] text-gray-500 mt-0.5">{section.lessons} lessons • {section.hours}</div>
                        </div>
                      </div>
                    </button>
                    <AnimatePresence>
                      {activeAccordion === idx && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="bg-gray-50 border-t border-gray-200 overflow-hidden"
                        >
                          <div className="p-2">
                            {section.content.map((item, i) => (
                              <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 rounded-lg transition-colors cursor-default">
                                <FileText className="w-4 h-4 text-gray-400" />
                                <span className="font-inter text-[14px] text-gray-700">{item}</span>
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

          </div>

          {/* Right Column: Sticky Booking Panel */}
          <div className="lg:relative">
            <div className="lg:sticky lg:top-[100px] bg-white rounded-2xl shadow-modal border border-gray-100 overflow-hidden flex flex-col">
              <div className="h-[200px] bg-cat-ai flex items-center justify-center relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="text-[80px] drop-shadow-lg relative z-10">🤖</div>
              </div>
              
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex items-end gap-2 mb-2">
                  <span className="font-poppins font-bold text-[32px] text-primary leading-none">₹1,999</span>
                  <span className="font-inter text-[16px] text-gray-500 line-through mb-1">₹2,499</span>
                </div>
                <div className="font-inter text-[13px] text-success font-medium bg-success/10 w-max px-2 py-0.5 rounded mb-6">20% off for first month</div>
                
                <Button asChild className="w-full bg-accent hover:bg-accent-600 text-white font-poppins font-semibold text-[16px] h-14 rounded-xl shadow-orange mb-4">
                  <Link to={`/student/book-demo/${id}`}>
                    <Calendar className="w-5 h-5 mr-2" /> Book Free Demo Class
                  </Link>
                </Button>
                
                <p className="font-inter text-[12px] text-center text-gray-500 mb-6">No credit card required for demo</p>
                
                <div className="space-y-3 mb-6">
                  <div className="font-poppins font-semibold text-[14px] text-primary mb-2">This course includes:</div>
                  {[
                    "1-on-1 Doorstep Tutoring",
                    "3 Months duration (20 hrs)",
                    "Printed study materials",
                    "Certificate of completion",
                    "Flexible rescheduling"
                  ].map((inc, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span className="font-inter text-[13px] text-gray-600">{inc}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-grad flex items-center justify-center font-bold text-white text-[16px]">T</div>
                  <div>
                    <div className="font-poppins font-semibold text-[14px] text-primary">Taught by Top 5%</div>
                    <div className="font-inter text-[12px] text-gray-500">Verified Expert Trainers</div>
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
