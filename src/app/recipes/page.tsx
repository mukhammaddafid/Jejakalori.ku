'use client';

import * as React from 'react';
import { RecipeCalculator } from '@/components/recipes/recipe-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UtensilsCrossed, Soup } from 'lucide-react';
import { useLanguage } from '@/lib/language-provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { mealPlan30Days } from '@/lib/data';
import { addDays, format } from 'date-fns';

function HealthyMealPlan() {
    const { t, language } = useLanguage();
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [activeTab, setActiveTab] = React.useState('international');
    
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);

    const dayOfMonth = date ? date.getDate() : 1;
    const planIndex = (dayOfMonth - 1) % 30;
    
    const plans = mealPlan30Days[language][activeTab as keyof typeof mealPlan30Days['en']];
    const selectedPlan = plans[planIndex];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><UtensilsCrossed /> {t('healthyMealPlan')}</CardTitle>
                <CardDescription>
                    {t('healthyMealPlanDescription')}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="international">{t('internationalMenu')}</TabsTrigger>
                        <TabsTrigger value="nusantara">{t('nusantaraMenu')}</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className='flex justify-center'>
                         <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            fromMonth={startDate}
                            toMonth={addDays(startDate, 29)}
                            className="rounded-md border"
                        />
                    </div>
                    {selectedPlan && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('day')} {dayOfMonth}</CardTitle>
                                <CardDescription>{date ? format(date, 'PPP') : ''}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-semibold">{t('breakfast')}</h4>
                                    <p className="text-muted-foreground">{selectedPlan.breakfast}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">{t('lunch')}</h4>
                                    <p className="text-muted-foreground">{selectedPlan.lunch}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">{t('dinner')}</h4>
                                    <p className="text-muted-foreground">{selectedPlan.dinner}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default function RecipesPage() {
  const { t } = useLanguage();
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg text-primary">
            <Soup size={32} />
        </div>
        <div>
            <h1 className="text-2xl font-bold font-headline">{t('letsCountCalories')}</h1>
            <p className="text-muted-foreground">
            {t('letsCountCaloriesDescription')}
            </p>
        </div>
      </div>
      
      <RecipeCalculator />
      <HealthyMealPlan />
    </div>
  );
}
