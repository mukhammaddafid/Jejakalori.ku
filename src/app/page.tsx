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
import { quotes } from '@/app/reading/page';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


function QuoteCarousel() {
    // 3 Indonesian, 7 International quotes
    const selectedQuotes = [
      quotes[0], // Pramoedya
      quotes[1], // Andrea Hirata
      quotes[10], // Hatta
      quotes[20], // Steve Jobs
      quotes[21], // Lao Tzu
      quotes[22], // Nietzsche
      quotes[25], // Gandhi
      quotes[32], // Churchill
      quotes[33], // Mandela
      quotes[72], // Walt Disney
    ];

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto"
        >
            <CarouselContent>
                {selectedQuotes.map((q, i) => (
                    <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1 h-full">
                            <Card className="p-4 rounded-lg shadow-md bg-card flex flex-col justify-center h-full transform hover:scale-105 transition-transform duration-300">
                                <blockquote className="text-xs sm:text-sm italic flex-grow">"{q.quote}"</blockquote>
                                <p className="text-xs text-right mt-2 font-semibold">- {q.author}</p>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
        </Carousel>
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
            <div className="mt-16">
              <QuoteCarousel />
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
