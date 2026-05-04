import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LoadingScreen } from '../../components/shared/LoadingScreen';

export const TrainerLayout: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!user || user.role !== 'trainer') return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 hidden md:block bg-white border-r min-h-screen shadow-sm">
          <div className="p-4 border-b">
            <h2 className="font-poppins font-bold text-accent text-xl">Trainer Portal</h2>
          </div>
          <nav className="p-4 space-y-2">
            <a href="/trainer/dashboard" className="block px-4 py-2 rounded-md hover:bg-accent-50 text-accent-700">Dashboard</a>
            <a href="/trainer/schedule" className="block px-4 py-2 rounded-md hover:bg-accent-50 text-accent-700">Schedule</a>
            <a href="/trainer/earnings" className="block px-4 py-2 rounded-md hover:bg-accent-50 text-accent-700">Earnings</a>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
