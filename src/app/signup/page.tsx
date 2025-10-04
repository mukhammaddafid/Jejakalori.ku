'use client';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Flame } from "lucide-react";
import { useLanguage } from "@/lib/language-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { quotes } from '@/app/reading/page';

const countries = [
  { value: 'id', label: 'Indonesia' },
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
  { value: 'in', label: 'India' },
  { value: 'br', label: 'Brazil' },
  { value: 'za', label: 'South Africa' },
];

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

export default function SignUpPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary/20 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Link href="/" className="flex items-center gap-2">
                    <Flame className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-headline font-bold">{t('appName')}</span>
                </Link>
            </div>
          <CardTitle className="text-2xl">{t('signUpTitle')}</CardTitle>
          <CardDescription>
            {t('signUpDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">{t('name')}</Label>
            <Input id="name" placeholder="Jane Doe" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{t('email')}</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">{t('country')}</Label>
            <Select>
              <SelectTrigger id="country">
                <SelectValue placeholder={t('selectCountry')} />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t('password')}</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
            <Link href="/dashboard" className="w-full">
                <Button className="w-full">{t('signUp')}</Button>
            </Link>
          <p className="text-xs text-center text-muted-foreground">
            {t('alreadyHaveAccount')}{" "}
            <Link href="/login" className="underline">
              {t('login')}
            </Link>
          </p>
        </CardFooter>
      </Card>
      <div className="mt-16 w-full px-4">
        <QuoteCarousel />
      </div>
    </div>
  )
}
