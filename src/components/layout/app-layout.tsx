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

type AppLayoutProps = {
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function AppLayout({ children, defaultOpen = true }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="h-6 w-6 text-primary" />
              <span className="font-headline text-lg font-bold">Jejakalori.ku</span>
            </div>
            <SidebarTrigger className="hidden md:flex" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
        <SidebarFooter>
          <Separator className="my-2" />
          <p className="p-2 text-xs text-muted-foreground">© 2024 Jejakalori.ku</p>
        </SidebarFooter>
      </Sidebar>
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-y-auto bg-background">
            {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
