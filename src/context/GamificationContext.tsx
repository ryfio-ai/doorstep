// src/context/GamificationContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import type { StudentGamification, Badge, EducoinTransaction } from '../types/gamification';
import { toast } from 'sonner';

interface GamificationContextType {
  stats: StudentGamification | null;
  badges: Badge[];
  userBadges: string[];
  loading: boolean;
  earnRewards: (amount: number, xp: number, reason: string) => Promise<void>;
  spendCoins: (amount: number, reason: string) => Promise<boolean>;
  updateStreak: () => Promise<void>;
  checkAchievements: () => Promise<void>;
  refreshStats: () => Promise<void>;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isStudent } = useAuth();
  const [stats, setStats] = useState<StudentGamification | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [userBadges, setUserBadges] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    if (!user || !isStudent) return;

    try {
      // Fetch stats
      const { data: statsData, error: statsError } = await supabase
        .from('student_gamification')
        .select('*')
        .eq('student_id', user.id)
        .single();

      if (statsError && statsError.code === 'PGRST116') {
        // Create stats if they don't exist
        const { data: newData, error: createError } = await supabase
          .from('student_gamification')
          .insert([{ student_id: user.id }])
          .select()
          .single();
        
        if (newData) setStats(newData as StudentGamification);
        if (createError) console.error('Error creating stats:', createError);
      } else if (statsData) {
        setStats(statsData as StudentGamification);
      }

      // Fetch earned badges
      const { data: badgeData } = await supabase
        .from('student_badges')
        .select('badge_id')
        .eq('student_id', user.id);
      
      if (badgeData) {
        setUserBadges(badgeData.map(b => b.badge_id));
      }
    } catch (err) {
      console.error('Error in fetchStats:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllBadges = async () => {
    const { data } = await supabase.from('badges').select('*').eq('active', true);
    if (data) setBadges(data as Badge[]);
  };

  useEffect(() => {
    if (user && isStudent) {
      fetchStats();
      fetchAllBadges();
    } else {
      setStats(null);
      setLoading(false);
    }
  }, [user, isStudent]);

  const earnRewards = async (amount: number, xp: number, reason: string) => {
    if (!user || !stats) return;

    try {
      const newCoins = stats.educoins + amount;
      const newXp = stats.total_xp + xp;
      
      // Update stats
      const { error: updateError } = await supabase
        .from('student_gamification')
        .update({ 
          educoins: newCoins, 
          total_xp: newXp,
          updated_at: new Date().toISOString()
        })
        .eq('student_id', user.id);

      if (updateError) throw updateError;

      // Log transaction
      await supabase.from('educoin_transactions').insert({
        student_id: user.id,
        amount,
        type: 'earn',
        reason,
        balance_after: newCoins
      });

      setStats({ ...stats, educoins: newCoins, total_xp: newXp });
      
      if (amount > 0) toast.success(`Earned ${amount} EduCoins! 🪙`);
      if (xp > 0) toast.info(`+${xp} XP gained! ✨`);
      
    } catch (err) {
      console.error('Error earning rewards:', err);
      toast.error('Failed to update rewards');
    }
  };

  const spendCoins = async (amount: number, reason: string): Promise<boolean> => {
    if (!user || !stats || stats.educoins < amount) {
      toast.error('Insufficient EduCoins');
      return false;
    }

    try {
      const newCoins = stats.educoins - amount;
      
      const { error: updateError } = await supabase
        .from('student_gamification')
        .update({ 
          educoins: newCoins,
          updated_at: new Date().toISOString()
        })
        .eq('student_id', user.id);

      if (updateError) throw updateError;

      await supabase.from('educoin_transactions').insert({
        student_id: user.id,
        amount: -amount,
        type: 'spend',
        reason,
        balance_after: newCoins
      });

      setStats({ ...stats, educoins: newCoins });
      toast.success(`Spent ${amount} EduCoins 🪙`);
      return true;
    } catch (err) {
      console.error('Error spending coins:', err);
      toast.error('Failed to process transaction');
      return false;
    }
  };

  const updateStreak = async () => {
    if (!user || !stats) return;

    const today = new Date().toISOString().split('T')[0];
    const lastActivity = stats.last_activity;

    if (lastActivity === today) return; // Already updated today

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newStreak = 1;
    if (lastActivity === yesterdayStr) {
      newStreak = stats.streak_days + 1;
    }

    const { error } = await supabase
      .from('student_gamification')
      .update({ 
        streak_days: newStreak,
        max_streak: Math.max(newStreak, stats.max_streak),
        last_activity: today,
        updated_at: new Date().toISOString()
      })
      .eq('student_id', user.id);

    if (!error) {
      setStats({ ...stats, streak_days: newStreak, last_activity: today });
      if (newStreak > stats.streak_days) {
        toast.success(`🔥 ${newStreak} Day Streak!`, {
          description: "Keep it up!",
          icon: '🔥'
        });
        
        // Reward for streak milestones
        if (newStreak % 7 === 0) earnRewards(100, 50, `${newStreak} Day Streak Milestone`);
      }
    }
  };

  const checkAchievements = async () => {
    // Logic to check if student met any badge requirements
    // This could be called after earning rewards or completing classes
  };

  const refreshStats = async () => {
    await fetchStats();
  };

  return (
    <GamificationContext.Provider value={{
      stats,
      badges,
      userBadges,
      loading,
      earnRewards,
      spendCoins,
      refreshStats
    }}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};
