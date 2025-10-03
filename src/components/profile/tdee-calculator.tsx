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
import { useLanguage } from '@/lib/language-provider';

const profileFormSchema = z.object({
  age: z.coerce.number().min(1, { message: 'Age is required.' }),
  gender: z.enum(['male', 'female'], { required_error: 'Please select a gender.' }),
  height: z.coerce.number().min(1, { message: 'Height is required.' }),
  weight: z.coerce.number().min(1, { message: 'Weight is required.' }),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very'], { required_error: 'Please select an activity level.' }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface TdeeCalculatorProps {
  initialProfile: UserProfile;
}

export function TdeeCalculator({ initialProfile }: TdeeCalculatorProps) {
  const [tdee, setTdee] = React.useState<number | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

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
      title: t('tdeeCalculated'),
      description: t('tdeeCalculatedDescription', { tdee: calculatedTdee }),
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('calculateTDEE')}</CardTitle>
        <CardDescription>
          {t('calculateTDEEDescription')}
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
                    <FormLabel>{t('age')}</FormLabel>
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
                    <FormLabel>{t('gender')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectGender')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">{t('male')}</SelectItem>
                        <SelectItem value="female">{t('female')}</SelectItem>
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
                    <FormLabel>{t('height')} (cm)</FormLabel>
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
                    <FormLabel>{t('weight')} (kg)</FormLabel>
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
                      <FormLabel>{t('activityLevel')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('selectActivityLevel')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sedentary">{t('sedentary')}</SelectItem>
                          <SelectItem value="light">{t('lightActivity')}</SelectItem>
                          <SelectItem value="moderate">{t('moderateActivity')}</SelectItem>
                          <SelectItem value="active">{t('veryActive')}</SelectItem>
                          <SelectItem value="very">{t('extraActive')}</SelectItem>
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
              {t('calculateDailyEnergy')}
            </Button>
          </form>
        </Form>
        {tdee !== null && (
          <>
            <Separator className="my-8" />
            <div className="text-center p-6 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">{t('estimatedDailyCalorieNeeds')}</p>
              <p className="text-4xl font-bold font-headline text-primary">{tdee}</p>
              <p className="text-sm text-muted-foreground">kcal / {t('day')}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
