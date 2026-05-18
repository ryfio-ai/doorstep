import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin/dashboard');
      else if (user.role === 'trainer') navigate('/trainer/dashboard');
      else navigate('/student/dashboard');
    }
  }, [user, navigate]);

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-white font-inter">
        {/* Left Side: Form (45%) */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 xl:px-32 bg-white relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="w-full max-w-[440px] mx-auto"
          >
            <div className="mb-12">
              <h1 className="font-jakarta font-extrabold text-[48px] text-textPrimary mb-4 tracking-tighter leading-tight italic underline decoration-brandOrange/10 decoration-8 underline-offset-8">{t('auth.loginTitle')}</h1>
              <p className="font-inter text-[18px] text-textSecondary leading-relaxed font-medium opacity-70">{t('auth.loginSubtext')}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="space-y-3">
                <label className="font-jakarta font-extrabold text-[11px] text-textPrimary/40 uppercase tracking-[0.3em]">Access Email</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brandOrange/40 group-focus-within:text-brandOrange transition-colors" />
                  <input 
                    type="email"
                    {...register('email')}
                    placeholder="name@example.com"
                    className={`w-full pl-14 pr-6 py-5 bg-offWhite border ${errors.email ? 'border-destructive' : 'border-borderSubtle group-hover:border-brandOrange/40 focus:border-brandOrange'} rounded-2xl font-inter text-[15px] text-textPrimary focus:outline-none focus:ring-4 ${errors.email ? 'focus:ring-destructive/5' : 'focus:ring-brandOrange/5'} transition-all duration-300 shadow-sm`}
                  />
                </div>
                {errors.email && <p className="text-destructive font-jakarta font-bold text-[12px] mt-2">{errors.email.message}</p>}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="font-jakarta font-extrabold text-[11px] text-textPrimary/40 uppercase tracking-[0.3em]">Security Password</label>
                  <Link to="/forgot-password" title="Reset Password" className="font-jakarta font-extrabold text-[11px] text-brandOrange hover:text-vividOrange transition-colors uppercase tracking-widest">{t('auth.forgotPassword')}</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brandOrange/40 group-focus-within:text-brandOrange transition-colors" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    {...register('password')}
                    placeholder="••••••••"
                    className={`w-full pl-14 pr-14 py-5 bg-offWhite border ${errors.password ? 'border-destructive' : 'border-borderSubtle group-hover:border-brandOrange/40 focus:border-brandOrange'} rounded-2xl font-inter text-[15px] text-textPrimary focus:outline-none focus:ring-4 ${errors.password ? 'focus:ring-destructive/5' : 'focus:ring-brandOrange/5'} transition-all duration-300 shadow-sm`}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-brandOrange/40 hover:text-brandOrange transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-destructive font-jakarta font-bold text-[12px] mt-2">{errors.password.message}</p>}
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full btn-primary h-18 rounded-2xl shadow-premium-elevated hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group text-[16px] font-jakarta font-extrabold uppercase tracking-[0.2em]"
              >
                {isLoading ? "Validating ID..." : t('auth.signIn')}
                {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />}
              </Button>
            </form>

            <div className="mt-16 pt-10 border-t border-offWhite space-y-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <span className="font-inter text-[15px] text-textSecondary font-medium opacity-60">{t('auth.noAccount')}</span>
                <Link to="/signup" className="font-jakarta font-extrabold text-[13px] text-brandOrange hover:text-vividOrange transition-all uppercase tracking-widest hover:underline underline-offset-4">
                  {t('auth.createOne')}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Visual (55%) */}
        <div className="hidden lg:flex w-[55%] bg-brandBlue relative overflow-hidden flex-col justify-between p-24">
          <div className="absolute inset-0 bg-brandBlue opacity-98"></div>
          <div className="absolute -right-20 -top-20 w-[1000px] h-[1000px] bg-brandOrange/10 rounded-full blur-[180px] pointer-events-none animate-pulse"></div>
          <div className="absolute -left-20 bottom-0 w-[500px] h-[500px] bg-brandOrange/5 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl mt-12">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="w-16 h-1 bg-brandOrange mb-10 rounded-full"></div>
              <h2 className="font-jakarta font-extrabold text-[72px] text-white leading-[0.95] mb-12 tracking-tighter italic">
                Where <span className="text-brandOrange underline decoration-white/10 decoration-4 underline-offset-8">Tamil Brilliance</span> <br/>
                Meets Innovation.
              </h2>
              <p className="font-inter text-[22px] text-white/60 leading-relaxed font-medium max-w-xl">
                Join 10,000+ scholars building the future with AI, Robotics, and Advanced Engineering right at their doorstep.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
            className="relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[48px] p-12 max-w-lg transform hover:-translate-y-2 transition-all duration-700 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] group"
          >
            <div className="flex gap-1.5 mb-8 text-brandOrange">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <p className="font-jakarta text-[22px] text-white leading-relaxed mb-10 font-bold italic opacity-90">
              "Since we joined ThiranOli, my daughter's interest in coding has skyrocketed. Having an engineer teach at home makes all the difference."
            </p>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[20px] bg-brandOrange flex items-center justify-center font-jakarta font-extrabold text-2xl text-white shadow-premium-elevated rotate-3 group-hover:rotate-0 transition-transform duration-500">S</div>
              <div>
                <div className="font-jakarta font-extrabold text-[20px] text-white tracking-tight italic">Sangeetha V.</div>
                <div className="font-jakarta font-extrabold text-[11px] text-white/30 uppercase tracking-[0.2em]">Parent, Chennai</div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </PageTransition>
  );
};

export default LoginPage;
