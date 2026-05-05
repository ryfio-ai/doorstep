// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { User, Role, StudentProfile, TrainerProfile } from '../types';

interface AuthContextType {
  user: User | null;
  studentProfile: StudentProfile | null;
  trainerProfile: TrainerProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  isStudent: boolean;
  isTrainer: boolean;
  isAdmin: boolean;
  isVerifiedTrainer: boolean;
  isParent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [trainerProfile, setTrainerProfile] = useState<TrainerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();
        
      if (userData) {
        setUser(userData as User);
        
        if (userData.role === 'student') {
          const { data: studentData } = await supabase
            .from('student_profiles')
            .select('*')
            .eq('user_id', supabaseUser.id)
            .single();
          if (studentData) setStudentProfile({ ...userData, ...studentData } as StudentProfile);
        } else if (userData.role === 'trainer') {
          const { data: trainerData } = await supabase
            .from('trainer_profiles')
            .select('*')
            .eq('user_id', supabaseUser.id)
            .single();
          if (trainerData) setTrainerProfile({ ...userData, ...trainerData } as TrainerProfile);
        }
      } else if (userError) {
        console.error('Error fetching profile:', userError);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        fetchProfile(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setStudentProfile(null);
        setTrainerProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const refreshProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) await fetchProfile(session.user);
  };

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    studentProfile,
    trainerProfile,
    loading,
    login,
    signOut,
    refreshProfile,
    isStudent: user?.role === 'student',
    isTrainer: user?.role === 'trainer',
    isAdmin: user?.role === 'admin',
    isVerifiedTrainer: !!trainerProfile?.verified && !trainerProfile?.suspended,
    isParent: !!studentProfile?.is_parent,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
