'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ChefHat,
  Trophy,
  BookOpen,
} from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useLanguage } from '@/lib/language-provider';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span>{t('profile')}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
