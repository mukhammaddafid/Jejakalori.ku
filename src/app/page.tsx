'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function WelcomePage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'welcome-hero');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Flame className="h-6 w-6 text-primary" />
          <span className="sr-only">Jejakalori.ku</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login" passHref>
            <Button variant="ghost">Masuk</Button>
          </Link>
          <Link href="/login" passHref>
            <Button>Daftar</Button>
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
                    Transformasi Kesehatan Anda, Satu Langkah Setiap Hari
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Jejakalori.ku adalah partner Anda dalam membangun kebiasaan sehat. Lacak asupan, pahami nutrisi, dan capai versi terbaik dari diri Anda.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href="/login" passHref>
                        <Button size="lg">Mulai Perjalanan Anda</Button>
                    </Link>
                </div>
              </div>
              {heroImage && <Image
                src={heroImage.imageUrl}
                width="600"
                height="600"
                alt="Hero"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                data-ai-hint={heroImage.imageHint}
              />}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Jejakalori.ku. Semua Hak Dilindungi.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Ketentuan Layanan
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privasi
          </Link>
        </nav>
      </footer>
    </div>
  );
}
