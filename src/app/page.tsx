import * as React from 'react';
import { mockUserData } from '@/lib/data';
import type { DailyLog, NutrientTotals } from '@/lib/types';
import { CalorieSummary } from '@/components/dashboard/calorie-summary';
import { MacroSummary } from '@/components/dashboard/macro-summary';
import { FoodLog } from '@/components/dashboard/food-log';
import { WeeklyTrends } from '@/components/dashboard/weekly-trends';
import { MicronutrientTracker } from '@/components/dashboard/micronutrient-tracker';
import { AiSummaryCard } from '@/components/dashboard/ai-summary-card';

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

  const allMeals: MealLog[] = Object.values(log).flat();

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
        </div>
      </div>
    </div>
  );
}
