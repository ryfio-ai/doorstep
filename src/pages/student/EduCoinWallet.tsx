// src/pages/student/EduCoinWallet.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coins, History, TrendingUp, Gift, ArrowRight, ShieldCheck, Star, Zap } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Balance Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-orange-100 font-medium mb-1">Your Balance</p>
            <div className="flex items-center gap-3">
              <Coins size={48} className="text-yellow-300 drop-shadow-lg" />
              <h1 className="text-6xl font-bold font-poppins">{stats?.educoins || 0}</h1>
              <span className="text-2xl font-medium text-orange-100">EduCoins</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl px-4 py-2 flex items-center gap-2">
              <TrendingUp size={20} />
              <span className="text-sm font-medium">Level {stats?.level} • {stats?.total_xp} XP</span>
            </div>
            <p className="text-[10px] text-orange-100 italic">*Coins expire after 6 months of inactivity</p>
          </div>
        </div>
        
        {/* Background blobs */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-orange-700/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Redeem Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Gift className="text-orange-500" /> Redeem Offers
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {offers.map((offer) => (
              <motion.div
                key={offer.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${offer.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                    <offer.icon size={24} />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400 font-medium">Cost</div>
                    <div className="font-bold text-gray-900 flex items-center justify-end gap-1">
                      <Coins size={14} className="text-orange-500" /> {offer.cost}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{offer.title}</h3>
                  <p className="text-xs text-gray-500 mb-4">Instant activation upon redemption</p>
                  <button
                    onClick={() => handleRedeem(offer)}
                    disabled={!stats || stats.educoins < offer.cost}
                    className="w-full py-2 bg-gray-50 hover:bg-orange-500 hover:text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:hover:bg-gray-50 disabled:hover:text-gray-400"
                  >
                    Redeem Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <History className="text-orange-500" /> History
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-400">Loading...</div>
            ) : transactions.length === 0 ? (
              <div className="p-8 text-center text-gray-400">No transactions yet</div>
            ) : (
              <div className="divide-y divide-gray-50">
                {transactions.map((t) => (
                  <div key={t.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{t.reason}</div>
                      <div className="text-[10px] text-gray-400">{format(new Date(t.created_at), 'MMM d, h:mm a')}</div>
                    </div>
                    <div className={`font-bold ${t.type === 'earn' ? 'text-green-500' : 'text-red-500'}`}>
                      {t.type === 'earn' ? '+' : ''}{t.amount}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button className="w-full p-4 text-xs font-semibold text-orange-500 hover:bg-orange-50 transition-colors border-t border-gray-50 flex items-center justify-center gap-1">
              View All <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EduCoinWallet;
