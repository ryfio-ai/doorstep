import { Calendar, Clock, BookOpen, ChevronRight, Award, CheckCircle2, Flame, Coins, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';
import BadgeGallery from '../../components/student/BadgeGallery';
import { Link } from 'react-router-dom';

export const StudentDashboard: React.FC = () => {
  const { user, studentProfile, isParent } = useAuth();
  const { stats } = useGamification();

  return (
    <PageTransition>
      <div className="max-w-[1100px] mx-auto space-y-8">
        
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10 flex-1">
            <h2 className="font-poppins font-bold text-[28px] text-primary">
              Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋
            </h2>
            <p className="font-inter text-[15px] text-gray-500 mt-1">
              {isParent 
                ? `Managing learning for ${studentProfile?.children_count || 0} child(ren).`
                : `You've completed ${studentProfile?.wallet_balance || 0} modules this month. Keep it up!`}
            </p>
          </div>
          
          <div className="relative z-10 flex gap-4 w-full md:w-auto">
            {/* Streak Counter */}
            <Link to="/student/wallet" className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex-1 md:w-32 text-center group transition-all hover:bg-orange-100">
              <div className="flex items-center justify-center gap-1">
                <Flame size={24} className={`${(stats?.streak_days || 0) > 0 ? 'text-orange-500 fill-orange-500' : 'text-gray-300'} animate-pulse`} />
                <div className="font-poppins font-bold text-[24px] text-primary">
                  {stats?.streak_days || 0}
                </div>
              </div>
              <div className="font-inter text-[12px] text-gray-600">Day Streak</div>
            </Link>
            
            {/* EduCoins */}
            <Link to="/student/wallet" className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex-1 md:w-32 text-center group transition-all hover:bg-yellow-100">
              <div className="flex items-center justify-center gap-1">
                <Coins size={24} className="text-yellow-500" />
                <div className="font-poppins font-bold text-[24px] text-primary">
                  {stats?.educoins || 0}
                </div>
              </div>
              <div className="font-inter text-[12px] text-gray-600">EduCoins</div>
            </Link>

            {/* Level */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex-1 md:w-32 text-center">
              <div className="flex items-center justify-center gap-1">
                <Zap size={24} className="text-blue-500" />
                <div className="font-poppins font-bold text-[24px] text-primary">
                  {stats?.level || 1}
                </div>
              </div>
              <div className="font-inter text-[12px] text-gray-600">Level</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column (2/3 width on desktop) */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* Next Class Banner */}
            <div>
              <h3 className="font-poppins font-bold text-[18px] text-primary mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" /> Upcoming Schedule
              </h3>
              
              <div className="bg-navy-dark rounded-2xl p-6 text-white relative overflow-hidden shadow-orange-hover">
                <div className="absolute right-0 bottom-0 opacity-10">
                  <BookOpen className="w-48 h-48 -mr-10 -mb-10" />
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 relative z-10">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 min-w-[120px] flex flex-col items-center justify-center border border-white/20">
                    <span className="font-poppins font-bold text-[14px] text-white/80 uppercase">Today</span>
                    <span className="font-poppins font-extrabold text-[32px] text-accent leading-none my-1">4:00</span>
                    <span className="font-inter font-medium text-[14px] text-white/80">PM</span>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 bg-success/20 text-success-light font-inter text-[11px] px-2.5 py-1 rounded-full mb-3 w-max">
                      <Clock className="w-3 h-3" /> Starts in 2 hours
                    </div>
                    <h4 className="font-poppins font-bold text-[22px] text-white leading-tight">Python Programming - Logic Building</h4>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-orange-grad flex items-center justify-center font-bold text-[14px]">R</div>
                        <span className="font-inter text-[14px] text-white/80">Ravi Kumar (Trainer)</span>
                      </div>
                      <span className="text-white/30">•</span>
                      <span className="font-inter text-[14px] text-white/80">📍 At your home</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Courses */}
            <div>
               <div className="flex justify-between items-center mb-4">
                <h3 className="font-poppins font-bold text-[18px] text-primary flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-accent" /> My Courses
                </h3>
                <Button variant="link" className="text-accent font-inter text-[14px] p-0 h-auto flex items-center">
                  View All <ChevronRight className="w-4 h-4 ml-0.5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { title: 'Python Mastery', progress: 45, next: 'Variables & Data Types', icon: '💻' },
                  { title: '10th Std Mathematics', progress: 80, next: 'Trigonometry Pt. 2', icon: '🧮' }
                ].map((course, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-accent hover:shadow-card transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[24px]">
                        {course.icon}
                      </div>
                      <span className="font-poppins font-semibold text-[13px] text-primary bg-gray-100 px-3 py-1 rounded-full">
                        {course.progress}%
                      </span>
                    </div>
                    
                    <h4 className="font-poppins font-bold text-[16px] text-primary mb-1">{course.title}</h4>
                    <p className="font-inter text-[13px] text-gray-500 mb-4">Next: {course.next}</p>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: `${course.progress}%` }} transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-accent rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

          {/* Right Column (1/3 width on desktop) */}
          <div className="space-y-8">
            
            {/* Action Needed Card */}
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
              <h3 className="font-poppins font-bold text-[16px] text-primary mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" /> Action Needed
              </h3>
              <p className="font-inter text-[13px] text-gray-600 mb-4 leading-relaxed">
                Please confirm the completion of your last Mathematics demo class to generate the invoice.
              </p>
              <Button className="w-full bg-accent hover:bg-accent-600 text-white font-poppins font-semibold text-[13px] h-10 rounded-lg">
                Confirm Class
              </Button>
            </div>

            {/* Achievements & Badges */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-poppins font-bold text-[18px] text-primary flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" /> My Badges
                </h3>
                <Link to="/student/wallet" className="text-accent font-inter text-[13px] hover:underline">
                  View Wallet
                </Link>
              </div>
              
              <BadgeGallery />
            </div>

          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default StudentDashboard;
