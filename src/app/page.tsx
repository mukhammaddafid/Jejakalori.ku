
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
import { ShieldCheck, Dumbbell, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MicronutrientTracker } from '@/components/dashboard/micronutrient-tracker';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calendar } from '@/components/ui/calendar';
import { addDays } from 'date-fns';

// Helper function to calculate totals on the server
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

export default function DashboardPage() {
  const userData = mockUserData;
  const totals = calculateTotals(userData.log);
  const [isClient, setIsClient] = React.useState(false);

  const [habitAnalysisRange, setHabitAnalysisRange] = React.useState<Date | undefined>(undefined);
  const [workoutPlanRange, setWorkoutPlanRange] = React.useState<Date | undefined>(undefined);

  const handleStartHabitAnalysis = () => {
    setHabitAnalysisRange(new Date());
  };

  const handleCreateWorkoutPlan = () => {
    setWorkoutPlanRange(new Date());
  };

  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
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
          {isClient && <MicronutrientTracker log={userData.log} />}
          <Card>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-6">
                    <div className="flex items-center gap-2">
                        <BrainCircuit />
                        <span className="font-semibold">Analisis Kebiasaan</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 space-y-4">
                    <p className="text-sm text-muted-foreground">AI akan menganalisis pola makan Anda dan memberikan wawasan mendalam.</p>
                     <RadioGroup defaultValue="pola-makan">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="pola-makan" id="pola-makan" />
                            <Label htmlFor="pola-makan">Analisis Pola Makan</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="waktu-makan" id="waktu-makan" />
                            <Label htmlFor="waktu-makan">Analisis Waktu Makan</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="asupan-nutrisi" id="asupan-nutrisi" />
                            <Label htmlFor="asupan-nutrisi">Analisis Asupan Nutrisi</Label>
                        </div>
                    </RadioGroup>

                    {habitAnalysisRange ? (
                      <Calendar
                        mode="range"
                        selected={{ from: habitAnalysisRange, to: addDays(habitAnalysisRange, 20) }}
                        numberOfMonths={1}
                        className="rounded-md border justify-center flex"
                      />
                    ) : (
                      <Button onClick={handleStartHabitAnalysis} className="w-full">Mulai Analisis</Button>
                    )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="px-6">
                    <div className="flex items-center gap-2">
                        <Dumbbell />
                        <span className="font-semibold">Rencana Latihan Massa</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 space-y-4">
                    <p className="text-sm text-muted-foreground mb-4">Rencana latihan yang dipersonalisasi oleh AI untuk melengkapi diet Anda.</p>
                    <RadioGroup defaultValue="weight-loss">
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weight-loss" id="weight-loss" />
                        <Label htmlFor="weight-loss">Penurunan Berat Badan</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="muscle-gain" id="muscle-gain" />
                        <Label htmlFor="muscle-gain">Peningkatan Massa Otot</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="stamina" id="stamina" />
                        <Label htmlFor="stamina">Peningkatan Stamina</Label>
                        </div>
                    </RadioGroup>
                    
                    {workoutPlanRange ? (
                      <Calendar
                        mode="range"
                        selected={{ from: workoutPlanRange, to: addDays(workoutPlanRange, 29) }}
                        numberOfMonths={1}
                        className="rounded-md border justify-center flex"
                      />
                    ) : (
                      <Button onClick={handleCreateWorkoutPlan} className="w-full">Buat Rencana Latihan</Button>
                    )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
      </div>
    </div>
  );
}

