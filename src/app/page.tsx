'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Flame, Monitor, Tablet, Smartphone, BookOpen, Globe, BarChart, PieChart, LineChart } from 'lucide-react';
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
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

function ChartCollage() {
  const chartIcons = [
    { icon: <BarChart className="h-10 w-10 text-primary" />, rotation: '-rotate-12' },
    { icon: <BookOpen className="h-12 w-12 text-accent" />, rotation: 'rotate-15' },
    { icon: <LineChart className="h-10 w-10 text-chart-2" />, rotation: 'rotate-6' },
    { icon: <PieChart className="h-12 w-12 text-chart-3" />, rotation: '-rotate-8' },
  ];

  return (
    <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
      {chartIcons.map((item, index) => (
        <div key={index} className="flex justify-center items-center">
          <Card className={`p-4 sm:p-6 bg-muted/50 transform ${item.rotation} hover:scale-110 transition-transform duration-300`}>
            <CardContent className="p-0">
              {item.icon}
            </CardContent>
          </Card>
        </div>
      ))}
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
          <Link href="/signup" passHref>
            <Button>{t('signUp')}</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  {t('welcomeTitle')}
                </h1>
                <p className="max-w-[600px] text-muted-foreground text-base mx-auto">
                  {t('welcomeSubtitle')}
                </p>
              </div>
              <div className="mt-8">
                <Link href="/signup" passHref>
                    <Button size="lg" className="text-lg px-8 py-6">{t('startToday')}</Button>
                </Link>
              </div>
            </div>
            <ChartCollage />
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
