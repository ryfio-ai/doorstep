import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, Globe, ChevronRight, Lock, Eye, UserCheck } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';

export const TrainerSettings: React.FC = () => {
  const settingsGroups = [
    {
      title: 'Security & Access',
      items: [
        { icon: Lock, label: 'Password Management', desc: 'Change your account password and security questions' },
        { icon: Eye, label: 'Login Sessions', desc: 'Manage your active sessions and logged-in devices' },
        { icon: UserCheck, label: 'Two-Factor Auth', desc: 'Add an extra layer of security to your account' }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notification Channels', desc: 'Choose how you want to be alerted for classes' },
        { icon: Globe, label: 'Service Regions', desc: 'Manage the cities and zones you are active in' }
      ]
    }
  ];

  return (
    <PageTransition>
      <div className="max-w-[1000px] mx-auto space-y-12 font-inter">
        <div>
          <h2 className="font-jakarta font-extrabold text-[32px] text-textPrimary tracking-tight italic">Account Settings</h2>
          <p className="font-inter text-[16px] text-textSecondary font-medium opacity-60">Manage your credentials and platform preferences.</p>
        </div>

        <div className="space-y-12">
          {settingsGroups.map((group, i) => (
            <div key={i} className="space-y-6">
              <h3 className="font-jakarta font-extrabold text-[14px] text-textPrimary uppercase tracking-[0.3em] opacity-40 px-2 italic">{group.title}</h3>
              <div className="grid grid-cols-1 gap-4">
                {group.items.map((item, j) => (
                  <motion.div 
                    key={j}
                    whileHover={{ x: 10 }}
                    className="premium-card p-6 bg-white border-none shadow-premium-card flex items-center justify-between group cursor-pointer hover:bg-offWhite transition-all"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-brandOrange/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon className="w-6 h-6 text-brandOrange" />
                      </div>
                      <div>
                        <div className="font-jakarta font-extrabold text-[17px] text-textPrimary italic">{item.label}</div>
                        <div className="font-inter text-[14px] text-textSecondary font-medium">{item.desc}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-textSecondary/20 group-hover:text-brandOrange transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-12 border-t border-borderSubtle">
            <Button variant="outline" className="h-16 px-10 rounded-2xl text-destructive border-destructive/20 hover:bg-destructive/5 font-jakarta font-extrabold uppercase tracking-widest text-[12px]">
              Deactivate Trainer Account
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TrainerSettings;
