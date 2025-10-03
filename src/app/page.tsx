
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

function PremiumFeatureCard({ icon, title, description, children }: { icon: React.ReactNode, title: string, description: string, children: React.ReactNode }) {
  return (
    <Card className="relative overflow-hidden">
       <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">{icon} {title}</CardTitle>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <ShieldCheck className="h-4 w-4" />
                <span>Premium</span>
            </div>
        </div>
         <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}


export default function DashboardPage() {
  const userData = mockUserData;
  const totals = calculateTotals(userData.log);
  const [isClient, setIsClient] = React.useState(false);

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
          <PremiumFeatureCard 
            icon={<Dumbbell/>}
            title="Rencana Latihan AI"
            description="Rencana latihan yang dipersonalisasi oleh AI untuk melengkapi diet Anda."
          >
            <div className="text-center p-4 text-muted-foreground">
                <p>Fitur ini sedang dalam pengembangan.</p>
            </div>
          </PremiumFeatureCard>
          <PremiumFeatureCard 
            icon={<BrainCircuit />}
            title="Analisis Kebiasaan"
            description="AI akan menganalisis pola makan Anda dan memberikan wawasan mendalam."
          >
             <div className="text-center p-4 text-muted-foreground">
                <p>Fitur ini sedang dalam pengembangan.</p>
            </div>
          </PremiumFeatureCard>
        </div>
      </div>
    </div>
  );
}
