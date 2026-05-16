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
    <div className="flex flex-col w-full overflow-hidden bg-white">

      {/* =========================================
          SECTION 1: HERO (MNC ORANGE + WHITE)
      ========================================= */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[50%] h-full bg-soft-orange-radial pointer-events-none"></div>
        <div className="absolute -top-[10%] -right-[10%] w-[800px] h-[800px] bg-brandOrange/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="page-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="space-y-10">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-offWhite border border-borderSubtle shadow-sm">
                  <Sparkles className="w-5 h-5 text-brandOrange animate-pulse" />
                  <span className="font-jakarta font-bold text-[13px] text-textPrimary tracking-[0.08em] uppercase">The Future of Doorstep Learning</span>
                </div>

                <h1 className="font-jakarta font-extrabold text-hero-h1 text-textPrimary leading-[0.95]">
                  Innovation <br />
                  Delivered to <br />
                  <span className="text-brandOrange italic">Your Doorstep.</span>
                </h1>

                <p className="font-inter text-[20px] md:text-[24px] text-textSecondary max-w-xl leading-relaxed">
                  Tamil Nadu's first AI · Robotics · Creative Coding platform with <span className="text-brandOrange font-bold">verified trainers</span> who come to you.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                  <Button asChild size="lg" className="btn-primary h-16 px-10 text-[18px]">
                    <Link to="/courses" className="flex items-center gap-2">
                      Explore Courses <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full border-2 border-brandOrange text-brandOrange hover:bg-brandOrange/5 h-16 px-10 font-jakarta font-bold text-[18px]">
                    <Link to="/trainers">Become a Trainer</Link>
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-borderSubtle">
                  {[
                    "Government Recognized",
                    "ISO Certified",
                    "We focus on indian native language"
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 text-textSecondary">
                      <ShieldCheck className="w-5 h-5 text-brandOrange" />
                      <span className="font-jakarta font-bold text-[14px]">{badge}</span>
                    </div>
                  ))}
                </div>

                {/* Social Proof Bar */}
                <div className="pt-6 flex items-center gap-8">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-2 border-white" alt="student" />)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-jakarta font-extrabold text-[18px] text-textPrimary">500+ Students</span>
                    <span className="text-textSecondary text-[13px] font-medium">12 Cities · 50+ Trainers</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Hero Visual */}
            <div className="hidden lg:block relative">
              <FadeIn delay={0.3}>
                <div className="relative">
                  <div className="relative z-10 animate-float">
                    <img 
                      src="file:///C:/Users/sathish/.gemini/antigravity/brain/6fe62d0a-46cf-49f5-a6f0-b3670b0514be/hero_robotics_visual_1778910877157.png" 
                      alt="Robotics Learning" 
                      className="w-full h-auto drop-shadow-3xl"
                    />
                  </div>
                  {/* Floating Tech Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brandOrange/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-20 -left-10 glass-nav p-6 rounded-2xl border-brandOrange/20 shadow-premium-elevated flex items-center gap-4 animate-float-delayed">
                    <div className="w-12 h-12 rounded-xl bg-brandOrange flex items-center justify-center">
                      <Cpu className="text-white w-7 h-7" />
                    </div>
                    <div>
                      <p className="font-jakarta font-bold text-[16px]">Active Mentorship</p>
                      <p className="text-textSecondary text-[12px]">Real-time doubt clearing</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: WHY 1-ON-1 MATTERS (ORANGE)
      ========================================= */}
      <section className="py-[120px] bg-offWhite relative z-10 border-y border-borderSubtle">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="left">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brandOrange/10 border border-brandOrange/20">
                  <Users className="w-4 h-4 text-brandOrange" />
                  <span className="caption-label text-brandOrange uppercase">The 1-on-1 Advantage</span>
                </div>
                <h2 className="font-jakarta font-extrabold text-section-h2 text-textPrimary leading-[1.1]">
                  Because your child <br />
                  <span className="text-brandOrange underline decoration-brandOrange/20 italic font-medium">deserves focus.</span>
                </h2>
                <p className="font-inter text-[18px] md:text-[20px] text-textSecondary leading-relaxed">
                  In a world of crowded classrooms, we bring the <span className="text-brandOrange font-bold">Power of Personalized Attention</span> to your home. Every child learns differently; we teach them exactly the way they understand.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                  <div className="flex flex-col gap-2">
                    <span className="text-textPrimary font-jakarta font-extrabold text-[24px]">100% Focus</span>
                    <p className="text-textSecondary text-[14px]">Undivided attention from the mentor throughout the session.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-textPrimary font-jakarta font-extrabold text-[24px]">Zero Pressure</span>
                    <p className="text-textSecondary text-[14px]">Student learns at their own pace without competition stress.</p>
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
                  <div key={i} className="premium-card p-8 flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-offWhite flex items-center justify-center shrink-0 group-hover:bg-brandOrange transition-colors">
                      <item.icon className="w-7 h-7 text-brandOrange group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-jakarta font-extrabold text-[20px] text-textPrimary mb-2">{item.title}</h4>
                      <p className="text-textSecondary text-[15px] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: WHAT WE DO (MNC ORANGE + WHITE)
      ========================================= */}
      <section className="py-[120px] bg-white relative z-10 overflow-hidden">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <FadeIn>
              <div className="relative">
                <div className="absolute -top-20 -left-20 text-[180px] font-jakarta font-extrabold text-offWhite select-none">VISION</div>
                <h2 className="font-jakarta font-extrabold text-section-h2 text-textPrimary leading-tight mb-8 relative z-10">
                  Bridging the gap between <br />
                  <span className="text-brandOrange underline decoration-brandOrange/20">Skills & Your Child.</span>
                </h2>
                <div className="space-y-6 relative z-10">
                  <p className="font-inter text-[18px] text-textSecondary leading-relaxed">
                    <span className="text-brandOrange font-bold">திறனொளி (ThiranOli)</span> is a smart learning ecosystem that brings world-class tech education directly to your doorstep.
                  </p>
                  <p className="font-inter text-[18px] text-textSecondary leading-relaxed">
                    Instead of your child commuting to rigid tuition centers, we bring <span className="text-brandOrange font-bold">Expert Mentors</span> to your home. We make quality education accessible, safe, and truly personal.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Safe Home Learning", desc: "Learn in the comfort and safety of your own home environment.", icon: ShieldCheck },
                  { title: "Expert Vetting", desc: "Every mentor is background-checked and tech-verified by IIT/MNC alumni.", icon: CheckCircle },
                  { title: "Flexible Timing", desc: "Schedule classes around your child's routine and school hours.", icon: Globe },
                  { title: "Practical Kits", desc: "We provide all necessary hardware kits and software tools for hands-on learning.", icon: Cpu }
                ].map((item, i) => (
                  <div key={i} className="premium-card p-8 group">
                    <div className="w-12 h-12 rounded-xl bg-brandOrange/5 flex items-center justify-center mb-6 group-hover:bg-brandOrange group-hover:rotate-3 transition-all duration-500">
                      <item.icon className="w-6 h-6 text-brandOrange group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-jakarta font-extrabold text-[20px] text-textPrimary mb-2">{item.title}</h3>
                    <p className="font-inter text-[14px] text-textSecondary leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: EXPLORE CATEGORIES (ORANGE)
      ========================================= */}
      <section className="py-[120px] bg-offWhite relative z-10">
        <div className="page-container">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="font-jakarta font-extrabold text-section-h2 text-textPrimary">What can you learn?</h2>
              <p className="text-textSecondary font-inter text-[18px] max-w-2xl mx-auto mt-4">From beginner coding to advanced robotics, we have a path for every interest.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Robotics & AI", count: "12+ Courses", icon: Cpu, color: "bg-orange-500", path: "/courses", comingSoon: false },
              { title: "Academic Excellence", count: "All Subjects", icon: BookOpen, color: "bg-brandOrange", comingSoon: true },
              { title: "Coding & Software", count: "8+ Programs", icon: Code, color: "bg-vividOrange", comingSoon: true },
              { title: "Embedded Systems", count: "IoT & Hardware", icon: Brain, color: "bg-amberGold", comingSoon: true }
            ].map((cat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                {cat.comingSoon ? (
                  <div className="premium-card p-10 h-[320px] flex flex-col justify-end opacity-60 grayscale cursor-not-allowed">
                    <div className="absolute top-6 right-6 px-3 py-1 bg-offWhite text-textSecondary text-[10px] font-bold uppercase tracking-widest rounded-full border border-borderSubtle">Coming Soon</div>
                    <cat.icon className="w-12 h-12 text-brandOrange/20 mb-auto" />
                    <div className="relative z-10">
                      <h3 className="font-jakarta font-extrabold text-[24px] text-textSecondary mb-1">{cat.title}</h3>
                      <p className="font-inter text-textSecondary text-[14px]">Path Under Construction</p>
                    </div>
                  </div>
                ) : (
                  <Link to={cat.path || "#"} className="premium-card p-10 h-[320px] flex flex-col justify-end group">
                    <div className={`absolute top-0 right-0 w-32 h-32 ${cat.color} opacity-[0.05] rounded-bl-full group-hover:scale-[2.5] transition-transform duration-1000`}></div>
                    <cat.icon className="w-14 h-14 text-brandOrange mb-auto group-hover:scale-110 transition-transform" />
                    <div className="relative z-10">
                      <h3 className="font-jakarta font-extrabold text-[24px] text-textPrimary mb-1">{cat.title}</h3>
                      <p className="font-inter text-textSecondary text-[14px] flex items-center gap-2">
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
          SECTION 5: HOW IT WORKS (MNC LIGHT)
      ========================================= */}
      <section className="py-[120px] bg-white relative z-10 overflow-hidden">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="left">
              <div>
                <h2 className="font-jakarta font-extrabold text-section-h2 text-textPrimary leading-tight mb-8">A Simple Path to <br /><span className="text-brandOrange underline decoration-brandOrange/20">Learning Mastery.</span></h2>
                <p className="text-textSecondary text-[18px] mb-12">We've simplified the journey from curiosity to expertise. Here is how we ensure your success.</p>
                
                <div className="space-y-12">
                  {[
                    { step: "01", title: "Select your Goal", desc: "Choose from our range of 12+ robotics and tech courses." },
                    { step: "02", title: "Get Matched", desc: "Our algorithm finds the best verified trainer in your locality." },
                    { step: "03", title: "Free Demo", desc: "Experience the 1-on-1 teaching first-hand at your home." },
                    { step: "04", title: "Start Learning", desc: "Begin your journey with structured, 1-on-1 guidance and real hardware." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-8 group">
                      <span className="font-jakarta font-extrabold text-[48px] text-brandOrange/10 group-hover:text-brandOrange transition-colors leading-none">{item.step}</span>
                      <div>
                        <h4 className="font-jakarta font-extrabold text-[22px] text-textPrimary mb-2">{item.title}</h4>
                        <p className="text-textSecondary font-inter leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="relative">
                <div className="aspect-[4/5] rounded-[40px] overflow-hidden border border-borderSubtle relative group">
                  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" alt="Collaborative Learning" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent"></div>
                </div>
                
                <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[32px] border border-borderSubtle shadow-premium-elevated max-w-[280px]">
                  <Sparkles className="w-10 h-10 text-brandOrange mb-4" />
                  <p className="text-textPrimary font-jakarta font-extrabold text-[20px] leading-tight">Expert-Led Personal Mentorship</p>
                  <p className="text-textSecondary text-[14px] mt-2">Connecting you with the top 5% of mentors in your city.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 6: BENEFITS FOR TRAINERS (ORANGE)
      ========================================= */}
      <section className="py-[120px] bg-offWhite relative z-10 overflow-hidden">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="left">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brandOrange/10 border border-brandOrange/20 text-brandOrange font-jakarta font-bold text-[12px] uppercase tracking-widest">
                  👨‍🏫 Empowering Mentors
                </div>
                <h2 className="font-jakarta font-extrabold text-section-h2 text-textPrimary leading-tight">Earn & Impact in <br />Your Locality.</h2>
                <p className="font-inter text-[18px] text-textSecondary leading-relaxed">
                  Join our elite network of mentors. Build your professional brand while helping the next generation of innovators right in your neighborhood.
                </p>
                
                <div className="space-y-4 pt-6">
                  {[
                    "Get verified student leads consistently",
                    "Complete flexibility in choosing hours and locations",
                    "Higher earning potential with doorstep premiums",
                    "Build a verified trainer brand via our review system",
                    "Access to IIT-standard teaching kits & resources"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-textPrimary">
                      <div className="w-6 h-6 rounded-full bg-brandOrange flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-inter font-semibold">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8">
                  <Button className="btn-primary h-16 px-12 text-[18px]">
                    Apply as a Trainer
                  </Button>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="relative">
                <div className="w-full aspect-square rounded-[40px] overflow-hidden border border-borderSubtle shadow-premium-card">
                  <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" alt="Trainer" className="w-full h-full object-cover" />
                </div>
                
                <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[32px] border border-borderSubtle shadow-premium-elevated">
                  <p className="text-textSecondary font-jakarta font-bold uppercase tracking-widest text-[12px] mb-2">Trainer Lifestyle</p>
                  <p className="text-textPrimary font-jakarta font-extrabold text-[32px]">100% Flex</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 7: TESTIMONIALS (MNC LIGHT)
      ========================================= */}
      <section className="py-[120px] bg-white relative z-10">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <FadeIn direction="left">
              <div className="max-w-2xl">
                <h2 className="font-jakarta font-extrabold text-section-h2 text-textPrimary leading-tight mb-4">Loved by Students <br />& Parents alike.</h2>
                <p className="text-textSecondary text-[18px]">Trusted by families across Tamil Nadu for quality robotics education at home.</p>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <Button variant="outline" className="rounded-full px-8 h-14 border-brandOrange text-brandOrange font-jakarta font-bold hover:bg-brandOrange/5 transition-all">
                Read all Stories <ArrowRight className="w-5 h-5 ml-2" />
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
                <div className="premium-card p-10 h-full flex flex-col">
                  <div className="flex gap-1 mb-6 text-brandOrange">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="font-inter text-textSecondary text-[17px] leading-relaxed mb-8 italic">"{t.text}"</p>
                  <div className="mt-auto flex items-center gap-4 pt-8 border-t border-offWhite">
                    <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full border-2 border-brandOrange/10" />
                    <div>
                      <h4 className="font-jakarta font-extrabold text-textPrimary">{t.name}</h4>
                      <p className="text-textSecondary text-[12px] font-bold uppercase tracking-wider">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 8: FAQ (MNC STYLE)
      ========================================= */}
      <section className="py-[120px] bg-offWhite relative z-10 border-t border-borderSubtle">
        <div className="page-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-jakarta font-extrabold text-section-h2 text-textPrimary">Common Questions</h2>
              <p className="text-textSecondary mt-4 font-inter">Everything you need to know about our doorstep learning model.</p>
            </div>

            <div className="space-y-4">
              {[
                { q: "How do you verify your trainers?", a: "Every trainer undergoes a rigorous 3-step verification process: Document verification, Technical interview by IIT alumni, and a mandatory Demo Session approval." },
                { q: "Can I choose my own schedule?", a: "Yes! Our platform connects you with local trainers. You can coordinate with them to find a schedule that fits your routine perfectly." },
                { q: "Do you provide hardware kits?", a: "Absolutely. For all Robotics and Electronics courses, we provide high-quality hardware kits that are brought to your home by the trainer." },
                { q: "What if I am not happy with the trainer?", a: "We offer a 'Satisfaction Guarantee'. If the demo or initial classes don't meet your expectations, we will rematch you with a different trainer immediately." }
              ].map((faq, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="group border-b border-borderSubtle py-10 transition-all hover:pl-4">
                    <h3 className="font-jakarta font-extrabold text-[22px] text-textPrimary mb-4 flex items-center justify-between cursor-pointer group-hover:text-brandOrange transition-colors">
                      {faq.q}
                      <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform" />
                    </h3>
                    <p className="font-inter text-textSecondary text-[17px] leading-relaxed max-w-3xl">
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
          SECTION 9: FINAL CTA (MNC ORANGE GRADIENT)
      ========================================= */}
      <section className="py-[100px] bg-white relative z-10">
        <div className="page-container relative">
          <div className="w-full rounded-[60px] overflow-hidden relative shadow-premium-elevated p-12 md:p-24 text-center">
            <div className="absolute inset-0 bg-orange-gradient"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent)]"></div>

            <div className="relative z-10">
              <FadeIn>
                <h2 className="font-jakarta font-extrabold text-[48px] md:text-[80px] text-white leading-tight mb-8 tracking-tighter">
                  Ready to Build the <br />
                  <span className="italic">Future at Home?</span>
                </h2>
                <p className="font-inter text-[20px] md:text-[24px] text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Join hundreds of families across Tamil Nadu. Empower your child with the skills of tomorrow.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  <Link to="/signup" className="w-full sm:w-auto px-16 py-6 rounded-full bg-white text-brandOrange font-jakarta font-extrabold text-[20px] hover:shadow-2xl hover:scale-105 transition-all">
                    Start Learning Now
                  </Link>
                  <Link to="/trainers" className="w-full sm:w-auto px-16 py-6 rounded-full border-2 border-white/30 text-white font-jakarta font-extrabold text-[20px] hover:bg-white/10 transition-all">
                    Apply as Mentor
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
