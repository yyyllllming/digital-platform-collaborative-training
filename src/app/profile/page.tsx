"use client";

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from "@/components/ui/separator";
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from "@/context/auth-context";
import { LogIn, UserCircle } from "lucide-react";

export default function ProfilePage() {
  const { isAuthenticated, currentUser, login, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [major, setMajor] = useState(currentUser?.major || '');
  const [grade, setGrade] = useState(currentUser?.grade || '');
  const [role, setRole] = useState<'freshman' | 'senior'>(currentUser?.role || 'freshman');
  const [interests, setInterests] = useState(currentUser?.interests.join(', ') || '');
  const [skills, setSkills] = useState(currentUser?.skills.join(', ') || '');
  const [supportNeeds, setSupportNeeds] = useState(currentUser?.supportNeeds.join(', ') || '');
  const [canSupportWith, setCanSupportWith] = useState(currentUser?.canSupportWith.join(', ') || '');
  const [motivation, setMotivation] = useState(currentUser?.motivation || '');

  useEffect(() => {
    if (currentUser && !isEditing) {
      setName(currentUser.name);
      setMajor(currentUser.major);
      setGrade(currentUser.grade);
      setRole(currentUser.role);
      setInterests(currentUser.interests.join(', '));
      setSkills(currentUser.skills.join(', '));
      setSupportNeeds(currentUser.supportNeeds.join(', '));
      setCanSupportWith(currentUser.canSupportWith.join(', '));
      setMotivation(currentUser.motivation);
    }
  }, [currentUser, isEditing]);

  const handleSave = () => {
    updateUser({
      name,
      major,
      grade,
      role,
      interests: interests.split(',').map((item) => item.trim()).filter(Boolean),
      skills: skills.split(',').map((item) => item.trim()).filter(Boolean),
      supportNeeds: supportNeeds.split(',').map((item) => item.trim()).filter(Boolean),
      canSupportWith: canSupportWith.split(',').map((item) => item.trim()).filter(Boolean),
      motivation,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (currentUser) {
      setName(currentUser.name);
      setMajor(currentUser.major);
      setGrade(currentUser.grade);
      setRole(currentUser.role);
      setInterests(currentUser.interests.join(', '));
      setSkills(currentUser.skills.join(', '));
      setSupportNeeds(currentUser.supportNeeds.join(', '));
      setCanSupportWith(currentUser.canSupportWith.join(', '));
      setMotivation(currentUser.motivation);
    }
    setIsEditing(false);
  };

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="flex h-96 flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center">
        <UserCircle className="mb-4 h-16 w-16 text-muted-foreground" />
        <h3 className="mb-2 text-xl font-semibold">请先登录</h3>
        <p className="mb-6 max-w-sm text-muted-foreground">登录后即可查看和编辑你的协同画像，用于展示平台如何识别不同阶段学生的需求。</p>
        <Button onClick={login}>
          <LogIn className="mr-2 h-4 w-4" />
          登录
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">我的档案</h1>
        <p className="text-muted-foreground">通过阶段画像、需求和可提供帮助，体现新老生如何在同一个平台中双向受益。</p>
      </div>
      <Card>
        <CardHeader className="flex flex-col items-start gap-4 md:flex-row md:items-center">
          <Avatar className="h-24 w-24 border-2 border-primary">
            <AvatarImage src={currentUser.avatarUrl} data-ai-hint="person portrait" />
            <AvatarFallback className="text-3xl">{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-3xl">{currentUser.name}</CardTitle>
            <CardDescription className="mt-1 text-md">{currentUser.major} / {currentUser.grade}</CardDescription>
            <p className="mt-2 text-sm text-muted-foreground">{currentUser.email}</p>
          </div>
          <div className="flex gap-2 self-start md:self-center">
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
        <CardContent className="grid gap-6 pt-6">
          {isEditing ? (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

              <div className="space-y-3">
                <Label>当前阶段</Label>
                <div className="flex gap-2">
                  <Button type="button" variant={role === 'freshman' ? 'default' : 'outline'} onClick={() => setRole('freshman')}>我是新生/低年级</Button>
                  <Button type="button" variant={role === 'senior' ? 'default' : 'outline'} onClick={() => setRole('senior')}>我是老生/高年级</Button>
                </div>
              </div>

              <div>
                <Label htmlFor="supportNeeds" className="text-lg font-semibold">当前最需要的支持</Label>
                <p className="mb-2 text-sm text-muted-foreground">用逗号分隔，例如：入学适应, 课程规划, 竞赛入门</p>
                <Textarea id="supportNeeds" value={supportNeeds} onChange={(e) => setSupportNeeds(e.target.value)} />
              </div>

              <div>
                <Label htmlFor="canSupportWith" className="text-lg font-semibold">我可以提供的帮助</Label>
                <p className="mb-2 text-sm text-muted-foreground">用逗号分隔，例如：经验分享, 资料整理, 活动组织</p>
                <Textarea id="canSupportWith" value={canSupportWith} onChange={(e) => setCanSupportWith(e.target.value)} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="interests" className="text-lg font-semibold">兴趣方向</Label>
                  <Textarea id="interests" value={interests} onChange={(e) => setInterests(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="skills" className="text-lg font-semibold">已有技能</Label>
                  <Textarea id="skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
                </div>
              </div>

              <div>
                <Label htmlFor="motivation" className="text-lg font-semibold">参与平台的目标</Label>
                <Textarea id="motivation" value={motivation} onChange={(e) => setMotivation(e.target.value)} rows={4} />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-sky-600">{currentUser.role === 'freshman' ? '新生成长阶段' : '老生带教阶段'}</Badge>
                <Badge variant="secondary">{currentUser.grade}</Badge>
                <Badge variant="outline">{currentUser.major}</Badge>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">当前最需要的支持</h3>
                <div className="flex flex-wrap gap-2">
                  {currentUser.supportNeeds.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">我可以提供的帮助</h3>
                <div className="flex flex-wrap gap-2">
                  {currentUser.canSupportWith.map((item) => (
                    <Badge key={item} variant="secondary">{item}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">兴趣与技能</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>兴趣：{currentUser.interests.join('、')}</p>
                  <p>技能：{currentUser.skills.join('、')}</p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">参与平台的目标</h3>
                <p className="text-sm leading-7 text-muted-foreground">{currentUser.motivation}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
