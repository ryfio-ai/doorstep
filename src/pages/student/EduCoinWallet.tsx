// src/pages/student/EduCoinWallet.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coins, History, TrendingUp, Gift, ArrowRight, ShieldCheck, Star, Zap } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { useGamification } from '../../context/GamificationContext';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';

const EduCoinWallet: React.FC = () => {
  const { stats, spendCoins } = useGamification();
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const fetchTransactions = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('educoin_transactions')
      .select('*')
      .eq('student_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20);
    
    if (data) setTransactions(data);
    setLoading(false);
  };

  const offers = [
    { id: 'off100', title: '₹100 Off Next Month', cost: 1000, icon: Gift, color: 'bg-blue-500' },
    { id: 'demo1', title: '1 Free Demo Class', cost: 500, icon: Star, color: 'bg-purple-500' },
    { id: 'shield1', title: 'Streak Shield', cost: 200, icon: ShieldCheck, color: 'bg-green-500' },
    { id: 'priority', title: 'Priority Assignment', cost: 100, icon: Zap, color: 'bg-orange-500' },
  ];

  const handleRedeem = async (offer: any) => {
    const success = await spendCoins(offer.cost, `Redeemed: ${offer.title}`);
    if (success) {
      fetchTransactions();
    }
  };

  return (
    <PageTransition>
      <div className="max-w-[1100px] mx-auto space-y-12 font-inter">
        <div className="flex flex-col space-y-4">
          <h1 className="font-jakarta text-[36px] md:text-[48px] font-extrabold text-textPrimary leading-none tracking-tighter italic">
            EduCoin <span className="text-brandOrange underline decoration-brandOrange/10">Wallet</span>
          </h1>
          <p className="font-inter text-[18px] text-textSecondary font-medium opacity-60 italic">Your rewards for consistent learning and excellence.</p>
        </div>

        {/* Balance Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden bg-brandBlue rounded-[48px] p-10 md:p-16 text-white shadow-premium-elevated group"
        >
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brandOrange/20 rounded-full blur-[140px] pointer-events-none group-hover:bg-brandOrange/30 transition-all duration-700"></div>
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-brandOrange/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-5 py-2 rounded-full border border-white/10 font-jakarta font-extrabold text-[12px] uppercase tracking-widest text-white/80">
                Current Balance
              </div>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-[32px] bg-orange-gradient flex items-center justify-center shadow-glow-orange animate-pulse">
                  <Coins size={48} className="text-white" />
                </div>
                <div>
                  <h1 className="text-[64px] md:text-[88px] font-jakarta font-extrabold leading-none tracking-tighter italic text-brandOrange drop-shadow-2xl">{stats?.educoins || 0}</h1>
                  <span className="text-[18px] font-jakarta font-extrabold text-white/40 uppercase tracking-widest">Available EduCoins</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 min-w-[240px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/40 font-jakarta font-extrabold text-[11px] uppercase tracking-widest">Learning Stats</span>
                  <TrendingUp size={16} className="text-brandOrange" />
                </div>
                <div className="text-[24px] font-jakarta font-extrabold text-white leading-tight italic">Level {stats?.level} Expert</div>
                <div className="text-[14px] text-white/60 mt-1 font-medium italic">{stats?.total_xp} Total Experience Points</div>
              </div>
              <Button variant="outline" className="h-14 rounded-2xl border-white/40 text-white bg-transparent hover:bg-white/10 hover:text-white transition-all font-jakarta font-extrabold uppercase tracking-widest text-[12px]">
                Earn More Coins <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Redeem Section */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="font-jakarta text-[24px] font-extrabold text-textPrimary flex items-center gap-3 italic">
              <Gift className="text-brandOrange w-7 h-7" /> Premium Rewards
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {offers.map((offer) => (
                <motion.div
                  key={offer.id}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-[40px] border border-borderSubtle shadow-premium-card flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brandOrange/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-brandOrange/10 transition-all"></div>
                  
                  <div className="flex items-start justify-between mb-8 relative z-10">
                    <div className={`${offer.color}/10 w-16 h-16 rounded-[24px] flex items-center justify-center text-white shadow-sm`}>
                      <offer.icon size={28} className={offer.color.replace('bg-', 'text-')} />
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-textSecondary/40 font-jakarta font-extrabold uppercase tracking-widest mb-1">Redeem for</div>
                      <div className="font-jakarta font-extrabold text-[22px] text-textPrimary flex items-center justify-end gap-2 italic">
                        <Coins size={20} className="text-brandOrange" /> {offer.cost}
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-jakarta font-extrabold text-[20px] text-textPrimary mb-2 italic leading-tight">{offer.title}</h3>
                    <p className="font-inter text-[13px] text-textSecondary font-medium italic opacity-60 mb-6">Instantly applied to your account</p>
                    <Button
                      onClick={() => handleRedeem(offer)}
                      disabled={!stats || stats.educoins < offer.cost}
                      className={`w-full h-12 rounded-xl font-jakarta font-extrabold text-[12px] uppercase tracking-widest transition-all ${
                        stats && stats.educoins >= offer.cost 
                          ? 'bg-brandBlue text-white hover:bg-brandOrange shadow-lg' 
                          : 'bg-offWhite text-textSecondary/40 border border-borderSubtle cursor-not-allowed'
                      }`}
                    >
                      Redeem Reward
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Transaction History */}
          <div className="space-y-8">
            <h2 className="font-jakarta text-[24px] font-extrabold text-textPrimary flex items-center gap-3 italic">
              <History className="text-brandOrange w-7 h-7" /> Activity
            </h2>
            <div className="bg-white rounded-[40px] border border-borderSubtle shadow-premium-card overflow-hidden">
              {loading ? (
                <div className="p-12 text-center text-textSecondary/40 italic font-medium">Synchronizing...</div>
              ) : transactions.length === 0 ? (
                <div className="p-12 text-center text-textSecondary/40 italic font-medium">No activity yet</div>
              ) : (
                <div className="divide-y divide-borderSubtle/30">
                  {transactions.map((t) => (
                    <div key={t.id} className="p-6 flex items-center justify-between hover:bg-offWhite transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.type === 'earn' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                          {t.type === 'earn' ? <TrendingUp size={16} className="text-green-600" /> : <Gift size={16} className="text-red-600" />}
                        </div>
                        <div>
                          <div className="text-[14px] font-jakarta font-extrabold text-textPrimary group-hover:text-brandOrange transition-colors italic leading-tight">{t.reason}</div>
                          <div className="text-[11px] text-textSecondary/40 font-jakarta font-extrabold uppercase tracking-widest mt-1">
                            {(() => {
                              try {
                                const d = new Date(t.created_at);
                                return isNaN(d.getTime()) ? 'Recently' : format(d, 'MMM d');
                              } catch {
                                return 'Recently';
                              }
                            })()}
                          </div>
                        </div>
                      </div>
                      <div className={`font-jakarta font-extrabold text-[16px] italic ${t.type === 'earn' ? 'text-green-600' : 'text-red-600'}`}>
                        {t.type === 'earn' ? '+' : '-'}{t.amount}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Button variant="ghost" className="w-full h-16 text-[12px] font-jakarta font-extrabold text-brandOrange hover:bg-brandOrange/5 uppercase tracking-widest rounded-none border-t border-borderSubtle/30">
                View All Activity <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default EduCoinWallet;
