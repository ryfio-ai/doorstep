import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Clock, BookOpen, ArrowRight, TrendingUp, Users } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabase';

const categories = ["All", "Robotics", "Electronics", "Embedded Systems", "Coding", "3D Design"];

export const CourseDiscovery: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCat, setActiveCat] = useState("All");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('courses').select('*');
      if (data) setCourses(data);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  const filteredCourses = activeCat === "All" ? courses : courses.filter(c => c.category === activeCat);

  return (
    <PageTransition>
      <div className="bg-white min-h-screen pt-6 pb-24 font-inter text-textPrimary">
        
        {/* Hero Section */}
        <div className="bg-offWhite border-b border-borderSubtle py-12 mb-12">
          <div className="page-container">
            <div className="max-w-4xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="inline-flex items-center gap-3 bg-brandOrange/5 text-brandOrange font-jakarta font-extrabold text-[12px] uppercase tracking-[0.2em] px-5 py-2 rounded-full mb-8 border border-brandOrange/10">
                  <TrendingUp className="w-4 h-4" /> Professional TTRC Programs
                </div>
                <h1 className="font-jakarta font-extrabold text-[48px] md:text-[80px] text-textPrimary leading-[0.9] mb-10 tracking-tighter italic">
                  Unlock Your Potential with <br/>
                  <span className="text-gradient-orange underline decoration-brandOrange/10 underline-offset-8">TTRC Engineers</span>
                </h1>
                <p className="font-inter text-[20px] text-textSecondary mb-12 leading-relaxed font-medium max-w-2xl">
                  Hands-on engineering programs designed to turn curious minds into future innovators. From Robotics to ROS, we bring the lab to your doorstep.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 max-w-2xl p-2 bg-white rounded-3xl shadow-premium-elevated border border-borderSubtle">
                  <div className="relative flex-1">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-brandOrange/40" />
                    <input 
                      type="text" 
                      placeholder="What do you want to learn today?" 
                      className="w-full pl-16 pr-6 py-5 bg-transparent rounded-2xl font-inter text-[16px] text-textPrimary focus:outline-none transition-all"
                    />
                  </div>
                  <Button className="btn-primary h-auto py-5 px-12 rounded-2xl text-[16px] shrink-0 shadow-premium-card">
                    Search Programs
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="page-container space-y-16">
          
          {/* Categories & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-8 justify-between items-center bg-offWhite p-3 rounded-[32px] border border-borderSubtle">
            <div className="flex overflow-x-auto gap-3 w-full md:w-auto pb-2 md:pb-0 scrollbar-hide px-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`whitespace-nowrap px-8 py-3.5 rounded-2xl font-jakarta font-extrabold text-[14px] transition-all duration-300 uppercase tracking-widest ${
                    activeCat === cat 
                      ? 'bg-brandOrange text-white shadow-premium-card scale-105' 
                      : 'bg-transparent text-textPrimary/40 hover:text-textPrimary hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="hidden md:flex gap-4 px-4 border-l border-borderSubtle">
              <Button variant="ghost" className="flex items-center gap-3 text-textPrimary/60 font-jakarta font-extrabold rounded-2xl hover:bg-white uppercase tracking-widest text-[12px]">
                <Filter className="w-4 h-4" /> Advanced Filter
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <h2 className="font-jakarta font-extrabold text-[28px] text-textPrimary tracking-tight italic">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'Premium Path' : 'Premium Paths'} Found
            </h2>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {loading ? (
              Array(8).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse bg-offWhite rounded-[40px] border border-borderSubtle h-[460px]"></div>
              ))
            ) : (
              filteredCourses.map((course, i) => (
                <motion.div 
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="premium-card overflow-hidden flex flex-col group cursor-pointer border-none shadow-premium-card hover:shadow-premium-elevated"
                >
                  <Link to={`/courses/${course.id}`} className="flex flex-col h-full">
                    {/* Course Thumbnail */}
                    <div className="aspect-[4/3] relative overflow-hidden bg-offWhite">
                      <img 
                        src={course.image_url} 
                        alt={course.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xl px-4 py-1.5 rounded-full shadow-lg border border-white/20">
                        <span className="font-jakarta font-extrabold text-[10px] text-brandOrange uppercase tracking-[0.2em]">{course.category}</span>
                      </div>
                    </div>
                    
                    {/* Course Content */}
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="font-jakarta font-extrabold text-[20px] text-textPrimary leading-tight mb-3 line-clamp-2 group-hover:text-brandOrange transition-colors italic">
                        {course.title}
                      </h3>
                      
                      <p className="font-inter text-[14px] text-textSecondary line-clamp-2 mb-6 font-medium leading-relaxed italic opacity-60">
                        {course.description}
                      </p>

                      <div className="flex items-center gap-2 mb-6">
                        <span className="font-jakarta font-extrabold text-[15px] text-vividOrange">{course.rating}</span>
                        <div className="flex items-center gap-1">
                          {Array(5).fill(0).map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(course.rating) ? 'text-brandOrange fill-brandOrange' : 'text-offWhite fill-offWhite border-borderSubtle'}`} />
                          ))}
                        </div>
                        <span className="font-inter text-[13px] text-textSecondary font-bold opacity-40">({course.students})</span>
                      </div>

                      <div className="flex items-center gap-6 text-[13px] text-textPrimary/40 mb-8 font-extrabold uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" /> {course.duration}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" /> {course.diff}
                        </div>
                      </div>

                      <div className="mt-auto pt-6 border-t border-offWhite flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-textPrimary font-jakarta font-extrabold text-[24px] tracking-tighter">{course.price.split('/')[0]}</span>
                          <span className="text-[13px] text-textSecondary line-through font-bold opacity-40">{course.original_price}</span>
                        </div>
                        <div className="bg-brandOrange/10 text-brandOrange font-jakarta font-extrabold text-[11px] px-4 py-1.5 rounded-full uppercase tracking-widest">
                          Premium Path
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>

          {/* Call to Action */}
          <div className="bg-brandBlue rounded-[60px] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-premium-elevated mt-24">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brandOrange/10 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="font-jakarta font-extrabold text-[40px] md:text-[64px] mb-8 leading-[0.9] tracking-tighter italic">Not sure where to start?</h2>
              <p className="font-inter text-[20px] md:text-[24px] text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                Take our professional career assessment to find the <span className="text-white italic underline decoration-brandOrange font-bold">perfect engineering path</span> for your future.
              </p>
              <Button className="btn-primary h-auto py-6 px-16 rounded-[28px] text-[20px] shadow-2xl">
                Start Assessment <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default CourseDiscovery;

