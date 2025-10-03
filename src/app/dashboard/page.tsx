'use client';

import * as React from 'react';
import { mockUserData } from '@/lib/data';
import type { DailyLog, NutrientTotals } from '@/lib/types';
import { CalorieSummary } from '@/components/dashboard/calorie-summary';
import { MacroSummary } from '@/components/dashboard/macro-summary';
import { FoodLog } from '@/components/dashboard/food-log';
import { WeeklyTrends } from '@/components/dashboard/weekly-trends';
import { AiSummaryCard } from '@/components/dashboard/ai-summary-card';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Dumbbell, BrainCircuit, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MicronutrientTracker } from '@/components/dashboard/micronutrient-tracker';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calendar } from '@/components/ui/calendar';
import { addDays } from 'date-fns';
import { useLanguage } from '@/lib/language-provider';

// Helper function to calculate totals
function calculateTotals(log: DailyLog): NutrientTotals {
  const totals: NutrientTotals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    saturatedFat: 0,
    unsaturatedFat: 0,
  };

  const allMeals = [
    ...log.breakfast,
    ...log.lunch,
    ...log.dinner,
    ...log.snacks,
  ];

  allMeals.forEach(item => {
    totals.calories += (item.food.calories || 0) * item.servings;
    totals.protein += (item.food.protein || 0) * item.servings;
    totals.carbs += (item.food.carbs || 0) * item.servings;
    totals.fat += (item.food.fat || 0) * item.servings;
    totals.saturatedFat += (item.food.nutrients.saturatedFat || 0) * item.servings;
    totals.unsaturatedFat += (item.food.nutrients.unsaturatedFat || 0) * item.servings;
  });

  return totals;
}

const PremiumFeatureWithTrial: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  trialDays: number;
  storageKey: string;
  children: React.ReactNode;
}> = ({ icon, title, description, trialDays, storageKey, children }) => {
  const [trialEndDate, setTrialEndDate] = React.useState<Date | null>(null);
  const [isTrialActive, setIsTrialActive] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  const { t } = useLanguage();

  React.useEffect(() => {
    setIsClient(true);
    const storedEndDate = localStorage.getItem(storageKey);
    if (storedEndDate) {
      const endDate = new Date(storedEndDate);
      setTrialEndDate(endDate);
      setIsTrialActive(new Date() < endDate);
    } else {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + trialDays);
        localStorage.setItem(storageKey, endDate.toISOString());
        setTrialEndDate(endDate);
        setIsTrialActive(true);
    }
  }, [storageKey, trialDays]);

  const getTimeRemaining = () => {
    if (!trialEndDate) return '';
    const now = new Date();
    const difference = trialEndDate.getTime() - now.getTime();

    if (difference <= 0) return t('trialEnded');

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days} ${t('days')} ${hours} ${t('hours')} ${t('remaining')}`;
  };

  if (!isClient) {
    return null;
  }

  const isTrialEnded = trialEndDate && new Date() > trialEndDate;
  const isFeatureLocked = !isTrialActive && isTrialEnded;

  return (
    <Card className="relative overflow-hidden">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">{icon} {title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {isTrialActive && !isTrialEnded && (
                <div className="rounded-lg bg-primary/10 p-3 text-center text-sm text-primary-foreground">
                    <p className="font-semibold text-primary">{t('premiumTrialActive')}</p>
                    <p className="text-primary/80">{getTimeRemaining()}</p>
                </div>
            )}
            {children}
        </CardContent>
        {isFeatureLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <div className="text-center p-4">
                    <Zap className="mx-auto h-12 w-12 text-primary" />
                    <h3 className="mt-2 text-lg font-semibold">{t('unlock')} {title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {t('trialEndedDescription')}
                    </p>
                    <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">{t('upgradeToPremium')}</Button>
                </div>
            </div>
        )}
    </Card>
  );
};

const AnalysisCalendar: React.FC<{ days: number }> = ({ days }) => {
    const today = new Date();
    const futureDate = addDays(today, days);
    const { t } = useLanguage();
  
    return (
      <div className="p-4 border-t">
        <h4 className="text-center font-semibold mb-2">{t('yourScheduleForNext', { days })}</h4>
        <Calendar
          mode="range"
          selected={{ from: today, to: futureDate }}
          numberOfMonths={1}
          disabled
          className="flex justify-center"
        />
      </div>
    );
};
  
const AnalysisFeature: React.FC<{ title: string; buttonText: string; children: React.ReactNode, calendarDays: number }> = ({ title, buttonText, children, calendarDays }) => {
    const [showCalendar, setShowCalendar] = React.useState(false);
    const { t } = useLanguage();
  
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <span className="font-semibold">{title}</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {children}
            <Button className="w-full" onClick={() => setShowCalendar(!showCalendar)}>
              {showCalendar ? t('hideCalendar') : buttonText}
            </Button>
            {showCalendar && <AnalysisCalendar days={calendarDays} />}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
};

export default function DashboardPage() {
  const userData = mockUserData;
  const totals = calculateTotals(userData.log);
  const [isClient, setIsClient] = React.useState(false);
  const { t } = useLanguage();

  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
      return null;
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-1 flex">
              <CalorieSummary consumed={totals.calories} goal={userData.goals.calories} />
            </div>
            <div className="sm:col-span-2 flex">
              <MacroSummary totals={totals} goals={userData.goals} />
            </div>
          </div>
          <FoodLog initialLog={userData.log} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          <AiSummaryCard userData={userData} />
          <WeeklyTrends />
          <MicronutrientTracker log={userData.log} />
           <PremiumFeatureWithTrial
            icon={<BrainCircuit />}
            title={t('habitAnalysis')}
            description={t('habitAnalysisDescription')}
            trialDays={3}
            storageKey="habitAnalysisTrialEnd"
           >
            <AnalysisFeature title={t('selectAnalysisType')} buttonText={t('startAnalysis')} calendarDays={21}>
                <RadioGroup defaultValue="eating-pattern">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="eating-pattern" id="eating-pattern" />
                        <Label htmlFor="eating-pattern">{t('eatingPatternAnalysis')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="meal-timing" id="meal-timing" />
                        <Label htmlFor="meal-timing">{t('mealTimingAnalysis')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nutrient-intake" id="nutrient-intake" />
                        <Label htmlFor="nutrient-intake">{t('nutrientIntakeAnalysis')}</Label>
                    </div>
                </RadioGroup>
            </AnalysisFeature>
           </PremiumFeatureWithTrial>
           <PremiumFeatureWithTrial
            icon={<Dumbbell />}
            title={t('massWorkoutPlan')}
            description={t('massWorkoutPlanDescription')}
            trialDays={5}
            storageKey="workoutPlanTrialEnd"
           >
            <AnalysisFeature title={t('selectWorkoutGoal')} buttonText={t('createWorkoutPlan')} calendarDays={30}>
                <RadioGroup defaultValue="weight-loss">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weight-loss" id="weight-loss" />
                        <Label htmlFor="weight-loss">{t('weightLoss')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="muscle-gain" id="muscle-gain" />
                        <Label htmlFor="muscle-gain">{t('muscleGain')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="stamina" id="stamina" />
                        <Label htmlFor="stamina">{t('staminaImprovement')}</Label>
                    </div>
                </RadioGroup>
            </AnalysisFeature>
           </PremiumFeatureWithTrial>
        </div>
      </div>
    </div>
  );
}
