'use client';

import * as React from 'react';
import Link from 'next/link';
import { Flame, Moon, Sun, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from '@/lib/language-provider';

function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ChartCollage() {
    return (
        <div className="mx-auto grid max-w-4xl grid-cols-2 grid-rows-2 gap-4">
          <div className="p-4 bg-card rounded-xl shadow-lg flex items-center justify-center">
            {/* Bar Chart placeholder */}
            <div className="w-full h-full flex flex-col justify-end gap-1 p-2">
                <div className="h-1/2 bg-primary/30 rounded-t-sm"></div>
                <div className="h-1/4 bg-primary/60 rounded-t-sm"></div>
                <div className="h-3/4 bg-primary rounded-t-sm"></div>
            </div>
          </div>
          <div className="p-4 bg-card rounded-xl shadow-lg flex items-center justify-center">
            {/* Pie chart placeholder */}
            <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center">
                <div className="w-full h-full rounded-full border-[16px] border-transparent border-t-primary/80 border-r-primary/80 rotate-45"></div>
            </div>
          </div>
          <div className="col-span-2 p-4 bg-card rounded-xl shadow-lg flex items-center justify-center">
            {/* Radial chart placeholder */}
            <div className="relative w-32 h-32">
                <div className="w-full h-full rounded-full border-8 border-muted"></div>
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-accent border-l-accent -rotate-45"></div>
            </div>
          </div>
        </div>
    );
}

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}


export default function WelcomePage() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Flame className="h-6 w-6 text-primary" />
          <span className="sr-only">{t('appName')}</span>
        </Link>
        <nav className="ml-auto flex items-center gap-2 sm:gap-4">
          <ClientOnly>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('id')}>Bahasa Indonesia</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ThemeToggle />
          </ClientOnly>
          <Link href="/login" passHref>
            <Button>{t('signUp')}</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    {t('welcomeTitle')}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground text-xs">
                    {t('welcomeSubtitle')}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href="/login" passHref>
                        <Button size="lg">{t('startToday')}</Button>
                    </Link>
                </div>
              </div>
              <ChartCollage />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 {t('appName')}. {t('allRightsReserved')}</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            {t('termsOfService')}
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            {t('privacy')}
          </Link>
        </nav>
      </footer>
    </div>
  );
}
