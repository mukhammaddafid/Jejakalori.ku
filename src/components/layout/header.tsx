'use client';

import * as React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
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
import { Globe, User as UserIcon, Image as ImageIcon, Monitor, Sun, Moon } from 'lucide-react';
import { getMenuItems } from './main-nav';
import { useLanguage } from '@/lib/language-provider';

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
  const { setTheme } = useTheme();

  const avatarPlaceholders = PlaceHolderImages.filter(img => img.id.startsWith('user-avatar-'));
  const userAvatar = avatarPlaceholders.find(img => img.id === selectedAvatarId) || avatarPlaceholders[0];

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
          <DropdownMenuItem>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>{t('profile')}</span>
            </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ImageIcon className="mr-2 h-4 w-4" />
              <span>Change Avatar</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={selectedAvatarId} onValueChange={setSelectedAvatarId}>
                  {avatarPlaceholders.map(avatar => (
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
                <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span>{t('theme')}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Dark</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                        <Monitor className="mr-2 h-4 w-4" />
                        <span>System</span>
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
          <DropdownMenuItem>{t('logout')}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
