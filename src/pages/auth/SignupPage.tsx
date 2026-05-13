import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { User, BookOpen, ArrowRight, CheckCircle2, ChevronLeft, Phone, RefreshCw } from 'lucide-react';
import Confetti from 'react-confetti';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';
import { OTPInput } from '../../components/auth/OTPInput';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  
  const [step, setStep] = useState<number>(initialRole ? 2 : 1);
  const [role, setRole] = useState<'student' | 'trainer' | null>(initialRole);
  const [isParent, setIsParent] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(0);
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', city: 'Coimbatore', locality: '', grade: '', parent_name: '',
  });

  const [width, height] = useWindowSizeLocal();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => { setResendTimer((prev) => prev - 1); }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleRoleSelect = (selectedRole: 'student' | 'trainer') => {
    setRole(selectedRole);
    setStep(selectedRole === 'student' ? 1.5 : 2);
  };

  const handleSubtypeSelect = (parent: boolean) => {
    setIsParent(parent);
    setStep(2);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: { data: { name: formData.name, role: role } }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user returned from signup');
      setUserId(authData.user.id);

      const { error: userError } = await supabase.from('users').upsert({
        id: authData.user.id, name: formData.name, email: formData.email, phone: formData.phone,
        role: role, city: formData.city, locality: formData.locality, onboarding_complete: role === 'student' ? true : false,
      });

      if (userError) throw userError;

      if (role === 'student') {
        await supabase.from('student_profiles').upsert({
          user_id: authData.user.id, is_parent: isParent, grade: formData.grade, parent_name: isParent ? formData.parent_name : null,
        });
      } else if (role === 'trainer') {
        await supabase.from('trainer_profiles').upsert({
          user_id: authData.user.id, verified: false, onboarding_step: 1,
        });
      }

      await sendPhoneOTP(formData.phone);
      setStep(2.5); 
      toast.success('Account details saved. Please verify your phone.');
    } catch (error: any) {
      toast.error(error.message || 'Error creating account');
    } finally {
      setLoading(false);
    }
  };

  const sendPhoneOTP = async (phone: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({ phone: phone });
      if (error) throw error;
      setResendTimer(60);
    } catch (error: any) {
      toast.error('Failed to send SMS. Make sure phone auth is enabled in Supabase.');
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({ phone: formData.phone, token: otp, type: 'sms' });
      if (error) throw error;
      if (userId) await supabase.from('users').update({ phone_verified: true }).eq('id', userId);
      setStep(3);
      toast.success('Phone verified successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full max-w-[540px] mx-auto text-center relative z-10">
      <h2 className="font-grotesk font-bold text-[40px] text-primary mb-3 tracking-tight">{t('auth.signupTitle')}</h2>
      <p className="font-inter text-[16px] text-gray-500 mb-10">{t('auth.signupSubtext')}</p>
      
      <div className="flex flex-col gap-5">
        <button onClick={() => handleRoleSelect('student')} className="bg-white border-2 border-gray-100 hover:border-accent hover:shadow-orange rounded-3xl p-8 flex items-center gap-6 transition-all duration-300 group text-left transform hover:-translate-y-1">
          <div className="w-16 h-16 rounded-full bg-primary-100 text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors flex-shrink-0">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-grotesk font-bold text-[22px] text-primary">{t('auth.learnRole')}</h3>
            <p className="font-inter text-[14px] text-gray-500 mt-1">{t('auth.learnRoleDesc')}</p>
          </div>
        </button>
        <button onClick={() => handleRoleSelect('trainer')} className="bg-white border-2 border-gray-100 hover:border-accent hover:shadow-orange rounded-3xl p-8 flex items-center gap-6 transition-all duration-300 group text-left transform hover:-translate-y-1">
          <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors flex-shrink-0">
            <User className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-grotesk font-bold text-[22px] text-primary">{t('auth.teachRole')}</h3>
            <p className="font-inter text-[14px] text-gray-500 mt-1">{t('auth.teachRoleDesc')}</p>
          </div>
        </button>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-center gap-2">
        <span className="font-inter text-[14px] text-gray-500">{t('auth.haveAccount')}</span>
        <Link to="/login" className="font-grotesk font-semibold text-[15px] text-primary hover:text-accent transition-colors">
          {t('auth.signinHere')}
        </Link>
      </div>
    </motion.div>
  );

  const renderStep1_5 = () => (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full max-w-[500px] mx-auto text-center relative z-10">
      <button onClick={() => setStep(1)} className="flex items-center gap-1 text-gray-400 hover:text-primary font-inter text-[13px] mb-8 transition-colors mx-auto">
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      <h2 className="font-grotesk font-bold text-[36px] text-primary mb-10 tracking-tight">Who are you signing up for?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <button onClick={() => handleSubtypeSelect(false)} className="bg-white border-2 border-gray-100 hover:border-accent hover:shadow-orange rounded-3xl p-10 flex flex-col items-center gap-5 group transform hover:-translate-y-1 transition-all">
          <User className="w-8 h-8 text-gray-400 group-hover:text-accent" />
          <h3 className="font-grotesk font-bold text-[18px] text-primary">For Myself</h3>
        </button>
        <button onClick={() => handleSubtypeSelect(true)} className="bg-white border-2 border-gray-100 hover:border-accent hover:shadow-orange rounded-3xl p-10 flex flex-col items-center gap-5 group transform hover:-translate-y-1 transition-all">
          <User className="w-8 h-8 text-gray-400 group-hover:text-accent" />
          <h3 className="font-grotesk font-bold text-[18px] text-primary">For My Child</h3>
        </button>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full max-w-[500px] mx-auto bg-white p-10 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-gray-100 relative z-10">
      <button onClick={() => setStep(role === 'student' ? 1.5 : 1)} className="flex items-center gap-1 text-gray-400 hover:text-primary font-inter text-[13px] mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      <h2 className="font-grotesk font-bold text-[32px] text-primary mb-8 tracking-tight">Account Details</h2>
      <form className="space-y-5" onSubmit={handleSignup}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-[12px] font-inter font-medium text-primary/80 uppercase tracking-wide">Full Name</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-inter focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" placeholder="John Doe" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-inter font-medium text-primary/80 uppercase tracking-wide">Email</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-inter focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" placeholder="john@example.com" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-inter font-medium text-primary/80 uppercase tracking-wide">Phone</label>
            <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-inter focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" placeholder="+91 98765 43210" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-inter font-medium text-primary/80 uppercase tracking-wide">City</label>
            <select value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-inter focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all">
              <option value="Coimbatore">Coimbatore</option>
              <option value="Chennai">Chennai</option>
              <option value="Madurai">Madurai</option>
              <option value="Trichy">Trichy</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-inter font-medium text-primary/80 uppercase tracking-wide">Locality</label>
            <input type="text" required value={formData.locality} onChange={(e) => setFormData({...formData, locality: e.target.value})} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-inter focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" placeholder="RS Puram" />
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-[12px] font-inter font-medium text-primary/80 uppercase tracking-wide">Password</label>
            <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-inter focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" placeholder="••••••••" />
          </div>
        </div>
        <Button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent-600 text-white font-grotesk font-semibold text-[15px] h-14 rounded-xl mt-8 shadow-orange hover:shadow-orange-lg hover:scale-[1.01] transition-all">
          {loading ? 'Processing...' : t('auth.createAccount')} <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </motion.div>
  );

  const renderStep2_5 = () => (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-[440px] mx-auto bg-white p-10 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-gray-100 text-center relative z-10">
      <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
        <Phone className="w-10 h-10 text-accent" />
      </div>
      <h2 className="font-grotesk font-bold text-[32px] text-primary mb-3 tracking-tight">Verify your phone</h2>
      <p className="font-inter text-[15px] text-gray-500 mb-10 leading-relaxed">
        We've sent a 6-digit code to <span className="font-semibold text-primary">{formData.phone}</span>
      </p>

      <OTPInput onComplete={handleVerifyOTP} disabled={loading} />

      <div className="mt-10 pt-8 border-t border-gray-50 space-y-4">
        <Button 
          variant="ghost" 
          disabled={resendTimer > 0 || loading} 
          onClick={() => sendPhoneOTP(formData.phone)}
          className="text-accent hover:text-accent-600 font-grotesk font-semibold text-[14px]"
        >
          {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend Code'} <RefreshCw className={`w-4 h-4 ml-2 ${loading ? 'animate-spin' : ''}`} />
        </Button>
        <p className="text-[13px] text-gray-400 font-inter">
          Also check your email <span className="font-medium text-gray-600">{formData.email}</span> for a verification link.
        </p>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-[440px] mx-auto text-center relative z-10 bg-white p-10 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-gray-100">
      <Confetti width={width} height={height} recycle={false} numberOfPieces={500} colors={['#0A4DA3', '#F57C28', '#10b981', '#ffffff']} />
      <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-8">
        <CheckCircle2 className="w-12 h-12 text-success" />
      </div>
      <h2 className="font-grotesk font-bold text-[36px] text-primary mb-4 tracking-tight">Welcome to ThiranOli! 🎉</h2>
      <p className="font-inter text-[16px] text-gray-500 mb-10 leading-relaxed">
        Your account is ready. {role === 'trainer' ? "Let's complete your professional profile." : "Let's find the perfect program for you."}
      </p>
      <Button onClick={() => navigate(role === 'student' ? '/student/dashboard' : '/trainer/onboarding')} className="w-full bg-primary hover:bg-navy-dark text-white font-grotesk font-semibold text-[15px] h-14 rounded-xl transition-colors">
        Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-background relative overflow-hidden">
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #0A4DA3 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Top left logo */}
        <div className="absolute top-8 left-8 sm:left-12 z-20">
           <Link to="/" className="flex items-center gap-2">
            <div className="flex flex-col leading-none">
              <span className="font-tamil font-bold text-[24px] text-primary" style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>திறனொளி</span>
              <span className="font-grotesk font-medium text-[10px] tracking-[0.14em] uppercase text-accent mt-0.5">ThiranOli</span>
            </div>
          </Link>
        </div>

        <div className="w-full flex items-center justify-center px-4 pt-28 pb-12">
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
