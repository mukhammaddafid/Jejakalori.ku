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
import { Dumbbell, BrainCircuit, Zap, Flame, BarChart, Activity, Heart, Scale, Clock, AreaChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MicronutrientTracker } from '@/components/dashboard/micronutrient-tracker';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/lib/language-provider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer, Legend } from 'recharts';

// Helper function to calculate totals
function calculateTotals(log: DailyLog): NutrientTotals {
  const totals: NutrientTotals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    saturatedFat: 0,
    unsaturatedFat: 0,
    animalProtein: 0,
    plantProtein: 0,
    starch: 0,
    sugar: 0,
    fiber: 0,
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
    totals.animalProtein += (item.food.nutrients.animalProtein || 0) * item.servings;
    totals.plantProtein += (item.food.nutrients.plantProtein || 0) * item.servings;
    totals.starch += (item.food.nutrients.starch || 0) * item.servings;
    totals.sugar += (item.food.nutrients.sugar || 0) * item.servings;
    totals.fiber += (item.food.nutrients.fiber || 0) * item.servings;
  });

  return totals;
}

const workoutOptions = {
    "Strength Training": Array.from({ length: 40 }, (_, i) => `Strength workout #${i + 1}`),
    "Cardio": Array.from({ length: 40 }, (_, i) => `Cardio workout #${i + 1}`),
    "Flexibility & Mobility": Array.from({ length: 40 }, (_, i) => `Flexibility workout #${i + 1}`),
};

const habitAnalysisOptions = {
    "Meal Composition": Array-from({ length: 25 }, (_, i) => `Composition analysis #${i + 1}`),
    "Timing & Frequency": Array.from({ length: 25 }, (_, i) => `Timing analysis #${i + 1}`),
    "Nutrient Quality": Array.from({ length: 20 }, (_, i) => `Nutrient analysis #${i + 1}`),
};

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
            {React.cloneElement(children as React.ReactElement, { trialTimeRemaining: getTimeRemaining(), isTrialActive: isTrialActive && !isTrialEnded })}
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

const AnalysisPlanVisualizer = () => {
    const analysisData = [
        { name: 'Composition', duration: 7, start: 0, fill: 'hsl(var(--chart-1))' },
        { name: 'Timing', duration: 10, start: 7, fill: 'hsl(var(--chart-2))' },
        { name: 'Nutrient', duration: 4, start: 17, fill: 'hsl(var(--chart-3))' },
    ];

    return (
        <div className="p-4 border-t h-48">
            <h4 className="text-center font-semibold mb-2">21-Day Analysis Schedule</h4>
             <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart layout="vertical" data={analysisData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 21]} label={{ value: 'Days', position: 'insideBottom', offset: -5 }} />
                    <YAxis type="category" dataKey="name" width={80} />
                    <Tooltip content={CustomTooltip} />
                    <Bar dataKey="duration" stackId="a" background={{ fill: '#eee' }}>
                         {analysisData.map((entry, index) => (
                            <div key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Bar>
                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-2 bg-background border rounded-md shadow-lg">
        <p className="font-bold">{`${label} Analysis`}</p>
        <p className="text-sm">{`Duration: ${data.duration} days`}</p>
        <p className="text-sm">{`Scheduled: Day ${data.start + 1} to Day ${data.start + data.duration}`}</p>
      </div>
    );
  }
  return null;
};


const WorkoutPlanVisualizer = () => {
    const workoutData = [
        { name: 'Strength', energy: 350, fill: 'hsl(var(--chart-1))' },
        { name: 'Cardio', energy: 500, fill: 'hsl(var(--chart-2))' },
        { name: 'Flexibility', energy: 150, fill: 'hsl(var(--chart-3))' },
    ];
    return (
        <div className="p-4 border-t space-y-4">
            <h4 className="text-center font-semibold">Workout Plan & Energy Analysis</h4>
            <div>
                <h5 className="font-semibold mb-2">Selected Activities:</h5>
                <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                    <li>Strength workout #1, #5, #12</li>
                    <li>Cardio workout #2, #8</li>
                    <li>Flexibility workout #3</li>
                </ul>
            </div>
             <div className="h-48">
                 <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={workoutData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Energy (kcal)', angle: -90, position: 'insideLeft' }}/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="energy" name="Energy Release" >
                            {workoutData.map((entry, index) => (
                                <div key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </RechartsBarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const AnalysisFeature: React.FC<{ 
    title: string; 
    buttonText: string;
    visualization: 'calendar' | 'analysis' | 'workout';
    calendarDays?: number; 
    children: React.ReactNode, 
    trialTimeRemaining?: string, 
    isTrialActive?: boolean 
}> = ({ title, buttonText, visualization, calendarDays, children, trialTimeRemaining, isTrialActive }) => {
    const [showVisualization, setShowVisualization] = React.useState(false);
    const { t } = useLanguage();

    const renderVisualization = () => {
        switch (visualization) {
            case 'analysis':
                return <AnalysisPlanVisualizer />;
            case 'workout':
                return <WorkoutPlanVisualizer />;
            default:
                return null;
        }
    }
  
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <span className="font-semibold">{title}</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {isTrialActive && (
                <div className="rounded-lg bg-primary/10 p-3 text-center text-sm text-primary-foreground">
                    <p className="font-semibold text-primary">{t('premiumTrialActive')}</p>
                    <p className="text-primary/80">{trialTimeRemaining}</p>
                </div>
            )}
            {children}
            <Button className="w-full" onClick={() => setShowVisualization(!showVisualization)}>
              {showVisualization ? t('hideCalendar') : buttonText}
            </Button>
            {showVisualization && renderVisualization()}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
};

const WorkoutSelector = () => {
    const categoryIcons: { [key: string]: React.ReactNode } = {
        "Strength Training": <Scale className="h-5 w-5" />,
        "Cardio": <Heart className="h-5 w-5" />,
        "Flexibility & Mobility": <Activity className="h-5 w-5" />,
    };

    return (
        <Accordion type="multiple" className="w-full">
            {Object.entries(workoutOptions).map(([category, options]) => (
                <AccordionItem value={category} key={category}>
                    <AccordionTrigger>
                        <div className="flex items-center gap-2 font-semibold">
                            {categoryIcons[category]}
                            {category}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <ScrollArea className="h-40">
                            <div className="space-y-2 pr-4">
                                {options.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <Checkbox id={`${category}-${index}`} />
                                        <Label htmlFor={`${category}-${index}`} className="font-normal">{option}</Label>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

const HabitAnalysisSelector = () => {
    const categoryIcons: { [key: string]: React.ReactNode } = {
        "Meal Composition": <Flame className="h-5 w-5" />,
        "Timing & Frequency": <Clock className="h-5 w-5" />,
        "Nutrient Quality": <BarChart className="h-5 w-5" />,
    };
    const categorySubtitles: { [key: string]: string } = {
        "Meal Composition": "Analyze the balance of macros and food groups in your meals.",
        "Timing & Frequency": "Discover patterns in when and how often you eat.",
        "Nutrient Quality": "Assess the density of vitamins and minerals in your diet.",
    };
    return (
        <Accordion type="multiple" className="w-full">
            {Object.entries(habitAnalysisOptions).map(([category, options]) => (
                <AccordionItem value={category} key={category}>
                    <AccordionTrigger>
                        <div className="flex flex-col items-start text-left">
                            <div className="flex items-center gap-2 font-semibold">
                                {categoryIcons[category]}
                                {category}
                            </div>
                            <p className="text-sm font-normal text-muted-foreground ml-7">{categorySubtitles[category]}</p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <ScrollArea className="h-40">
                            <div className="space-y-2 pr-4">
                                {options.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <Checkbox id={`habit-${category}-${index}`} />
                                        <Label htmlFor={`habit-${category}-${index}`} className="font-normal">{option}</Label>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </AccordionContent>
                </AccordionItem>
            ))}
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
            <AnalysisFeature title={t('selectAnalysisType')} buttonText="Visualize Plan" visualization="analysis">
                <HabitAnalysisSelector />
            </AnalysisFeature>
           </PremiumFeatureWithTrial>
           <PremiumFeatureWithTrial
            icon={<Dumbbell />}
            title={t('massWorkoutPlan')}
            description={t('massWorkoutPlanDescription')}
            trialDays={5}
            storageKey="workoutPlanTrialEnd"
           >
            <AnalysisFeature title={t('selectWorkoutGoal')} buttonText="Generate Plan & Analysis" visualization="workout">
                <WorkoutSelector />
            </AnalysisFeature>
           </PremiumFeatureWithTrial>
        </div>
      </div>
    </div>
  );
}

    