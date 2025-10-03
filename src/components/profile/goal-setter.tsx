'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { UserGoals } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Target } from 'lucide-react';
import { useLanguage } from '@/lib/language-provider';

const goalFormSchema = z.object({
  calories: z.coerce.number().min(1, { message: 'Calories must be positive.' }),
  protein: z.coerce.number().min(1, { message: 'Protein must be positive.' }),
  carbs: z.coerce.number().min(1, { message: 'Carbs must be positive.' }),
  fat: z.coerce.number().min(1, { message: 'Fat must be positive.' }),
});

type GoalFormValues = z.infer<typeof goalFormSchema>;

interface GoalSetterProps {
  initialGoals: UserGoals;
}

export function GoalSetter({ initialGoals }: GoalSetterProps) {
  const { toast } = useToast();
  const { t } = useLanguage();
  const form = useForm<GoalFormValues>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: initialGoals,
  });

  function onSubmit(data: GoalFormValues) {
    // In a real app, you would save this data.
    console.log(data);
    toast({
      title: t('goalsUpdated'),
      description: t('goalsUpdatedDescription'),
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('nutritionGoals')}</CardTitle>
        <CardDescription>
          {t('nutritionGoalsDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="calories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('dailyCalories')}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="2000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="protein"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('protein')} (g)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="150" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carbs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('carbohydrates')} (g)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="200" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('fat')} (g)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="67" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormDescription>
                {t('macroTargetsDescription')}
            </FormDescription>
            <Button type="submit" className="w-full sm:w-auto">
                <Target className="mr-2 h-4 w-4" />
                {t('saveGoals')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
