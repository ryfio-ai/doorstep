import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <Loader2 className="h-12 w-12 text-primary animate-spin" />
      <p className="mt-4 text-lg font-medium text-foreground animate-pulse">{message}</p>
    </div>
  );
};
