'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { currentUser as staticCurrentUser } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

type User = {
  name: string;
  email: string;
  avatarUrl: string | undefined;
  major: string;
  grade: string;
  interests: string[];
  skills: string[];
} | null;


interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User;
  login: () => void;
  logout: () => void;
  updateUser: (newDetails: Partial<NonNullable<User>>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // 默认为登录状态
  const [currentUser, setCurrentUser] = useState<User>(isAuthenticated ? staticCurrentUser : null);
  const { toast } = useToast();

  const login = () => {
    setIsAuthenticated(true);
    setCurrentUser(staticCurrentUser);
    toast({
      title: "成功登录",
      description: "欢迎回来！",
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    toast({
      title: "成功退出",
      description: "您已成功退出登录。",
    });
  };
  
  const updateUser = (newDetails: Partial<NonNullable<User>>) => {
    if (currentUser) {
      setCurrentUser(prevUser => ({ ...prevUser!, ...newDetails }));
      toast({
        title: "档案已更新",
        description: "您的个人信息已成功保存。",
      });
    }
  };

  const value = {
    isAuthenticated,
    currentUser,
    login,
    logout,
    updateUser,
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
