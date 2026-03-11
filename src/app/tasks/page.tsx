import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, CheckCircle2, Clock3, Handshake, NotebookPen, Users } from "lucide-react";

const activeTasks = [
  {
    title: '完成首次结对沟通',
    owner: '新生 + 学长学姐',
    status: '进行中',
    detail: '围绕课程、方向选择和阶段目标完成第一次 20 分钟沟通，并记录核心问题。',
  },
  {
    title: '整理一份可复用经验清单',
    owner: '老生',
    status: '本周待提交',
    detail: '将课程避坑、实验室入门或竞赛路线整理为平台资源，供后续新生复用。',
  },
  {
    title: '完成一次真实协作任务',
    owner: '结对小组',
    status: '本周目标',
    detail: '围绕项目、活动或学习计划完成一次实际协作，形成阶段反馈。',
  },
];

const weeklyCheckpoints = [
  '新生提交本周最需要解决的问题',
  '老生确认可提供支持的时间与方向',
  '平台生成下一步建议与资源推荐',
  '结对双方完成一次反馈打卡',
];

const upcomingActivities = [
  {
    name: '新生答疑夜',
    time: '周三 19:00',
    desc: '集中处理新生对选课、社团、课程节奏的高频问题。',
  },
  {
    name: '跨年级项目组队会',
    time: '周五 18:30',
    desc: '帮助低年级找到项目入口，也帮助高年级找到可靠协作伙伴。',
  },
  {
    name: '经验资源共创整理',
    time: '周日 14:00',
    desc: '把聊天和分享沉淀为可复用模板，形成平台长期资产。',
  },
];

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-8">
        <Badge className="mb-3 bg-sky-600">平台功能页</Badge>
        <h1 className="text-3xl font-bold tracking-tight">协同任务</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          这一页展示平台真正落地后的任务组织方式：结对之后做什么、怎么跟进、如何形成沉淀，而不是单独放一页讲概念。
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Handshake className="h-5 w-5 text-sky-600" /> 当前协同任务</CardTitle>
            <CardDescription>用任务把“结对”真正落到持续互动上。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeTasks.map((task) => (
              <div key={task.title} className="rounded-2xl border p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{task.detail}</p>
                  </div>
                  <Badge variant="secondary">{task.status}</Badge>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{task.owner}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-600" /> 每周打卡节点</CardTitle>
            <CardDescription>平台通过固定节奏推动新老生持续协作，而不是一次匹配后就结束。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {weeklyCheckpoints.map((item, index) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-600 text-xs font-semibold text-white">{index + 1}</div>
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-amber-600" /> 近期活动</CardTitle>
            <CardDescription>任务之外，还需要线下/线上活动把关系真正建立起来。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingActivities.map((activity) => (
              <div key={activity.name} className="rounded-2xl border p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{activity.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock3 className="h-4 w-4" />
                    {activity.time}
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{activity.desc}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><NotebookPen className="h-5 w-5 text-sky-600" /> 沉淀结果</CardTitle>
            <CardDescription>平台价值不只在交流，而在于把交流转成可复用成果。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>结对记录：保留每次沟通的阶段问题和跟进动作。</p>
            <p>经验清单：把老生经验转成新生可直接执行的资源模板。</p>
            <p>活动记录：沉淀答疑夜、项目协作、分享会等过程数据。</p>
            <p>成长证明：让老生的帮扶经历可以被展示、被统计、被复盘。</p>
            <div className="pt-2">
              <Button variant="outline">导出本周任务摘要</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
