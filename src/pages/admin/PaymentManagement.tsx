import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  IndianRupee, 
  CreditCard, 
  ArrowUpRight, 
  History, 
  Download, 
  Search, 
  Filter,
  PieChart,
  Wallet,
  TrendingUp
} from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';

export const PaymentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const payments: any[] = []; // Empty for fresh account

  return (
    <PageTransition>
      <div className="max-w-[1400px] mx-auto space-y-8 font-inter">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="font-jakarta font-extrabold text-[32px] text-textPrimary tracking-tight italic">Financial Treasury</h1>
            <p className="font-inter text-[16px] text-textSecondary font-medium opacity-60">Manage student subscriptions, trainer payouts and platform revenue.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="h-14 px-6 rounded-2xl border-borderSubtle font-jakarta font-extrabold uppercase tracking-widest text-[11px]">
              <Download className="w-4 h-4 mr-2" /> Reconciliation Report
            </Button>
            <Button className="btn-primary h-14 px-8 rounded-2xl font-jakarta font-extrabold uppercase tracking-widest text-[12px] shadow-premium-card">
              Process Payouts
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-brandBlue rounded-[40px] p-8 text-white relative overflow-hidden shadow-premium-elevated">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brandOrange/10 rounded-full blur-3xl"></div>
            <div className="text-[12px] font-jakarta font-extrabold uppercase tracking-widest text-white/40 mb-4">Gross Revenue (MTD)</div>
            <div className="text-[48px] font-jakarta font-extrabold italic mb-2 tracking-tighter leading-none">₹0</div>
            <div className="flex items-center gap-2 text-green-400 text-[12px] font-jakarta font-extrabold bg-white/5 w-fit px-3 py-1 rounded-full border border-white/10">
              <TrendingUp className="w-3 h-3" /> +0% vs Last Month
            </div>
          </div>
          <div className="bg-white rounded-[40px] p-8 border border-borderSubtle relative overflow-hidden">
            <div className="text-[12px] font-jakarta font-extrabold uppercase tracking-widest text-textSecondary/40 mb-4">Pending Trainer Payouts</div>
            <div className="text-[48px] font-jakarta font-extrabold italic mb-2 tracking-tighter leading-none text-textPrimary">₹0</div>
            <div className="text-[12px] font-jakarta font-extrabold text-textSecondary opacity-40">0 pending requests</div>
          </div>
          <div className="bg-white rounded-[40px] p-8 border border-borderSubtle relative overflow-hidden">
            <div className="text-[12px] font-jakarta font-extrabold uppercase tracking-widest text-textSecondary/40 mb-4">Platform Fee Share</div>
            <div className="text-[48px] font-jakarta font-extrabold italic mb-2 tracking-tighter leading-none text-brandOrange">20%</div>
            <div className="text-[12px] font-jakarta font-extrabold text-textSecondary opacity-40">Standard Platform Tier</div>
          </div>
        </div>

        <div className="premium-card border-none shadow-premium-card bg-white overflow-hidden min-h-[500px] flex flex-col">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-brandOrange/10"></div>
          <div className="p-8 border-b border-borderSubtle flex justify-between items-center bg-offWhite/50">
            <h3 className="font-jakarta font-extrabold text-[18px] text-textPrimary uppercase tracking-widest opacity-50 italic">Ledger History</h3>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary/40" />
                <input type="text" placeholder="Transaction ID..." className="pl-10 pr-4 py-2 bg-white border border-borderSubtle rounded-xl text-[13px] focus:outline-none focus:border-brandOrange transition-all" />
              </div>
              <Button variant="outline" className="h-10 px-4 rounded-xl border-borderSubtle text-[11px] font-jakarta font-extrabold uppercase tracking-widest">Filters</Button>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
            <div className="w-20 h-20 bg-brandOrange/5 rounded-[32px] flex items-center justify-center mb-8">
              <History className="w-10 h-10 text-brandOrange/30" />
            </div>
            <h4 className="font-jakarta font-extrabold text-[20px] text-textPrimary mb-3 italic">No Transactions</h4>
            <p className="font-inter text-[15px] text-textSecondary font-medium opacity-60 leading-relaxed mb-8 max-w-sm mx-auto">
              The financial ledger is clean. New payments from students and payout releases will be recorded here.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PaymentManagement;
