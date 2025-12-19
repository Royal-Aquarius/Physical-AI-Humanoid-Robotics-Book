import React, { useState } from 'react';
import { useAuth } from '@site/src/auth/AuthContext';
import styles from './styles.module.css';

interface LoginModalProps {
  onClose: () => void;
}

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.817 1.197-2.079 2.177-3.642 2.744A3.5 3.5 0 0 1 8 10.5a3.5 3.5 0 0 1-3.185-2.256C3.25 7.677 2.001 6.81 1.173 8z"/>
        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
);

const EyeSlashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.94 5.94 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 6.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
);


const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const { signup, login } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (isLoginView) {
        await login(email, password, rememberMe);
        onClose();
      } else {
        await signup(email, password, password2);
        setSuccess('Signup successful! Please log in.');
        setIsLoginView(true); // Switch to login view
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleView = () => {
      setIsLoginView(!isLoginView);
      setError('');
      setSuccess('');
      setEmail('');
      setPassword('');
      setPassword2('');
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{isLoginView ? 'Login' : 'Sign Up'}</h2>
        <p>To access the Physical AI Book</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.errorMessage}>{error}</p>}
          {success && <p className={styles.successMessage}>{success}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
            required
          />
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.showHideButton}>
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>
          {!isLoginView && (
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword2 ? 'text' : 'password'}
                placeholder="Re-type Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className={styles.inputField}
                required
              />
              <button type="button" onClick={() => setShowPassword2(!showPassword2)} className={styles.showHideButton}>
                {showPassword2 ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>
          )}
          {isLoginView && (
            <label className={styles.rememberMe}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>
          )}
          <button type="submit" className={styles.submitButton}>
            {isLoginView ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <button
          onClick={toggleView}
          className={styles.toggleButton}
        >
          {isLoginView ? 'Need an account? Sign Up' : 'Have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
