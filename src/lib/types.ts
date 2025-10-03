export interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
  nutrients: {
    [key: string]: number;
  };
}

export interface MealLog {
  food: Food;
  servings: number;
}

export interface DailyLog {
  breakfast: MealLog[];
  lunch: MealLog[];
  dinner: MealLog[];
  snacks: MealLog[];
}

export interface Recipe {
  id: string;
  name: string;
  servings: number;
  ingredients: MealLog[];
}

export interface RecipeWithIngredients {
  name: string;
  ingredients: MealLog[];
}

export interface UserGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  saturatedFat: number;
}

export interface UserProfile {
  name: string;
  age: number;
  height: number;
  weight: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very';
}

export interface UserData {
  profile: UserProfile;
  goals: UserGoals;
  log: DailyLog;
  recipes: Recipe[];
}

export interface NutrientTotals {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    saturatedFat: number;
    unsaturatedFat: number;
}
