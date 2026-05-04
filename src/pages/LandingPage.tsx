import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { PageTransition } from '../components/shared/PageTransition';
import { StickyNavbar } from '../components/shared/StickyNavbar';
import { Footer } from '../components/shared/Footer';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Search, Cpu, Home, ShieldCheck, FileText, Calendar, 
  UserCheck, Heart, Users, MapPin, CheckCircle2 
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const location = useLocation();

  React.useEffect(() => {
    // Handle path-based scrolling (e.g., /how-it-works)
    const path = location.pathname.substring(1);
    if (path && ['how-it-works', 'trainers', 'contact'].includes(path)) {
      setTimeout(() => {
        const element = document.getElementById(path);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const categories = [
    { name: "Mathematics", students: "240+", emoji: "🧮", bg: "bg-cat-mathematics" },
    { name: "Science", students: "180+", emoji: "🔬", bg: "bg-cat-science" },
    { name: "Python", students: "320+", emoji: "💻", bg: "bg-cat-programming" },
    { name: "AI & ML", students: "150+", emoji: "🤖", bg: "bg-cat-ai" },
    { name: "Robotics", students: "80+", emoji: "🦾", bg: "bg-cat-robotics" },
    { name: "Electronics", students: "60+", emoji: "🔌", bg: "bg-cat-electronics" },
    { name: "IoT", students: "55+", emoji: "🌐", bg: "bg-cat-iot" },
    { name: "School Subjects", students: "500+", emoji: "📚", bg: "bg-cat-commerce" },
    { name: "Spoken English", students: "200+", emoji: "🗣️", bg: "bg-cat-english" },
    { name: "Commerce", students: "130+", emoji: "📊", bg: "bg-cat-commerce" },
  ];

  const features = [
    { title: "Verified Trainers", desc: "Every trainer is background-checked, document-verified, and student-rated.", icon: ShieldCheck },
    { title: "Doorstep Classes", desc: "No travel needed. Your verified trainer arrives at your home on schedule.", icon: Home },
    { title: "Study Materials Free", desc: "Notes, PDFs, worksheets, and practice sets included with every course.", icon: FileText },
    { title: "Flexible Schedule", desc: "Choose your preferred days and time slots. We fit into your routine.", icon: Calendar },
    { title: "Free Demo Class", desc: "Try before you commit. Book a free 1-hour demo. Zero risk, zero payment.", icon: UserCheck },
    { title: "Safe & Trusted", desc: "Powered by Tamizh Tech Pvt Ltd. Trusted by 500+ families across Tamil Nadu.", icon: Heart },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <StickyNavbar />

        {/* HERO SECTION */}
        <section className="relative min-h-[auto] md:min-h-[92vh] bg-hero-gradient overflow-hidden flex items-center pt-[100px] pb-16 md:pt-[120px]">
          {/* Overlay pattern */}
          <div className="absolute inset-0 z-0 opacity-4 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="page-container relative z-10 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
            {/* Left Column */}
            <div className="flex flex-col text-center lg:text-left items-center lg:items-start">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 rounded-full px-4 py-1.5 mb-6"
              >
                <span className="text-[13px] font-poppins font-medium text-accent">🎓 Tamil Nadu's #1 Doorstep Learning Platform</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                className="text-display-xl text-white mb-5"
              >
                Education at Your <br className="hidden md:block" />
                <span className="text-accent">Doorstep</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="text-body-lg text-white/80 max-w-[480px] mb-9"
              >
                Book a Verified Trainer. They come to your home. You learn better, faster, and comfortably.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <Button asChild className="bg-accent hover:bg-accent-600 text-white font-poppins font-semibold text-[15px] px-7 py-3.5 h-auto rounded-lg shadow-orange hover:scale-[1.02] transition-transform animate-pulse-orange">
                  <Link to="/courses">📅 Book a Free Demo Class</Link>
                </Button>
                <Button asChild variant="outline" className="bg-transparent border-2 border-white/60 text-white font-poppins font-medium text-[15px] px-7 py-3.5 h-auto rounded-lg hover:bg-white/10 hover:border-white">
                  <Link to="/signup">Become a Trainer &rarr;</Link>
                </Button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap justify-center lg:justify-start gap-5 mt-8 items-center text-white/70 text-[13px] font-inter"
              >
                <span>✓ Free 1-Hour Demo</span>
                <span>&bull;</span>
                <span>✓ No Commitment</span>
                <span>&bull;</span>
                <span>✓ Verified Trainers</span>
              </motion.div>
            </div>

            {/* Right Column: Floating Card */}
            <div className="hidden lg:block relative h-[500px]">
              <motion.div 
                className="absolute right-0 top-10 w-[340px] bg-white rounded-[20px] shadow-modal p-6 z-20"
                animate={{ y: [-8, 8, -8] }} transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
              >
                <div className="flex items-center gap-2 text-success font-poppins font-semibold text-[15px] mb-1">
                  <CheckCircle2 className="w-5 h-5" /> Demo Class Confirmed!
                </div>
                <p className="text-gray-500 font-inter text-[13px] mb-4">You're all set!</p>
                <div className="w-full h-px bg-border mb-4"></div>
                
                <div className="flex items-center gap-3">
                  <div className="w-[52px] h-[52px] bg-accent/20 rounded-full flex items-center justify-center text-accent font-poppins font-bold text-xl">R</div>
                  <div className="flex flex-col">
                    <span className="font-poppins font-semibold text-[16px] text-primary">Ravi Kumar</span>
                    <div className="flex items-center gap-1 text-[13px] font-inter">
                      <span className="text-yellow-400">⭐⭐⭐⭐⭐</span> <span className="text-gray-500">4.9</span>
                    </div>
                  </div>
                  <Badge className="badge-verified ml-auto py-0.5 px-2 scale-90">Verified</Badge>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-3 mt-4 space-y-2.5">
                  <div className="font-poppins font-medium text-[14px] text-primary">📚 Python Programming</div>
                  <div className="font-inter text-[13px] text-gray-500">📅 Tomorrow, 10:00 AM</div>
                  <div className="font-inter text-[13px] text-gray-500">📍 At your home, Anna Nagar</div>
                </div>
                
                <div className="bg-accent text-white font-poppins font-medium text-[13px] rounded-lg p-2.5 mt-4 text-center">
                  🚀 Starting in 14 hrs 22 min
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 3 }}
                className="absolute -right-8 bottom-24 w-[220px] bg-white rounded-xl shadow-hover p-3 z-30 flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><Users className="w-4 h-4" /></div>
                <p className="text-gray-700 font-inter text-[12px] leading-tight">+1 New student booked in Chennai!</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section ref={statsRef} className="bg-navy-dark border-t-2 border-accent/30 py-8">
          <div className="page-container grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-white/10">
            {[
              { label: "Students Taught", num: 500, suffix: "+" },
              { label: "Verified Trainers", num: 50, suffix: "+" },
              { label: "Courses Available", num: 20, suffix: "+" },
              { label: "Average Rating", num: 4.9, suffix: "★", decimals: 1 },
            ].map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className="font-poppins font-extrabold text-[32px] md:text-[40px] text-accent mb-1">
                  {statsInView ? <CountUp end={stat.num} duration={2} decimals={stat.decimals || 0} /> : "0"}{stat.suffix}
                </div>
                <div className="font-inter text-[14px] md:text-[15px] text-white/75">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-[56px] md:py-[96px] bg-white">
          <div className="page-container text-center">
            <div className="inline-flex items-center gap-4 mb-2">
              <div className="w-6 h-0.5 bg-accent"></div>
              <span className="font-poppins font-semibold text-[12px] tracking-[0.1em] text-accent uppercase">Simple Process</span>
              <div className="w-6 h-0.5 bg-accent"></div>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-poppins font-bold text-primary">How EduDoor Works</h2>
            <p className="text-inter text-[15px] md:text-[17px] text-gray-500 mt-3 mb-16">3 simple steps — from signup to doorstep learning</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-7 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-accent/35 z-0"></div>
              
              {[
                { step: 1, title: "Choose Your Course", desc: "Browse 48+ courses in Python, AI, Robotics, School subjects, and more.", icon: Search },
                { step: 2, title: "We Auto-Assign Best Trainer", desc: "Our smart algorithm picks the highest-rated verified trainer in your area.", icon: Cpu },
                { step: 3, title: "Trainer Comes to Your Door", desc: "Sit back at home. Your expert trainer arrives at the exact scheduled time.", icon: Home }
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center relative z-10">
                  <div className="w-14 h-14 rounded-full bg-orange-grad text-white font-poppins font-bold text-[22px] flex items-center justify-center shadow-[0_4px_16px_rgba(244,120,32,0.35)]">
                    {s.step}
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mt-5 mb-4">
                    <s.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-poppins font-semibold text-[20px] text-primary">{s.title}</h3>
                  <p className="font-inter text-[15px] text-gray-500 mt-2 max-w-[240px] leading-[1.7]">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="py-[56px] md:py-[96px] bg-background">
          <div className="page-container text-center">
             <div className="inline-flex items-center gap-4 mb-2">
              <div className="w-6 h-0.5 bg-accent"></div>
              <span className="font-poppins font-semibold text-[12px] tracking-[0.1em] text-accent uppercase">Explore Courses</span>
              <div className="w-6 h-0.5 bg-accent"></div>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-poppins font-bold text-primary">What Do You Want to Learn?</h2>
            <p className="text-inter text-[15px] md:text-[17px] text-gray-500 mt-3 mb-12">48+ courses across 8 categories. Each taught by verified experts at your home.</p>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
              {categories.map((cat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-xl border border-gray-200 p-6 text-center cursor-pointer transition-all duration-250 hover:border-[1.5px] hover:border-accent hover:shadow-[0_8px_24px_rgba(244,120,32,0.15)] hover:-translate-y-1.5 group relative overflow-hidden"
                >
                  <div className="text-[48px] drop-shadow-sm mb-3">{cat.emoji}</div>
                  <h3 className="font-poppins font-semibold text-[15px] md:text-[16px] text-primary">{cat.name}</h3>
                  <p className="font-inter text-[12px] text-gray-400 mt-1">{cat.students} students</p>
                  
                  <div className="absolute inset-x-0 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center gap-1">
                    <span className="text-accent font-inter font-medium text-[12px]">&rarr; Explore</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Button asChild variant="outline" className="mt-10 border-2 border-accent text-accent hover:bg-accent hover:text-white px-8 py-6 rounded-lg text-[16px] font-poppins font-semibold">
              <Link to="/courses">View All 48+ Courses &rarr;</Link>
            </Button>
          </div>
        </section>

        {/* CITIES WE SERVE */}
        <section className="py-[56px] md:py-[96px] bg-white border-b border-gray-100">
          <div className="page-container text-center">
            <div className="inline-flex items-center gap-4 mb-2">
              <div className="w-6 h-0.5 bg-accent"></div>
              <span className="font-poppins font-semibold text-[12px] tracking-[0.1em] text-accent uppercase">Launch Edition</span>
              <div className="w-6 h-0.5 bg-accent"></div>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-poppins font-bold text-primary">Cities We Serve</h2>
            <p className="text-inter text-[15px] md:text-[17px] text-gray-500 mt-3 mb-12">Bringing doorstep education to 5 major cities. <br className="hidden md:block" />More coming soon!</p>

            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              <div className="bg-orange-50 border-2 border-accent rounded-[20px] p-8 w-[280px] text-center shadow-[0_8px_24px_rgba(244,120,32,0.15)] relative transform hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white font-poppins font-bold text-[12px] px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm whitespace-nowrap">Primary Launch City</div>
                <div className="text-[48px] mb-2">🏢</div>
                <h3 className="font-poppins font-bold text-[24px] text-primary mb-1">Coimbatore</h3>
                <p className="font-inter text-[14px] text-gray-600">25+ Localities Active</p>
              </div>

              {['Chennai', 'Madurai', 'Trichy', 'Bangalore'].map(city => (
                <div key={city} className="bg-gray-50 border border-gray-200 rounded-[20px] p-8 w-[240px] text-center hover:border-accent hover:shadow-hover transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                  <div className="text-[40px] mb-2 grayscale group-hover:grayscale-0 transition-all duration-300">📍</div>
                  <h3 className="font-poppins font-bold text-[20px] text-gray-700 group-hover:text-primary transition-colors">{city}</h3>
                  <p className="font-inter text-[13px] text-gray-500 mt-1">Accepting Bookings</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY EDUDOOR */}
        <section className="py-[56px] md:py-[96px] bg-gray-50">
          <div className="page-container text-center">
             <div className="inline-flex items-center gap-4 mb-2">
              <div className="w-6 h-0.5 bg-accent"></div>
              <span className="font-poppins font-semibold text-[12px] tracking-[0.1em] text-accent uppercase">Our Promise</span>
              <div className="w-6 h-0.5 bg-accent"></div>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-poppins font-bold text-primary">Why Families Choose EduDoor</h2>
            <p className="text-inter text-[15px] md:text-[17px] text-gray-500 mt-3 mb-16">Everything designed for the best home learning experience</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-[16px] p-8 md:p-9 text-left transition-all duration-300 hover:border-accent hover:shadow-orange hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-2xl bg-orange-grad flex items-center justify-center shadow-[0_4px_16px_rgba(244,120,32,0.30)] mb-5">
                    <f.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-poppins font-semibold text-[20px] text-primary">{f.title}</h3>
                  <p className="font-inter text-[15px] text-gray-500 leading-[1.7] mt-2">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COURSE SPOTLIGHT */}
        <section className="py-[56px] md:py-[96px] bg-background">
          <div className="page-container">
            <div className="inline-flex items-center gap-4 mb-2">
              <span className="font-poppins font-semibold text-[12px] tracking-[0.1em] text-accent uppercase">Featured Courses</span>
              <div className="w-12 h-0.5 bg-accent"></div>
            </div>
            <h2 className="text-[28px] md:text-[40px] font-poppins font-bold text-primary">Popular Courses Near You</h2>
            <p className="text-inter text-[15px] md:text-[17px] text-gray-500 mt-2 mb-12">Highly rated by students in Chennai, Coimbatore & Madurai</p>

            <div className="flex overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 xl:grid-cols-4 gap-6 snap-x">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="min-w-[280px] md:min-w-0 bg-white rounded-2xl shadow-card overflow-hidden hover:-translate-y-1 hover:shadow-hover transition-all duration-300 snap-center">
                  <div className="h-[140px] md:h-[180px] bg-cat-ai relative flex items-center justify-center">
                    <div className="absolute top-3 left-3 bg-black/25 backdrop-blur-sm text-white font-inter font-semibold text-[10px] px-2.5 py-1 rounded-full">Beginner</div>
                    <div className="absolute top-3 right-3 bg-white text-accent font-poppins font-semibold text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1">⭐ 4.8</div>
                    <div className="text-[56px] drop-shadow-md">🤖</div>
                  </div>
                  <div className="p-5">
                    <div className="font-inter font-medium text-[11px] text-accent tracking-wide uppercase mb-1.5">AI & ML</div>
                    <h3 className="font-poppins font-semibold text-[17px] text-primary leading-[1.4] line-clamp-2">Python & Machine Learning Masterclass</h3>
                    
                    <div className="flex items-center gap-2 mt-3 mb-3 text-[12px] text-gray-400 font-inter">
                      <span>📅 3 Months</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span>👤 4 hrs/week</span>
                    </div>

                    <div className="flex gap-2 mb-4">
                      {["📚 Notes", "📋 Certificate"].map(c => (
                        <span key={c} className="bg-gray-100 text-gray-600 font-inter text-[10px] px-2 py-1 rounded">{c}</span>
                      ))}
                    </div>

                    <div className="w-full h-px bg-border mb-3"></div>
                    
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <div className="text-gray-400 line-through text-[13px] font-inter">₹2,499</div>
                        <div className="text-accent font-poppins font-bold text-[20px]">₹1,999<span className="text-[14px] text-gray-500 font-normal">/mo</span></div>
                      </div>
                      <span className="bg-success-light text-success font-inter font-medium text-[11px] px-2 py-0.5 rounded">Save 20%</span>
                    </div>

                    <Button className="w-full bg-accent hover:bg-accent-600 text-white font-poppins font-semibold text-[14px] h-11 rounded-lg">
                      Book Free Demo Class
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-[56px] md:py-[96px] bg-navy-dark-grad">
          <div className="page-container">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-4 mb-2">
                <div className="w-6 h-0.5 bg-accent"></div>
                <span className="font-poppins font-semibold text-[12px] tracking-[0.1em] text-accent uppercase">Student Stories</span>
                <div className="w-6 h-0.5 bg-accent"></div>
              </div>
              <h2 className="text-[28px] md:text-[40px] font-poppins font-bold text-white">What Parents & Students Say</h2>
              <p className="text-inter text-[15px] md:text-[17px] text-white/70 mt-2">Real results from real families across Tamil Nadu</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Karthik R.", city: "Chennai", course: "Enrolled in Python", quote: "My son cleared his programming logic internship test in just 2 months. Having a trainer come home made all the difference in his focus." },
                { name: "Priya M.", city: "Coimbatore", course: "Enrolled in Mathematics", quote: "The 1-on-1 attention is unmatched. Her grades improved from C to A+ in one term. The trainer is very professional and always on time." },
                { name: "Suresh K.", city: "Madurai", course: "Enrolled in AI & Robotics", quote: "EduDoor's hardware kit and practical teaching method is brilliant. It's totally worth the price to see him actually build real robots at home." }
              ].map((t, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-[20px] p-9 relative backdrop-blur-md hover:bg-white/10 hover:border-accent/50 hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-[-10px] left-6 font-poppins font-bold text-[80px] leading-none text-accent/25">"</div>
                  
                  <div className="flex gap-0.5 mb-4 relative z-10">
                    {[1, 2, 3, 4, 5].map(s => <span key={s} className="text-warning text-[18px]">⭐</span>)}
                  </div>
                  
                  <p className="font-inter italic text-[16px] text-white/85 leading-[1.8] min-h-[85px] relative z-10">"{t.quote}"</p>
                  
                  <div className="flex items-center gap-3.5 mt-8 relative z-10">
                    <div className="w-[52px] h-[52px] rounded-full bg-orange-grad flex items-center justify-center text-white font-poppins font-bold text-[22px] shadow-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-poppins font-semibold text-[16px] text-white">{t.name}</div>
                      <div className="font-inter text-[13px] text-white/60">{t.city}</div>
                      <div className="font-inter text-[12px] text-accent mt-0.5">{t.course}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRAINER CTA BANNER */}
        <section id="trainers" className="py-20 bg-orange-grad">
          <div className="page-container">
            <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-12 items-center">
              <div>
                <h2 className="text-[32px] md:text-[40px] font-poppins font-bold text-white leading-tight">Are You an Expert in Your Field?</h2>
                <p className="text-inter text-[18px] md:text-[20px] text-white/90 mt-3">Earn ₹20,000 – ₹50,000/month teaching from home</p>
                
                <div className="flex flex-col gap-3 mt-8">
                  {["Students automatically assigned to you", "Flexible hours — you set your schedule", "Earnings directly to your bank account"].map((b, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                      <span className="font-inter text-[16px] text-white/85">{b}</span>
                    </div>
                  ))}
                </div>
                
                <Button asChild className="mt-8 bg-white text-accent hover:bg-gray-100 font-poppins font-semibold text-[16px] px-8 py-6 rounded-lg">
                  <Link to="/signup?role=trainer">Join as Verified Trainer &rarr;</Link>
                </Button>
              </div>
              
              <div className="relative h-[300px] hidden md:block">
                {/* Floating stat chips */}
                <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 right-10 bg-white rounded-xl shadow-lg p-4 w-48 z-10 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">💰</div>
                    <div><div className="font-poppins font-bold text-primary text-[15px]">₹42,000</div><div className="text-[11px] text-gray-500 font-inter">this month</div></div>
                  </div>
                </motion.div>
                
                <motion.div animate={{ y: [5, -5, 5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 left-10 bg-white rounded-xl shadow-lg p-4 w-48 z-20 border border-gray-100">
                   <div className="flex items-center gap-3">
                    <div className="text-2xl">👨‍🎓</div>
                    <div><div className="font-poppins font-bold text-primary text-[15px]">8 students</div><div className="text-[11px] text-gray-500 font-inter">active right now</div></div>
                  </div>
                </motion.div>
                
                <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 right-0 bg-white rounded-xl shadow-lg p-3 w-36 z-30 border border-gray-100">
                   <div className="flex items-center gap-2">
                    <div className="text-xl">⭐</div>
                    <div><div className="font-poppins font-bold text-primary text-[14px]">4.9 rating</div></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default LandingPage;
