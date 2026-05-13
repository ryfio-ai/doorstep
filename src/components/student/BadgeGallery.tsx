// src/components/student/BadgeGallery.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Lock, Share2 } from 'lucide-react';
import { useGamification } from '../../context/GamificationContext';
import { toast } from 'sonner';

const BadgeGallery: React.FC = () => {
  const { badges, userBadges } = useGamification();

  const handleShare = (badgeName: string) => {
    const text = `I just earned the "${badgeName}" badge on திறனொளி! 🎓 #Learning #ThiranOli`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    toast.success('Sharing to WhatsApp...');
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400 text-yellow-600 bg-yellow-50';
      case 'epic': return 'border-purple-400 text-purple-600 bg-purple-50';
      case 'rare': return 'border-blue-400 text-blue-600 bg-blue-50';
      default: return 'border-gray-200 text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {badges.map((badge) => {
        const isEarned = userBadges.includes(badge.id);
        const rarityClass = getRarityColor(badge.rarity);

        return (
          <motion.div
            key={badge.id}
            whileHover={isEarned ? { scale: 1.05, y: -5 } : {}}
            className={`relative p-4 rounded-2xl border-2 flex flex-col items-center text-center transition-all group ${
              isEarned ? rarityClass : 'border-dashed border-gray-200 grayscale opacity-50'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
              isEarned ? 'bg-white shadow-sm' : 'bg-gray-100'
            }`}>
              {isEarned ? (
                <Award size={24} className="text-current" />
              ) : (
                <Lock size={20} className="text-gray-400" />
              )}
            </div>
            
            <h4 className="text-[10px] font-bold uppercase tracking-wider mb-1 line-clamp-1">
              {badge.name}
            </h4>
            
            {isEarned && (
              <button 
                onClick={() => handleShare(badge.name)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Share2 size={12} className="text-gray-400 hover:text-orange-500" />
              </button>
            )}

            {/* Tooltip-like detail on hover */}
            <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
               <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-32 bg-navy-900 text-white text-[10px] p-2 rounded-lg shadow-xl">
                 <p className="font-bold mb-1">{badge.name}</p>
                 <p className="text-white/70">{badge.description}</p>
                 <div className="mt-1 flex items-center gap-2 text-orange-400">
                   <span>+{badge.xp_reward} XP</span>
                   <span>+{badge.coin_reward} 🪙</span>
                 </div>
               </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BadgeGallery;
