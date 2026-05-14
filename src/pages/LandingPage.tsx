import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Play, ArrowRight, Brain, Cpu, Code, Trophy, Users, Star, CheckCircle, Smartphone, Globe, ShieldCheck, BookOpen } from 'lucide-react';
import CountUp from 'react-countup';

// Reusable Section Fade-in Wrapper
const FadeIn: React.FC<{ children: React.ReactNode, delay?: number, direction?: 'up' | 'left' | 'right', className?: string }> = ({ children, delay = 0, direction = 'up', className }) => {
  const init = direction === 'up' ? { opacity: 0, y: 40 } : direction === 'left' ? { opacity: 0, x: -60 } : { opacity: 0, x: 60 };
  const anim = direction === 'up' ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 };
  return (
    <motion.div initial={init} whileInView={anim} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden bg-brandBlue">

      {/* =========================================
          SECTION 1: HERO
      ========================================= */}
      <section className="relative min-h-[100vh] pt-[120px] pb-[80px] lg:pt-[160px] lg:pb-[100px] flex items-center overflow-hidden bg-brandBlue">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-electricBlue/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-orange"></div>
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-brandOrange/15 rounded-full blur-[150px] mix-blend-screen"></div>
        </div>

        <div className="page-container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-brandOrange/30 mb-8">
              <span className="w-2 h-2 rounded-full bg-brandOrange animate-pulse-orange"></span>
              <span className="font-inter font-medium text-[13px] text-white">🚀 Now Live — AI + Robotics Courses</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <h2 className="font-tamil font-bold text-[48px] text-transparent bg-clip-text bg-blue-orange mb-2" style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>திறனொளி</h2>
              <h1 className="font-grotesk font-bold text-[56px] lg:text-[72px] leading-[1.05] tracking-tight text-white mb-6">
                The Future of <br />
                <span className="text-transparent bg-clip-text bg-orange-gradient">AI + Robotics</span> <br />
                Education Starts Here
              </h1>
              <p className="font-inter font-normal text-[18px] lg:text-[20px] leading-[1.7] text-white/70 max-w-[600px] mb-10">
                ThiranOli — Light of Skills & Talent. Master cutting-edge AI, Robotics, and innovation skills with world-class mentors. Learn in Tamil. Excel globally.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col sm:flex-row items-center gap-4 mb-12">
              <Link to="/courses" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-orange-gradient text-white font-grotesk font-semibold text-[16px] flex items-center justify-center gap-2 shadow-glow-orange hover:scale-105 transition-all duration-300">
                Start Learning Free <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/20 text-white font-grotesk font-semibold text-[16px] flex items-center justify-center gap-2 hover:bg-white/5 transition-all duration-300">
                <Play className="w-5 h-5" /> Watch Demo
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap items-center gap-6 text-[14px] text-white/50 font-inter">
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> No credit card required</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Tamil & English</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Industry Certificate</span>
            </motion.div>
          </div>

          {/* Right Visual (Floating Elements) */}
          <div className="lg:col-span-5 relative h-[500px] lg:h-[600px] hidden md:flex items-center justify-center">
            <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 w-full max-w-[400px]">
              {/* Main Dashboard Mockup */}
              <div className="w-full aspect-[4/5] rounded-[32px] glass-dark shadow-premium-shadow border border-white/10 p-6 flex flex-col gap-4 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-orange opacity-20 blur-3xl"></div>

                {/* Mock UI Elements inside the glass card */}
                <div className="w-full h-32 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5">
                  <Cpu className="w-12 h-12 text-brandOrange" />
                </div>
                <div className="w-3/4 h-4 bg-white/10 rounded-full mt-4"></div>
                <div className="w-1/2 h-4 bg-white/10 rounded-full"></div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="h-24 bg-brandOrange/20 rounded-xl border border-brandOrange/30"></div>
                  <div className="h-24 bg-electricBlue/20 rounded-xl border border-electricBlue/30"></div>
                </div>
              </div>

              {/* Floating Stat Cards */}
              <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 2, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }} className="absolute -right-12 top-10 glass-card px-4 py-3 rounded-2xl shadow-glow-blue border-electricBlue/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-electricBlue/20 flex items-center justify-center text-electricBlue"><Users className="w-5 h-5" /></div>
                <div><p className="text-white font-grotesk font-bold">2,400+</p><p className="text-[10px] text-white/50">Students enrolled</p></div>
              </motion.div>

              <motion.div animate={{ y: [10, -10, 10], rotate: [0, -2, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute -left-16 bottom-20 glass-orange px-4 py-3 rounded-2xl shadow-glow-orange flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brandOrange/20 flex items-center justify-center text-brandOrange"><Brain className="w-5 h-5" /></div>
                <div><p className="text-white font-grotesk font-bold">AI Masterclass</p><p className="text-[10px] text-white/50">Certificate Earned</p></div>
              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* Scrolling Ticker Bottom */}
        <div className="absolute bottom-0 left-0 w-full bg-black/20 border-t border-white/5 overflow-hidden flex whitespace-nowrap py-4">
          <div className="animate-marquee flex gap-8 items-center text-white/40 font-grotesk text-[14px] font-semibold tracking-wider uppercase">
            {['Python', 'Machine Learning', 'Robotics', 'Arduino', 'AI Ethics', 'Data Science', 'Computer Vision', 'Neural Networks', 'IoT', 'Automation', 'Deep Learning', 'NLP'].map((tech, i) => (
              <React.Fragment key={i}>
                <span>{tech}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brandOrange/50"></span>
              </React.Fragment>
            ))}
            {/* Duplicate for infinite loop */}
            {['Python', 'Machine Learning', 'Robotics', 'Arduino', 'AI Ethics', 'Data Science', 'Computer Vision', 'Neural Networks', 'IoT', 'Automation', 'Deep Learning', 'NLP'].map((tech, i) => (
              <React.Fragment key={`dup-${i}`}>
                <span>{tech}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brandOrange/50"></span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: ANIMATED STATS
      ========================================= */}
      <section className="py-[120px] bg-navyDeep relative z-10 border-b border-white/5">
        <div className="page-container">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brandOrange/10 border border-brandOrange/20 text-brandOrange font-grotesk font-semibold text-[12px] uppercase tracking-wider mb-4">
                📊 Our Impact
              </div>
              <h2 className="font-grotesk font-bold text-[40px] text-white">Numbers That Define Our Excellence</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: 12000, suffix: '+', label: 'Active Learners', sub: 'Across Tamil Nadu & beyond', icon: Users, color: 'text-blue-400', border: 'border-blue-500/50' },
              { num: 50, suffix: '+', label: 'Expert Courses', sub: 'AI, Robotics & Innovation', icon: BookOpen, color: 'text-orange-400', border: 'border-orange-500/50' },
              { num: 4.9, suffix: '★', label: 'Average Rating', sub: 'From 3,200+ reviews', icon: Star, color: 'text-yellow-400', border: 'border-yellow-500/50', decimals: 1 },
              { num: 98, suffix: '%', label: 'Placement Rate', sub: 'Within 6 months', icon: Trophy, color: 'text-green-400', border: 'border-green-500/50' },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="glass-card rounded-[24px] p-8 border-t-2 hover:-translate-y-2 transition-transform duration-300 relative group overflow-hidden" style={{ borderTopColor: stat.border.split('-')[1] }}>
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <stat.icon className={`w-16 h-16 ${stat.color}`} />
                  </div>
                  <h3 className="font-grotesk font-bold text-[48px] text-white mb-2">
                    <CountUp end={stat.num} decimals={stat.decimals || 0} duration={2.5} enableScrollSpy scrollSpyOnce />
                    {stat.suffix}
                  </h3>
                  <p className="font-inter font-semibold text-[18px] text-white mb-1">{stat.label}</p>
                  <p className="font-inter text-[14px] text-white/50">{stat.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: FEATURED COURSES
      ========================================= */}
      <section className="py-[120px] bg-richBlack relative z-10 border-b border-white/5">
        <div className="page-container">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-grotesk font-semibold text-[12px] uppercase tracking-wider mb-4">
                  🔥 Trending Now
                </div>
                <h2 className="font-grotesk font-bold text-[40px] text-white mb-4">Most Popular Courses</h2>
                <p className="text-white/60 font-inter text-[18px] max-w-2xl">Hand-picked by our curriculum team and loved by 12,000+ learners across the globe.</p>
              </div>
              <Link to="/courses" className="shrink-0 text-brandOrange font-grotesk font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                View All Courses <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </FadeIn>

          {/* Tab Filter Row */}
          <FadeIn delay={0.1}>
            <div className="flex overflow-x-auto scrollbar-hide gap-3 mb-10 pb-2">
              {['All', 'AI & ML', 'Robotics', 'Programming', 'Innovation', 'Free'].map((tab, i) => (
                <button key={i} className={`shrink-0 px-6 py-2.5 rounded-full font-grotesk font-medium text-[15px] transition-all ${i === 0 ? 'bg-orange-gradient text-white shadow-glow-orange border border-transparent' : 'glass-card text-white/70 hover:text-white hover:bg-white/10'
                  }`}>
                  {tab}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* 3-Col Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="glass-card bg-cardDark/80 rounded-[20px] overflow-hidden border border-white/10 hover:-translate-y-2 hover:border-electricBlue/50 hover:shadow-premium-shadow transition-all duration-400 group">
                  {/* Image Top */}
                  <div className="relative h-[220px] bg-navyDeep overflow-hidden">
                    <img src={`https://picsum.photos/seed/${item}/600/400`} alt="Course" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-cardDark via-transparent to-transparent"></div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-electricBlue/90 text-white font-grotesk font-semibold text-[11px] uppercase tracking-wider">Robotics</span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-red-500/90 text-white font-grotesk font-semibold text-[11px] uppercase tracking-wider">HOT</span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 rounded-full glass-card text-white font-grotesk font-medium text-[12px] flex items-center gap-1 backdrop-blur-md">
                        ⏱ 6 Weeks
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6">
                    <h4 className="font-grotesk font-bold text-[22px] text-white leading-tight mb-3 group-hover:text-electricBlue transition-colors">Complete Arduino & Robotics Masterclass</h4>
                    <p className="font-inter text-[14px] text-white/50 mb-5 line-clamp-2">Learn to build, wire, and program your own robots from scratch using Arduino and basic sensors. No prior experience needed.</p>

                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brandOrange to-electricBlue"></div>
                      <span className="font-inter text-[13px] text-white/70">by <span className="text-white font-medium">Dr. Karthik R.</span></span>
                    </div>

                    <div className="flex items-center justify-between py-4 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-white/40 text-[12px] line-through">₹2,999</span>
                        <span className="font-grotesk font-bold text-[24px] text-white">₹999</span>
                      </div>
                      <Button className="bg-brandOrange/10 border border-brandOrange/30 text-brandOrange hover:bg-orange-gradient hover:text-white hover:border-transparent rounded-xl px-6 h-12 transition-all font-grotesk font-semibold">
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 6: HOW IT WORKS (TIMELINE)
      ========================================= */}
      <section className="py-[120px] bg-navyDeep relative z-10">
        <div className="page-container">
          <FadeIn>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brandOrange/10 border border-brandOrange/20 text-brandOrange font-grotesk font-semibold text-[12px] uppercase tracking-wider mb-4">
                🛤️ The Journey
              </div>
              <h2 className="font-grotesk font-bold text-[40px] text-white">From Zero to Innovation Hero</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-electricBlue via-brandOrange to-electricBlue opacity-30"></div>

            {[
              { num: '01', title: 'Choose Path', desc: 'Find your perfect course in AI or Robotics', icon: Brain },
              { num: '02', title: 'Learn from Masters', desc: 'Live & recorded sessions in Tamil & English', icon: Play },
              { num: '03', title: 'Build Real Projects', desc: 'Hands-on hardware and coding assignments', icon: Code },
              { num: '04', title: 'Get Certified', desc: 'Industry-recognized certificate on completion', icon: Trophy },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <div className="flex flex-col items-center text-center relative z-10 group">
                  <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center border-2 border-white/10 group-hover:border-brandOrange group-hover:bg-brandOrange/10 transition-all duration-300 shadow-glow-blue mb-6">
                    <step.icon className="w-8 h-8 text-white group-hover:text-brandOrange transition-colors" />
                  </div>
                  <h3 className="font-grotesk font-bold text-[24px] text-white mb-3">{step.title}</h3>
                  <p className="font-inter text-[15px] text-white/60">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.8} direction="up">
            <div className="mt-20 flex justify-center">
              <Link to="/how-it-works" className="px-8 py-4 rounded-xl bg-orange-gradient text-white font-grotesk font-semibold text-[16px] shadow-glow-orange hover:scale-105 transition-all">
                Begin Your Journey →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* =========================================
          SECTION 7: BENTO GRID FEATURES
      ========================================= */}
      <section className="py-[120px] bg-richBlack relative z-10 border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electricBlue/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

        <div className="page-container relative z-10">
          <FadeIn>
            <div className="mb-16">
              <h2 className="font-grotesk font-bold text-[40px] text-white mb-4">Why ThiranOli is Built Different</h2>
              <p className="text-white/60 font-inter text-[18px] max-w-2xl">We don't just teach theory. We build an ecosystem of innovators right here in Tamil Nadu.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]">
            {/* Big Bento 1 */}
            <FadeIn delay={0.1} className="md:col-span-2 lg:col-span-2 row-span-1 h-full">
              <div className="glass-card rounded-[32px] h-full p-8 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-end relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-electricBlue/20 blur-[80px] group-hover:bg-electricBlue/30 transition-all"></div>
                <Brain className="w-10 h-10 text-electricBlue mb-4 relative z-10" />
                <h3 className="font-grotesk font-bold text-[28px] text-white mb-2 relative z-10">AI-Personalized Learning</h3>
                <p className="font-inter text-white/60 relative z-10">Our recommendation engine adapts to your pace, suggesting modules and projects tailored to your specific strengths.</p>
              </div>
            </FadeIn>

            {/* Medium Bento 1 */}
            <FadeIn delay={0.2} className="md:col-span-1 lg:col-span-2 row-span-1 h-full">
              <div className="glass-orange rounded-[32px] h-full p-8 border border-brandOrange/20 hover:border-brandOrange/40 transition-all flex flex-col justify-end relative overflow-hidden group">
                <Globe className="w-10 h-10 text-brandOrange mb-4 relative z-10" />
                <h3 className="font-grotesk font-bold text-[28px] text-white mb-2 relative z-10">Tamil + English Bilingual</h3>
                <p className="font-inter text-white/60 relative z-10">Learn complex concepts in your native language. Our mentors explain deep tech seamlessly in Tamil and English.</p>
              </div>
            </FadeIn>

            {/* Small Bento 1 */}
            <FadeIn delay={0.3} className="md:col-span-1 lg:col-span-1 row-span-1 h-full">
              <div className="glass-card rounded-[32px] h-full p-8 flex flex-col justify-end hover:bg-white/5 transition-all">
                <ShieldCheck className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="font-grotesk font-bold text-[20px] text-white mb-2">Industry Certificates</h3>
                <p className="font-inter text-[14px] text-white/60">Recognized by top tech companies worldwide.</p>
              </div>
            </FadeIn>

            {/* Small Bento 2 */}
            <FadeIn delay={0.4} className="md:col-span-1 lg:col-span-1 row-span-1 h-full">
              <div className="glass-card rounded-[32px] h-full p-8 flex flex-col justify-end hover:bg-white/5 transition-all">
                <Cpu className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="font-grotesk font-bold text-[20px] text-white mb-2">Real Hardware Projects</h3>
                <p className="font-inter text-[14px] text-white/60">Not just code. Build actual physical robots.</p>
              </div>
            </FadeIn>

            {/* Wide Bento */}
            <FadeIn delay={0.5} className="md:col-span-3 lg:col-span-2 row-span-1 h-full">
              <div className="glass-card rounded-[32px] h-full p-8 flex flex-col justify-center items-center text-center hover:shadow-glow-blue transition-all relative overflow-hidden border-electricBlue/20">
                <Smartphone className="w-12 h-12 text-electricBlue mb-4" />
                <h3 className="font-grotesk font-bold text-[28px] text-white mb-2">Learn Anywhere, Anytime</h3>
                <p className="font-inter text-white/60 max-w-sm">Fully responsive platform. Download lectures and learn offline on the go.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 10: CTA BANNER
      ========================================= */}
      <section className="py-[100px] bg-brandBlue relative z-10 border-t border-white/5">
        <div className="page-container relative">
          <div className="w-full rounded-[40px] overflow-hidden relative shadow-premium-shadow">
            {/* Complex Background */}
            <div className="absolute inset-0 bg-navy-dark-grad"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-brandOrange/40 via-electricBlue/20 to-transparent mix-blend-screen"></div>
            <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-brandOrange/30 rounded-full blur-[100px]"></div>

            <div className="relative z-10 p-12 md:p-20 flex flex-col items-center text-center">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <span className="font-tamil font-bold text-[24px] text-brandOrange mb-4 block" style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>இப்போதே தொடங்கு</span>
                <h2 className="font-grotesk font-bold text-[48px] md:text-[64px] text-white leading-tight mb-6 max-w-3xl">
                  Your AI & Robotics Journey Starts Today
                </h2>
                <p className="font-inter text-[20px] text-white/70 mb-10 max-w-2xl mx-auto">
                  Join 12,000+ innovators building the future. Get instant access to premium courses, expert mentors, and a global community.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/signup" className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-brandBlue font-grotesk font-bold text-[18px] shadow-glow-orange hover:scale-105 transition-all">
                    Enroll Now — Free
                  </Link>
                  <Link to="/contact" className="w-full sm:w-auto px-10 py-5 rounded-2xl border-2 border-white/30 text-white font-grotesk font-bold text-[18px] hover:bg-white/10 transition-all">
                    Book a Free Demo
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
