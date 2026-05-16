import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export const SignupPromo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('doorstep_auth_user');
    if (user) return;

    const interval = setInterval(() => {
      setIsVisible(true);
    }, 5000); // Trigger every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-8 left-8 right-8 md:left-auto md:right-10 md:w-[380px] z-[100]"
        >
          <div className="bg-brandBlue rounded-[32px] p-8 border border-white/10 shadow-3xl overflow-hidden relative">
            {/* Ambient Glow */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-brandOrange/20 blur-[80px] pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-brandOrange/10 blur-[80px] pointer-events-none"></div>
            
            <button 
              onClick={handleDismiss}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all z-20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-orange-gradient flex items-center justify-center shrink-0 shadow-glow-orange animate-pulse">
                  <Sparkles className="text-white w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-jakarta font-extrabold text-white text-[22px] leading-tight tracking-tight">Unlock Your Path</h4>
                  <p className="font-inter text-white/50 text-[13px] font-medium uppercase tracking-widest mt-1">Free for limited time</p>
                </div>
              </div>

              <p className="font-inter text-white/70 text-[15px] leading-relaxed mb-8">
                Join <span className="text-white font-bold">500+ makers</span> today. Get instant access to premium robotics & AI courses.
              </p>

              <div className="flex flex-col gap-4">
                <Button asChild className="w-full bg-white text-brandBlue hover:bg-offWhite h-14 rounded-2xl font-jakarta font-extrabold text-[16px] shadow-lg transition-transform active:scale-95">
                  <Link to="/signup" onClick={handleDismiss} className="flex items-center justify-center gap-2">
                    Create Free Account
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <p className="text-center text-white/20 text-[10px] font-jakarta font-bold uppercase tracking-[0.2em]">
                  Start learning in 2 minutes
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
