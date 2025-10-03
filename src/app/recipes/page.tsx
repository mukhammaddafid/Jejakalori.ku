'use client';

import * as React from 'react';
import { RecipeCalculator } from '@/components/recipes/recipe-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UtensilsCrossed, Soup } from 'lucide-react';
import { useLanguage } from '@/lib/language-provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { mealPlan30Days } from '@/lib/data';

function HealthyMealPlan() {
    const { t, language } = useLanguage();
    const plans = mealPlan30Days[language];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><UtensilsCrossed /> {t('healthyMealPlan')}</CardTitle>
                <CardDescription>
                    {t('healthyMealPlanDescription')}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Tabs defaultValue="international">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="international">{t('internationalMenu')}</TabsTrigger>
                        <TabsTrigger value="nusantara">{t('nusantaraMenu')}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="international">
                        <Accordion type="single" collapsible className="w-full">
                            {plans.international.map((day, index) => (
                                <AccordionItem value={`day-${index + 1}`} key={index}>
                                    <AccordionTrigger>{t('day')} {index + 1}</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold">{t('breakfast')}</h4>
                                                <p className="text-muted-foreground">{day.breakfast}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">{t('lunch')}</h4>
                                                <p className="text-muted-foreground">{day.lunch}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">{t('dinner')}</h4>
                                                <p className="text-muted-foreground">{day.dinner}</p>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </TabsContent>
                    <TabsContent value="nusantara">
                         <Accordion type="single" collapsible className="w-full">
                            {plans.nusantara.map((day, index) => (
                                <AccordionItem value={`day-${index + 1}`} key={index}>
                                    <AccordionTrigger>{t('day')} {index + 1}</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold">{t('breakfast')}</h4>
                                                <p className="text-muted-foreground">{day.breakfast}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">{t('lunch')}</h4>
                                                <p className="text-muted-foreground">{day.lunch}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">{t('dinner')}</h4>
                                                <p className="text-muted-foreground">{day.dinner}</p>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </TabsContent>
                </Tabs>
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
