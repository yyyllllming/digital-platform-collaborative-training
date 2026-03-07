"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { findMentorsAction } from "@/app/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Bot, CheckCircle, Lightbulb } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const initialState = {
  success: false,
  data: undefined,
  errors: undefined,
  message: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" className="w-full" disabled={pending}>{pending ? "匹配中..." : "智能匹配"}</Button>;
}

export default function MentorsPage() {
  const [state, formAction] = useFormState(findMentorsAction, initialState);

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>智能同伴匹配</CardTitle>
            <CardDescription>输入您的信息，AI将为您匹配最合适的学长学姐。</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="major">专业</Label>
                <Input id="major" name="major" placeholder="例如：计算机科学" />
                {state?.errors?.major && <p className="text-sm text-destructive">{state.errors.major[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="academicInterests">学术兴趣</Label>
                <Input id="academicInterests" name="academicInterests" placeholder="用逗号分隔，例如：人工智能, 数据科学" />
                 {state?.errors?.academicInterests && <p className="text-sm text-destructive">{state.errors.academicInterests[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="hobbies">爱好</Label>
                <Input id="hobbies" name="hobbies" placeholder="用逗号分隔，例如：篮球, 电影" />
                 {state?.errors?.hobbies && <p className="text-sm text-destructive">{state.errors.hobbies[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="goals">目标</Label>
                <Textarea id="goals" name="goals" placeholder="您的学术和职业目标是什么？" />
                 {state?.errors?.goals && <p className="text-sm text-destructive">{state.errors.goals[0]}</p>}
              </div>
              <SubmitButton />
            </form>
             {state?.message && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">匹配结果</h2>
        <div className="space-y-6">
          {!state.success && (
             <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-full">
                <Bot className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold">等待为您匹配导师</h3>
                <p className="text-muted-foreground">在左侧填写您的信息后，AI将在这里展示最适合您的导师。</p>
            </div>
          )}
          {state.success && state.data?.matches.length === 0 && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>无匹配结果</AlertTitle>
              <AlertDescription>暂时没有找到合适的导师，请尝试调整您的输入信息。</AlertDescription>
            </Alert>
          )}
          {state.success && state.data?.matches.map((match) => (
            <Card key={match.mentorId} className="overflow-hidden">
                <CardHeader className="flex flex-row items-start gap-4 p-6">
                    <Avatar className="w-16 h-16 border">
                        <AvatarImage src={`https://picsum.photos/seed/${match.mentorId}/100/100`} data-ai-hint="person portrait" />
                        <AvatarFallback>{match.mentorName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <CardTitle className="text-2xl">{match.mentorName}</CardTitle>
                        <CardDescription>计算机科学</CardDescription>
                         <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="secondary">人工智能</Badge>
                            <Badge variant="secondary">机器学习</Badge>
                         </div>
                    </div>
                    <Button variant="default">发送邀请</Button>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                    <Separator className="my-4"/>
                    <div className="flex items-start gap-3 text-sm">
                        <Lightbulb className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold mb-1">匹配原因</h4>
                            <p className="text-muted-foreground">{match.matchReason}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
