import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Calendar, Folder, User, BarChart, IndianRupee } from 'lucide-react';

interface MobileBottomNavProps {
  portal: 'student' | 'trainer';
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ portal }) => {
  const location = useLocation();

  const studentTabs = [
    { name: 'Home', icon: Home, path: '/student/dashboard' },
    { name: 'Courses', icon: Search, path: '/student/courses' },
    { name: 'Classes', icon: Calendar, path: '/student/classes' },
    { name: 'Notes', icon: Folder, path: '/student/materials' }, // Assuming a future materials route
    { name: 'Profile', icon: User, path: '/student/profile' },
  ];

  const trainerTabs = [
    { name: 'Dash', icon: BarChart, path: '/trainer/dashboard' },
    { name: 'Schedule', icon: Calendar, path: '/trainer/schedule' },
    { name: 'Earnings', icon: IndianRupee, path: '/trainer/earnings' },
    { name: 'Profile', icon: User, path: '/trainer/profile' },
  ];

  const tabs = portal === 'student' ? studentTabs : trainerTabs;

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full h-[72px] bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50 pb-[env(safe-area-inset-bottom)] flex">
      {tabs.map((tab) => {
        const isActive = location.pathname.includes(tab.path);
        const Icon = tab.icon;

        return (
          <Link
            key={tab.name}
            to={tab.path}
            className="flex-1 flex flex-col items-center justify-center pt-[10px] relative transition-transform duration-100 active:scale-90"
          >
            {isActive && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-accent rounded-b-md" />
            )}
            <Icon className={`w-[22px] h-[22px] mb-1 ${isActive ? 'text-accent' : 'text-gray-400'}`} />
            <span className={`text-[10px] ${isActive ? 'font-poppins font-semibold text-accent' : 'font-inter font-medium text-gray-400'}`}>
              {tab.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
