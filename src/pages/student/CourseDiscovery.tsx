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
      <div className="bg-[#F8F9FB] min-h-screen pt-[80px] pb-24">
        
        {/* Hero Section - Clean White/Light Gray with Orange Accents */}
        <div className="bg-white border-b border-gray-200 py-16 md:py-20">
          <div className="page-container">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-orange-50 text-accent font-grotesk font-bold text-[12px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                <TrendingUp className="w-4 h-4" /> Professional TTRC Programs
              </div>
              <h1 className="font-grotesk font-bold text-[44px] md:text-[64px] text-primary leading-[1.1] mb-6 tracking-tight">
                Unlock Your Potential with <span className="text-accent underline decoration-orange-200 underline-offset-8">TTRC Engineers</span>
              </h1>
              <p className="font-inter text-[18px] text-gray-600 mb-10 leading-relaxed">
                Hands-on engineering programs designed to turn curious minds into future innovators. From Robotics to ROS, we bring the lab to your doorstep.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="What do you want to learn?" 
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-lg font-inter text-[15px] focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all shadow-sm"
                  />
                </div>
                <Button className="bg-accent hover:bg-accent-600 text-white px-8 py-4 h-auto rounded-lg font-grotesk font-bold text-[16px] shadow-md hover:shadow-lg transition-all shrink-0">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="page-container mt-12 space-y-12">
          
          {/* Categories & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white p-2 rounded-xl shadow-sm border border-gray-200">
            <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2 md:pb-0 scrollbar-hide px-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-lg font-grotesk font-semibold text-[14px] transition-all duration-200 ${
                    activeCat === cat 
                      ? 'bg-accent text-white shadow-orange-sm' 
                      : 'bg-transparent text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="hidden md:flex gap-4 px-2">
              <Button variant="outline" className="flex items-center gap-2 border-gray-200 text-gray-700 font-grotesk font-semibold rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" /> Filter
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <h2 className="font-grotesk font-bold text-[24px] text-primary">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'Program' : 'Programs'} Found
            </h2>
          </div>

          {/* Course Grid - Udemy/Coursera Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {loading ? (
              Array(8).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-xl border border-gray-200 overflow-hidden h-[400px]"></div>
              ))
            ) : (
              filteredCourses.map((course, i) => (
                <motion.div 
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  <Link to={`/courses/${course.id}`} className="flex flex-col h-full">
                    {/* Course Thumbnail */}
                    <div className="aspect-video relative overflow-hidden bg-gray-100">
                      <img 
                        src={course.image_url} 
                        alt={course.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded shadow-sm">
                        <span className="font-grotesk font-bold text-[10px] text-accent uppercase tracking-wider">{course.category}</span>
                      </div>
                    </div>
                    
                    {/* Course Content */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-grotesk font-bold text-[17px] text-primary leading-[1.3] mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                        {course.title}
                      </h3>
                      
                      <p className="font-inter text-[13px] text-gray-500 line-clamp-2 mb-3">
                        {course.description}
                      </p>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-grotesk font-bold text-[14px] text-orange-600">{course.rating}</span>
                        <div className="flex items-center gap-0.5">
                          {Array(5).fill(0).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(course.rating) ? 'text-orange-500 fill-orange-500' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="font-inter text-[12px] text-gray-400">({course.students})</span>
                      </div>

                      <div className="flex items-center gap-4 text-[13px] text-gray-500 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-gray-400" /> {course.duration}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-gray-400" /> {course.diff}
                        </div>
                      </div>

                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-primary font-grotesk font-bold text-[20px]">{course.price.split('/')[0]}</span>
                          <span className="text-[12px] text-gray-400 line-through">{course.original_price}</span>
                        </div>
                        <div className="bg-orange-50 text-accent font-grotesk font-bold text-[11px] px-3 py-1 rounded uppercase tracking-tighter">
                          Best Seller
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>

          {/* Call to Action */}
          <div className="bg-primary rounded-2xl p-10 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px]"></div>
            <div className="relative z-10">
              <h2 className="font-grotesk font-bold text-[32px] md:text-[40px] mb-4">Not sure which program to pick?</h2>
              <p className="font-inter text-[18px] text-white/80 mb-8 max-w-xl mx-auto">
                Take our quick assessment to find the perfect engineering path for your future.
              </p>
              <Button className="bg-accent hover:bg-accent-600 text-white px-10 py-6 h-auto rounded-xl font-grotesk font-bold text-[18px] shadow-lg">
                Start Career Assessment
              </Button>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default CourseDiscovery;

