'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { currentUser as staticCurrentUser, students } from '@/lib/data';
import type { UserProfile } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

type User = UserProfile | null;

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User;
  login: () => void;
  logout: () => void;
  updateUser: (newDetails: Partial<Omit<UserProfile, 'id' | 'email'>>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function LoginDialog({
  open,
  onOpenChange,
  onLoginSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: (user: UserProfile) => void;
}) {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    if (!studentId || !name) {
      setError('学号和姓名不能为空。');
      return;
    }
    
    // Check the main user first
    if (staticCurrentUser.name === name.trim() && staticCurrentUser.id === studentId.trim()) {
        onLoginSuccess(staticCurrentUser);
        onOpenChange(false);
        setName('');
        setStudentId('');
        return;
    }

    const userToLogin = students.find(
      (student) => student.name === name.trim() && student.id === studentId.trim()
    );

    if (userToLogin) {
      onLoginSuccess(userToLogin);
      onOpenChange(false);
      setName('');
      setStudentId('');
    } else {
      setError('未找到该学生，请输入正确的学号和姓名。');
    }
  };

  const onDialogClose = (isOpen: boolean) => {
    if (!isOpen) {
      setName('');
      setStudentId('');
      setError('');
    }
    onOpenChange(isOpen);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onDialogClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>学生登录</DialogTitle>
          <DialogDescription>
            输入您的学号和姓名以登录。例如学号: main-user, 姓名: 张伟.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="studentId" className="text-right">
              学号
            </Label>
            <Input
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="col-span-3"
              placeholder="例如: student-1"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              姓名
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="例如: 陈晨"
              onKeyDown={handleKeyDown}
            />
          </div>
          {error && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>登录失败</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleLogin}>登录</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState<User>(isAuthenticated ? staticCurrentUser : null);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const { toast } = useToast();

  const login = () => {
    setIsLoginDialogOpen(true);
  };
  
  const loginWithUser = useCallback((user: UserProfile) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    toast({
      title: "成功登录",
      description: `欢迎回来, ${user.name}!`,
    });
  }, [toast]);

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    toast({
      title: "成功退出",
      description: "您已成功退出登录。",
    });
  };
  
  const updateUser = (newDetails: Partial<Omit<UserProfile, 'id' | 'email'>>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...newDetails };
      setCurrentUser(updatedUser);
      
      if (currentUser.id === staticCurrentUser.id) {
          Object.assign(staticCurrentUser, updatedUser);
      } else {
          const studentIndex = students.findIndex(s => s.id === currentUser.id);
          if (studentIndex > -1) {
            students[studentIndex] = { ...students[studentIndex], ...updatedUser };
          }
      }

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
      <LoginDialog 
        open={isLoginDialogOpen}
        onOpenChange={setIsLoginDialogOpen}
        onLoginSuccess={loginWithUser}
      />
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
