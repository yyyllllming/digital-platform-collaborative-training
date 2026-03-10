"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  BookOpen,
  UserCircle,
  MessagesSquare,
} from 'lucide-react';

const navItems = [
  { href: '/', icon: <LayoutDashboard />, label: '仪表盘', tooltip: '仪表盘' },
  { href: '/mentors', icon: <Users />, label: '寻找导师', tooltip: '寻找导师' },
  { href: '/growth', icon: <TrendingUp />, label: '成长顾问', tooltip: '成长顾问' },
  { href: '/resources', icon: <BookOpen />, label: '资源中心', tooltip: '资源中心' },
  { href: '/community', icon: <MessagesSquare />, label: '交流社区', tooltip: '交流社区' },
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
