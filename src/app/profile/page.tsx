"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import { LogIn, UserCircle } from "lucide-react";

export default function ProfilePage() {
  const { toast } = useToast();
  const { isAuthenticated, currentUser, login } = useAuth();

  const handleEditClick = () => {
    toast({
      title: "功能开发中",
      description: "编辑个人档案的功能正在开发中，敬请期待！",
    });
  };

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-96">
        <UserCircle className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">请先登录</h3>
        <p className="text-muted-foreground max-w-sm mb-6">登录后即可查看您的个人档案。</p>
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
          <Button onClick={handleEditClick}>编辑档案</Button>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 grid gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">兴趣</h3>
            <div className="flex flex-wrap gap-2">
              {currentUser.interests.map((interest) => (
                <Badge key={interest}>{interest}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">技能</h3>
            <div className="flex flex-wrap gap-2">
              {currentUser.skills.map((skill) => (
                <Badge variant="secondary" key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
