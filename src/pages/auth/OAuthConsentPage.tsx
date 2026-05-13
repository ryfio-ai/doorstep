import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, Check, X, ShieldCheck, Info, AlertTriangle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { LoadingScreen } from '../../components/shared/LoadingScreen';

interface AuthorizationDetails {
  client_id: string;
  client_name: string;
  scopes: string[];
}

const OAuthConsentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const authId = searchParams.get('authorization_id');
  
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    if (!authId) {
      setError('Missing authorization ID');
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        // @ts-ignore - oauth server methods might not be in older types
        const { data, error: fetchError } = await supabase.auth.oauth.getAuthorizationDetails(authId);
        
        if (fetchError) throw fetchError;
        setDetails(data);
      } catch (err: any) {
        console.error('Error fetching auth details:', err);
        setError(err.message || 'Failed to fetch application details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [authId]);

  const handleApprove = async () => {
    if (!authId) return;
    setApproving(true);
    try {
      // @ts-ignore
      await supabase.auth.oauth.approveAuthorization(authId);
      // Supabase handles the redirect automatically
    } catch (err: any) {
      toast.error(err.message || 'Failed to approve authorization');
      setApproving(false);
    }
  };

  const handleDeny = async () => {
    if (!authId) return;
    try {
      // @ts-ignore
      await supabase.auth.oauth.denyAuthorization(authId);
      // Supabase handles the redirect back to the client with error
    } catch (err: any) {
      toast.error(err.message || 'Failed to deny authorization');
    }
  };

  if (loading) return <LoadingScreen />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center border border-red-100">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-poppins font-bold text-primary mb-2">Something went wrong</h2>
          <p className="text-gray-500 font-inter mb-8">{error}</p>
          <Button onClick={() => navigate('/')} className="w-full bg-primary h-12 rounded-xl">
            Return to திறனொளி
          </Button>
        </div>
      </div>
    );
  }

  const scopeLabels: Record<string, { label: string; icon: any }> = {
    openid: { label: 'Verify your identity', icon: ShieldCheck },
    email: { label: 'View your email address', icon: Check },
    profile: { label: 'Access your basic profile info', icon: User },
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative backgrounds */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-primary to-accent"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[480px] w-full bg-white rounded-[32px] shadow-2xl shadow-primary/5 border border-gray-100 p-8 md:p-10 relative z-10"
      >
        {/* Header / Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-8">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F47820" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18"></path><path d="M19 21v-4"></path><path d="M19 17a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v4"></path><path d="M15 5h-6a2 2 0 0 0-2 2v8h14V7a2 2 0 0 0-2-2z"></path><path d="M14 11v2"></path>
            </svg>
            <span className="text-2xl font-poppins font-bold tracking-tight text-primary">திறனொளி</span>
          </div>
          
          <div className="relative">
            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200">
               <Shield className="w-10 h-10 text-gray-300" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-accent rounded-lg p-1.5 shadow-lg border-2 border-white">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <h1 className="mt-6 text-xl font-poppins font-bold text-primary text-center">
            {details?.client_name} wants to access your திறனொளி account
          </h1>
          <p className="mt-2 text-[14px] text-gray-500 font-inter text-center">
            This application will be able to:
          </p>
        </div>

        {/* Scopes List */}
        <div className="space-y-4 mb-10">
          {details?.scopes.map((scope) => {
            const info = scopeLabels[scope] || { label: `Access ${scope} information`, icon: Info };
            const Icon = info.icon;
            return (
              <div key={scope} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-sm transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-accent shadow-sm group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-poppins font-semibold text-primary">{info.label}</span>
                  <span className="text-[12px] text-gray-400 font-inter">Required for this app to function</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Card */}
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 mb-10 flex gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
          <p className="text-[12px] text-blue-700 font-inter leading-relaxed">
            திறனொளி will share your information with <strong>{details?.client_name}</strong>.
            You can manage or revoke this access at any time in your account settings.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button 
            onClick={handleApprove}
            disabled={approving}
            className="w-full bg-accent hover:bg-accent-600 text-white font-poppins font-bold h-14 rounded-[18px] text-[16px] shadow-lg shadow-accent/20"
          >
            {approving ? 'Authorizing...' : 'Allow Access'}
          </Button>
          <Button 
            variant="ghost"
            onClick={handleDeny}
            disabled={approving}
            className="w-full text-gray-500 hover:text-red-500 hover:bg-red-50 font-inter font-medium h-12 rounded-[18px]"
          >
            Deny
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <p className="text-[11px] text-gray-400 font-inter">
            By clicking Allow Access, you agree to the திறனொளி <a href="/terms" className="text-accent underline">Terms of Service</a> and <a href="/privacy" className="text-accent underline">Privacy Policy</a>.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OAuthConsentPage;
