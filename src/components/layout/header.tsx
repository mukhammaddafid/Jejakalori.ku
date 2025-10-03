'use client';

import * as React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Globe } from 'lucide-react';
import { getMenuItems } from './main-nav';
import { useLanguage } from '@/lib/language-provider';

function getPageTitle(pathname: string, t: (key: string) => string) {
  const menuItems = getMenuItems(t);
  const item = menuItems.find(item => item.href === pathname);
  if (item) {
    return item.label;
  }
  if (pathname.startsWith('/dashboard')) return t('dashboard');
  if (pathname.startsWith('/recipes')) return t('recipes');
  if (pathname.startsWith('/profile')) return t('profile');
  return t('dashboard');
}

export function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const pageTitle = getPageTitle(pathname, t);
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');
  

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-card px-4 sm:h-16 sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-xl font-semibold md:text-2xl">{pageTitle}</h1>
      <div className="flex-1" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              {userAvatar && 
                <AvatarImage 
                  src={userAvatar.imageUrl} 
                  alt="User avatar" 
                  data-ai-hint={userAvatar.imageHint} 
                />}
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{t('settings')}</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>{t('support')}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>{t('helpCenter')}</DropdownMenuItem>
                <DropdownMenuItem>{t('reportProblem')}</DropdownMenuItem>
                <DropdownMenuItem>{t('contactUs')}</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            {t('language')}
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as 'id' | 'en')}>
            <DropdownMenuRadioItem value="id">Bahasa Indonesia</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{t('logout')}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
