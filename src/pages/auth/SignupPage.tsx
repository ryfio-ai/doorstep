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

export const SignupPage: React.FC = () => {
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full max-w-[600px] mx-auto text-center relative z-10">
      <h2 className="font-jakarta font-extrabold text-[48px] md:text-[64px] text-textPrimary mb-4 tracking-tighter leading-none italic underline decoration-brandOrange/10 decoration-8 underline-offset-8">{t('auth.signupTitle')}</h2>
      <p className="font-inter text-[18px] text-textSecondary mb-16 font-medium opacity-70">{t('auth.signupSubtext')}</p>
      
      <div className="flex flex-col gap-6">
        <button onClick={() => handleRoleSelect('student')} className="premium-card p-10 flex items-center gap-8 transition-all duration-500 group text-left hover:scale-[1.02] active:scale-[0.98]">
          <div className="w-20 h-20 rounded-[24px] bg-brandOrange/5 text-brandOrange flex items-center justify-center group-hover:bg-brandOrange group-hover:text-white transition-all rotate-3 group-hover:rotate-0 flex-shrink-0 shadow-sm">
            <BookOpen className="w-10 h-10" />
          </div>
          <div>
            <h3 className="font-jakarta font-extrabold text-[24px] text-textPrimary group-hover:text-brandOrange transition-colors italic tracking-tight">{t('auth.learnRole')}</h3>
            <p className="font-inter text-[15px] text-textSecondary mt-1 font-medium opacity-60">{t('auth.learnRoleDesc')}</p>
          </div>
        </button>
        <button onClick={() => handleRoleSelect('trainer')} className="premium-card p-10 flex items-center gap-8 transition-all duration-500 group text-left hover:scale-[1.02] active:scale-[0.98]">
          <div className="w-20 h-20 rounded-[24px] bg-brandOrange/5 text-brandOrange flex items-center justify-center group-hover:bg-brandOrange group-hover:text-white transition-all -rotate-3 group-hover:rotate-0 flex-shrink-0 shadow-sm">
            <User className="w-10 h-10" />
          </div>
          <div>
            <h3 className="font-jakarta font-extrabold text-[24px] text-textPrimary group-hover:text-brandOrange transition-colors italic tracking-tight">{t('auth.teachRole')}</h3>
            <p className="font-inter text-[15px] text-textSecondary mt-1 font-medium opacity-60">{t('auth.teachRoleDesc')}</p>
          </div>
        </button>
      </div>

      <div className="mt-16 pt-10 border-t border-offWhite flex flex-col sm:flex-row items-center justify-center gap-3">
        <span className="font-inter text-[15px] text-textSecondary font-medium opacity-60">{t('auth.haveAccount')}</span>
        <Link to="/login" className="font-jakarta font-extrabold text-[13px] text-brandOrange hover:text-vividOrange transition-all uppercase tracking-widest hover:underline underline-offset-4">
          {t('auth.signinHere')}
        </Link>
      </div>
    </motion.div>
  );

  const renderStep1_5 = () => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-[540px] mx-auto text-center relative z-10">
      <button onClick={() => setStep(1)} className="font-jakarta font-extrabold text-[11px] text-textPrimary/40 uppercase tracking-[0.3em] mb-12 hover:text-brandOrange transition-colors flex items-center gap-3 mx-auto group">
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Choice
      </button>
      <h2 className="font-jakarta font-extrabold text-[40px] text-textPrimary mb-12 tracking-tighter italic leading-none">Who are you <br/>signing up for?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button onClick={() => handleSubtypeSelect(false)} className="premium-card p-12 flex flex-col items-center gap-8 group hover:scale-[1.05] active:scale-95 transition-all">
          <div className="w-20 h-20 rounded-[24px] bg-offWhite flex items-center justify-center group-hover:bg-brandOrange/10 group-hover:text-brandOrange transition-all rotate-3 group-hover:rotate-0">
            <User className="w-10 h-10" />
          </div>
          <h3 className="font-jakarta font-extrabold text-[20px] text-textPrimary italic">For Myself</h3>
        </button>
        <button onClick={() => handleSubtypeSelect(true)} className="premium-card p-12 flex flex-col items-center gap-8 group hover:scale-[1.05] active:scale-95 transition-all">
          <div className="w-20 h-20 rounded-[24px] bg-offWhite flex items-center justify-center group-hover:bg-brandOrange/10 group-hover:text-brandOrange transition-all -rotate-3 group-hover:rotate-0">
            <Users className="w-10 h-10" />
          </div>
          <h3 className="font-jakarta font-extrabold text-[20px] text-textPrimary italic">For My Child</h3>
        </button>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-[540px] mx-auto premium-card p-12 relative z-10">
      <button onClick={() => setStep(role === 'student' ? 1.5 : 1)} className="font-jakarta font-extrabold text-[11px] text-textPrimary/40 uppercase tracking-[0.3em] mb-10 hover:text-brandOrange transition-colors flex items-center gap-3 group">
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Go Back
      </button>
      <h2 className="font-jakarta font-extrabold text-[36px] text-textPrimary mb-10 tracking-tighter leading-tight italic">Identity Setup</h2>
      <form className="space-y-6" onSubmit={handleSignup}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2 space-y-2">
            <label className="font-jakarta font-extrabold text-[10px] text-textPrimary/40 uppercase tracking-[0.3em]">Full Legal Name</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-5 bg-offWhite border border-borderSubtle rounded-2xl text-[15px] font-inter focus:border-brandOrange focus:ring-4 focus:ring-brandOrange/5 transition-all" placeholder="Enter full name" />
          </div>
          <div className="space-y-2">
            <label className="font-jakarta font-extrabold text-[10px] text-textPrimary/40 uppercase tracking-[0.3em]">Email Channel</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-5 py-5 bg-offWhite border border-borderSubtle rounded-2xl text-[15px] font-inter focus:border-brandOrange focus:ring-4 focus:ring-brandOrange/5 transition-all" placeholder="name@example.com" />
          </div>
          <div className="space-y-2">
            <label className="font-jakarta font-extrabold text-[10px] text-textPrimary/40 uppercase tracking-[0.3em]">Phone Number</label>
            <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-5 py-5 bg-offWhite border border-borderSubtle rounded-2xl text-[15px] font-inter focus:border-brandOrange focus:ring-4 focus:ring-brandOrange/5 transition-all" placeholder="+91 00000 00000" />
          </div>
          <div className="space-y-2">
            <label className="font-jakarta font-extrabold text-[10px] text-textPrimary/40 uppercase tracking-[0.3em]">Hub City</label>
            <select value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full px-5 py-5 bg-offWhite border border-borderSubtle rounded-2xl text-[15px] font-inter focus:border-brandOrange focus:ring-4 focus:ring-brandOrange/5 transition-all appearance-none">
              <option value="Coimbatore">Coimbatore</option>
              <option value="Chennai">Chennai</option>
              <option value="Madurai">Madurai</option>
              <option value="Trichy">Trichy</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="font-jakarta font-extrabold text-[10px] text-textPrimary/40 uppercase tracking-[0.3em]">Locality</label>
            <input type="text" required value={formData.locality} onChange={(e) => setFormData({...formData, locality: e.target.value})} className="w-full px-5 py-5 bg-offWhite border border-borderSubtle rounded-2xl text-[15px] font-inter focus:border-brandOrange focus:ring-4 focus:ring-brandOrange/5 transition-all" placeholder="e.g. RS Puram" />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <label className="font-jakarta font-extrabold text-[10px] text-textPrimary/40 uppercase tracking-[0.3em]">Master Password</label>
            <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-5 py-5 bg-offWhite border border-borderSubtle rounded-2xl text-[15px] font-inter focus:border-brandOrange focus:ring-4 focus:ring-brandOrange/5 transition-all" placeholder="••••••••" />
          </div>
        </div>
        <Button type="submit" disabled={loading} className="w-full btn-primary h-18 rounded-2xl mt-8 shadow-premium-elevated hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 font-jakarta font-extrabold uppercase tracking-[0.2em] text-[15px]">
          {loading ? 'Processing...' : t('auth.createAccount')} <ArrowRight className="w-5 h-5" />
        </Button>
      </form>
    </motion.div>
  );

  const renderStep2_5 = () => (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-[480px] mx-auto premium-card p-12 text-center relative z-10">
      <div className="w-24 h-24 bg-brandOrange/10 rounded-[32px] flex items-center justify-center mx-auto mb-10 rotate-6 shadow-sm border border-brandOrange/10">
        <Phone className="w-12 h-12 text-brandOrange" />
      </div>
      <h2 className="font-jakarta font-extrabold text-[36px] text-textPrimary mb-4 tracking-tighter italic leading-tight">Verify Identity</h2>
      <p className="font-inter text-[16px] text-textSecondary mb-12 leading-relaxed font-medium opacity-70">
        We've sent a security code to <br/><span className="font-extrabold text-textPrimary italic underline decoration-brandOrange/20">{formData.phone}</span>
      </p>

      <OTPInput onComplete={handleVerifyOTP} disabled={loading} />

      <div className="mt-12 pt-10 border-t border-offWhite space-y-8">
        <Button 
          variant="ghost" 
          disabled={resendTimer > 0 || loading} 
          onClick={() => sendPhoneOTP(formData.phone)}
          className="text-brandOrange hover:text-vividOrange font-jakarta font-extrabold text-[12px] uppercase tracking-[0.3em] h-auto p-0"
        >
          {resendTimer > 0 ? `Retry in ${resendTimer}s` : 'Request New Code'} <RefreshCw className={`w-4 h-4 ml-3 ${loading ? 'animate-spin' : ''}`} />
        </Button>
        <p className="text-[12px] text-textSecondary font-medium opacity-50 uppercase tracking-widest">
          Check email <span className="text-textPrimary">{formData.email}</span> for backup
        </p>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-[500px] mx-auto text-center relative z-10 premium-card p-16">
      <Confetti width={width} height={height} recycle={false} numberOfPieces={800} colors={['#EA580C', '#0A1628', '#FFFFFF', '#F59E0B']} />
      <div className="w-28 h-28 bg-brandOrange/10 rounded-[40px] flex items-center justify-center mx-auto mb-10 rotate-12 shadow-premium-card border border-brandOrange/10">
        <CheckCircle2 className="w-16 h-16 text-brandOrange" />
      </div>
      <h2 className="font-jakarta font-extrabold text-[44px] text-textPrimary mb-6 tracking-tighter leading-none italic">Access Granted! 🎉</h2>
      <p className="font-inter text-[18px] text-textSecondary mb-12 leading-relaxed font-medium opacity-70">
        Your digital profile is ready. {role === 'trainer' ? "Proceed to professional verification module." : "Start exploring engineering paths."}
      </p>
      <Button onClick={() => navigate(role === 'student' ? '/student/dashboard' : '/trainer/onboarding')} className="w-full btn-primary h-18 rounded-2xl shadow-premium-elevated flex items-center justify-center gap-4 text-[16px] font-jakarta font-extrabold uppercase tracking-[0.2em] active:scale-95 transition-all">
        Enter Control Hub <ArrowRight className="w-5 h-5" />
      </Button>
    </motion.div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-white relative overflow-hidden font-inter text-textPrimary">
        {/* MNC Background Grid */}
        <div className="absolute inset-0 opacity-[0.3] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #EA580C 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brandOrange/5 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-brandBlue/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full flex items-center justify-center px-4 pt-44 pb-20">
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
