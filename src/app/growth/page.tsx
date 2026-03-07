"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getGrowthPlanAction } from "@/app/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Bot, BrainCircuit, Sparkles, Star, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { currentUser } from '@/lib/data';
import { Separator } from '@/components/ui/separator';

const defaultProfileDescription = `学生档案：
- 年级专业: ${currentUser.grade}, ${currentUser.major}
- 兴趣: ${currentUser.interests.join(', ')}
- 技能: ${currentUser.skills.join(', ')}
- 目标: 希望在人工智能领域有所建树，未来进入顶尖科技公司工作。
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
  return <Button type="submit" className="w-full" disabled={pending}>{pending ? "生成中..." : "获取个性化成长路径"}</Button>;
}

export default function GrowthPage() {
  const [state, formAction] = useFormState(getGrowthPlanAction, initialState);

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>数字成长顾问</CardTitle>
            <CardDescription>描述您的背景和目标，AI将为您提供个性化建议和预测性见解。</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentProfileDescription">学生档案描述</Label>
                <Textarea id="studentProfileDescription" name="studentProfileDescription" rows={12} defaultValue={defaultProfileDescription} />
                {state?.errors?.studentProfileDescription && <p className="text-sm text-destructive">{state.errors.studentProfileDescription[0]}</p>}
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
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold">您的成长计划</h2>
        
        {!state.success ? (
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-full">
            <BrainCircuit className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">等待生成您的成长计划</h3>
            <p className="text-muted-foreground max-w-sm">在左侧确认或修改您的档案描述后，AI将在这里为您量身定制成长路径和建议。</p>
          </div>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'><Trophy className="text-amber-500" /> 预测路径与可能性</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.data?.growthAdvisor.predictedPaths.map((path, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold">{path.pathName}</h4>
                      <Badge variant={path.likelihood === 'High' ? 'default' : path.likelihood === 'Medium' ? 'secondary' : 'outline'}
                        className={path.likelihood === 'High' ? 'bg-green-600 text-white' : ''}>
                        {path.likelihood} Likelihood
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{path.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'><Sparkles className="text-accent" /> 个性化建议</CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="text-muted-foreground leading-relaxed">{state.data?.growthAdvisor.personalizedAdvice}</p>
                 <Separator className="my-4"/>
                 <h4 className="font-semibold mb-2">具体行动项：</h4>
                 <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {state.data?.growthAdvisor.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                 </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'><Star className="text-blue-500" /> 推荐资源与活动</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                    <h4 className="font-semibold mb-2">推荐课程</h4>
                    {state.data?.growthSuggestions.courseRecommendations.map((rec, i) => <p key={i} className="text-sm text-muted-foreground">- {rec.name}: {rec.description}</p>)}
                </div>
                 <div>
                    <h4 className="font-semibold mb-2">推荐课外活动</h4>
                    {state.data?.growthSuggestions.extracurricularRecommendations.map((rec, i) => <p key={i} className="text-sm text-muted-foreground">- {rec.name}: {rec.description}</p>)}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
