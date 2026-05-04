import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      // Determine portal based on some logic or user profile after login
      // For now, let's assume it routes to student dashboard for simplicity
      navigate('/student/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex">
        {/* Left Side: Form (50%) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 xl:px-24 bg-white relative">
          
          <Link to="/" className="absolute top-8 left-8 sm:left-16 xl:left-24 flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F47820" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18"></path><path d="M19 21v-4"></path><path d="M19 17a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v4"></path><path d="M15 5h-6a2 2 0 0 0-2 2v8h14V7a2 2 0 0 0-2-2z"></path><path d="M14 11v2"></path>
            </svg>
            <span className="text-[24px] font-poppins font-bold tracking-tight">
              <span className="text-accent">Edu</span><span className="text-primary">Door</span>
            </span>
          </Link>

          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="w-full max-w-[420px] mx-auto mt-16"
          >
            <h1 className="font-poppins font-bold text-[32px] text-primary mb-2">Welcome Back</h1>
            <p className="font-inter text-[15px] text-gray-500 mb-8">Enter your details to access your dashboard.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="space-y-1.5">
                <label className="font-poppins font-medium text-[14px] text-primary">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="email"
                    {...register('email')}
                    placeholder="Enter your email"
                    className={`w-full pl-11 pr-4 py-3 bg-gray-50 border ${errors.email ? 'border-destructive focus:border-destructive' : 'border-gray-200 focus:border-accent'} rounded-lg font-inter text-[14px] text-primary focus:outline-none focus:ring-4 ${errors.email ? 'focus:ring-destructive/10' : 'focus:ring-accent/10'} transition-all`}
                  />
                </div>
                {errors.email && <p className="text-destructive font-inter text-[12px]">{errors.email.message}</p>}
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="font-poppins font-medium text-[14px] text-primary">Password</label>
                  <Link to="/forgot-password" className="font-inter font-medium text-[13px] text-accent hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    {...register('password')}
                    placeholder="Enter your password"
                    className={`w-full pl-11 pr-11 py-3 bg-gray-50 border ${errors.password ? 'border-destructive focus:border-destructive' : 'border-gray-200 focus:border-accent'} rounded-lg font-inter text-[14px] text-primary focus:outline-none focus:ring-4 ${errors.password ? 'focus:ring-destructive/10' : 'focus:ring-accent/10'} transition-all`}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-destructive font-inter text-[12px]">{errors.password.message}</p>}
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accent-600 text-white font-poppins font-semibold text-[15px] h-12 rounded-lg shadow-orange transition-all mt-4"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2">
              <span className="font-inter text-[14px] text-gray-500">Don't have an account?</span>
              <Link to="/signup" className="font-poppins font-semibold text-[14px] text-primary hover:text-accent flex items-center gap-1 transition-colors">
                Create one <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Visual (50%) */}
        <div className="hidden lg:flex w-1/2 bg-navy-dark relative overflow-hidden flex-col justify-between p-16">
          <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          <div className="absolute -right-20 -top-20 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-lg mt-12">
            <h2 className="font-poppins font-bold text-[40px] text-white leading-tight mb-4">
              Learn Better with <br/><span className="text-accent">Home Tutoring</span>
            </h2>
            <p className="font-inter text-[18px] text-white/80">
              Join 500+ families in Tamil Nadu securing top grades through verified doorstep educators.
            </p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-[20px] p-8 max-w-lg">
            <div className="flex gap-1 mb-4 text-warning">⭐⭐⭐⭐⭐</div>
            <p className="font-inter italic text-[16px] text-white/90 leading-[1.7] mb-6">
              "Since we hired an EduDoor trainer for Mathematics, my daughter's confidence has skyrocketed. Having someone teach at our dining table makes all the difference."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-poppins font-bold text-lg">S</div>
              <div>
                <div className="font-poppins font-semibold text-[15px] text-white">Sangeetha V.</div>
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
