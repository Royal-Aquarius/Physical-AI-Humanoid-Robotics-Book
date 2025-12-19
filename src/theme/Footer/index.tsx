import React from 'react';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

// SVG Icon Components (simple and modern)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3v9h4v-9z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.72-1.88-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.76 2.8 1.91 3.56-.71 0-1.37-.22-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98-8.52 8.52 0 0 1-5.33 1.84c-.35 0-.69-.02-1.03-.06A12.02 12.02 0 0 0 8.29 20c7.55 0 11.68-6.25 11.68-11.68l-.01-1.05c.8-.58 1.49-1.3 2.04-2.13z" />
  </svg>
);

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.148-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.74 0 8.333.012 7.053.072 2.695.272.273 2.69.073 7.052.012 8.333 0 8.74 0 12s.012 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.988 8.74 24 12 24s3.667-.012 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98C23.988 15.667 24 15.26 24 12s-.012-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.012 15.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/>
    </svg>
);

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
);

const YouTubeIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
    </svg>
);


function Footer(): JSX.Element {
  const {footer} = useThemeConfig();
  const {copyright} = footer as {copyright: string};

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Stay Connected</h3>
            <p className={styles.footerText}>Follow us on social media for the latest updates.</p>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon}><FacebookIcon /></a>
              <a href="https://x.com/RoyalAquarius10" className={styles.socialIcon}><TwitterIcon /></a>
              <a href="#" className={styles.socialIcon}><InstagramIcon /></a>
              <a href="https://www.linkedin.com/in/minhaj-109-rajput/" className={styles.socialIcon}><LinkedInIcon /></a>
              <a href="https://www.youtube.com/@neuroworld786" className={styles.socialIcon}><YouTubeIcon /></a>
            </div>
          </div>
          
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Don't Miss Out</h3>
            <p className={styles.footerText}>Subscribe to our newsletter for exclusive content.</p>
            <form className={styles.newsletterForm}>
              <input type="email" placeholder="Your email address" className={styles.newsletterInput} />
              <button type="submit" className={styles.newsletterButton}>Subscribe</button>
            </form>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Contact Us</h3>
            <p className={styles.footerText}>
              Email: <a href="mailto:mminhajahmed112@gmail.com">mminhajahmed112@gmail.com</a>
            </p>
            <p className={styles.footerText}>
              Phone: <a href="tel:+923148104382">+92 (314) 810-4382</a>
            </p>
          </div>

        </div>
        <div className={styles.footerCopyright}>
          {copyright}
        </div>
      </div>
    </footer>
  );
}

// We need to properly hook this up with Docusaurus's swizzling system.
// By creating this file at `src/theme/Footer/index.tsx`, it will override the default footer.
// The `useDocusaurusThemeConfig` hook is used to get the copyright from docusaurus.config.js
import {useThemeConfig} from '@docusaurus/theme-common';
export default Footer;