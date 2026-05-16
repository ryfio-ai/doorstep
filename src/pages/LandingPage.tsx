import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Play, ArrowRight, Brain, Cpu, Code, Trophy, Users, Star, CheckCircle, Smartphone, Globe, ShieldCheck, BookOpen, Target, Zap, MonitorPlay, Sparkles } from 'lucide-react';
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
          SECTION 1: HERO (THE "MNC" LOOK)
      ========================================= */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-brandBlue">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-brandOrange/5 to-transparent pointer-events-none"></div>
        <div className="absolute -top-[10%] -right-[10%] w-[1000px] h-[1000px] bg-brandOrange/10 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="page-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="space-y-10">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
                  <span className="w-2 h-2 rounded-full bg-brandOrange animate-pulse"></span>
                  <span className="font-grotesk font-bold text-[14px] text-white tracking-[0.2em] uppercase">Powered by Tamizh Tech Pvt Ltd</span>
                </div>

                <h1 className="font-grotesk font-bold text-[60px] md:text-[88px] text-white leading-[0.95] tracking-tighter">
                  Education at <br />
                  <span className="text-transparent bg-clip-text bg-orange-gradient">Your Doorstep.</span>
                </h1>

                <p className="font-inter text-[20px] md:text-[24px] text-white/70 max-w-xl leading-relaxed">
                  Bridging the gap between expert mentors and eager learners. **Personalized 1-on-1 learning** right in your living room.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
                  <Button asChild size="lg" className="bg-orange-gradient hover:shadow-glow-orange text-white px-10 h-16 rounded-2xl font-grotesk font-bold text-[18px] transition-all w-full sm:w-auto">
                    <Link to="/courses">Explore Programs</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-10 h-16 rounded-2xl font-grotesk font-bold text-[18px] transition-all w-full sm:w-auto">
                    <Link to="/trainers">Join as a Trainer</Link>
                  </Button>
                </div>

                {/* Core Values */}
                <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10">
                  <div className="flex flex-col">
                    <span className="text-white font-grotesk font-bold text-[24px]">100%</span>
                    <span className="text-white/30 text-[11px] uppercase tracking-widest mt-1">Verified</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-grotesk font-bold text-[24px]">1-on-1</span>
                    <span className="text-white/30 text-[11px] uppercase tracking-widest mt-1">Attention</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-grotesk font-bold text-[24px]">Safe</span>
                    <span className="text-white/30 text-[11px] uppercase tracking-widest mt-1">Learning</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <div className="hidden lg:block relative">
              <FadeIn delay={0.3}>
                <div className="relative">
                  <div className="w-[540px] h-[640px] rounded-[50px] overflow-hidden border border-white/20 shadow-3xl relative z-10 group">
                    <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" alt="Doorstep Learning" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brandBlue/60 via-transparent to-transparent"></div>
                  </div>

                  <div className="absolute -top-10 -left-10 glass-card p-6 rounded-3xl border-white/20 animate-float z-20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brandOrange flex items-center justify-center">
                        <CheckCircle className="text-white w-6 h-6" />
                      </div>
                      <span className="text-white font-grotesk font-bold">Verified Mentors</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>




      {/* =========================================
          SECTION 3: WHAT WE DO (MNC STYLE)
      ========================================= */}
      <section className="py-[120px] bg-white relative z-10 overflow-hidden">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <FadeIn>
              <div className="relative">
                <div className="absolute -top-20 -left-20 text-[200px] font-grotesk font-black text-slate-50 select-none">WE DO</div>
                <h2 className="font-grotesk font-bold text-[40px] md:text-[56px] text-slate-900 leading-tight mb-8 relative z-10">
                  Bridging the gap between <br />
                  <span className="text-brandOrange underline decoration-brandOrange/30">Skills & Learners.</span>
                </h2>
                <div className="space-y-6 relative z-10">
                  <p className="font-inter text-[18px] text-slate-600 leading-relaxed">
                    <strong>திறனொளி (Doorstep)</strong> is a smart learning platform that acts as a professional bridge between skilled trainers and eager learners.
                  </p>
                  <p className="font-inter text-[18px] text-slate-600 leading-relaxed">
                    Instead of students traveling to tuition centers, we ensure that <strong>Education comes home</strong>. We make quality education accessible, flexible, and convenient for every locality.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Personalized Learning", desc: "One-to-one or small group learning right at your home.", icon: Target },
                  { title: "Verified Ecosystem", desc: "Every trainer is background-checked and demo-approved.", icon: ShieldCheck },
                  { title: "Flexible Scheduling", desc: "Learn based on your availability and comfort.", icon: Globe },
                  { title: "Accessible Quality", desc: "World-class education brought to your doorstep.", icon: Sparkles }
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:border-brandOrange/20 hover:bg-white hover:shadow-xl transition-all group">
                    <item.icon className="w-10 h-10 text-brandOrange mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="font-grotesk font-bold text-[20px] text-slate-900 mb-3">{item.title}</h3>
                    <p className="font-inter text-[14px] text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION: WHY 1-ON-1 MATTERS (PREMIUM)
      ========================================= */}
      <section className="py-[120px] bg-slate-50 relative z-10 border-y border-slate-100">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="left">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brandOrange/10 border border-brandOrange/20">
                  <Users className="w-4 h-4 text-brandOrange" />
                  <span className="text-[13px] font-bold text-brandOrange tracking-widest uppercase">The 1-on-1 Advantage</span>
                </div>
                <h2 className="font-grotesk font-bold text-[44px] md:text-[64px] text-slate-900 leading-[1.1]">
                  Because your child <br />
                  <span className="text-brandOrange underline decoration-brandOrange/20 italic font-medium">deserves focus.</span>
                </h2>
                <p className="font-inter text-[18px] md:text-[20px] text-slate-500 leading-relaxed">
                  In a world of crowded classrooms, we bring the **Power of Personalized Attention** to your home. Every child learns differently; we teach them exactly the way they understand.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                  <div className="flex flex-col gap-2">
                    <span className="text-slate-900 font-grotesk font-bold text-[24px]">100% Focus</span>
                    <p className="text-slate-500 text-[14px]">Undivided attention from the mentor throughout the session.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-slate-900 font-grotesk font-bold text-[24px]">Zero Pressure</span>
                    <p className="text-slate-500 text-[14px]">Student learns at their own pace without competition stress.</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="grid grid-cols-1 gap-6">
                {[
                  { title: "Customized Roadmap", desc: "Curriculum adapted specifically to the student's interest and grasping power.", icon: Target },
                  { title: "Immediate Clarity", desc: "Zero wait time for doubts. Instant feedback and real-time corrections.", icon: Zap },
                  { title: "Strong Mentorship", desc: "Builds a deep relationship of trust and guidance between trainer & student.", icon: ShieldCheck }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6 p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-brandOrange transition-colors">
                      <item.icon className="w-7 h-7 text-brandOrange group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-grotesk font-bold text-[20px] text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-slate-500 text-[15px] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: EXPLORE CATEGORIES (VISUAL GRID)
      ========================================= */}
      <section className="py-[120px] bg-white relative z-10">
        <div className="page-container">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="font-grotesk font-bold text-[40px] md:text-[56px] text-slate-900 leading-tight">What can you learn?</h2>
              <p className="text-slate-500 font-inter text-[18px] max-w-2xl mx-auto mt-4">From core academics to advanced robotics, we cover it all.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Robotics & AI", count: "12+ Courses", icon: Cpu, color: "bg-blue-500", path: "/courses", comingSoon: false },
              { title: "Academic Excellence", count: "All Subjects", icon: BookOpen, color: "bg-orange-500", comingSoon: true },
              { title: "Coding & Software", count: "8+ Programs", icon: Code, color: "bg-purple-500", comingSoon: true },
              { title: "Embedded Systems", count: "IoT & Hardware", icon: Brain, color: "bg-emerald-500", comingSoon: true }
            ].map((cat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                {cat.comingSoon ? (
                  <div className="group relative overflow-hidden rounded-[40px] bg-slate-50 p-10 h-[300px] flex flex-col justify-end transition-all cursor-not-allowed opacity-70">
                    <div className="absolute top-6 right-6 px-3 py-1 bg-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-full">Coming Soon</div>
                    <cat.icon className="w-12 h-12 text-slate-300 mb-auto" />
                    <div className="relative z-10">
                      <h3 className="font-grotesk font-bold text-[24px] text-slate-400 mb-1">{cat.title}</h3>
                      <p className="font-inter text-slate-400 text-[14px]">Under Development</p>
                    </div>
                  </div>
                ) : (
                  <Link to={cat.path || "#"} className="group relative overflow-hidden rounded-[40px] bg-slate-50 p-10 h-[300px] flex flex-col justify-end hover:shadow-2xl transition-all cursor-pointer block border border-transparent hover:border-brandOrange/20">
                    <div className={`absolute top-0 right-0 w-32 h-32 ${cat.color} opacity-[0.03] rounded-bl-full group-hover:scale-[2] transition-transform duration-700`}></div>
                    <cat.icon className="w-12 h-12 text-slate-300 mb-auto group-hover:text-brandOrange group-hover:scale-110 transition-all duration-500" />
                    <div className="relative z-10">
                      <h3 className="font-grotesk font-bold text-[24px] text-slate-900 mb-1">{cat.title}</h3>
                      <p className="font-inter text-slate-500 text-[14px] flex items-center gap-2">
                        {cat.count} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </p>
                    </div>
                  </Link>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 5: HOW IT WORKS (VISUAL TIMELINE)
      ========================================= */}
      <section className="py-[120px] bg-slate-900 text-white relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="left">
              <div>
                <h2 className="font-grotesk font-bold text-[40px] md:text-[56px] leading-tight mb-8">Simple path to <br /><span className="text-brandOrange">Mastery.</span></h2>
                <p className="text-white/60 text-[18px] mb-12">We've simplified the journey from curiosity to expertise. Here is how we ensure your success.</p>
                
                <div className="space-y-12">
                  {[
                    { step: "01", title: "Select your Goal", desc: "Choose from our wide range of skill-based programs." },
                    { step: "02", title: "Get Matched", desc: "Our AI finds the best verified trainer in your locality." },
                    { step: "03", title: "Free Demo", desc: "Experience the teaching first-hand at your home." },
                    { step: "04", title: "Start Learning", desc: "Begin your journey with structured, 1-on-1 guidance." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 group">
                      <span className="font-grotesk font-bold text-[48px] text-white/10 group-hover:text-brandOrange/40 transition-colors leading-none">{item.step}</span>
                      <div>
                        <h4 className="font-grotesk font-bold text-[22px] mb-2">{item.title}</h4>
                        <p className="text-white/40 font-inter">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="relative">
                <div className="aspect-[4/5] rounded-[60px] overflow-hidden border border-white/10 relative group">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" alt="Collaborative Learning" className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>
                
                <div className="absolute -bottom-10 -right-10 glass-card p-8 rounded-[32px] border-white/10 shadow-3xl max-w-[280px]">
                  <Sparkles className="w-10 h-10 text-brandOrange mb-4" />
                  <p className="text-white font-grotesk font-bold text-[20px] leading-tight">AI-Powered Matching Algorithm</p>
                  <p className="text-white/40 text-[14px] mt-2">Connecting you with the top 1% of mentors in minutes.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: BENEFITS FOR TRAINERS (MNC STYLE)
      ========================================= */}
      <section className="py-[120px] bg-brandBlue relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brandOrange/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="left">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 font-grotesk font-semibold text-[12px] uppercase tracking-wider">
                  👨‍🏫 Empowering Mentors
                </div>
                <h2 className="font-grotesk font-bold text-[40px] md:text-[56px] text-white leading-tight">Empowering Skilled Trainers</h2>
                <p className="font-inter text-[18px] text-white/60 leading-relaxed">
                  Join our elite network of mentors and build your personal brand while helping the next generation of innovators locally.
                </p>
                
                <div className="space-y-4 pt-6">
                  {[
                    "Get verified student leads consistently",
                    "Choose your own working hours and locations",
                    "Earn more by teaching in your nearby areas",
                    "Build a professional brand via our review system",
                    "Access structured teaching resources and admin support"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-white/80">
                      <div className="w-6 h-6 rounded-full bg-brandOrange/20 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4 text-brandOrange" />
                      </div>
                      <span className="font-inter font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8">
                  <Button className="bg-white text-brandBlue hover:bg-slate-100 px-10 h-16 rounded-2xl font-grotesk font-bold text-[18px] transition-all">
                    Apply as a Trainer
                  </Button>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="relative">
                <div className="w-full aspect-square rounded-[40px] overflow-hidden border border-white/10 shadow-3xl">
                  <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" alt="Trainer" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brandBlue/80 to-transparent"></div>
                </div>
                
                {/* Floating Stat Card */}
                <div className="absolute -bottom-10 -left-10 glass-card p-8 rounded-[32px] border-white/20 shadow-glow-orange">
                  <p className="text-white/60 font-grotesk uppercase tracking-widest text-[12px] mb-2">Trainer Impact</p>
                  <p className="text-white font-grotesk font-bold text-[32px]">100% Flexible</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>


      <section className="py-[120px] bg-slate-50 relative z-10">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <FadeIn direction="left">
              <div className="max-w-2xl">
                <h2 className="font-grotesk font-bold text-[40px] md:text-[56px] text-slate-900 leading-tight mb-4">What our students <br />& parents say.</h2>
                <p className="text-slate-500 text-[18px]">Trusted by 10,000+ families across the state for quality doorstep education.</p>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <Button variant="outline" className="rounded-full px-8 h-12 border-slate-200 text-slate-600 hover:text-brandOrange hover:border-brandOrange transition-all">
                View all stories <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Arun Kumar", role: "Parent", text: "The convenience of having a verified robotics expert come home is unmatched. My son built his first drone in just 4 weeks!", img: "https://i.pravatar.cc/150?u=arun" },
              { name: "Priya S.", role: "Student", text: "I was struggling with Python logic, but my mentor made it so easy. The hands-on hardware kits are the best part of the course.", img: "https://i.pravatar.cc/150?u=priya" },
              { name: "Dr. Rajesh", role: "Parent", text: "Safe, professional, and very structured. The performance tracking keeps me updated on my daughter's progress every week.", img: "https://i.pravatar.cc/150?u=rajesh" }
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                  <div className="flex gap-1 mb-6 text-brandOrange">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="font-inter text-slate-600 text-[17px] leading-relaxed mb-8 italic">"{t.text}"</p>
                  <div className="mt-auto flex items-center gap-4">
                    <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full border-2 border-slate-100" />
                    <div>
                      <h4 className="font-grotesk font-bold text-slate-900">{t.name}</h4>
                      <p className="text-slate-400 text-[12px] font-medium uppercase tracking-wider">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 7: FAQ (CLEAN & PROFESSIONAL)
      ========================================= */}
      <section className="py-[120px] bg-white relative z-10 border-t border-slate-100">
        <div className="page-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-grotesk font-bold text-[40px] md:text-[56px] text-slate-900">Common Questions</h2>
              <p className="text-slate-500 mt-4">Everything you need to know about our doorstep learning model.</p>
            </div>

            <div className="space-y-4">
              {[
                { q: "How do you verify your trainers?", a: "Every trainer undergoes a rigorous 3-step verification process: Document verification, Technical interview, and a mandatory Demo Session approval by our experts." },
                { q: "Can I choose my own schedule?", a: "Yes! Our platform allows you to coordinate with the matched trainer to find a schedule that works best for your personal routine." },
                { q: "Do you provide hardware kits?", a: "For Robotics and Electronics courses, we provide high-quality hardware kits that are brought to your home by the trainer." },
                { q: "What if I am not happy with the trainer?", a: "We offer a 'Satisfaction Guarantee'. If the demo or initial classes aren't up to mark, we will rematch you with a different trainer immediately." }
              ].map((faq, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="group border-b border-slate-100 py-8">
                    <h3 className="font-grotesk font-bold text-[22px] text-slate-900 mb-4 flex items-center justify-between cursor-pointer group-hover:text-brandOrange transition-colors">
                      {faq.q}
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
                    </h3>
                    <p className="font-inter text-slate-500 text-[16px] leading-relaxed max-w-3xl">
                      {faq.a}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 6: CTA BANNER (MNC STYLE)
      ========================================= */}
      <section className="py-[100px] bg-brandBlue relative z-10 border-t border-white/5">
        <div className="page-container relative">
          <div className="w-full rounded-[60px] overflow-hidden relative shadow-premium-shadow border border-white/10">
            <div className="absolute inset-0 bg-navy-dark-grad"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-brandOrange/20 via-electricBlue/10 to-transparent"></div>

            <div className="relative z-10 p-12 md:p-24 text-center">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <h2 className="font-grotesk font-bold text-[48px] md:text-[72px] text-white leading-tight mb-8">
                  The Future of Education <br />
                  <span className="text-brandOrange underline decoration-brandOrange/30">Starts at Home.</span>
                </h2>
                <p className="font-inter text-[20px] text-white/70 mb-12 max-w-2xl mx-auto">
                  Join our mission to empower learners through personalized, professional doorstep education.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link to="/signup" className="w-full sm:w-auto px-12 py-6 rounded-2xl bg-white text-brandBlue font-grotesk font-bold text-[18px] hover:shadow-glow-blue hover:scale-105 transition-all">
                    Register as Student
                  </Link>
                  <Link to="/trainers" className="w-full sm:w-auto px-12 py-6 rounded-2xl border-2 border-white/30 text-white font-grotesk font-bold text-[18px] hover:bg-white/10 transition-all">
                    Register as Trainer
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
