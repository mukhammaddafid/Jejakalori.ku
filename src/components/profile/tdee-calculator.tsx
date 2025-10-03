
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calculator } from 'lucide-react';
import { calculateTDEE } from '@/lib/formulas';
import type { UserProfile } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const profileFormSchema = z.object({
  age: z.coerce.number().min(1, { message: 'Umur diperlukan.' }),
  gender: z.enum(['male', 'female'], { required_error: 'Silakan pilih jenis kelamin.' }),
  height: z.coerce.number().min(1, { message: 'Tinggi badan diperlukan.' }),
  weight: z.coerce.number().min(1, { message: 'Berat badan diperlukan.' }),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very'], { required_error: 'Silakan pilih tingkat aktivitas.' }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface TdeeCalculatorProps {
  initialProfile: UserProfile;
}

export function TdeeCalculator({ initialProfile }: TdeeCalculatorProps) {
  const [tdee, setTdee] = React.useState<number | null>(null);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      age: initialProfile.age,
      gender: initialProfile.gender,
      height: initialProfile.height,
      weight: initialProfile.weight,
      activityLevel: initialProfile.activityLevel,
    },
  });

  function onSubmit(data: ProfileFormValues) {
    const calculatedTdee = calculateTDEE(data);
    setTdee(calculatedTdee);
    toast({
      title: 'Energi Harian Dihitung',
      description: `Perkiraan kebutuhan kalori harian Anda adalah ${calculatedTdee} kkal.`,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hitung Energi Harian</CardTitle>
        <CardDescription>
          Hitung Total Pengeluaran Energi Harian (TDEE) Anda untuk memperkirakan kebutuhan kalori harian Anda.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Umur</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="30" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis kelamin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Pria</SelectItem>
                        <SelectItem value="female">Wanita</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tinggi (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="165" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Berat (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="60" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="activityLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tingkat Aktivitas</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih tingkat aktivitas Anda" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sedentary">Sedentari (sedikit atau tanpa olahraga)</SelectItem>
                          <SelectItem value="light">Aktivitas ringan (olahraga ringan 1-3 hari/minggu)</SelectItem>
                          <SelectItem value="moderate">Aktivitas sedang (olahraga sedang 3-5 hari/minggu)</SelectItem>
                          <SelectItem value="active">Sangat aktif (olahraga berat 6-7 hari seminggu)</SelectItem>
                          <SelectItem value="very">Ekstra aktif (olahraga sangat berat & pekerjaan fisik)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
              <Calculator className="mr-2 h-4 w-4" />
              Hitung Energi Harian
            </Button>
          </form>
        </Form>
        {tdee !== null && (
          <>
            <Separator className="my-8" />
            <div className="text-center p-6 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">Perkiraan Kebutuhan Kalori Harian Anda</p>
              <p className="text-4xl font-bold font-headline text-primary">{tdee}</p>
              <p className="text-sm text-muted-foreground">kkal / hari</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
