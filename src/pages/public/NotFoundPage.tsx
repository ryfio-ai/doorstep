import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';

const NotFoundPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-offWhite flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white rounded-[32px] p-10 text-center shadow-premium-elevated border border-borderSubtle relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brandOrange/5 rounded-bl-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-brandBlue/5 rounded-tr-full pointer-events-none"></div>

          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto bg-brandOrange/10 rounded-2xl flex items-center justify-center mb-8 rotate-3 hover:rotate-0 transition-transform">
              <AlertCircle className="w-10 h-10 text-brandOrange" />
            </div>

            <h1 className="font-jakarta font-extrabold text-[48px] text-textPrimary leading-none mb-2 tracking-tighter">404</h1>
            <h2 className="font-jakarta font-bold text-[24px] text-textPrimary mb-4">Page Not Found</h2>
            
            <p className="font-inter text-textSecondary text-[16px] leading-relaxed mb-8">
              Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <div className="flex flex-col gap-3">
              <Link to="/" className="btn-primary h-14 rounded-xl flex items-center justify-center gap-2 font-jakarta font-bold w-full">
                <Home className="w-5 h-5" />
                Back to Homepage
              </Link>
              <button onClick={() => window.history.back()} className="h-14 rounded-xl border-2 border-borderSubtle text-textSecondary font-jakarta font-bold w-full flex items-center justify-center gap-2 hover:bg-offWhite hover:text-textPrimary transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Go Back Previous
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default NotFoundPage;
