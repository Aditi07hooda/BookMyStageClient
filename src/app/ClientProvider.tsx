// components/ClientProviders.tsx
'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import ReduxProvider from '@/redux/provider';
import AppProvider from '@/contextApi/AppProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
      <ReduxProvider>
        <AppProvider>{children}</AppProvider>
        <ToastContainer
          position="top-left"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ReduxProvider>
    </GoogleOAuthProvider>
  );
}