'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Zap, ShieldCheck, Leaf, Bone, Droplets, Sun, Brain, Dna, Bot, HeartPulse, Wheat, Eye } from 'lucide-react';
import type { NutrientTotals } from '@/lib/types';
import { micronutrientGoals, foodDatabase } from '@/lib/data';
import { useLanguage } from '@/lib/language-provider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type MicroNutrient = 'fiber' | 'iron' | 'calcium' | 'vitaminC' | 'vitaminD' | 'potassium' | 'magnesium' | 'vitaminA' | 'vitaminB1' | 'vitaminB6' | 'vitaminB12' | 'vitaminE' | 'vitaminK';

const microInfo: Record<MicroNutrient, {
    icon: React.ReactNode;
    analysisKey: string;
    foodIds: string[];
    recipeLink: string;
    unit: string;
    labelKey: any;
    shortLabelKey: any;
}> = {
    fiber: {
        icon: <Leaf className="h-5 w-5 text-green-500" />,
        analysisKey: 'fiberAnalysis',
        foodIds: ['f2', 'f3', 'f5', 'f6', 'f7', 'f10', 'f28'],
        recipeLink: '/recipes',
        unit: 'g',
        labelKey: 'fiber',
        shortLabelKey: 'fiber_short'
    },
    iron: {
        icon: <Droplets className="h-5 w-5 text-red-500" />,
        analysisKey: 'ironAnalysis',
        foodIds: ['f1', 'f10', 'f11', 'f7'],
        recipeLink: '/recipes',
        unit: 'mg',
        labelKey: 'iron',
        shortLabelKey: 'iron_short'
    },
    calcium: {
        icon: <Bone className="h-5 w-5 text-slate-400" />,
        analysisKey: 'calciumAnalysis',
        foodIds: ['f9', 'f10', 'f6', 'f31'],
        recipeLink: '/recipes',
        unit: 'mg',
        labelKey: 'calcium',
        shortLabelKey: 'calcium_short'
    },
    vitaminC: {
        icon: <Sun className="h-5 w-5 text-orange-500" />,
        analysisKey: 'vitaminCAnalysis',
        foodIds: ['f3', 'f5', 'f10', 'f28', 'f41', 'f45', 'f51'],
        recipeLink: '/recipes',
        unit: 'mg',
        labelKey: 'vitaminC',
        shortLabelKey: 'vitaminC_short'
    },
    vitaminD: {
        icon: <Sun className="h-5 w-5 text-yellow-500" />,
        analysisKey: 'vitaminDAnalysis',
        foodIds: ['f4', 'f8', 'f29', 'f31'],
        recipeLink: '/recipes',
        unit: 'IU',
        labelKey: 'vitaminD',
        shortLabelKey: 'vitaminD_short'
    },
    potassium: {
        icon: <HeartPulse className="h-5 w-5 text-rose-500" />,
        analysisKey: 'potassiumAnalysis',
        foodIds: ['f44', 'f10', 'f35', 'f28'],
        recipeLink: '/recipes',
        unit: 'mg',
        labelKey: 'potassium',
        shortLabelKey: 'potassium_short'
    },
    magnesium: {
        icon: <Bot className="h-5 w-5 text-cyan-500" />,
        analysisKey: 'magnesiumAnalysis',
        foodIds: ['f6', 'f10', 'f28', 'f2'],
        recipeLink: '/recipes',
        unit: 'mg',
        labelKey: 'magnesium',
        shortLabelKey: 'magnesium_short'
    },
    vitaminA: {
        icon: <Eye className="h-5 w-5 text-blue-500" />,
        analysisKey: 'vitaminAAnalysis',
        foodIds: ['f3', 'f10', 'f8', 'f45'],
        recipeLink: '/recipes',
        unit: 'mcg',
        labelKey: 'vitaminA',
        shortLabelKey: 'vitaminA_short'
    },
    vitaminB1: {
        icon: <Brain className="h-5 w-5 text-purple-500" />,
        analysisKey: 'vitaminB1Analysis',
        foodIds: ['f11', 'f4', 'f2', 'f7'],
        recipeLink: '/recipes',
        unit: 'mg',
        labelKey: 'vitaminB1',
        shortLabelKey: 'vitaminB1_short'
    },
    vitaminB6: {
        icon: <Brain className="h-5 w-5 text-indigo-500" />,
        analysisKey: 'vitaminB6Analysis',
        foodIds: ['f1', 'f4', 'f44', 'f35'],
        recipeLink: '/recipes',
        unit: 'mg',
        labelKey: 'vitaminB6',
        shortLabelKey: 'vitaminB6_short'
    },
    vitaminB12: {
        icon: <Dna className="h-5 w-5 text-violet-500" />,
        analysisKey: 'vitaminB12Analysis',
        foodIds: ['f11', 'f4', 'f8', 'f9'],
        recipeLink: '/recipes',
        unit: 'mcg',
        labelKey: 'vitaminB12',
        shortLabelKey: 'vitaminB12_short'
    },
    vitaminE: {
        icon: <Zap className="h-5 w-5 text-amber-500" />,
        analysisKey: 'vitaminEAnalysis',
        foodIds: ['f6', 'f10', 'f28', 'f4'],
        recipeLink: '/recipes',
        unit: 'mg',
        labelKey: 'vitaminE',
        shortLabelKey: 'vitaminE_short'
    },
    vitaminK: {
        icon: <Wheat className="h-5 w-5 text-lime-500" />,
        analysisKey: 'vitaminKAnalysis',
        foodIds: ['f10', 'f3', 'f1', 'f49'],
        recipeLink: '/recipes',
        unit: 'mcg',
        labelKey: 'vitaminK',
        shortLabelKey: 'vitaminK_short'
    },
};

interface MicronutrientTrackerProps {
  totals: NutrientTotals;
}

function MicroNutrientPopover({ nutrient, consumed, goal }: { nutrient: MicroNutrient, consumed: number, goal: number }) {
    const { t } = useLanguage();
    const info = microInfo[nutrient];
    const percentage = goal > 0 ? (consumed / goal) * 100 : 0;
    const recommendedFoods = info.foodIds.map(id => foodDatabase.find(f => f.id === id)).filter(Boolean) as any[];
    
    let label = t(info.labelKey);
    const shortLabel = t(info.shortLabelKey);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-muted cursor-pointer w-16">
                    {info.icon}
                    <p className="text-xs font-medium text-center truncate w-full">{shortLabel}</p>
                    <Progress value={percentage} className="h-1 w-12" />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="mr-4">{info.icon}</div>
                        <div className="flex-1">
                            <h4 className="font-semibold">{label}</h4>
                            <p className="text-xs text-muted-foreground">{t(info.analysisKey as any)}</p>
                        </div>
                    </div>
                    <div>
                         <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{t('consumed')}</span>
                            <span className="text-muted-foreground">{Math.round(consumed)}{info.unit} / {goal}{info.unit}</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                    </div>
                    <div>
                        <h5 className="text-xs font-semibold mb-1">{t('recommendedFoods')}</h5>
                        <div className="flex flex-wrap gap-1">
                            {recommendedFoods.map(food => (
                                <Button key={food.id} variant="outline" size="sm" className="h-auto py-0.5 px-2 text-xs">
                                    {t(food.id as any)}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Button variant="link" asChild className="p-0 h-auto text-xs">
                            <Link href={info.recipeLink}>{t('findRecipes')}</Link>
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export function MicronutrientTracker({ totals }: MicronutrientTrackerProps) {
  const [trialEndDate, setTrialEndDate] = React.useState<Date | null>(null);
  const [isTrialActive, setIsTrialActive] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  const { t } = useLanguage();

  React.useEffect(() => {
    setIsClient(true);
    const storedEndDate = localStorage.getItem('micronutrientTrialEnd');
    if (storedEndDate) {
      setTrialEndDate(new Date(storedEndDate));
    }
  }, []);

  React.useEffect(() => {
    if (trialEndDate) {
      const now = new Date();
      if (now < trialEndDate) {
        setIsTrialActive(true);
      } else {
        setIsTrialActive(false);
      }
    }
  }, [trialEndDate]);

  if (!isClient) {
    return null;
  }
  
  const startTrial = () => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    localStorage.setItem('micronutrientTrialEnd', endDate.toISOString());
    setTrialEndDate(endDate);
    setIsTrialActive(true);
  };

  const getTimeRemaining = () => {
    if (!trialEndDate) return '';
    const now = new Date();
    const difference = trialEndDate.getTime() - now.getTime();

    if (difference <= 0) return t('trialEnded');

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days} ${t('days')} ${hours} ${t('hours')} ${t('remaining')}`;
  };

  const mainMicros: MicroNutrient[] = ['fiber', 'iron', 'calcium', 'vitaminC', 'vitaminD'];
  const otherMicros: MicroNutrient[] = ['potassium', 'magnesium', 'vitaminA', 'vitaminK', 'vitaminE'];
  const vitaminBMicros: MicroNutrient[] = ['vitaminB1', 'vitaminB6', 'vitaminB12'];

  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle>{t('micronutrients')}</CardTitle>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <ShieldCheck className="h-4 w-4" />
                <span>{t('premium')}</span>
            </div>
        </div>
        <CardDescription>{t('micronutrientsDescription')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-y-2">
            {mainMicros.map(key => (
                <MicroNutrientPopover key={key} nutrient={key} consumed={totals[key]} goal={micronutrientGoals[key]} />
            ))}
        </div>
        <Accordion type="single" collapsible>
            <AccordionItem value="more-micros" className="border-b-0">
                <AccordionTrigger className="text-sm justify-center py-2 -mx-2 px-2 hover:no-underline rounded-md hover:bg-muted">
                    {t('showMoreNutrients')}
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-y-2">
                        {otherMicros.map(key => (
                            <MicroNutrientPopover key={key} nutrient={key} consumed={totals[key]} goal={micronutrientGoals[key]} />
                        ))}
                    </div>
                     <h4 className="font-semibold text-sm mt-4 mb-2 ml-1">Vitamin B Complex</h4>
                     <div className="grid grid-cols-3 sm:grid-cols-5 gap-y-2">
                        {vitaminBMicros.map(key => (
                            <MicroNutrientPopover key={key} nutrient={key} consumed={totals[key]} goal={micronutrientGoals[key]} />
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        {!isTrialActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center p-4">
                <Zap className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-2 text-lg font-semibold">{t('unlockFullTracking')}</h3>
                {trialEndDate && new Date() > trialEndDate ? (
                    <>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {t('trialEndedDescription')}
                        </p>
                        <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">{t('upgradeToPremium')}</Button>
                    </>
                ) : (
                    <>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {t('tryFreeTrial')}
                        </p>
                        <Button onClick={startTrial} className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">{t('start7DayTrial')}</Button>
                    </>
                )}
            </div>
        </div>
        )}
         {isTrialActive && (
          <div className="mt-4 rounded-lg bg-primary/10 p-3 text-center text-sm text-primary-foreground">
            <p className="font-semibold text-primary">{t('premiumTrialActive')}</p>
            <p className="text-primary/80">{getTimeRemaining()}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
