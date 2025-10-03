'use server';

import { generateDailySummaryAndSuggestions } from '@/ai/flows/generate-daily-summary-and-suggestions';
import type { DailyLog, UserData } from '@/lib/types';

function formatFoodIntake(log: DailyLog): string {
  let intake = '';
  if (log.breakfast.length > 0) {
    intake += 'Sarapan: ' + log.breakfast.map(item => `${item.servings} porsi ${item.food.name}`).join(', ') + '. ';
  }
  if (log.lunch.length > 0) {
    intake += 'Makan siang: ' + log.lunch.map(item => `${item.servings} porsi ${item.food.name}`).join(', ') + '. ';
  }
  if (log.dinner.length > 0) {
    intake += 'Makan malam: ' + log.dinner.map(item => `${item.servings} porsi ${item.food.name}`).join(', ') + '. ';
  }
  if (log.snacks.length > 0) {
    intake += 'Camilan: ' + log.snacks.map(item => `${item.servings} porsi ${item.food.name}`).join(', ') + '. ';
  }
  return intake.trim() || 'Tidak ada makanan yang dicatat untuk hari ini.';
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
      error: 'Gagal membuat ringkasan. Silakan coba lagi nanti.',
    };
  }
}
