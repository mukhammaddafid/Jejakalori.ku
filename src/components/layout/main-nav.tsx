'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ChefHat,
  Trophy,
  BookOpen,
  Info,
} from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useLanguage } from '@/lib/language-provider';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { mockUserData } from '@/lib/data';

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
  const [selectedAvatarId, setSelectedAvatarId] = React.useState('user-avatar-1');
  const userAvatar = PlaceHolderImages.find(img => img.id === selectedAvatarId);
  const user = mockUserData.profile;

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
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          isActive={pathname.startsWith('/profile')}
          tooltip={t('profile')}
        >
          <Link href="/profile">
            <Avatar className="h-6 w-6">
              {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" />}
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <span>{t('profile')}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          isActive={pathname.startsWith('/about')}
          tooltip={t('about')}
        >
          <Link href="/about">
            <Info />
            <span>{t('about')}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
