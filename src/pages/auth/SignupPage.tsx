import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { User, BookOpen, ArrowRight, CheckCircle2, ChevronLeft, Mail, Lock, Phone, MapPin, RefreshCw } from 'lucide-react';
import Confetti from 'react-confetti';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';
import { OTPInput } from '../../components/auth/OTPInput';

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
  const [isParent, setIsParent] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(0);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    city: 'Coimbatore',
    locality: '',
    grade: '',
    parent_name: '',
  });

  const [width, height] = useWindowSizeLocal();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleRoleSelect = (selectedRole: 'student' | 'trainer') => {
    setRole(selectedRole);
    if (selectedRole === 'student') {
      setStep(1.5);
    } else {
      setStep(2);
    }
  };

  const handleSubtypeSelect = (parent: boolean) => {
    setIsParent(parent);
    setStep(2);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Supabase Auth Signup
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            role: role,
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user returned from signup');
      
      setUserId(authData.user.id);

      // 2. Create User Profile in public.users
      const { error: userError } = await supabase.from('users').upsert({
        id: authData.user.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: role,
        city: formData.city,
        locality: formData.locality,
        onboarding_complete: role === 'student' ? true : false,
      });

      if (userError) throw userError;

      // 3. Create Role-Specific Profile
      if (role === 'student') {
        await supabase.from('student_profiles').upsert({
          user_id: authData.user.id,
          is_parent: isParent,
          grade: formData.grade,
          parent_name: isParent ? formData.parent_name : null,
        });
      } else if (role === 'trainer') {
        await supabase.from('trainer_profiles').upsert({
          user_id: authData.user.id,
          verified: false,
          onboarding_step: 1,
        });
      }

      // 4. Trigger Phone OTP
      await sendPhoneOTP(formData.phone);
      
      setStep(2.5); // Go to verification
      toast.success('Account details saved. Please verify your phone.');
    } catch (error: any) {
      toast.error(error.message || 'Error creating account');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sendPhoneOTP = async (phone: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone,
      });
      if (error) throw error;
      setResendTimer(60);
    } catch (error: any) {
      toast.error('Failed to send SMS. Make sure phone auth is enabled in Supabase.');
      console.error(error);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: formData.phone,
        token: otp,
        type: 'sms',
      });

      if (error) throw error;

      // Update phone_verified status
      if (userId) {
        await supabase.from('users').update({ phone_verified: true }).eq('id', userId);
      }

      setStep(3);
      toast.success('Phone verified successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full max-w-[540px] mx-auto text-center">
      <h2 className="font-poppins font-bold text-[32px] text-primary mb-3">Join EduDoor</h2>
      <p className="font-inter text-[16px] text-gray-500 mb-10">How would you like to start?</p>
      <div className="flex flex-col gap-4">
        <button onClick={() => handleRoleSelect('student')} className="bg-white border-2 border-gray-100 hover:border-accent hover:shadow-orange rounded-[20px] p-6 flex items-center gap-6 transition-all duration-300 group text-left">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors flex-shrink-0">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-[20px] text-primary">📚 I Want to Learn</h3>
            <p className="font-inter text-[14px] text-gray-500">Student or Parent booking for my child</p>
          </div>
        </button>
        <button onClick={() => handleRoleSelect('trainer')} className="bg-white border-2 border-gray-100 hover:border-accent hover:shadow-orange rounded-[20px] p-6 flex items-center gap-6 transition-all duration-300 group text-left">
          <div className="w-16 h-16 rounded-full bg-orange-50 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors flex-shrink-0">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-[20px] text-primary">🎓 I Want to Teach</h3>
            <p className="font-inter text-[14px] text-gray-500">Earn ₹20,000-50,000/month as a home trainer</p>
          </div>
        </button>
      </div>
    </motion.div>
  );

  const renderStep1_5 = () => (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full max-w-[500px] mx-auto text-center">
      <button onClick={() => setStep(1)} className="flex items-center gap-1 text-gray-500 hover:text-primary font-inter text-[13px] mb-6 transition-colors mx-auto">
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      <h2 className="font-poppins font-bold text-[28px] text-primary mb-3">Who are you signing up for?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button onClick={() => handleSubtypeSelect(false)} className="bg-white border-2 border-gray-100 hover:border-accent hover:shadow-orange rounded-[20px] p-8 flex flex-col items-center gap-4 group">
          <User className="w-6 h-6 text-gray-400 group-hover:text-accent" />
          <h3 className="font-poppins font-bold text-[16px]">👤 For Myself</h3>
        </button>
        <button onClick={() => handleSubtypeSelect(true)} className="bg-white border-2 border-gray-100 hover:border-accent hover:shadow-orange rounded-[20px] p-8 flex flex-col items-center gap-4 group">
          <User className="w-6 h-6 text-gray-400 group-hover:text-accent" />
          <h3 className="font-poppins font-bold text-[16px]">👨👧 For My Child</h3>
        </button>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full max-w-[480px] mx-auto bg-white p-8 rounded-[24px] shadow-card border border-gray-100">
      <button onClick={() => setStep(role === 'student' ? 1.5 : 1)} className="flex items-center gap-1 text-gray-500 hover:text-primary font-inter text-[13px] mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      <h2 className="font-poppins font-bold text-[28px] text-primary mb-8">Account Details</h2>
      <form className="space-y-4" onSubmit={handleSignup}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-[13px] font-medium text-primary">Full Name</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[14px]" placeholder="John Doe" />
          </div>
          <div className="space-y-1">
            <label className="text-[13px] font-medium text-primary">Email</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[14px]" placeholder="john@example.com" />
          </div>
          <div className="space-y-1">
            <label className="text-[13px] font-medium text-primary">Phone</label>
            <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[14px]" placeholder="+91 98765 43210" />
          </div>
          <div className="space-y-1">
            <label className="text-[13px] font-medium text-primary">City</label>
            <select value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[14px]">
              <option value="Coimbatore">Coimbatore</option>
              <option value="Chennai">Chennai</option>
              <option value="Madurai">Madurai</option>
              <option value="Trichy">Trichy</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[13px] font-medium text-primary">Locality</label>
            <input type="text" required value={formData.locality} onChange={(e) => setFormData({...formData, locality: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[14px]" placeholder="RS Puram" />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-[13px] font-medium text-primary">Password</label>
            <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[14px]" placeholder="••••••••" />
          </div>
        </div>
        <Button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent-600 text-white h-12 rounded-lg mt-4">
          {loading ? 'Processing...' : 'Create Account'} <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </form>
    </motion.div>
  );

  const renderStep2_5 = () => (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-[440px] mx-auto bg-white p-8 rounded-[24px] shadow-card border border-gray-100 text-center">
      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Phone className="w-8 h-8 text-accent" />
      </div>
      <h2 className="font-poppins font-bold text-[28px] text-primary mb-2">Verify your phone</h2>
      <p className="font-inter text-[15px] text-gray-500 mb-8">
        We've sent a 6-digit code to <span className="font-semibold text-primary">{formData.phone}</span>
      </p>

      <OTPInput onComplete={handleVerifyOTP} disabled={loading} />

      <div className="mt-8 space-y-4">
        <Button 
          variant="ghost" 
          disabled={resendTimer > 0 || loading} 
          onClick={() => sendPhoneOTP(formData.phone)}
          className="text-accent hover:text-accent-600 font-poppins font-semibold text-[14px]"
        >
          {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend Code'} <RefreshCw className={`w-4 h-4 ml-2 ${loading ? 'animate-spin' : ''}`} />
        </Button>
        <p className="text-[13px] text-gray-400">
          Also check your email <span className="font-medium text-gray-600">{formData.email}</span> for a verification link.
        </p>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-[420px] mx-auto text-center relative z-10">
      <Confetti width={width} height={height} recycle={false} numberOfPieces={500} colors={['#1B2A5E', '#F47820', '#10b981', '#ffffff']} />
      <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-12 h-12 text-success" />
      </div>
      <h2 className="font-poppins font-bold text-[32px] text-primary mb-3">Welcome to EduDoor! 🎉</h2>
      <p className="font-inter text-[15px] text-gray-500 mb-8">
        Your account is ready. {role === 'trainer' ? "Let's complete your professional profile." : "Let's find the perfect trainer for you."}
      </p>
      <Button onClick={() => navigate(role === 'student' ? '/student/dashboard' : '/trainer/onboarding')} className="w-full bg-primary hover:bg-navy-dark text-white h-12 rounded-lg">
        Go to Dashboard <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </motion.div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-gray-50 relative overflow-hidden">
        <div className="w-full flex items-center justify-center px-4 pt-24 pb-12">
          <AnimatePresence mode="wait">
            {step === 1 && renderStep1()}
            {step === 1.5 && renderStep1_5()}
            {step === 2 && renderStep2()}
            {step === 2.5 && renderStep2_5()}
            {step === 3 && renderStep3()}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

export default SignupPage;
