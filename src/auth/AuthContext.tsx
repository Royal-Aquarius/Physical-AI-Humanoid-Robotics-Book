// src/auth/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// NOTE: Storing users and especially plaintext passwords in localStorage is highly insecure
// and should NEVER be done in a production environment. This is for demonstration purposes only.

interface User {
  email: string;
  password_plaintext: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  signup: (email: string, pass: string, pass2: string) => Promise<void>;
  login: (email: string, pass: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Password strength regex: at least 8 chars, 1 letter, 1 number
const passwordStrengthRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for auth session in both storages on initial load
    if (localStorage.getItem('isAuthenticated') === 'true' || sessionStorage.getItem('isAuthenticated') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const getUsers = (): User[] => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };

  const signup = (email: string, password_plaintext: string, password2: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!email || !password_plaintext) {
        return reject(new Error('Email and password are required.'));
      }
      if (password_plaintext !== password2) {
        return reject(new Error('Passwords do not match.'));
      }
      if (!passwordStrengthRegex.test(password_plaintext)) {
        return reject(new Error('Password must be at least 8 characters long and include at least one letter and one number.'));
      }
      const users = getUsers();
      if (users.find(u => u.email === email)) {
        return reject(new Error('User with this email already exists.'));
      }
      const newUser = { email, password_plaintext };
      localStorage.setItem('users', JSON.stringify([...users, newUser]));
      resolve();
    });
  };

  const login = (email: string, password_plaintext: string, rememberMe: boolean): Promise<void> => {
    return new Promise((resolve, reject) => {
      const users = getUsers();
      const user = users.find(u => u.email === email);
      if (!user || user.password_plaintext !== password_plaintext) {
        return reject(new Error('Invalid email or password.'));
      }
      
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      resolve();
    });
  };

  const logout = () => {
    sessionStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
