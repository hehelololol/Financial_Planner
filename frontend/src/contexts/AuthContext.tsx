import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  function signup(email: string, password: string) {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized. Please check your environment variables.');
    }
    return createUserWithEmailAndPassword(auth, email, password).then(() => {
      // User is automatically set via onAuthStateChanged
    });
  }

  function login(email: string, password: string) {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized. Please check your environment variables.');
    }
    return signInWithEmailAndPassword(auth, email, password).then(() => {
      // User is automatically set via onAuthStateChanged
    });
  }

  function logout() {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized. Please check your environment variables.');
    }
    return signOut(auth);
  }

  useEffect(() => {
    if (!auth) {
      console.error('Firebase Auth is not initialized');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

