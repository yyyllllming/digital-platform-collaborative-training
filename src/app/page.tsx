'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, BookOpenCheck, Users, MessageSquare } from "lucide-react";
import Link from "next/link";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { seniorMentors, resources } from "@/lib/data";

const chartData = [
  { month: "一月", skills: 1, networking: 2 },
  { month: "二月", skills: 2, networking: 3 },
  { month: "三月", skills: 3, networking: 4 },
  { month: "四月", skills: 4, networking: 3 },
  { month: "五月", skills: 3, networking: 5 },
  { month: "六月", skills: 5, networking: 6 },
];

const chartConfig = {
  skills: {
    label: "学习技能",
    color: "hsl(var(--chart-1))",
  },
  networking: {
    label: "社交活动",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  const mentor = seniorMentors[0];
  const recentResource = resources[0];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">欢迎回来, 杨黎明!</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">你的导师</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`https://picsum.photos/seed/${mentor.id}/100/100`} data-ai-hint="person portrait" />
                <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold">{mentor.name}</p>
                <p className="text-sm text-muted-foreground">{mentor.major}</p>
              </div>
            </div>
            <Button asChild size="sm" className="mt-4 w-full">
              <Link href="/mentors">
                <MessageSquare className="mr-2 h-4 w-4" />
                与导师聊天
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">待办任务</CardTitle>
            <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <p>1. 完成“高级算法”课程笔记。</p>
              <p>2. 参加“AI在医疗健康中的应用”网络研讨会。</p>
              <p>3. 准备期中考试。</p>
            </div>
            <Link href="/growth">
              <Button variant="outline" size="sm" className="mt-4 w-full">查看成长计划</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>最新资源</CardTitle>
            <CardDescription>
              由你的同学分享的最新学习资料。
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={recentResource.authorAvatar} data-ai-hint="person portrait"/>
                <AvatarFallback>{recentResource.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="font-semibold">{recentResource.title}</p>
                <p className="text-sm text-muted-foreground">由 {recentResource.author} 分享</p>
              </div>
              <Link href="/resources" className="ml-auto shrink-0">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="sr-only">查看资源</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>个人成长追踪</CardTitle>
          <CardDescription>你过去6个月的进展。</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="skills" fill="var(--color-skills)" radius={8} />
              <Bar dataKey="networking" fill="var(--color-networking)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
