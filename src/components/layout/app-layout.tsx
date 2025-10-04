'use client';

import * as React from 'react';
import { Flame } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { MainNav } from '@/components/layout/main-nav';
import { Header } from '@/components/layout/header';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/lib/language-provider';
import { SettingsDialog } from './settings-dialog';

type AppLayoutProps = {
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function AppLayout({ children, defaultOpen = true }: AppLayoutProps) {
  const { t } = useLanguage();
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex">
        <Sidebar className="sticky top-0 h-screen">
          <SidebarHeader>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 overflow-hidden">
                <Flame className="h-6 w-6 shrink-0 text-primary" />
                <span className="font-headline text-lg font-bold whitespace-nowrap group-data-[state=collapsed]:hidden">{t('appName')}</span>
              </div>
              <SidebarTrigger className="group-data-[state=collapsed]:hidden"/>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <MainNav />
          </SidebarContent>
          <SidebarFooter>
            <Separator className="my-2" />
            <div className="p-3 flex items-center justify-between">
              <SettingsDialog />
              <div className="group-data-[state=expanded]:hidden">
                  <SidebarTrigger/>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 overflow-y-auto bg-secondary/20">
              {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
