import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getResources } from '@/services/platform-data';
import { Download, LibraryBig, Sparkles } from "lucide-react";

const resources = getResources();
const groupedResources = [
  {
    title: '新生入门包',
    description: '围绕入学适应、课程规划和第一阶段成长任务整理的上手资源。',
    items: resources.filter((item) => item.category === '新生入门包'),
  },
  {
    title: '学长经验库',
    description: '把学长学姐走过的路径、踩过的坑和总结的方法沉淀成长期资产。',
    items: resources.filter((item) => item.category === '学长经验库'),
  },
  {
    title: '协同工具箱',
    description: '突出新老生共同参与项目、记录帮扶成果和提升协作效率的工具模板。',
    items: resources.filter((item) => item.category === '协同工具箱'),
  },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border bg-gradient-to-r from-sky-50 via-white to-amber-50 p-8">
        <h1 className="text-3xl font-bold tracking-tight">经验资源中心</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          这里不只是“下载资料”，更重要的是把学长学姐的真实经验转化为新生可执行、老生可展示的数字资源库。
        </p>
      </div>

      {groupedResources.map((group, index) => (
        <section key={group.title} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${index === 0 ? 'bg-sky-100 text-sky-700' : index === 1 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {index === 0 ? <LibraryBig className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{group.title}</h2>
              <p className="text-sm text-muted-foreground">{group.description}</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((resource) => (
              <Card key={resource.id} className="flex flex-col overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative h-44 w-full">
                    <Image
                      src={resource.image || 'https://picsum.photos/seed/default/400/250'}
                      alt={resource.title}
                      fill
                      className="object-cover"
                      data-ai-hint="study resource"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-4 p-5">
                  <div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription className="mt-2">{resource.description}</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
                  <div className="rounded-2xl bg-sky-50 p-3 text-sm text-sky-950">
                    <p className="font-semibold">对新生的价值</p>
                    <p className="mt-1">{resource.freshmanValue}</p>
                  </div>
                  <div className="rounded-2xl bg-amber-50 p-3 text-sm text-amber-950">
                    <p className="font-semibold">对老生的价值</p>
                    <p className="mt-1">{resource.mentorValue}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between p-5 pt-0">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={resource.authorAvatar} data-ai-hint="person portrait" />
                      <AvatarFallback>{resource.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{resource.author}</span>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={resource.downloadUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      查看
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
