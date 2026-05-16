import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export const SignupPromo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or is logged in (mock)
    const dismissed = localStorage.getItem('signup_promo_dismissed');
    const user = localStorage.getItem('doorstep_auth_user');
    
    if (!dismissed && !user) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000); // Show after 5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('signup_promo_dismissed', 'true');
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-[400px] z-[100]"
        >
          <div className="glass-dark rounded-[32px] p-6 border border-white/10 shadow-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brandOrange/20 blur-[60px] pointer-events-none"></div>
            
            <button 
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-orange-gradient flex items-center justify-center shrink-0 shadow-glow-orange">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <div>
                <h4 className="font-grotesk font-bold text-white text-[20px] leading-tight">Join ThiranOli Today</h4>
                <p className="font-inter text-white/60 text-[14px] mt-1">Get instant access to premium courses and expert mentors.</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button asChild className="w-full bg-white text-brandBlue hover:bg-slate-100 h-12 rounded-xl font-grotesk font-bold">
                <Link to="/signup" onClick={handleDismiss}>
                  Create Free Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <p className="text-center text-white/30 text-[11px] font-inter uppercase tracking-widest">
                No credit card required
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
