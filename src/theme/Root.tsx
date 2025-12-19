import React from 'react';
import { AuthProvider } from '@site/src/auth/AuthContext';
import BackToTopButton from '../components/BackToTopButton';
import ReadingProgressBar from '../components/ReadingProgressBar';
import Chatbot from '../components/Chatbot';

// Default implementation, that you can customize
export default function Root({children}) {
  return (
    <AuthProvider>
      {children}
      <ReadingProgressBar />
      <BackToTopButton />
      <Chatbot />
    </AuthProvider>
  );
}
