'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/auth-context';
import { getCommunityPosts } from '@/services/platform-data';
import type { CommunityPost } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, PlusCircle, Search, ThumbsUp } from "lucide-react";

const postTypeLabel: Record<CommunityPost['postType'], string> = {
  ask_help: '求助交流',
  share_experience: '经验分享',
  recruit_partner: '项目招募',
  activity_notice: '活动通知',
};

export default function CommunityPage() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<CommunityPost[]>(getCommunityPosts());
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const allTags = [...new Set(posts.flatMap((post) => post.tags))].slice(0, 6);
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = !normalizedSearch || [post.title, post.content, post.author].some((value) => value.toLowerCase().includes(normalizedSearch));
    const matchesTag = !activeTag || post.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  const resetComposer = () => {
    setTitle('');
    setContent('');
    setTags('');
  };

  const handlePublish = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: '标题或内容为空',
        description: '发布前至少填写标题和正文。',
        variant: 'destructive',
      });
      return;
    }

    const parsedTags = tags.split(',').map((item) => item.trim()).filter(Boolean);
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: currentUser?.name || '匿名同学',
      authorId: currentUser?.id || 'guest-user',
      authorAvatar: currentUser?.avatarUrl,
      title: title.trim(),
      content: content.trim(),
      tags: parsedTags.length > 0 ? parsedTags : ['校园交流'],
      postType: 'share_experience',
      audience: 'all',
      timestamp: new Date().toISOString(),
      likes: 0,
      commentsCount: 0,
    };

    setPosts((prev) => [newPost, ...prev]);
    setIsComposerOpen(false);
    resetComposer();
    toast({
      title: '发布成功',
      description: '帖子已加入当前页面列表。刷新页面后会恢复默认演示数据。',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">交流社区</h1>
          <p className="text-muted-foreground">用于展示普通校园交流场景，支持发帖、搜索和详情查看。</p>
        </div>
        <Button onClick={() => setIsComposerOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          发布新帖
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="搜索帖子标题、内容或作者..."
            className="pl-10"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant={!activeTag ? 'default' : 'outline'} size="sm" onClick={() => setActiveTag('')}>全部</Button>
          {allTags.map((tag) => (
            <Button key={tag} variant={activeTag === tag ? 'default' : 'outline'} size="sm" onClick={() => setActiveTag(tag)}>
              {tag}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src={post.authorAvatar} data-ai-hint="person portrait" />
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true, locale: zhCN })}
                  </p>
                </div>
                <Badge variant="outline" className="ml-auto">{postTypeLabel[post.postType]}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <h3 className="text-lg font-bold leading-snug">{post.title}</h3>
              <p className="line-clamp-3 text-sm text-muted-foreground">{post.content}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between text-muted-foreground text-sm">
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.commentsCount}</span>
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedPost(post)}>查看详情</Button>
            </CardFooter>
          </Card>
        ))}
        {filteredPosts.length === 0 && (
          <div className="col-span-full flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center">
            <Search className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-xl font-semibold">未找到相关帖子</h3>
            <p className="text-muted-foreground">请尝试更换搜索关键词或清除筛选条件。</p>
          </div>
        )}
      </div>

      <Dialog open={isComposerOpen} onOpenChange={setIsComposerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>发布新帖</DialogTitle>
            <DialogDescription>这是前端演示发帖流程，刷新页面后会恢复默认数据。</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="post-title">标题</Label>
              <Input id="post-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="例如：周末有人一起去图书馆吗？" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="post-content">正文</Label>
              <Textarea id="post-content" rows={6} value={content} onChange={(event) => setContent(event.target.value)} placeholder="写一点你想交流的内容。" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="post-tags">标签</Label>
              <Input id="post-tags" value={tags} onChange={(event) => setTags(event.target.value)} placeholder="用逗号分隔，例如：学习, 活动, 项目" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsComposerOpen(false); resetComposer(); }}>取消</Button>
            <Button onClick={handlePublish}>发布</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(selectedPost)} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent>
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedPost.title}</DialogTitle>
                <DialogDescription>
                  {selectedPost.author} · {formatDistanceToNow(new Date(selectedPost.timestamp), { addSuffix: true, locale: zhCN })}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm leading-7 text-muted-foreground">{selectedPost.content}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedPost(null)}>关闭</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
