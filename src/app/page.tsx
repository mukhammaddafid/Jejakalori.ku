'use client';

import * as React from 'react';
import Link from 'next/link';
import { Flame, Monitor, Tablet, Smartphone, BookOpen, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from '@/lib/language-provider';

function ChartCollage() {
    return (
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4">
          <div className="p-4 bg-card rounded-xl shadow-lg flex items-center justify-center">
            {/* Open book icon */}
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-inner">
                <BookOpen className="w-16 h-16 text-red-600" />
            </div>
          </div>
          <div className="p-4 bg-card rounded-xl shadow-lg flex items-center justify-center">
            {/* Green gradient circle */}
            <div className="relative w-24 h-24">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-green-300 via-green-500 to-green-700"></div>
            </div>
          </div>
          <div className="col-span-2 p-4 bg-card rounded-xl shadow-lg flex items-center justify-center">
            {/* Bar Chart placeholder */}
            <div className="w-full h-32 flex items-end justify-around gap-2 p-2">
                <div className="h-1/2 w-8 bg-primary/30 rounded-t-lg"></div>
                <div className="h-3/4 w-8 bg-primary/60 rounded-t-lg"></div>
                <div className="h-full w-8 bg-primary rounded-t-lg"></div>
                <div className="h-1/4 w-8 bg-primary/40 rounded-t-lg"></div>
                <div className="h-2/3 w-8 bg-primary/80 rounded-t-lg"></div>
            </div>
          </div>
        </div>
    );
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as 'en' | 'id')}>
                <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="id">Bahasa Indonesia</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Smartphone className="h-5 w-5" />
                <span className="sr-only">View Modes</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
            </DropdownMenuContent>
          </DropdownMenu>
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
