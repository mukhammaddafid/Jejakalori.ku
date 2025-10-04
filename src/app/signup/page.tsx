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
import { Flame, FileText } from "lucide-react";
import { useLanguage } from "@/lib/language-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { quotes } from '@/app/reading/page';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useRouter } from "next/navigation";

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

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  country: z.string().min(1, { message: 'Please select a country.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

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
                            <Card className="flex flex-col justify-center p-4 bg-muted/50 h-full transform hover:scale-105 transition-transform duration-300">
                                <FileText className="h-6 w-6 mb-2 text-muted-foreground" />
                                <blockquote className="text-sm italic flex-grow">"{q.quote}"</blockquote>
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
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      country: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary/20 py-12 px-4">
      <div className="mb-8 w-full">
        <QuoteCarousel />
      </div>
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <Label htmlFor="name">{t('name')}</Label>
                    <FormControl>
                      <Input id="name" placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <Label htmlFor="email">{t('email')}</Label>
                    <FormControl>
                      <Input id="email" type="email" placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <Label htmlFor="country">{t('country')}</Label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger id="country">
                          <SelectValue placeholder={t('selectCountry')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <Label htmlFor="password">{t('password')}</Label>
                    <FormControl>
                      <Input id="password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full">{t('signUp')}</Button>
              <p className="text-xs text-center text-muted-foreground">
                {t('alreadyHaveAccount')}{" "}
                <Link href="/login" className="underline">
                  {t('login')}
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
