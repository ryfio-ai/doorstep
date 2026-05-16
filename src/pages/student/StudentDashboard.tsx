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
      <div className="max-w-[1200px] mx-auto space-y-12 font-inter text-textPrimary">
        
        {/* Welcome Section */}
        <div className="premium-card p-10 flex flex-col md:flex-row justify-between items-center gap-10 relative overflow-hidden border-none shadow-premium-elevated bg-white">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brandOrange/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 flex-1">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="font-jakarta font-extrabold text-[32px] md:text-[40px] text-textPrimary leading-tight tracking-tighter italic">
                Welcome back, <span className="text-brandOrange underline decoration-brandOrange/10">{user?.name?.split(' ')[0] || 'Student'}</span>! 👋
              </h2>
              <p className="font-inter text-[17px] text-textSecondary mt-3 font-medium max-w-xl">
                {isParent 
                  ? `You are currently managing the personalized learning journey for ${studentProfile?.children_count || 0} child(ren).`
                  : `You've completed ${studentProfile?.wallet_balance || 0} modules this month. You're in the top 5% of learners!`}
              </p>
            </motion.div>
          </div>
          
          <div className="relative z-10 flex gap-4 w-full md:w-auto">
            {/* Streak Counter */}
            <Link to="/student/wallet" className="bg-brandOrange/5 border border-brandOrange/10 rounded-[28px] p-6 flex-1 md:w-36 text-center group transition-all hover:bg-brandOrange/10 hover:scale-105">
              <div className="flex flex-col items-center justify-center gap-1">
                <Flame size={32} className={`${(stats?.streak_days || 0) > 0 ? 'text-brandOrange fill-brandOrange' : 'text-textPrimary/20'} mb-2`} />
                <div className="font-jakarta font-extrabold text-[28px] text-textPrimary leading-none tracking-tighter">
                  {stats?.streak_days || 0}
                </div>
              </div>
              <div className="font-jakarta font-extrabold text-[11px] text-brandOrange uppercase tracking-widest mt-2">Day Streak</div>
            </Link>
            
            {/* EduCoins */}
            <Link to="/student/wallet" className="bg-amberGold/5 border border-amberGold/10 rounded-[28px] p-6 flex-1 md:w-36 text-center group transition-all hover:bg-amberGold/10 hover:scale-105">
              <div className="flex flex-col items-center justify-center gap-1">
                <Coins size={32} className="text-amberGold mb-2" />
                <div className="font-jakarta font-extrabold text-[28px] text-textPrimary leading-none tracking-tighter">
                  {stats?.educoins || 0}
                </div>
              </div>
              <div className="font-jakarta font-extrabold text-[11px] text-amberGold uppercase tracking-widest mt-2">EduCoins</div>
            </Link>

            {/* Level */}
            <div className="bg-brandBlue/5 border border-brandBlue/10 rounded-[28px] p-6 flex-1 md:w-36 text-center group transition-all hover:bg-brandBlue/10 hover:scale-105">
              <div className="flex flex-col items-center justify-center gap-1">
                <Zap size={32} className="text-brandBlue mb-2" />
                <div className="font-jakarta font-extrabold text-[28px] text-textPrimary leading-none tracking-tighter">
                  {stats?.level || 1}
                </div>
              </div>
              <div className="font-jakarta font-extrabold text-[11px] text-brandBlue uppercase tracking-widest mt-2">Level</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          
          {/* Left Column (2/3 width on desktop) */}
          <div className="xl:col-span-2 space-y-12">
            
            {/* Next Class Banner */}
            <div>
              <h3 className="font-jakarta font-extrabold text-[20px] text-textPrimary mb-6 flex items-center gap-3 uppercase tracking-widest opacity-50">
                <Calendar className="w-5 h-5 text-brandOrange" /> Upcoming Schedule
              </h3>
              
              <div className="bg-brandBlue rounded-[40px] p-8 md:p-10 text-white relative overflow-hidden shadow-premium-elevated">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brandOrange/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute right-0 bottom-0 opacity-5">
                  <BookOpen className="w-64 h-64 -mr-16 -mb-16" />
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 relative z-10 items-center">
                  <div className="bg-white/10 backdrop-blur-xl rounded-[32px] p-6 min-w-[160px] flex flex-col items-center justify-center border border-white/20 shadow-2xl rotate-[-2deg]">
                    <span className="font-jakarta font-extrabold text-[13px] text-white/60 uppercase tracking-widest">Today</span>
                    <span className="font-jakarta font-extrabold text-[44px] text-brandOrange leading-none my-2 tracking-tighter italic">4:00</span>
                    <span className="font-jakarta font-extrabold text-[15px] text-white/60 uppercase tracking-widest">PM IST</span>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-brandOrange/20 text-brandOrange font-jakarta font-extrabold text-[12px] px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
                      <Clock className="w-4 h-4" /> Starts in 2 hours
                    </div>
                    <h4 className="font-jakarta font-extrabold text-[28px] md:text-[34px] text-white leading-tight tracking-tighter italic mb-4">Python Programming - Logic Building</h4>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-brandOrange flex items-center justify-center font-jakarta font-extrabold text-[16px] text-white shadow-lg">R</div>
                        <span className="font-inter text-[15px] text-white/80 font-medium">Ravi Kumar (Senior Trainer)</span>
                      </div>
                      <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20"></div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                          <MapPin className="w-5 h-5 text-brandOrange" />
                        </div>
                        <span className="font-inter text-[15px] text-white/80 font-medium">Doorstep Learning (Chennai)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Courses */}
            <div>
               <div className="flex justify-between items-center mb-8">
                <h3 className="font-jakarta font-extrabold text-[20px] text-textPrimary flex items-center gap-3 uppercase tracking-widest opacity-50">
                  <BookOpen className="w-5 h-5 text-brandOrange" /> My Learning Path
                </h3>
                <Button variant="link" className="text-brandOrange font-jakarta font-extrabold text-[14px] p-0 h-auto flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-widest">
                  Explore More <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: 'Python Mastery', progress: 45, next: 'Variables & Data Types', icon: '💻', color: 'bg-brandOrange/5' },
                  { title: 'Robotics Pro', progress: 80, next: 'Trigonometry Pt. 2', icon: '🤖', color: 'bg-brandBlue/5' }
                ].map((course, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -5 }}
                    className="premium-card p-8 border-none shadow-premium-card group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-8">
                      <div className={`w-16 h-16 ${course.color} rounded-[24px] flex items-center justify-center text-[32px] rotate-3 group-hover:rotate-0 transition-transform`}>
                        {course.icon}
                      </div>
                      <span className="font-jakarta font-extrabold text-[14px] text-textPrimary bg-offWhite px-4 py-1.5 rounded-full border border-borderSubtle">
                        {course.progress}% Complete
                      </span>
                    </div>
                    
                    <h4 className="font-jakarta font-extrabold text-[22px] text-textPrimary mb-2 leading-tight italic">{course.title}</h4>
                    <p className="font-inter text-[15px] text-textSecondary mb-8 font-medium italic opacity-60">Next Up: {course.next}</p>
                    
                    {/* Progress Bar */}
                    <div className="space-y-3">
                      <div className="w-full h-3 bg-offWhite rounded-full overflow-hidden border border-borderSubtle">
                        <motion.div 
                          initial={{ width: 0 }} animate={{ width: `${course.progress}%` }} transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-brandOrange rounded-full shadow-[0_0_15px_rgba(234,88,12,0.3)]"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
          </div>

          {/* Right Column (1/3 width on desktop) */}
          <div className="space-y-12">
            
            {/* Action Needed Card */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[40px] p-8 border border-brandOrange/20 shadow-[0_20px_50px_rgba(234,88,12,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandOrange/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <h3 className="font-jakarta font-extrabold text-[18px] text-textPrimary mb-4 flex items-center gap-3 italic">
                <CheckCircle2 className="w-6 h-6 text-brandOrange" /> Action Required
              </h3>
              <p className="font-inter text-[15px] text-textSecondary mb-8 leading-relaxed font-medium">
                Your last <span className="text-textPrimary font-bold italic">Mathematics Demo</span> was completed. Please confirm to finalize your enrollment.
              </p>
              <Button className="w-full btn-primary h-14 rounded-2xl text-[15px]">
                Confirm Class Now
              </Button>
            </motion.div>

            {/* Achievements & Badges */}
            <div className="premium-card p-8 border-none shadow-premium-elevated bg-white">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-jakarta font-extrabold text-[20px] text-textPrimary flex items-center gap-3 uppercase tracking-widest opacity-50">
                  <Award className="w-6 h-6 text-amberGold" /> Achievements
                </h3>
                <Link to="/student/wallet" className="font-jakarta font-extrabold text-[12px] text-brandOrange hover:text-vividOrange transition-colors uppercase tracking-widest">
                  Gallery
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
