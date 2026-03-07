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
} from 'lucide-react';

const navItems = [
  { href: '/', icon: <LayoutDashboard />, label: 'Dashboard', tooltip: 'Dashboard' },
  { href: '/mentors', icon: <Users />, label: 'Find a Mentor', tooltip: 'Find a Mentor' },
  { href: '/growth', icon: <TrendingUp />, label: 'Growth Advisor', tooltip: 'Growth Advisor' },
  { href: '/resources', icon: <BookOpen />, label: 'Resources', tooltip: 'Resources' },
  { href: '/profile', icon: <UserCircle />, label: 'My Profile', tooltip: 'My Profile' },
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
