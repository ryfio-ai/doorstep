import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LoadingScreen } from '../../components/shared/LoadingScreen';

export const AdminLayout: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!user || user.role !== 'admin') return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 hidden md:block bg-navy-darker text-white min-h-screen shadow-sm">
          <div className="p-4 border-b border-navy-dark">
            <h2 className="font-poppins font-bold text-white text-xl">Admin Portal</h2>
          </div>
          <nav className="p-4 space-y-2">
            <a href="/admin/dashboard" className="block px-4 py-2 rounded-md hover:bg-navy-dark text-primary-100">Dashboard</a>
            <a href="/admin/students" className="block px-4 py-2 rounded-md hover:bg-navy-dark text-primary-100">Students</a>
            <a href="/admin/trainers" className="block px-4 py-2 rounded-md hover:bg-navy-dark text-primary-100">Trainers</a>
            <a href="/admin/courses" className="block px-4 py-2 rounded-md hover:bg-navy-dark text-primary-100">Courses</a>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
