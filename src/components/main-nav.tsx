"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  BookOpen,
  CheckSquare,
  LayoutDashboard,
  MessagesSquare,
  TrendingUp,
  UserCircle,
  Users,
} from 'lucide-react';

const navItems = [
  { href: '/', icon: <LayoutDashboard />, label: '协同总览', tooltip: '协同总览' },
  { href: '/mentors', icon: <Users />, label: '学长结对', tooltip: '学长结对' },
  { href: '/growth', icon: <TrendingUp />, label: '成长顾问', tooltip: '成长顾问' },
  { href: '/tasks', icon: <CheckSquare />, label: '协同任务', tooltip: '协同任务' },
  { href: '/resources', icon: <BookOpen />, label: '经验资源', tooltip: '经验资源' },
  { href: '/community', icon: <MessagesSquare />, label: '协同社区', tooltip: '协同社区' },
  { href: '/profile', icon: <UserCircle />, label: '我的档案', tooltip: '我的档案' },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton asChild tooltip={item.tooltip} isActive={pathname === item.href}>
            <Link href={item.href}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
