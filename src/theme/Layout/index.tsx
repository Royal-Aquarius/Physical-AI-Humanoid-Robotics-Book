import React, { useState, useEffect } from 'react';
import OriginalLayout from '@theme-original/Layout';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from '@docusaurus/router';
import type { Props } from '@theme/Layout';
import { useAuth } from '@site/src/auth/AuthContext';
import LoginModal from '@site/src/components/LoginModal';

// This custom wrapper component adds page transition animations and route protection.
export default function LayoutWrapper(props: Props): JSX.Element {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const isProtectedPath = location.pathname.startsWith('/docs');

  useEffect(() => {
    if (isProtectedPath && !isAuthenticated) {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [location.pathname, isAuthenticated, isProtectedPath]);

  // We are wrapping the original Layout's children with Framer Motion components.
  // The `key` prop on motion.div is crucial for AnimatePresence to detect page changes.
  const animatedChildren = (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <OriginalLayout {...props}>
      {isProtectedPath && !isAuthenticated ? null : animatedChildren}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </OriginalLayout>
  );
}
