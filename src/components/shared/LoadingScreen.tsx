import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[999] bg-navy-dark flex flex-col items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Logo */}
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center mb-8"
        >
          <span
            className="font-tamil font-bold text-[42px] text-white leading-none"
            style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
          >
            திறனொளி
          </span>
          <span className="font-grotesk font-medium text-[12px] tracking-[0.2em] uppercase text-accent mt-1">
            ThiranOli
          </span>
        </motion.div>

        {/* Progress bar */}
        <div className="w-48 h-[3px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </div>

        <p className="font-inter text-[13px] text-white/40 mt-4 tracking-wide">
          Where Tamil Brilliance Meets Global Innovation
        </p>
      </motion.div>
    </div>
  );
};
