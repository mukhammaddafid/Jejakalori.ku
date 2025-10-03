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
  const form = useForm<GoalFormValues>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: initialGoals,
  });

  function onSubmit(data: GoalFormValues) {
    // In a real app, you would save this data.
    console.log(data);
    toast({
      title: 'Goals Updated!',
      description: 'Your daily nutrition goals have been saved.',
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutrition Goals</CardTitle>
        <CardDescription>
          Set your daily calorie and macronutrient targets.
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
                  <FormLabel>Daily Calories (kcal)</FormLabel>
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
                    <FormLabel>Protein (g)</FormLabel>
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
                    <FormLabel>Carbohydrates (g)</FormLabel>
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
                    <FormLabel>Fat (g)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="67" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormDescription>
                Your macronutrient targets are based on your total calorie goal. Adjust as needed.
            </FormDescription>
            <Button type="submit" className="w-full sm:w-auto">
                <Target className="mr-2 h-4 w-4" />
                Save Goals
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
