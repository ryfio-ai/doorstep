// src/pages/UnauthorizedPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';

export const UnauthorizedPage: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-offWhite px-4 font-inter">
      <div className="max-w-md w-full text-center space-y-10 bg-white p-12 rounded-[40px] shadow-premium-elevated border border-borderSubtle relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        <div className="flex justify-center relative z-10">
          <div className="p-6 bg-destructive/10 rounded-[32px] rotate-6 shadow-sm border border-destructive/10">
            <ShieldAlert className="w-16 h-16 text-destructive" />
          </div>
        </div>
        
        <div className="space-y-4 relative z-10">
          <h1 className="font-jakarta font-extrabold text-[32px] text-textPrimary tracking-tighter italic leading-none">Security Protocols</h1>
          <p className="font-inter text-textSecondary font-medium italic opacity-60">
            Access restricted. Your current clearance level does not permit entry to this engineering module.
          </p>
        </div>

        {user && (
          <div className="bg-brandOrange/5 p-5 rounded-2xl border border-brandOrange/10 relative z-10">
            <p className="font-jakarta font-extrabold text-[11px] text-textSecondary uppercase tracking-widest opacity-40 mb-1">Authenticated ID</p>
            <p className="font-jakarta font-extrabold text-[15px] text-brandOrange italic">
              Level: <span className="capitalize">{user.role}</span>
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4 relative z-10 pt-4">
          <Button asChild className="btn-primary w-full h-16 rounded-2xl font-jakarta font-extrabold text-[14px] uppercase tracking-widest shadow-premium-card">
            <Link to={user?.role === 'admin' ? '/admin/dashboard' : user?.role === 'trainer' ? '/trainer/dashboard' : '/student/dashboard'}>
              Return to Control Hub
            </Link>
          </Button>
          <Button 
            variant="outline" 
            onClick={signOut}
            className="w-full h-16 border-borderSubtle text-textSecondary font-jakarta font-extrabold text-[11px] uppercase tracking-widest rounded-2xl hover:bg-offWhite transition-all"
          >
            Terminate Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
