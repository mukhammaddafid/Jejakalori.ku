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
import { Globe, User as UserIcon, Image as ImageIcon, Monitor, Tablet, Smartphone, LifeBuoy, LogOut } from 'lucide-react';
import { getMenuItems } from './main-nav';
import { useLanguage } from '@/lib/language-provider';
import Link from 'next/link';

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
  const pageTitle = getPageTitle(pathname, t);
  const [selectedAvatarId, setSelectedAvatarId] = React.useState('user-avatar-1');
  
  const avatarPlaceholders = PlaceHolderImages.filter(img => img.id.startsWith('user-avatar-'));
  const userAvatar = avatarPlaceholders.find(img => img.id === selectedAvatarId) || avatarPlaceholders[0];

  const badgeAvatars = avatarPlaceholders.filter(a => a.id.includes('user-avatar-2'));
  const simpleAvatars = avatarPlaceholders.filter(a => a.id.includes('user-avatar-1') || a.id.includes('user-avatar-3') || a.id.includes('user-avatar-4') || a.id.includes('user-avatar-5'));


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
              <AvatarFallback>JD</AvatarFallback>
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
              <span>{t('avatar' as any)}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={selectedAvatarId} onValueChange={setSelectedAvatarId}>
                  <DropdownMenuLabel className="text-xs font-normal text-muted-foreground px-2">Initial</DropdownMenuLabel>
                  <DropdownMenuRadioItem value="initials">Initials</DropdownMenuRadioItem>
                  <DropdownMenuLabel className="text-xs font-normal text-muted-foreground px-2">Badge Style</DropdownMenuLabel>
                  {badgeAvatars.map((avatar) => (
                    <DropdownMenuRadioItem key={avatar.id} value={avatar.id}>
                      {avatar.description}
                    </DropdownMenuRadioItem>
                  ))}
                   <DropdownMenuLabel className="text-xs font-normal text-muted-foreground px-2">Simple Style</DropdownMenuLabel>
                  {simpleAvatars.map((avatar) => (
                    <DropdownMenuRadioItem key={avatar.id} value={avatar.id}>
                      {avatar.description}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Smartphone className="mr-2 h-4 w-4" />
              <span>{t('theme')}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Monitor className="mr-2 h-4 w-4" />
                  <span>Desktop</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Tablet className="mr-2 h-4 w-4" />
                  <span>Tablet</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Smartphone className="mr-2 h-4 w-4" />
                  <span>Mobile</span>
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
                <DropdownMenuItem>{t('helpCenter')}</DropdownMenuItem>
                <DropdownMenuItem>{t('reportProblem')}</DropdownMenuItem>
                <DropdownMenuItem>{t('contactUs')}</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t('logout')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
