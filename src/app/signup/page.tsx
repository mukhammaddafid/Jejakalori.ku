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

export default function SignUpPage() {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary/20">
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
    </div>
  )
}
