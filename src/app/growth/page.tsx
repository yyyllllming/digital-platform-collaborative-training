"use client";

import { useActionState } from "react";
import { useFormStatus } from 'react-dom';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from '@/components/ui/separator';
import { Textarea } from "@/components/ui/textarea";
import { getGrowthPlanAction } from "@/app/actions";
import { currentUser } from '@/lib/data';
import { AlertCircle, BrainCircuit, Sparkles, Star, Trophy } from "lucide-react";

const defaultProfileDescription = `学生档案：
- 当前阶段: ${currentUser.role === 'freshman' ? '新生' : '老生'}
- 年级专业: ${currentUser.grade}, ${currentUser.major}
- 兴趣: ${currentUser.interests.join(', ')}
- 技能: ${currentUser.skills.join(', ')}
- 当前最需要的支持: ${currentUser.supportNeeds.join(', ')}
- 我可以提供的帮助: ${currentUser.canSupportWith.join(', ')}
- 目标: 希望尽快适应大学节奏，并在跨年级协作中积累项目经验。
- 当前GPA: 3.8
- 课外活动: 参加过两次校级编程马拉松。
`;

const initialState = {
  success: false,
  data: undefined,
  errors: undefined,
  message: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" className="w-full" disabled={pending}>{pending ? '生成中...' : '获取个性化成长路径'}</Button>;
}

const likelihoodTextMap: { [key: string]: string } = {
  High: '高',
  Medium: '中',
  Low: '低',
};

export default function GrowthPage() {
  const [state, formAction] = useActionState(getGrowthPlanAction, initialState);

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>数字成长顾问</CardTitle>
            <CardDescription>围绕当前阶段、支持需求和协同目标，生成更适合答辩演示的成长路径。</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentProfileDescription">学生档案描述</Label>
                <Textarea id="studentProfileDescription" name="studentProfileDescription" rows={14} defaultValue={defaultProfileDescription} />
                {state?.errors?.studentProfileDescription && <p className="text-sm text-destructive">{state.errors.studentProfileDescription[0]}</p>}
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
      <div className="space-y-6 lg:col-span-2">
        <div>
          <h2 className="text-2xl font-bold">个性化成长建议</h2>
          <p className="text-muted-foreground">展示平台如何结合画像信息，为学生生成下一阶段的行动方案。</p>
        </div>

        {!state.success ? (
          <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center">
            <BrainCircuit className="mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-semibold">等待生成成长计划</h3>
            <p className="max-w-sm text-muted-foreground">在左侧确认或修改档案描述后，右侧会出现阶段路径、行动建议和推荐资源。</p>
          </div>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Trophy className="text-amber-500" /> 预测路径与可能性</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.data?.growthAdvisor.predictedPaths.map((path, index) => (
                  <div key={index}>
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold">{path.pathName}</h4>
                      <Badge variant={path.likelihood === 'High' ? 'default' : path.likelihood === 'Medium' ? 'secondary' : 'outline'} className={path.likelihood === 'High' ? 'bg-green-600 text-white' : ''}>
                        {likelihoodTextMap[path.likelihood]} 可能性
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{path.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sparkles className="text-accent" /> 个性化建议</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">{state.data?.growthAdvisor.personalizedAdvice}</p>
                <Separator className="my-4" />
                <h4 className="mb-2 font-semibold">具体行动项：</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {state.data?.growthAdvisor.recommendations.map((rec, index) => <li key={index}>{rec}</li>)}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Star className="text-blue-500" /> 推荐资源与活动</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">推荐课程</h4>
                  {state.data?.growthSuggestions.courseRecommendations.map((rec, index) => <p key={index} className="text-sm text-muted-foreground">- {rec.name}: {rec.description}</p>)}
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">推荐课外活动</h4>
                  {state.data?.growthSuggestions.extracurricularRecommendations.map((rec, index) => <p key={index} className="text-sm text-muted-foreground">- {rec.name}: {rec.description}</p>)}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
