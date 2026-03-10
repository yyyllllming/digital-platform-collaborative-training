"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import { LogIn, UserCircle } from "lucide-react";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ProfilePage() {
  const { isAuthenticated, currentUser, login, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Local state for form fields
  const [name, setName] = useState(currentUser?.name || '');
  const [major, setMajor] = useState(currentUser?.major || '');
  const [grade, setGrade] = useState(currentUser?.grade || '');
  const [interests, setInterests] = useState(currentUser?.interests.join(', ') || '');
  const [skills, setSkills] = useState(currentUser?.skills.join(', ') || '');

  // Update local state if currentUser changes from context, but only when not editing
  useEffect(() => {
    if (currentUser && !isEditing) {
      setName(currentUser.name);
      setMajor(currentUser.major);
      setGrade(currentUser.grade);
      setInterests(currentUser.interests.join(', '));
      setSkills(currentUser.skills.join(', '));
    }
  }, [currentUser, isEditing]);

  const handleSave = () => {
    updateUser({
      name,
      major,
      grade,
      interests: interests.split(',').map(s => s.trim()).filter(Boolean),
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
    });
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    // Reset fields to original values from context
    if (currentUser) {
        setName(currentUser.name);
        setMajor(currentUser.major);
        setGrade(currentUser.grade);
        setInterests(currentUser.interests.join(', '));
        setSkills(currentUser.skills.join(', '));
    }
    setIsEditing(false);
  }

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-96">
        <UserCircle className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">请先登录</h3>
        <p className="text-muted-foreground max-w-sm mb-6">登录后即可查看和编辑您的个人档案。</p>
        <Button onClick={login}>
          <LogIn className="mr-2 h-4 w-4" />
          登录
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">我的档案</h1>
        <p className="text-muted-foreground">查看和编辑您的个人信息、兴趣和技能。</p>
      </div>
      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <Avatar className="w-24 h-24 border-2 border-primary">
            <AvatarImage src={currentUser.avatarUrl} data-ai-hint="person portrait" />
            <AvatarFallback className="text-3xl">{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-3xl">{currentUser.name}</CardTitle>
            <CardDescription className="text-md mt-1">{currentUser.major} / {currentUser.grade}</CardDescription>
            <p className="text-sm text-muted-foreground mt-2">{currentUser.email}</p>
          </div>
          <div className='flex gap-2 self-start md:self-center'>
            {isEditing ? (
                <>
                    <Button onClick={handleCancel} variant="outline">取消</Button>
                    <Button onClick={handleSave}>保存档案</Button>
                </>
            ) : (
                <Button onClick={() => setIsEditing(true)}>编辑档案</Button>
            )}
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 grid gap-6">
          {isEditing ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱 (不可编辑)</Label>
                    <Input id="email" value={currentUser.email} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="major">专业</Label>
                    <Input id="major" value={major} onChange={(e) => setMajor(e.target.value)} />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="grade">年级</Label>
                    <Input id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
                  </div>
              </div>

              <div>
                <Label htmlFor="interests" className="text-lg font-semibold">兴趣</Label>
                <p className="text-sm text-muted-foreground mb-2">请用逗号分隔不同的兴趣爱好。</p>
                <Textarea
                  id="interests"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="例如：人工智能, 机器学习, Web开发"
                />
              </div>
              <div>
                <Label htmlFor="skills" className="text-lg font-semibold">技能</Label>
                <p className="text-sm text-muted-foreground mb-2">请用逗号分隔不同的技能。</p>
                <Textarea
                  id="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="例如：Python, JavaScript, React"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="text-lg font-semibold mb-2">兴趣</h3>
                <div className="flex flex-wrap gap-2">
                  {currentUser.interests.map((interest) => (
                    <Badge key={interest}>{interest}</Badge>
                  ))}
                   {currentUser.interests.length === 0 && <p className="text-sm text-muted-foreground">暂无兴趣</p>}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">技能</h3>
                <div className="flex flex-wrap gap-2">
                  {currentUser.skills.map((skill) => (
                    <Badge variant="secondary" key={skill}>{skill}</Badge>
                  ))}
                  {currentUser.skills.length === 0 && <p className="text-sm text-muted-foreground">暂无技能</p>}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
