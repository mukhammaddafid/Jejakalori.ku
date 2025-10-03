'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ChefHat,
  User,
  Trophy,
  BookOpen,
} from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useLanguage } from '@/lib/language-provider';

export const getMenuItems = (t: (key: string) => string) => [
  {
    href: '/dashboard',
    label: t('dashboard'),
    icon: LayoutDashboard,
  },
  {
    href: '/recipes',
    label: t('recipes'),
    icon: ChefHat,
  },
  {
    href: '/profile',
    label: t('profile'),
    icon: User,
  },
  {
    href: '/leagues',
    label: t('leagues'),
    icon: Trophy,
  },
  {
    href: '/reading',
    label: t('reading'),
    icon: BookOpen,
  },
];

export function MainNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const menuItems = getMenuItems(t);

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith(item.href)}
            tooltip={item.label}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
