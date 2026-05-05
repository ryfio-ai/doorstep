// src/components/layouts/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LoadingScreen } from '../shared/LoadingScreen';
import type { Role } from '../../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: Role | Role[];
  requireVerified?: boolean;
  requireOnboarding?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRole,
  requireVerified = false,
  requireOnboarding = true
}) => {
  const { user, loading, isVerifiedTrainer } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingScreen />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRole) {
    const roles = Array.isArray(allowedRole) ? allowedRole : [allowedRole];
    if (!roles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  if (requireOnboarding && !user.onboarding_complete) {
    if (user.role === 'trainer') {
      return <Navigate to="/trainer/onboarding" replace />;
    }
    // Add student onboarding redirect if needed
  }

  if (requireVerified && !isVerifiedTrainer && user.role === 'trainer') {
    return <Navigate to="/trainer/dashboard" replace />;
  }

  return <>{children}</>;
};
