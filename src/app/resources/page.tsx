import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { resources } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">资源共享中心</h1>
        <p className="text-muted-foreground">发现由学长学姐们分享的宝贵课程笔记、学习指南和职业建议。</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {resources.map((resource) => (
          <Card key={resource.id} className="flex flex-col">
            <CardHeader className="p-0">
              <div className="relative h-40 w-full">
                <Image
                  src={resource.image || "https://picsum.photos/seed/default/400/250"}
                  alt={resource.title}
                  fill
                  className="object-cover rounded-t-lg"
                  data-ai-hint="study resource"
                />
              </div>
               <div className="p-4">
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="flex-1 p-4 pt-0">
              <p className="text-sm text-muted-foreground">{resource.description}</p>
               <div className="flex flex-wrap gap-2 mt-4">
                {resource.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4">
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
                  下载
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
