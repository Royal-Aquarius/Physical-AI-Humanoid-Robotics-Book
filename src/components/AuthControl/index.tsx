import React from 'react';
import { useAuth } from '@site/src/auth/AuthContext';
import styles from './styles.module.css';
import { useLocation } from '@docusaurus/router';

export default function AuthControl(): JSX.Element {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    // After logout, redirect to home page if they are on a protected route
    if (location.pathname.startsWith('/docs')) {
        window.location.href = '/';
    }
  };

  return (
    <div className={styles.authContainer}>
      {isAuthenticated ? (
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      ) : null}
    </div>
  );
}
