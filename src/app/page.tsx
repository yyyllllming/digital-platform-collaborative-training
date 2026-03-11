'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAuth } from "@/context/auth-context";
import { getDashboardData } from '@/services/platform-data';
import { ArrowUpRight, BookOpenCheck, Handshake, LogIn, MessageSquare, Users } from "lucide-react";

const chartData = [
  { month: '一月', freshman: 2, senior: 1 },
  { month: '二月', freshman: 3, senior: 2 },
  { month: '三月', freshman: 4, senior: 3 },
  { month: '四月', freshman: 5, senior: 3 },
  { month: '五月', freshman: 6, senior: 4 },
  { month: '六月', freshman: 7, senior: 5 },
];

const chartConfig = {
  freshman: {
    label: '新生参与任务',
    color: 'hsl(var(--chart-1))',
  },
  senior: {
    label: '老生帮扶任务',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  const { mentor, recentResource, platformMetrics, dashboardTasks, seniorBenefits } = getDashboardData();
  const { isAuthenticated, currentUser, login } = useAuth();

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="flex h-96 flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">欢迎来到校园智联</h1>
        <p className="mb-6 max-w-sm text-muted-foreground">一个让新生获得支持、让老生沉淀经验与成长价值的协同培养平台。</p>
        <Button onClick={login} size="lg">
          <LogIn className="mr-2 h-5 w-5" />
          登录
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border bg-gradient-to-br from-sky-50 via-white to-amber-50 p-8">
        <div className="mb-5 flex justify-center md:justify-start">
          <Image
            src="/just-logo.png"
            alt="江苏科技大学"
            width={316}
            height={66}
            priority
            className="h-auto w-full max-w-[420px] object-contain"
          />
        </div>
        <Badge className="mb-3 bg-sky-600">江苏科技大学学生协同培养平台</Badge>
        <h1 className="text-3xl font-bold tracking-tight">协同总览</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          你好，{currentUser.name}。你当前处于{currentUser.role === 'freshman' ? '新生成长阶段' : '老生带教阶段'}，平台会围绕你的需求与可提供帮助，持续推荐结对对象、资源和互动任务。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {platformMetrics.map((item) => (
          <Card key={item.label}>
            <CardHeader className="pb-2">
              <CardDescription>{item.label}</CardDescription>
              <CardTitle className="text-3xl">{item.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">当前结对建议</CardTitle>
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
                <p className="text-sm text-muted-foreground">{mentor.major} · {mentor.style}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {mentor.supportAreas.map((item) => (
                <Badge key={item} variant="secondary">{item}</Badge>
              ))}
            </div>
            <Button asChild size="sm" className="mt-4 w-full">
              <Link href="/mentors">
                <MessageSquare className="mr-2 h-4 w-4" />
                查看结对详情
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">本周协同任务</CardTitle>
            <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {dashboardTasks.map((item) => (
              <p key={item}>{item}</p>
            ))}
            <Button asChild variant="outline" size="sm" className="mt-4 w-full">
              <Link href="/tasks">查看任务页</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">老生参与收益</CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-3">
            {seniorBenefits.slice(0, 3).map((item) => (
              <div key={item} className="rounded-2xl bg-amber-50 p-3 text-sm text-amber-950">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>协同成长趋势</CardTitle>
            <CardDescription>用任务量展示新生支持与老生帮扶如何形成双向循环。</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="freshman" fill="var(--color-freshman)" radius={8} />
                <Bar dataKey="senior" fill="var(--color-senior)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最新经验资源</CardTitle>
            <CardDescription>把一次次帮扶经验整理成可复用的资源，是平台长期价值的来源。</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={recentResource.authorAvatar} data-ai-hint="person portrait" />
                <AvatarFallback>{recentResource.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="font-semibold">{recentResource.title}</p>
                <p className="text-sm text-muted-foreground">{recentResource.author} · {recentResource.category}</p>
              </div>
              <Link href="/resources" className="ml-auto shrink-0">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="sr-only">查看资源</span>
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">{recentResource.freshmanValue}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
