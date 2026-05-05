// src/pages/UnauthorizedPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';

export const UnauthorizedPage: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="flex justify-center">
          <div className="p-4 bg-red-50 rounded-full">
            <ShieldAlert className="w-16 h-16 text-red-600" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="font-poppins font-bold text-3xl text-navy">Access Denied</h1>
          <p className="font-inter text-gray-500">
            This page is not accessible for your account type.
          </p>
        </div>

        {user && (
          <div className="bg-orange-50 p-4 rounded-xl">
            <p className="font-inter text-sm text-gray-600">
              You are logged in as: <span className="font-bold text-accent capitalize">{user.role}</span>
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Button asChild className="w-full bg-navy hover:bg-navy-dark text-white font-poppins font-medium h-12 rounded-lg">
            <Link to={user?.role === 'admin' ? '/admin/dashboard' : user?.role === 'trainer' ? '/trainer/dashboard' : '/student/dashboard'}>
              Go to My Dashboard
            </Link>
          </Button>
          <Button 
            variant="outline" 
            onClick={signOut}
            className="w-full border-gray-200 text-gray-600 font-poppins font-medium h-12 rounded-lg"
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
