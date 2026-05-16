import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, Download, Calendar, ArrowUpRight, History, CreditCard, Clock } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../context/AuthContext';

export const TrainerEarnings: React.FC = () => {
  const { trainerProfile } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]); // Empty for fresh account

  return (
    <PageTransition>
      <div className="max-w-[1200px] mx-auto space-y-8 font-inter">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="font-jakarta font-extrabold text-[32px] text-textPrimary tracking-tight italic">Financial Overview</h2>
            <p className="font-inter text-[16px] text-textSecondary font-medium opacity-60">Track your earnings, payouts, and incentives.</p>
          </div>
          <Button variant="outline" className="h-14 px-8 rounded-2xl border-borderSubtle font-jakarta font-extrabold uppercase tracking-widest text-[11px] hover:bg-offWhite">
            <Download className="w-5 h-5 mr-2" /> Export Report
          </Button>
        </div>

        {/* Main Stats Card */}
        <div className="bg-brandBlue rounded-[40px] p-10 md:p-12 border-none shadow-premium-elevated relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brandOrange/10 rounded-full blur-[140px] pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <div className="md:col-span-2 space-y-10">
              <div>
                <span className="font-jakarta font-extrabold text-[12px] text-white/40 uppercase tracking-[0.3em] block mb-4">Total Life-time Earnings</span>
                <div className="font-jakarta font-extrabold text-[56px] md:text-[72px] leading-none tracking-tighter flex items-baseline gap-3 italic">
                  ₹0
                  <span className="text-[14px] text-brandOrange bg-brandOrange/10 px-3 py-1 rounded-full border border-brandOrange/20 not-italic tracking-normal">New Account</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-4 bg-white/5 p-4 pr-8 rounded-2xl border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-brandOrange/20 flex items-center justify-center">
                    <History className="w-6 h-6 text-brandOrange" />
                  </div>
                  <div>
                    <div className="font-jakarta font-extrabold text-[18px]">0</div>
                    <div className="font-jakarta font-extrabold text-[10px] text-white/40 uppercase tracking-widest">Classes Completed</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/5 p-4 pr-8 rounded-2xl border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div className="font-jakarta font-extrabold text-[18px]">₹0</div>
                    <div className="font-jakarta font-extrabold text-[10px] text-white/40 uppercase tracking-widest">Incentives Earned</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-jakarta font-extrabold text-[12px] text-white/40 uppercase tracking-widest">Available Payout</span>
                  <div className="w-10 h-10 rounded-2xl bg-brandOrange/20 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-brandOrange" />
                  </div>
                </div>
                <div className="font-jakarta font-extrabold text-[40px] tracking-tighter leading-none mb-2 italic">₹0</div>
                <p className="text-[12px] text-white/40 font-medium">Minimum threshold: ₹1,000</p>
              </div>
              <Button disabled className="w-full btn-primary h-14 rounded-2xl mt-8 font-jakarta font-extrabold uppercase tracking-widest text-[12px]">
                Request Withdrawal
              </Button>
            </div>
          </div>
        </div>

        {/* Transaction History Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <History className="w-5 h-5 text-brandOrange" />
            <h3 className="font-jakarta font-extrabold text-[20px] text-textPrimary uppercase tracking-widest opacity-50">Transaction History</h3>
          </div>

          <div className="premium-card p-12 border-none shadow-premium-card min-h-[400px] flex items-center justify-center bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-offWhite/50 to-transparent"></div>
            
            <div className="text-center max-w-sm relative z-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-20 h-20 bg-brandOrange/5 rounded-[32px] flex items-center justify-center mx-auto mb-8"
              >
                <Clock className="w-10 h-10 text-brandOrange/30" />
              </motion.div>
              <h4 className="font-jakarta font-extrabold text-[20px] text-textPrimary mb-3 italic">No Transactions Yet</h4>
              <p className="font-inter text-[15px] text-textSecondary font-medium mb-8 opacity-60 leading-relaxed">
                Your financial ledger is currently empty. Start teaching sessions to see your earnings accumulate here.
              </p>
              <Button variant="outline" className="h-14 px-10 rounded-2xl border-brandOrange/20 text-brandOrange font-jakarta font-extrabold uppercase tracking-widest text-[11px] hover:bg-brandOrange/5">
                View Payout Policy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TrainerEarnings;
