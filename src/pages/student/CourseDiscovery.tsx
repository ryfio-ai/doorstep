import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Clock, BookOpen, ArrowRight } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const categories = ["All", "Python", "Mathematics", "Science", "AI & ML", "Robotics", "School Subjects"];

const courses = [
  { id: 1, title: 'Python & Machine Learning Masterclass', category: 'AI & ML', rating: 4.8, students: '1.2k', duration: '3 Months', price: '₹1,999/mo', originalPrice: '₹2,499', icon: '🤖', bg: 'bg-cat-ai', diff: 'Intermediate' },
  { id: 2, title: '10th Std Mathematics CBSE', category: 'School Subjects', rating: 4.9, students: '850', duration: '6 Months', price: '₹1,499/mo', originalPrice: '₹1,999', icon: '🧮', bg: 'bg-cat-mathematics', diff: 'Beginner' },
  { id: 3, title: 'Basic Electronics & IoT', category: 'Robotics', rating: 4.7, students: '420', duration: '2 Months', price: '₹2,199/mo', originalPrice: '₹2,999', icon: '🔌', bg: 'bg-cat-electronics', diff: 'Beginner' },
  { id: 4, title: 'Spoken English & Communication', category: 'School Subjects', rating: 4.8, students: '2k+', duration: '3 Months', price: '₹999/mo', originalPrice: '₹1,499', icon: '🗣️', bg: 'bg-cat-english', diff: 'Beginner' },
  { id: 5, title: 'Physics for 12th State Board', category: 'Science', rating: 4.6, students: '600', duration: '8 Months', price: '₹1,599/mo', originalPrice: '₹1,999', icon: '🔬', bg: 'bg-cat-science', diff: 'Intermediate' },
  { id: 6, title: 'Advanced Robotics Build Kit', category: 'Robotics', rating: 4.9, students: '300', duration: '4 Months', price: '₹3,499/mo', originalPrice: '₹4,500', icon: '🦾', bg: 'bg-cat-robotics', diff: 'Advanced' },
];

export const CourseDiscovery: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCat, setActiveCat] = useState("All");
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "All");
  const { t } = useTranslation();

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);
    if (city === "All") {
      searchParams.delete("city");
    } else {
      searchParams.set("city", city);
    }
    setSearchParams(searchParams);
  };

  const filteredCourses = activeCat === "All" ? courses : courses.filter(c => c.category === activeCat);

  return (
    <PageTransition>
      <div className="bg-background min-h-screen pt-[100px] pb-24">
        <div className="page-container space-y-12">
          
          {/* Header & Search */}
          <div className="bg-hero-gradient rounded-3xl p-10 md:p-16 text-white relative overflow-hidden shadow-navy">
            {/* Animated Mesh / Particles */}
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] pointer-events-none animate-pulse-orange"></div>
            
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                <span className="font-grotesk font-medium text-[12px] tracking-[0.1em] text-white uppercase">Platform Courses</span>
              </div>
              <h2 className="font-grotesk font-bold text-[40px] md:text-[56px] leading-[1.1] mb-6 tracking-tight">
                Find the Perfect <br/><span className="text-accent">Program</span>
              </h2>
              <p className="font-inter text-[18px] text-white/80 mb-10 leading-relaxed max-w-[500px]">
                Browse through 48+ verified engineering, coding, and academic courses taught at your doorstep.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                  <input 
                    type="text" 
                    placeholder="Search Python, Robotics, AI..." 
                    className="w-full pl-14 pr-5 py-4 bg-white text-primary rounded-2xl font-inter text-[15px] focus:outline-none focus:ring-4 focus:ring-accent/30 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.1)] border-none"
                  />
                </div>
                <Button className="bg-accent hover:bg-accent-600 text-white px-8 py-4 h-auto rounded-2xl font-grotesk font-bold text-[16px] shadow-orange hover:shadow-orange-lg hover:scale-[1.02] shrink-0 transition-all">
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl shadow-card border border-gray-100/50">
            <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2 md:pb-0 scrollbar-hide px-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full font-grotesk font-semibold text-[14px] transition-all duration-300 ${
                    activeCat === cat 
                      ? 'bg-primary text-white shadow-md transform scale-[1.02]' 
                      : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="flex gap-3 shrink-0 px-2">
              <select 
                value={selectedCity}
                onChange={handleCityChange}
                className="hidden md:block bg-gray-50/50 border border-gray-200 text-primary text-[14px] font-inter font-medium rounded-xl px-4 py-2.5 outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
              >
                <option value="All">All Cities</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Chennai">Chennai</option>
                <option value="Madurai">Madurai</option>
                <option value="Trichy">Trichy</option>
                <option value="Bangalore">Bangalore</option>
              </select>
              <Button variant="outline" className="hidden md:flex items-center gap-2 border-gray-200 text-primary font-grotesk font-semibold rounded-xl hover:bg-gray-50">
                <Filter className="w-4 h-4" /> Filter
              </Button>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, i) => (
              <motion.div 
                key={course.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="bg-white rounded-3xl shadow-card border border-gray-100/50 overflow-hidden hover:-translate-y-2 hover:shadow-hover transition-all duration-400 flex flex-col group relative"
              >
                {/* Image / Header area */}
                <div className={`h-[180px] ${course.bg} relative flex items-center justify-center overflow-hidden`}>
                  {/* Category Gradient Top Bar */}
                  <div className="absolute top-0 left-0 w-full h-[40px] bg-gradient-to-b from-black/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/20 text-white font-grotesk font-semibold text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full">
                    {course.category}
                  </div>
                  <div className="text-[72px] drop-shadow-xl transform group-hover:scale-110 transition-transform duration-500">{course.icon}</div>
                </div>
                
                <div className="p-8 flex flex-col flex-1 bg-white relative">
                  {/* Difficulty Badge */}
                  <div className="absolute -top-4 right-6 bg-white shadow-md border border-gray-100 text-primary font-grotesk font-bold text-[11px] px-4 py-1.5 rounded-full uppercase tracking-wider">
                    {course.diff}
                  </div>

                  <h3 className="font-grotesk font-bold text-[22px] text-primary leading-[1.3] mb-4 group-hover:text-accent transition-colors">
                    {course.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1.5 font-grotesk font-bold text-[14px] text-primary">
                      <Star className="w-4 h-4 text-warning fill-warning" /> {course.rating}
                    </div>
                    <span className="w-1 h-1 rounded-full bg-gray-200" />
                    <div className="flex items-center gap-1.5 font-inter font-medium text-[13px] text-gray-500">
                      <BookOpen className="w-4 h-4 text-gray-400" /> {course.students}
                    </div>
                    <span className="w-1 h-1 rounded-full bg-gray-200" />
                    <div className="flex items-center gap-1.5 font-inter font-medium text-[13px] text-gray-500">
                      <Clock className="w-4 h-4 text-gray-400" /> {course.duration}
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-end">
                    <div>
                      <div className="text-gray-400 line-through text-[13px] font-inter mb-0.5">{course.originalPrice}</div>
                      <div className="text-primary font-grotesk font-bold text-[24px] leading-none">
                        {course.price.split('/')[0]}<span className="text-[14px] text-gray-400 font-inter font-normal">/{course.price.split('/')[1]}</span>
                      </div>
                    </div>
                    <Button asChild className="bg-primary hover:bg-navy-dark text-white font-grotesk font-bold text-[14px] px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg group-hover:bg-accent group-hover:shadow-orange">
                      <Link to={`/courses/${course.id}`} className="flex items-center gap-2">
                        {t('courses.enroll')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default CourseDiscovery;
