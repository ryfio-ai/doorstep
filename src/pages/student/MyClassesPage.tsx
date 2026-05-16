import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../../components/ui/badge';
import { MapPin, User, Calendar } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { PageTransition } from '../../components/shared/PageTransition';
import { Link } from 'react-router-dom';

const MyClassesPage: React.FC = () => {
  const classes: any[] = []; // Empty for fresh account

  return (
    <PageTransition>
      <div className="max-w-[1100px] mx-auto space-y-10 font-inter">
        <div className="flex flex-col space-y-4">
          <h1 className="font-jakarta text-[36px] md:text-[48px] font-extrabold text-textPrimary leading-none tracking-tighter italic">
            My <span className="text-brandOrange underline decoration-brandOrange/10">Schedule</span>
          </h1>
          <p className="font-inter text-[18px] text-textSecondary font-medium opacity-60 italic">Manage your upcoming home & online sessions.</p>
        </div>

        {classes.length === 0 ? (
          <div className="bg-white rounded-[48px] p-16 md:p-24 border-2 border-dashed border-borderSubtle flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full bg-offWhite flex items-center justify-center mb-8 text-textSecondary/20">
              <Calendar size={48} />
            </div>
            <h2 className="font-jakarta font-extrabold text-[28px] text-textPrimary italic mb-4">No Classes Found</h2>
            <p className="font-inter text-[17px] text-textSecondary font-medium italic opacity-60 mb-10 max-w-md">Your schedule is currently empty. Explore our courses to start your learning journey.</p>
            <Link to="/student/courses">
              <Button className="btn-primary h-14 rounded-2xl px-12 text-[16px]">
                Explore Courses
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8">
            {classes.map((session) => (
              <motion.div 
                key={session.id}
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-[40px] p-8 md:p-10 border border-borderSubtle shadow-premium-card group transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brandOrange/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brandOrange/10 transition-all"></div>
                <div className="flex flex-col md:flex-row gap-10 items-start md:items-center relative z-10">
                   {/* Class details here if any */}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default MyClassesPage;
