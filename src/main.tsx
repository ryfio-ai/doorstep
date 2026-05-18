import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import App from './App.tsx';
import './styles/globals.css';
import { AuthProvider } from './context/AuthContext.tsx';
import { AppProvider } from './context/AppContext.tsx';
import { NotificationProvider } from './context/NotificationContext.tsx';
import { Toaster } from 'sonner';
import './i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>
          <NotificationProvider>
            <App />
            <Toaster richColors position="top-right" />
            <Analytics />
          </NotificationProvider>
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
