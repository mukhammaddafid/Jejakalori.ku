'use server';

import { generateDailySummaryAndSuggestions } from '@/ai/flows/generate-daily-summary-and-suggestions';
import type { DailyLog, UserData } from '@/lib/types';

function formatFoodIntake(log: DailyLog): string {
  let intake = '';
  if (log.breakfast.length > 0) {
    intake += 'Breakfast: ' + log.breakfast.map(item => `${item.servings} serving(s) of ${item.food.name}`).join(', ') + '. ';
  }
  if (log.lunch.length > 0) {
    intake += 'Lunch: ' + log.lunch.map(item => `${item.servings} serving(s) of ${item.food.name}`).join(', ') + '. ';
  }
  if (log.dinner.length > 0) {
    intake += 'Dinner: ' + log.dinner.map(item => `${item.servings} serving(s) of ${item.food.name}`).join(', ') + '. ';
  }
  if (log.snacks.length > 0) {
    intake += 'Snacks: ' + log.snacks.map(item => `${item.servings} serving(s) of ${item.food.name}`).join(', ') + '. ';
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
