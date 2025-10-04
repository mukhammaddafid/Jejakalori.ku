'use client';

import * as React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { mockUserData } from '@/lib/data';

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
import { Globe, User as UserIcon, Image as ImageIcon, Monitor, Tablet, Smartphone, LifeBuoy, LogOut, Wrench, AlertTriangle } from 'lucide-react';
import { getMenuItems } from './main-nav';
import { useLanguage } from '@/lib/language-provider';
import Link from 'next/link';
import { useViewport } from '@/lib/viewport-provider';

function getPageTitle(pathname: string, t: (key: string) => string) {
  const menuItems = getMenuItems(t);
  const item = menuItems.find(item => pathname.startsWith(item.href));
  if (item) {
    return item.label;
  }
  return t('dashboard');
}

export function Header() {
  const pathname = usePathname();
  const { t, language, setLanguage } = useLanguage();
  const { setViewport } = useViewport();
  const pageTitle = getPageTitle(pathname, t);
  const [selectedAvatarId, setSelectedAvatarId] = React.useState('user-avatar-1');
  
  const userAvatar = PlaceHolderImages.find(img => img.id === selectedAvatarId) || PlaceHolderImages[0];
  const user = mockUserData.profile;


  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-card px-4 sm:h-16 sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-xl font-semibold md:text-2xl">{pageTitle}</h1>
      <div className="flex-1" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              {userAvatar && selectedAvatarId !== 'initials' &&
                <AvatarImage 
                  src={userAvatar.imageUrl} 
                  alt="User avatar" 
                  data-ai-hint={userAvatar.imageHint} 
                />}
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{t('myAccount')}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>{t('profile')}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ImageIcon className="mr-2 h-4 w-4" />
              <span>{t('avatar')}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={selectedAvatarId} onValueChange={setSelectedAvatarId}>
                  <DropdownMenuRadioItem value="user-avatar-1">Lego Man</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="user-avatar-2">Lego Woman</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="user-avatar-3">Lego Group</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Smartphone className="mr-2 h-4 w-4" />
              <span>{t('viewMode')}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setViewport('desktop')}>
                  <Monitor className="mr-2 h-4 w-4" />
                  <span>{t('desktop')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setViewport('tablet')}>
                  <Tablet className="mr-2 h-4 w-4" />
                  <span>{t('tablet')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setViewport('mobile')}>
                  <Smartphone className="mr-2 h-4 w-4" />
                  <span>{t('mobile')}</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Globe className="mr-2 h-4 w-4" />
              <span>{t('language')}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as 'en' | 'id')}>
                  <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="id">Bahasa Indonesia</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>{t('support')}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem asChild>
                    <Link href="/about">
                        <Wrench className="mr-2 h-4 w-4" />
                        <span>{t('apiSupportTitle')}</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/about">
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        <span>{t('limitationsTitle')}</span>
                    </Link>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/login">
              <LogOut className="mr-2 h-4 w-4" />
              <span>{t('logout')}</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
