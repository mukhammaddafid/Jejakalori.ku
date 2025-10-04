'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Zap, ShieldCheck, Leaf, Bone, Droplets, Sun } from 'lucide-react';
import type { NutrientTotals } from '@/lib/types';
import { micronutrientGoals, foodDatabase } from '@/lib/data';
import { useLanguage } from '@/lib/language-provider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type MicroNutrient = 'fiber' | 'iron' | 'calcium' | 'vitaminC';

const microInfo: Record<MicroNutrient, {
    icon: React.ReactNode;
    analysisKey: string;
    foodIds: string[];
    recipeLink: string;
}> = {
    fiber: {
        icon: <Leaf className="mr-2 h-4 w-4 text-green-500" />,
        analysisKey: 'fiberAnalysis',
        foodIds: ['f2', 'f3', 'f5', 'f6', 'f7', 'f10', 'f28'],
        recipeLink: '/recipes'
    },
    iron: {
        icon: <Droplets className="mr-2 h-4 w-4 text-red-500" />,
        analysisKey: 'ironAnalysis',
        foodIds: ['f1', 'f10', 'f11', 'f7'],
        recipeLink: '/recipes'
    },
    calcium: {
        icon: <Bone className="mr-2 h-4 w-4 text-slate-400" />,
        analysisKey: 'calciumAnalysis',
        foodIds: ['f9', 'f10', 'f6', 'f31'],
        recipeLink: '/recipes'
    },
    vitaminC: {
        icon: <Sun className="mr-2 h-4 w-4 text-orange-500" />,
        analysisKey: 'vitaminCAnalysis',
        foodIds: ['f3', 'f5', 'f10', 'f28', 'f41', 'f45', 'f51'],
        recipeLink: '/recipes'
    },
};

interface MicronutrientTrackerProps {
  totals: NutrientTotals;
}

function MicroBar({ label, unit, consumed, goal, nutrient }: { label: string; unit: string; consumed: number; goal: number; nutrient: MicroNutrient }) {
  const percentage = goal > 0 ? (consumed / goal) * 100 : 0;
  const { t } = useLanguage();
  const info = microInfo[nutrient];
  const recommendedFoods = info.foodIds.map(id => foodDatabase.find(f => f.id === id)).filter(Boolean) as any[];

  return (
    <Popover>
        <PopoverTrigger asChild>
            <div className="space-y-1 cursor-pointer hover:bg-muted p-2 rounded-lg">
                <div className="flex justify-between text-sm">
                    <span className="font-medium">{label}</span>
                    <span className="text-muted-foreground">{Math.round(consumed)}{unit} / {goal}{unit}</span>
                </div>
                <Progress value={percentage} className="h-2" />
            </div>
        </PopoverTrigger>
        <PopoverContent className="w-80">
            <div className="space-y-4">
                <div className="flex items-start">
                    {info.icon}
                    <div className="flex-1">
                        <h4 className="font-semibold">{label}</h4>
                        <p className="text-xs text-muted-foreground">{t(info.analysisKey as any)}</p>
                    </div>
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
        // localStorage.removeItem('micronutrientTrialEnd');
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
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            <MicroBar label={t('fiber')} unit="g" consumed={totals.fiber} goal={micronutrientGoals.fiber} nutrient="fiber" />
            <MicroBar label={t('iron')} unit="mg" consumed={totals.iron} goal={micronutrientGoals.iron} nutrient="iron" />
            <MicroBar label={t('calcium')} unit="mg" consumed={totals.calcium} goal={micronutrientGoals.calcium} nutrient="calcium" />
            <MicroBar label="Vitamin C" unit="mg" consumed={totals.vitaminC} goal={micronutrientGoals.vitaminC} nutrient="vitaminC" />
        </div>
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
