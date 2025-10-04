'use server';

import { generateDailySummaryAndSuggestions } from '@/ai/flows/generate-daily-summary-and-suggestions';
import type { DailyLog, UserData } from '@/lib/types';
import { translations } from '@/lib/translations';

function formatFoodIntake(log: DailyLog): string {
  let intake = '';
  const formatItems = (items: any[]) => {
    return items.map(item => {
      // Always use English name for the AI prompt
      const foodName = translations.en[item.food.id as keyof typeof translations.en] || item.food.id;
      return `${item.servings} serving(s) of ${foodName}`;
    }).join(', ');
  }

  if (log.breakfast.length > 0) {
    intake += 'Breakfast: ' + formatItems(log.breakfast) + '. ';
  }
  if (log.lunch.length > 0) {
    intake += 'Lunch: ' + formatItems(log.lunch) + '. ';
  }
  if (log.dinner.length > 0) {
    intake += 'Dinner: ' + formatItems(log.dinner) + '. ';
  }
  if (log.snacks.length > 0) {
    intake += 'Snacks: ' + formatItems(log.snacks) + '. ';
  }
  return intake.trim() || 'No food logged for today.';
}

export async function getDailySummaryAction(userData: UserData) {
  try {
    const dailyFoodIntake = formatFoodIntake(userData.log);

    const result = await generateDailySummaryAndSuggestions({
      dailyFoodIntake,
      calorieGoal: userData.goals.calories,
      proteinGoal: userData.goals.protein,
      carbGoal: userData.goals.carbs,
      fatGoal: userData.goals.fat,
      currentWeight: userData.profile.weight,
      activityLevel: userData.profile.activityLevel,
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('Error generating daily summary:', error);
    return {
      success: false,
      error: 'Failed to generate summary. Please try again later.',
    };
  }
}
