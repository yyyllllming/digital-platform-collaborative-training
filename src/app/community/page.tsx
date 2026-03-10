'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { communityPosts } from "@/lib/data";
import type { CommunityPost } from '@/lib/types';
import { PlusCircle, Search, ThumbsUp, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<CommunityPost[]>(communityPosts);

  const allTags = [...new Set(communityPosts.flatMap(p => p.tags))];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = communityPosts.filter(post =>
      post.title.toLowerCase().includes(term) ||
      post.content.toLowerCase().includes(term) ||
      post.author.toLowerCase().includes(term)
    );
    setFilteredPosts(filtered);
  };

  const handleTagFilter = (tag: string) => {
    const filtered = communityPosts.filter(post => post.tags.includes(tag));
    setFilteredPosts(filtered);
    setSearchTerm(tag); // Also set search term to show what's being filtered
  };
  
  const clearFilters = () => {
    setFilteredPosts(communityPosts);
    setSearchTerm('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">交流社区</h1>
          <p className="text-muted-foreground">在这里分享想法、寻求帮助、找到同好。</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          发布新帖
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="搜索帖子标题、内容或作者..." 
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
            <Button variant={filteredPosts.length === communityPosts.length && !searchTerm ? 'default' : 'outline'} size="sm" onClick={clearFilters}>全部</Button>
            {allTags.slice(0, 5).map(tag => (
                <Button key={tag} variant={searchTerm === tag ? 'default' : 'outline'} size="sm" onClick={() => handleTagFilter(tag)}>
                {tag}
                </Button>
            ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-1 xl:grid-cols-2">
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
                </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <h3 className="text-lg font-bold leading-snug">{post.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3">{post.content}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center text-muted-foreground text-sm">
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
                 <Button variant="outline" size="sm">查看详情</Button>
            </CardFooter>
          </Card>
        ))}
        {filteredPosts.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-64">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold">未找到相关帖子</h3>
                <p className="text-muted-foreground">请尝试更换搜索关键词或清除筛选条件。</p>
            </div>
        )}
      </div>
    </div>
  );
}
