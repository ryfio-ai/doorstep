import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Clock, BookOpen } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { Link, useSearchParams } from 'react-router-dom';

const categories = ["All", "Python", "Mathematics", "Science", "AI & ML", "Robotics", "School Subjects"];

const courses = [
  { id: 1, title: 'Python & Machine Learning Masterclass', category: 'AI & ML', rating: 4.8, students: '1.2k', duration: '3 Months', price: '₹1,999/mo', originalPrice: '₹2,499', icon: '🤖', bg: 'bg-cat-ai' },
  { id: 2, title: '10th Std Mathematics CBSE', category: 'School Subjects', rating: 4.9, students: '850', duration: '6 Months', price: '₹1,499/mo', originalPrice: '₹1,999', icon: '🧮', bg: 'bg-cat-mathematics' },
  { id: 3, title: 'Basic Electronics & IoT', category: 'Robotics', rating: 4.7, students: '420', duration: '2 Months', price: '₹2,199/mo', originalPrice: '₹2,999', icon: '🔌', bg: 'bg-cat-electronics' },
  { id: 4, title: 'Spoken English & Communication', category: 'School Subjects', rating: 4.8, students: '2k+', duration: '3 Months', price: '₹999/mo', originalPrice: '₹1,499', icon: '🗣️', bg: 'bg-cat-english' },
  { id: 5, title: 'Physics for 12th State Board', category: 'Science', rating: 4.6, students: '600', duration: '8 Months', price: '₹1,599/mo', originalPrice: '₹1,999', icon: '🔬', bg: 'bg-cat-science' },
  { id: 6, title: 'Advanced Robotics Build Kit', category: 'Robotics', rating: 4.9, students: '300', duration: '4 Months', price: '₹3,499/mo', originalPrice: '₹4,500', icon: '🦾', bg: 'bg-cat-robotics' },
];

export const CourseDiscovery: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCat, setActiveCat] = useState("All");
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "All");

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
      <div className="max-w-[1200px] mx-auto space-y-8">
        
        {/* Header & Search */}
        <div className="bg-navy-dark rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-poppins font-bold text-[32px] md:text-[40px] leading-tight mb-4">
              Find the Perfect <br/><span className="text-accent">Home Tutor</span>
            </h2>
            <p className="font-inter text-[16px] text-white/80 mb-8">
              Browse through 48+ verified courses taught at your doorstep.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search subjects, topics, or skills..." 
                  className="w-full pl-12 pr-4 py-4 bg-white text-primary rounded-xl font-inter text-[15px] focus:outline-none focus:ring-4 focus:ring-accent/30 transition-all"
                />
              </div>
              <Button className="bg-accent hover:bg-accent-600 text-white px-8 py-4 h-auto rounded-xl font-poppins font-semibold shadow-orange shrink-0">
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full font-inter font-medium text-[13px] transition-all duration-200 ${
                  activeCat === cat 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2 shrink-0">
            <select 
              value={selectedCity}
              onChange={handleCityChange}
              className="hidden md:block bg-gray-50 border border-gray-200 text-gray-600 text-[13px] font-inter font-medium rounded-lg px-3 py-2 outline-none focus:border-accent"
            >
              <option value="All">All Cities</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Chennai">Chennai</option>
              <option value="Madurai">Madurai</option>
              <option value="Trichy">Trichy</option>
              <option value="Bangalore">Bangalore</option>
            </select>
            <Button variant="outline" className="hidden md:flex items-center gap-2 border-gray-200 text-gray-600 rounded-lg">
              <Filter className="w-4 h-4" /> Filter
            </Button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course, i) => (
            <motion.div 
              key={course.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden hover:-translate-y-1.5 hover:shadow-hover hover:border-accent transition-all duration-300 flex flex-col"
            >
              <div className={`h-[160px] ${course.bg} relative flex items-center justify-center`}>
                <div className="absolute top-3 left-3 bg-black/25 backdrop-blur-sm text-white font-inter font-medium text-[11px] px-3 py-1 rounded-full">
                  {course.category}
                </div>
                <div className="text-[64px] drop-shadow-md">{course.icon}</div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-poppins font-semibold text-[17px] text-primary leading-[1.4] line-clamp-2 mb-3">
                  {course.title}
                </h3>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 font-inter font-semibold text-[13px] text-primary">
                    <Star className="w-4 h-4 text-warning fill-warning" /> {course.rating}
                  </div>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center gap-1 font-inter text-[13px] text-gray-500">
                    <BookOpen className="w-4 h-4" /> {course.students}
                  </div>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center gap-1 font-inter text-[13px] text-gray-500">
                    <Clock className="w-4 h-4" /> {course.duration}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div>
                    <div className="text-gray-400 line-through text-[12px] font-inter">{course.originalPrice}</div>
                    <div className="text-accent font-poppins font-bold text-[18px]">{course.price}</div>
                  </div>
                  <Button asChild className="bg-accent/10 text-accent hover:bg-accent hover:text-white font-poppins font-semibold text-[13px] px-4 py-2 rounded-lg transition-colors">
                    <Link to={`/courses/${course.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </PageTransition>
  );
};

export default CourseDiscovery;
