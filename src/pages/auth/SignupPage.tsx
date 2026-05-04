import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { User, BookOpen, ArrowRight, CheckCircle2, ChevronLeft } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use'; // Assuming we can use this or just hardcode window size if needed for confetti. I will use a simple window size hook or generic dimension.

// Basic custom hook for window size
function useWindowSizeLocal() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  React.useLayoutEffect(() => {
    function updateSize() { setSize([window.innerWidth, window.innerHeight]); }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') as 'student' | 'trainer' | null;
  
  const [step, setStep] = useState<number>(initialRole ? 2 : 1);
  const [role, setRole] = useState<'student' | 'trainer' | null>(initialRole);
  
  const [width, height] = useWindowSizeLocal();

  const handleRoleSelect = (selectedRole: 'student' | 'trainer') => {
    setRole(selectedRole);
    setStep(2);
  };

  const renderStep1 = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }}
      className="w-full max-w-[500px] mx-auto text-center"
    >
      <h2 className="font-poppins font-bold text-[32px] text-primary mb-3">Join EduDoor</h2>
      <p className="font-inter text-[15px] text-gray-500 mb-10">How would you like to use our platform?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <button 
          onClick={() => handleRoleSelect('student')}
          className="bg-white border-2 border-gray-100 hover:border-accent hover:shadow-orange rounded-[20px] p-8 flex flex-col items-center gap-4 transition-all duration-300 group"
        >
          <div className="w-16 h-16 rounded-full bg-blue-50 text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-[18px] text-primary">I'm a Student</h3>
            <p className="font-inter text-[13px] text-gray-500 mt-1">I want to book home tutors</p>
          </div>
        </button>

        <button 
          onClick={() => handleRoleSelect('trainer')}
          className="bg-white border-2 border-gray-100 hover:border-accent hover:shadow-orange rounded-[20px] p-8 flex flex-col items-center gap-4 transition-all duration-300 group"
        >
          <div className="w-16 h-16 rounded-full bg-orange-50 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-[18px] text-primary">I'm a Trainer</h3>
            <p className="font-inter text-[13px] text-gray-500 mt-1">I want to teach students</p>
          </div>
        </button>
      </div>

      <div className="mt-12 text-center">
        <span className="font-inter text-[14px] text-gray-500">Already have an account? </span>
        <Link to="/login" className="font-poppins font-semibold text-[14px] text-accent hover:underline">Log in</Link>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
      className="w-full max-w-[420px] mx-auto"
    >
      <button onClick={() => setStep(1)} className="flex items-center gap-1 text-gray-500 hover:text-primary font-inter text-[13px] mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back
      </button>

      <h2 className="font-poppins font-bold text-[32px] text-primary mb-2">Create Account</h2>
      <p className="font-inter text-[15px] text-gray-500 mb-8">
        Registering as a <span className="font-semibold text-accent capitalize">{role}</span>
      </p>

      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
        <div className="space-y-1.5">
          <label className="font-poppins font-medium text-[14px] text-primary">Full Name</label>
          <input type="text" required placeholder="Enter your full name" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-accent rounded-lg font-inter text-[14px] text-primary focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all" />
        </div>

        <div className="space-y-1.5">
          <label className="font-poppins font-medium text-[14px] text-primary">Email Address</label>
          <input type="email" required placeholder="Enter your email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-accent rounded-lg font-inter text-[14px] text-primary focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all" />
        </div>

        <div className="space-y-1.5">
          <label className="font-poppins font-medium text-[14px] text-primary">City (Launch Edition)</label>
          <select required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-accent rounded-lg font-inter text-[14px] text-primary focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all appearance-none">
            <option value="" disabled selected>Select your city</option>
            <option value="Coimbatore">Coimbatore (Primary)</option>
            <option value="Chennai">Chennai</option>
            <option value="Madurai">Madurai</option>
            <option value="Trichy">Trichy</option>
            <option value="Bangalore">Bangalore</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="font-poppins font-medium text-[14px] text-primary">Password</label>
          <input type="password" required placeholder="Create a password" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-accent rounded-lg font-inter text-[14px] text-primary focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all" />
          {/* Password strength bar mock */}
          <div className="flex gap-1 mt-2">
            <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
            <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
            <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
          </div>
          <p className="text-[11px] text-gray-400 font-inter mt-1">Must be at least 8 characters.</p>
        </div>

        <Button type="submit" className="w-full bg-accent hover:bg-accent-600 text-white font-poppins font-semibold text-[15px] h-12 rounded-lg shadow-orange mt-6">
          Continue <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </form>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-[420px] mx-auto text-center relative z-10"
    >
      <Confetti width={width} height={height} recycle={false} numberOfPieces={500} colors={['#1B2A5E', '#F47820', '#10b981', '#ffffff']} />
      
      <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-12 h-12 text-success" />
      </div>
      
      <h2 className="font-poppins font-bold text-[32px] text-primary mb-3">Account Created!</h2>
      <p className="font-inter text-[15px] text-gray-500 mb-8">
        Welcome to EduDoor. Your account has been successfully created.
      </p>

      <Button 
        onClick={() => navigate(role === 'student' ? '/student/dashboard' : '/trainer/onboarding')}
        className="w-full bg-primary hover:bg-navy-dark text-white font-poppins font-semibold text-[15px] h-12 rounded-lg shadow-md"
      >
        Go to Dashboard <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </motion.div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-gray-50">
        
        {/* Top bar with Logo */}
        <div className="absolute top-0 left-0 w-full p-8 z-20 flex justify-between items-center max-w-7xl mx-auto right-0">
          <Link to="/" className="flex items-center gap-2">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F47820" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18"></path><path d="M19 21v-4"></path><path d="M19 17a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v4"></path><path d="M15 5h-6a2 2 0 0 0-2 2v8h14V7a2 2 0 0 0-2-2z"></path><path d="M14 11v2"></path>
            </svg>
            <span className="text-[24px] font-poppins font-bold tracking-tight">
              <span className="text-accent">Edu</span><span className="text-primary">Door</span>
            </span>
          </Link>
        </div>

        {/* Content Centered */}
        <div className="w-full flex items-center justify-center px-4 pt-20">
          <AnimatePresence mode="wait">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </AnimatePresence>
        </div>

      </div>
    </PageTransition>
  );
};

export default SignupPage;
