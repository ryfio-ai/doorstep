import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Video, ShieldAlert, Key, Map } from 'lucide-react';
import { Button } from '../../components/ui/button';

const mockClasses = [
  { id: 1, title: 'Python Fundamentals - Week 2', date: '2026-05-05', time: '10:00 AM', status: 'upcoming', type: 'online', tutor: 'Sarah Khan' },
  { id: 2, title: 'Data Types Deep Dive', date: '2026-05-07', time: '04:00 PM', status: 'upcoming', type: 'home', tutor: 'Sarah Khan', address: '123 Main St, Tech Park' },
  { id: 3, title: 'Intro to Python', date: '2026-05-01', time: '10:00 AM', status: 'completed', type: 'home', tutor: 'Sarah Khan' },
];

const MyClassesPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="max-w-[1100px] mx-auto space-y-10 font-inter">
        <div className="flex flex-col space-y-4">
          <h1 className="font-jakarta text-[36px] md:text-[48px] font-extrabold text-textPrimary leading-none tracking-tighter italic">
            My <span className="text-brandOrange underline decoration-brandOrange/10">Schedule</span>
          </h1>
          <p className="font-inter text-[18px] text-textSecondary font-medium opacity-60 italic">Manage your upcoming home & online sessions.</p>
        </div>

        <div className="grid gap-8">
          {mockClasses.map((session) => (
            <motion.div 
              key={session.id}
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-[40px] p-8 md:p-10 border border-borderSubtle shadow-premium-card group transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandOrange/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brandOrange/10 transition-all"></div>
              
              <div className="flex flex-col md:flex-row gap-10 items-start md:items-center relative z-10">
                {/* Date & Time Badge */}
                <div className="bg-brandBlue rounded-[32px] p-6 min-w-[140px] flex flex-col items-center justify-center border border-white/10 shadow-xl rotate-[-2deg] group-hover:rotate-0 transition-transform">
                  <span className="font-jakarta font-extrabold text-[12px] text-white/60 uppercase tracking-widest">{new Date(session.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                  <span className="font-jakarta font-extrabold text-[40px] text-brandOrange leading-none my-2 tracking-tighter italic">{session.time.split(' ')[0]}</span>
                  <span className="font-jakarta font-extrabold text-[12px] text-white/60 uppercase tracking-widest">{session.time.split(' ')[1]}</span>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className={`${session.status === 'completed' ? 'bg-green-500/10 text-green-600' : 'bg-brandOrange/10 text-brandOrange'} font-jakarta font-extrabold text-[11px] px-4 py-1.5 rounded-full uppercase tracking-widest border-none`}>
                      {session.status}
                    </Badge>
                    <Badge className="bg-brandBlue/5 text-brandBlue font-jakarta font-extrabold text-[11px] px-4 py-1.5 rounded-full uppercase tracking-widest border-none">
                      {session.type} Class
                    </Badge>
                  </div>

                  <h3 className="font-jakarta font-extrabold text-[24px] md:text-[28px] text-textPrimary tracking-tight italic leading-tight">{session.title}</h3>
                  
                  <div className="flex flex-wrap items-center gap-8 text-[15px] font-medium text-textSecondary opacity-70 italic">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-brandOrange" />
                      <span>Tutor: {session.tutor}</span>
                    </div>
                    {session.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-brandOrange" />
                        <span>{session.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
                  {session.status === 'upcoming' && (
                    <>
                      <Button className="btn-primary h-14 rounded-2xl px-10 text-[15px]">
                        Join Classroom
                      </Button>
                      <Button variant="outline" className="h-14 rounded-2xl px-10 text-[15px] border-brandOrange/20 text-brandOrange hover:bg-brandOrange/5">
                        Reschedule
                      </Button>
                    </>
                  )}
                  {session.status === 'completed' && (
                    <Button variant="outline" className="h-14 rounded-2xl px-10 text-[15px] border-brandBlue/10 text-brandBlue hover:bg-brandBlue/5">
                      Review Session
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default MyClassesPage;
