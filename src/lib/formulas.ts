import type { UserProfile } from '@/lib/types';

const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very: 1.9,
};

export function calculateTDEE(profile: Omit<UserProfile, 'name'>): number {
  const { gender, weight, height, age, activityLevel } = profile;

  let bmr: number;
  
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const tdee = bmr * activityMultipliers[activityLevel];
  
  return Math.round(tdee);
}
