'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { currentUser as staticCurrentUser } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

type User = typeof staticCurrentUser | null;

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // 默认为登录状态
  const { toast } = useToast();

  const login = () => {
    setIsAuthenticated(true);
    toast({
      title: "成功登录",
      description: "欢迎回来！",
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    toast({
      title: "成功退出",
      description: "您已成功退出登录。",
    });
  };

  const value = {
    isAuthenticated,
    currentUser: isAuthenticated ? staticCurrentUser : null,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
