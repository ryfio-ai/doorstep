import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
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
      <div className="min-h-screen flex bg-background">
        {/* Left Side: Form (50%) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 xl:px-24 bg-white relative shadow-[20px_0_40px_rgba(0,0,0,0.02)] z-10">
          
          <Link to="/" className="absolute top-8 left-8 sm:left-16 xl:left-24 flex items-center gap-2">
            <div className="flex flex-col leading-none">
              <span className="font-tamil font-bold text-[24px] text-primary" style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>திறனொளி</span>
              <span className="font-grotesk font-medium text-[10px] tracking-[0.14em] uppercase text-accent mt-0.5">ThiranOli</span>
            </div>
          </Link>

          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="w-full max-w-[420px] mx-auto mt-16"
          >
            <h1 className="font-grotesk font-bold text-[36px] text-primary mb-2 tracking-tight">{t('auth.loginTitle')}</h1>
            <p className="font-inter text-[15px] text-gray-500 mb-10 leading-relaxed">{t('auth.loginSubtext')}</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="space-y-2">
                <label className="font-inter font-medium text-[13px] text-primary/80 uppercase tracking-wide">{t('auth.email')}</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="email"
                    {...register('email')}
                    placeholder="name@example.com"
                    className={`w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border ${errors.email ? 'border-destructive focus:border-destructive' : 'border-gray-200 focus:border-accent'} rounded-xl font-inter text-[14px] text-primary focus:outline-none focus:ring-4 ${errors.email ? 'focus:ring-destructive/10' : 'focus:ring-accent/10'} transition-all duration-200`}
                  />
                </div>
                {errors.email && <p className="text-destructive font-inter text-[12px] mt-1.5">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-inter font-medium text-[13px] text-primary/80 uppercase tracking-wide">{t('auth.password')}</label>
                  <Link to="/forgot-password" className="font-inter font-medium text-[13px] text-accent hover:text-accent-600 transition-colors">{t('auth.forgotPassword')}</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    {...register('password')}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-12 py-3.5 bg-gray-50/50 border ${errors.password ? 'border-destructive focus:border-destructive' : 'border-gray-200 focus:border-accent'} rounded-xl font-inter text-[14px] text-primary focus:outline-none focus:ring-4 ${errors.password ? 'focus:ring-destructive/10' : 'focus:ring-accent/10'} transition-all duration-200`}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-destructive font-inter text-[12px] mt-1.5">{errors.password.message}</p>}
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accent-600 text-white font-grotesk font-semibold text-[15px] h-14 rounded-xl shadow-orange hover:shadow-orange-lg hover:scale-[1.01] transition-all duration-200 mt-6 flex items-center justify-center gap-2 group"
              >
                {isLoading ? "Signing in..." : t('auth.signIn')}
                {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </Button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-center gap-2">
              <span className="font-inter text-[14px] text-gray-500">{t('auth.noAccount')}</span>
              <Link to="/signup" className="font-grotesk font-semibold text-[15px] text-primary hover:text-accent transition-colors">
                {t('auth.createOne')}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Visual (50%) */}
        <div className="hidden lg:flex w-1/2 bg-hero-gradient relative overflow-hidden flex-col justify-between p-16">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          <div className="absolute -right-20 -top-20 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] pointer-events-none animate-pulse-orange"></div>
          
          <div className="relative z-10 max-w-lg mt-12">
            <h2 className="font-grotesk font-bold text-[48px] text-white leading-[1.1] mb-6 tracking-tight">
              Where Tamil Brilliance Meets <br/><span className="text-accent">Global Innovation</span>
            </h2>
            <p className="font-inter text-[18px] text-white/80 leading-relaxed">
              Join thousands of students building the future with AI, Robotics, and advanced technology right at their doorstep.
            </p>
          </div>

          <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-lg transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex gap-1 mb-5 text-accent text-sm">★★★★★</div>
            <p className="font-inter text-[16px] text-white/90 leading-[1.8] mb-6">
              "Since we hired a ThiranOli mentor for Robotics, my daughter's confidence has skyrocketed. Having an engineer teach at our dining table makes all the difference."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/50 text-accent flex items-center justify-center font-grotesk font-bold text-lg">S</div>
              <div>
                <div className="font-grotesk font-bold text-[16px] text-white">Sangeetha V.</div>
                <div className="font-inter text-[13px] text-white/60">Parent, Chennai</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default LoginPage;
