"use client";

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from "@/components/ui/textarea";
import { findMentorsAction } from "@/app/actions";
import { getMentors } from '@/services/platform-data';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Bot, CheckCircle, Handshake, Lightbulb, Sparkles } from "lucide-react";

const initialState = {
  success: false,
  data: undefined,
  errors: undefined,
  message: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" className="w-full" disabled={pending}>{pending ? '匹配中...' : '生成协同匹配'}</Button>;
}

export default function MentorsPage() {
  const seniorMentors = getMentors();
  const [state, formAction] = useActionState(findMentorsAction, initialState);
  const { toast } = useToast();

  const handleInviteClick = (mentorName: string) => {
    toast({
      title: '已加入协同意向列表',
      description: `你已向 ${mentorName} 发出结对意向，答辩演示中会视为待确认状态。`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border bg-gradient-to-r from-sky-50 via-white to-amber-50 p-8">
        <h1 className="text-3xl font-bold tracking-tight">学长学姐协同匹配</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          根据新生的专业方向、兴趣和目标，为你匹配最适合的高年级伙伴。这里强调的不只是“谁来帮你”，而是“如何形成长期协作关系”。
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>填写你的当前需求</CardTitle>
              <CardDescription>输入越具体，系统给出的学长学姐建议就越适合答辩中的协同叙事。</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="major">专业</Label>
                  <Input id="major" name="major" placeholder="例如：智能感知工程" />
                  {state?.errors?.major && <p className="text-sm text-destructive">{state.errors.major[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="academicInterests">关注方向</Label>
                  <Input id="academicInterests" name="academicInterests" placeholder="例如：人工智能, 竞赛, 数据分析" />
                  {state?.errors?.academicInterests && <p className="text-sm text-destructive">{state.errors.academicInterests[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hobbies">想通过什么方式融入</Label>
                  <Input id="hobbies" name="hobbies" placeholder="例如：项目协作, 社团活动, 运动" />
                  {state?.errors?.hobbies && <p className="text-sm text-destructive">{state.errors.hobbies[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goals">你当前最想解决的问题</Label>
                  <Textarea id="goals" name="goals" placeholder="例如：我希望尽快确定课程路线，并在这个学期完成一次真实项目实践。" />
                  {state?.errors?.goals && <p className="text-sm text-destructive">{state.errors.goals[0]}</p>}
                </div>
                <SubmitButton />
              </form>
              {state?.message && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>错误</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">新生收益</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">获得经验指导、课程规划和真实项目陪跑。</CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">老生收益</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">沉淀帮扶记录、强化领导力、积累可展示成果。</CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">平台收益</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">把零散经验转化成可复制的协同培养机制。</CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold">匹配结果</h2>
          {!state.success && (
            <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center">
              <Bot className="mb-4 h-16 w-16 text-muted-foreground" />
              <h3 className="text-xl font-semibold">等待生成你的协同对象</h3>
              <p className="text-muted-foreground">提交信息后，右侧会出现适合你的学长学姐，以及他们可以提供的支持与他们自身能获得的价值。</p>
            </div>
          )}
          {state.success && state.data?.matches.length === 0 && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>暂无合适结果</AlertTitle>
              <AlertDescription>请尝试补充更具体的目标、兴趣或希望获得的支持类型。</AlertDescription>
            </Alert>
          )}
          {state.success && state.data?.matches.map((match) => {
            const mentorDetails = seniorMentors.find((mentor) => mentor.id === match.mentorId);
            return (
              <Card key={match.mentorId} className="overflow-hidden">
                <CardHeader className="flex flex-row items-start gap-4 p-6">
                  <Avatar className="h-16 w-16 border">
                    <AvatarImage src={`https://picsum.photos/seed/${match.mentorId}/100/100`} data-ai-hint="person portrait" />
                    <AvatarFallback>{match.mentorName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <div>
                      <CardTitle className="text-2xl">{match.mentorName}</CardTitle>
                      <CardDescription>{mentorDetails?.major} · {mentorDetails?.style}</CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {mentorDetails?.academicInterests.map((interest) => (
                        <Badge key={interest} variant="secondary">{interest}</Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="default" onClick={() => handleInviteClick(match.mentorName)}>发起结对</Button>
                </CardHeader>
                <CardContent className="space-y-4 p-6 pt-0">
                  <Separator />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-sky-50 p-4">
                      <div className="mb-2 flex items-center gap-2 font-semibold text-sky-800">
                        <Lightbulb className="h-4 w-4" /> 这位学长能提供什么
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {mentorDetails?.supportAreas.map((area) => (
                          <Badge key={area} className="bg-white text-sky-900 hover:bg-white">{area}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-amber-50 p-4">
                      <div className="mb-2 flex items-center gap-2 font-semibold text-amber-800">
                        <Sparkles className="h-4 w-4" /> 对老生有什么价值
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {mentorDetails?.mentorBenefits.map((benefit) => (
                          <Badge key={benefit} className="bg-white text-amber-900 hover:bg-white">{benefit}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border p-4 text-sm text-muted-foreground">
                    <div className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                      <Handshake className="h-4 w-4 text-sky-600" /> 匹配原因
                    </div>
                    <p>{match.matchReason}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
