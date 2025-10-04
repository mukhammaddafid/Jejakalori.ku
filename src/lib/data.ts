import type { Food, UserData, RecipeWithIngredients, TranslationKey } from '@/lib/types';
import type { translations } from './translations';

export const foodDatabase: Food[] = [
  { id: 'f1', name: 'Dada Ayam', calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: '100g', nutrients: { vitaminC: 0, iron: 1.3, calcium: 15, saturatedFat: 1, unsaturatedFat: 2.1, fiber: 0, animalProtein: 31, plantProtein: 0, starch: 0, sugar: 0 } },
  { id: 'f2', name: 'Nasi Merah', calories: 111, protein: 2.6, carbs: 23, fat: 0.9, servingSize: '100g matang', nutrients: { vitaminC: 0, iron: 0.5, calcium: 10, saturatedFat: 0.2, unsaturatedFat: 0.6, fiber: 1.8, animalProtein: 0, plantProtein: 2.6, starch: 21, sugar: 0.2 } },
  { id: 'f3', name: 'Brokoli', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, servingSize: '1 cup', nutrients: { vitaminC: 135, iron: 1, calcium: 62, fiber: 5.1, saturatedFat: 0.1, unsaturatedFat: 0.4, animalProtein: 0, plantProtein: 3.7, starch: 2, sugar: 3 } },
  { id: 'f4', name: 'Salmon', calories: 206, protein: 22, carbs: 0, fat: 12, servingSize: '100g', nutrients: { vitaminD: 526, iron: 0.4, calcium: 12, saturatedFat: 2.5, unsaturatedFat: 8.5, fiber: 0, animalProtein: 22, plantProtein: 0, starch: 0, sugar: 0 } },
  { id: 'f5', name: 'Apel', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, servingSize: '1 medium', nutrients: { vitaminC: 14, iron: 0.2, calcium: 10, fiber: 4.4, saturatedFat: 0, unsaturatedFat: 0.1, animalProtein: 0, plantProtein: 0.5, starch: 0, sugar: 19 } },
  { id: 'f6', name: 'Almond', calories: 164, protein: 6, carbs: 6, fat: 14, servingSize: '1/4 cup', nutrients: { vitaminC: 0, iron: 1.1, calcium: 76, fiber: 3.5, saturatedFat: 1.1, unsaturatedFat: 12.4, animalProtein: 0, plantProtein: 6, starch: 0.5, sugar: 1.5 } },
  { id: 'f7', name: 'Oat', calories: 150, protein: 5, carbs: 27, fat: 2.5, servingSize: '1/2 cup kering', nutrients: { vitaminC: 0, iron: 2, calcium: 20, fiber: 4, saturatedFat: 0.5, unsaturatedFat: 1.8, animalProtein: 0, plantProtein: 5, starch: 20, sugar: 1 } },
  { id: 'f8', name: 'Telur', calories: 78, protein: 6, carbs: 0.6, fat: 5, servingSize: '1 besar', nutrients: { vitaminD: 41, iron: 0.6, calcium: 28, saturatedFat: 1.6, unsaturatedFat: 3, fiber: 0, animalProtein: 6, plantProtein: 0, starch: 0.1, sugar: 0.5 } },
  { id: 'f9', name: 'Yogurt Yunani', calories: 100, protein: 17, carbs: 6, fat: 0.7, servingSize: '170g', nutrients: { vitaminC: 0, iron: 0, calcium: 187, saturatedFat: 0.5, unsaturatedFat: 0.2, fiber: 0, animalProtein: 17, plantProtein: 0, starch: 0, sugar: 6 } },
  { id: 'f10', name: 'Bayam', calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1, servingSize: '1 cup', nutrients: { vitaminC: 28, iron: 0.8, calcium: 30, fiber: 0.7, saturatedFat: 0, unsaturatedFat: 0, animalProtein: 0, plantProtein: 0.9, starch: 0.1, sugar: 0.1 } },
  { id: 'f11', name: 'Daging Sapi', calories: 250, protein: 26, carbs: 0, fat: 15, servingSize: '100g', nutrients: { vitaminC: 0, iron: 2.6, calcium: 18, saturatedFat: 6, unsaturatedFat: 7, fiber: 0, animalProtein: 26, plantProtein: 0, starch: 0, sugar: 0 } },
  { id: 'f12', name: 'Croissant', calories: 231, protein: 4.8, carbs: 26, fat: 12, servingSize: '1 medium', nutrients: { vitaminC: 0, iron: 1.5, calcium: 28, saturatedFat: 7, unsaturatedFat: 4, fiber: 1.5, animalProtein: 0, plantProtein: 4.8, starch: 20, sugar: 5 } },
  { id: 'f13', name: 'Kue Kering', calories: 50, protein: 0.5, carbs: 6, fat: 2.5, servingSize: '1 buah', nutrients: { vitaminC: 0, iron: 0.3, calcium: 3, saturatedFat: 1, unsaturatedFat: 1.3, fiber: 0.2, animalProtein: 0, plantProtein: 0.5, starch: 3, sugar: 3 } },
  { id: 'f14', name: 'Soda', calories: 140, protein: 0, carbs: 39, fat: 0, servingSize: '1 kaleng (355ml)', nutrients: { vitaminC: 0, iron: 0, calcium: 0, saturatedFat: 0, unsaturatedFat: 0, fiber: 0, animalProtein: 0, plantProtein: 0, starch: 0, sugar: 39 } },
  { id: 'f15', name: 'Permen', calories: 60, protein: 0, carbs: 15, fat: 0, servingSize: '15g', nutrients: { vitaminC: 0, iron: 0, calcium: 0, saturatedFat: 0, unsaturatedFat: 0, fiber: 0, animalProtein: 0, plantProtein: 0, starch: 0, sugar: 15 } },
  { id: 'f16', name: 'Kopi', calories: 2, protein: 0, carbs: 0, fat: 0, servingSize: '1 cangkir', nutrients: { vitaminC: 0, iron: 0, calcium: 0, saturatedFat: 0, unsaturatedFat: 0, fiber: 0, animalProtein: 0, plantProtein: 0, starch: 0, sugar: 0 } },
  { id: 'f17', name: 'Pizza', calories: 285, protein: 12, carbs: 36, fat: 10, servingSize: '1 potong', nutrients: { vitaminC: 2, iron: 2.5, calcium: 200, saturatedFat: 4.5, unsaturatedFat: 4.5, fiber: 2.5, animalProtein: 6, plantProtein: 6, starch: 25, sugar: 5 } },
  { id: 'f18', name: 'Wedang Jahe', calories: 80, protein: 0.5, carbs: 20, fat: 0.1, servingSize: '1 gelas (240ml)', nutrients: { vitaminC: 2, iron: 0.3, calcium: 20, saturatedFat: 0, unsaturatedFat: 0, fiber: 0.5, animalProtein: 0, plantProtein: 0.5, starch: 0, sugar: 18 } },
  { id: 'f19', name: 'Sandwich', calories: 350, protein: 15, carbs: 40, fat: 15, servingSize: '1 buah', nutrients: { vitaminC: 5, iron: 3, calcium: 150, saturatedFat: 5, unsaturatedFat: 8, fiber: 4, animalProtein: 10, plantProtein: 5, starch: 30, sugar: 6 } },
  { id: 'f20', name: 'Es Kelapa Muda', calories: 70, protein: 1, carbs: 15, fat: 1, servingSize: '1 gelas (240ml)', nutrients: { vitaminC: 5, iron: 0.5, calcium: 25, saturatedFat: 0.8, unsaturatedFat: 0.1, fiber: 1, animalProtein: 0, plantProtein: 1, starch: 0, sugar: 12 } },
  { id: 'f21', name: 'Sup', calories: 100, protein: 5, carbs: 10, fat: 4, servingSize: '1 mangkuk', nutrients: { vitaminC: 10, iron: 1, calcium: 30, saturatedFat: 1, unsaturatedFat: 2.5, fiber: 2, animalProtein: 3, plantProtein: 2, starch: 5, sugar: 3 } },
  { id: 'f22', name: 'Popcorn', calories: 100, protein: 3, carbs: 20, fat: 1, servingSize: '3 cangkir', nutrients: { vitaminC: 0, iron: 1, calcium: 10, saturatedFat: 0.2, unsaturatedFat: 0.7, fiber: 3.5, animalProtein: 0, plantProtein: 3, starch: 15, sugar: 0.1 } },
  { id: 'f23', name: 'Donat', calories: 250, protein: 4, carbs: 30, fat: 14, servingSize: '1 buah', nutrients: { vitaminC: 0, iron: 1.5, calcium: 20, saturatedFat: 6, unsaturatedFat: 7, fiber: 1, animalProtein: 0, plantProtein: 4, starch: 15, sugar: 15 } },
  { id: 'f24', name: 'Burger', calories: 400, protein: 20, carbs: 30, fat: 20, servingSize: '1 buah', nutrients: { vitaminC: 2, iron: 3, calcium: 100, saturatedFat: 8, unsaturatedFat: 10, fiber: 2, animalProtein: 18, plantProtein: 2, starch: 25, sugar: 5 } },
  { id: 'f25', name: 'Kue', calories: 350, protein: 4, carbs: 50, fat: 15, servingSize: '1 potong', nutrients: { vitaminC: 0, iron: 1, calcium: 30, saturatedFat: 8, unsaturatedFat: 6, fiber: 1, animalProtein: 1, plantProtein: 3, starch: 20, sugar: 30 } },
  { id: 'f26', name: 'Es Krim', calories: 200, protein: 4, carbs: 25, fat: 10, servingSize: '1/2 cangkir', nutrients: { vitaminC: 1, iron: 0, calcium: 100, saturatedFat: 6, unsaturatedFat: 3.5, fiber: 0, animalProtein: 4, plantProtein: 0, starch: 0, sugar: 24 } },
  { id: 'f27', name: 'Ceri', calories: 50, protein: 1, carbs: 12, fat: 0.3, servingSize: '1 cangkir', nutrients: { vitaminC: 10, iron: 0.3, calcium: 16, saturatedFat: 0.1, unsaturatedFat: 0.1, fiber: 1.5, animalProtein: 0, plantProtein: 1, starch: 0, sugar: 10 } },
  { id: 'f28', name: 'Alpukat', calories: 240, protein: 3, carbs: 12, fat: 22, servingSize: '1 buah', nutrients: { vitaminC: 17, iron: 1, calcium: 18, saturatedFat: 3, unsaturatedFat: 18, fiber: 10, animalProtein: 0, plantProtein: 3, starch: 0, sugar: 1 } },
  { id: 'f29', name: 'Jamur', calories: 22, protein: 3, carbs: 3, fat: 0.3, servingSize: '100g', nutrients: { vitaminC: 2, iron: 0.5, calcium: 3, saturatedFat: 0.1, unsaturatedFat: 0.1, fiber: 1, animalProtein: 0, plantProtein: 3, starch: 1, sugar: 2 } },
  { id: 'f30', name: 'Roti', calories: 80, protein: 3, carbs: 15, fat: 1, servingSize: '1 lembar', nutrients: { vitaminC: 0, iron: 1, calcium: 30, saturatedFat: 0.2, unsaturatedFat: 0.7, fiber: 1, animalProtein: 0, plantProtein: 3, starch: 12, sugar: 2 } },
  { id: 'f31', name: 'Keju', calories: 113, protein: 7, carbs: 1, fat: 9, servingSize: '30g', nutrients: { vitaminC: 0, iron: 0.2, calcium: 200, saturatedFat: 6, unsaturatedFat: 2.5, fiber: 0, animalProtein: 7, plantProtein: 0, starch: 0, sugar: 0.5 } },
  { id: 'f32', name: 'Udang', calories: 85, protein: 20, carbs: 0, fat: 0.5, servingSize: '100g', nutrients: { vitaminC: 0, iron: 0.5, calcium: 64, saturatedFat: 0.1, unsaturatedFat: 0.2, fiber: 0, animalProtein: 20, plantProtein: 0, starch: 0, sugar: 0 } },
  { id: 'f33', name: 'Brokoli', calories: 34, protein: 3, carbs: 7, fat: 0.4, servingSize: '100g', nutrients: { vitaminC: 89, iron: 0.7, calcium: 47, saturatedFat: 0.1, unsaturatedFat: 0.2, fiber: 2.6, animalProtein: 0, plantProtein: 3, starch: 1, sugar: 3 } },
  { id: 'f34', name: 'Nasi Putih', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, servingSize: '100g', nutrients: { vitaminC: 0, iron: 0.2, calcium: 10, saturatedFat: 0.1, unsaturatedFat: 0.1, fiber: 0.4, animalProtein: 0, plantProtein: 2.7, starch: 27, sugar: 0.1 } },
  { id: 'f35', name: 'Kentang', calories: 77, protein: 2, carbs: 17, fat: 0.1, servingSize: '100g', nutrients: { vitaminC: 20, iron: 0.8, calcium: 12, saturatedFat: 0, unsaturatedFat: 0, fiber: 2.2, animalProtein: 0, plantProtein: 2, starch: 15, sugar: 1 } },
  { id: 'f36', name: 'Jagung', calories: 86, protein: 3.2, carbs: 19, fat: 1.2, servingSize: '100g', nutrients: { vitaminC: 6, iron: 0.5, calcium: 2, saturatedFat: 0.2, unsaturatedFat: 0.8, fiber: 2.7, animalProtein: 0, plantProtein: 3.2, starch: 5, sugar: 3.2 } },
  { id: 'f37', name: 'Tomat', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, servingSize: '100g', nutrients: { vitaminC: 14, iron: 0.3, calcium: 10, saturatedFat: 0, unsaturatedFat: 0.1, fiber: 1.2, animalProtein: 0, plantProtein: 0.9, starch: 0, sugar: 2.6 } },
  { id: 'f38', name: 'Bawang Bombay', calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, servingSize: '100g', nutrients: { vitaminC: 7, iron: 0.2, calcium: 23, saturatedFat: 0, unsaturatedFat: 0, fiber: 1.7, animalProtein: 0, plantProtein: 1.1, starch: 4, sugar: 4.2 } },
  { id: 'f39', name: 'Bawang Putih', calories: 149, protein: 6.4, carbs: 33, fat: 0.5, servingSize: '100g', nutrients: { vitaminC: 31, iron: 1.7, calcium: 181, saturatedFat: 0.1, unsaturatedFat: 0.2, fiber: 2.1, animalProtein: 0, plantProtein: 6.4, starch: 20, sugar: 1 } },
  { id: 'f40', name: 'Timun', calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, servingSize: '100g', nutrients: { vitaminC: 2.8, iron: 0.3, calcium: 16, saturatedFat: 0, unsaturatedFat: 0, fiber: 0.5, animalProtein: 0, plantProtein: 0.7, starch: 1, sugar: 2 } },
  { id: 'f41', name: 'Paprika', calories: 31, protein: 1, carbs: 6, fat: 0.3, servingSize: '100g', nutrients: { vitaminC: 128, iron: 0.4, calcium: 7, saturatedFat: 0.1, unsaturatedFat: 0.1, fiber: 2.1, animalProtein: 0, plantProtein: 1, starch: 1, sugar: 4.2 } },
  { id: 'f42', name: 'Semangka', calories: 30, protein: 0.6, carbs: 7.6, fat: 0.2, servingSize: '100g', nutrients: { vitaminC: 8, iron: 0.2, calcium: 7, saturatedFat: 0, unsaturatedFat: 0.1, fiber: 0.4, animalProtein: 0, plantProtein: 0.6, starch: 0, sugar: 6 } },
  { id: 'f43', name: 'Anggur', calories: 69, protein: 0.7, carbs: 18, fat: 0.2, servingSize: '100g', nutrients: { vitaminC: 3, iron: 0.4, calcium: 10, saturatedFat: 0.1, unsaturatedFat: 0, fiber: 0.9, animalProtein: 0, plantProtein: 0.7, starch: 0, sugar: 15 } },
  { id: 'f44', name: 'Pisang', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, servingSize: '100g', nutrients: { vitaminC: 8.7, iron: 0.3, calcium: 5, saturatedFat: 0.1, unsaturatedFat: 0.1, fiber: 2.6, animalProtein: 0, plantProtein: 1.1, starch: 5, sugar: 12 } },
  { id: 'f45', name: 'Jeruk', calories: 47, protein: 0.9, carbs: 12, fat: 0.1, servingSize: '100g', nutrients: { vitaminC: 53, iron: 0.1, calcium: 40, saturatedFat: 0, unsaturatedFat: 0, fiber: 2.4, animalProtein: 0, plantProtein: 0.9, starch: 0, sugar: 9 } },
  { id: 'f46', name: 'Nanas', calories: 50, protein: 0.5, carbs: 13, fat: 0.1, servingSize: '100g', nutrients: { vitaminC: 48, iron: 0.3, calcium: 13, saturatedFat: 0, unsaturatedFat: 0, fiber: 1.4, animalProtein: 0, plantProtein: 0.5, starch: 0, sugar: 10 } },
  { id: 'f47', name: 'Stroberi', calories: 32, protein: 0.7, carbs: 8, fat: 0.3, servingSize: '100g', nutrients: { vitaminC: 59, iron: 0.4, calcium: 16, saturatedFat: 0, unsaturatedFat: 0.1, fiber: 2, animalProtein: 0, plantProtein: 0.7, starch: 0, sugar: 5 } },
  { id: 'f48', name: 'Blueberry', calories: 57, protein: 0.7, carbs: 14, fat: 0.3, servingSize: '100g', nutrients: { vitaminC: 10, iron: 0.3, calcium: 6, saturatedFat: 0, unsaturatedFat: 0.1, fiber: 2.4, animalProtein: 0, plantProtein: 0.7, starch: 0, sugar: 10 } },
  { id: 'f49', name: 'Lemon', calories: 29, protein: 1.1, carbs: 9, fat: 0.3, servingSize: '100g', nutrients: { vitaminC: 53, iron: 0.6, calcium: 26, saturatedFat: 0, unsaturatedFat: 0.1, fiber: 2.8, animalProtein: 0, plantProtein: 1.1, starch: 3, sugar: 2.5 } },
  { id: 'f50', name: 'Kelapa', calories: 354, protein: 3.3, carbs: 15, fat: 33, servingSize: '100g', nutrients: { vitaminC: 3.3, iron: 2.4, calcium: 14, saturatedFat: 30, unsaturatedFat: 1.5, fiber: 9, animalProtein: 0, plantProtein: 3.3, starch: 0, sugar: 6 } },
  { id: 'f51', name: 'Kiwi', calories: 61, protein: 1.1, carbs: 15, fat: 0.5, servingSize: '100g', nutrients: { vitaminC: 93, iron: 0.3, calcium: 34, saturatedFat: 0, unsaturatedFat: 0.3, fiber: 3, animalProtein: 0, plantProtein: 1.1, starch: 0, sugar: 9 } },
  { id: 'f52', name: 'Mangga', calories: 60, protein: 0.8, carbs: 15, fat: 0.4, servingSize: '100g', nutrients: { vitaminC: 36, iron: 0.2, calcium: 11, saturatedFat: 0.1, unsaturatedFat: 0.2, fiber: 1.6, animalProtein: 0, plantProtein: 0.8, starch: 0, sugar: 14 } },
  { id: 'f53', name: 'Pir', calories: 57, protein: 0.4, carbs: 15, fat: 0.1, servingSize: '100g', nutrients: { vitaminC: 4.3, iron: 0.2, calcium: 9, saturatedFat: 0, unsaturatedFat: 0, fiber: 3.1, animalProtein: 0, plantProtein: 0.4, starch: 0, sugar: 10 } },
  { id: 'f54', name: 'Persik', calories: 39, protein: 0.9, carbs: 10, fat: 0.3, servingSize: '100g', nutrients: { vitaminC: 6.6, iron: 0.3, calcium: 6, saturatedFat: 0, unsaturatedFat: 0.1, fiber: 1.5, animalProtein: 0, plantProtein: 0.9, starch: 0, sugar: 8 } },
  { id: 'f55', name: 'Plum', calories: 46, protein: 0.7, carbs: 11, fat: 0.3, servingSize: '100g', nutrients: { vitaminC: 9.5, iron: 0.2, calcium: 6, saturatedFat: 0, unsaturatedFat: 0.1, fiber: 1.4, animalProtein: 0, plantProtein: 0.7, starch: 0, sugar: 10 } }
];

export const mockUserData: UserData = {
  profile: {
    name: 'Jane Doe',
    age: 30,
    height: 165,
    weight: 60,
    gender: 'female',
    activityLevel: 'light',
  },
  goals: {
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 67,
    saturatedFat: 20,
  },
  log: {
    breakfast: [
      { food: foodDatabase[6], servings: 1 },
      { food: foodDatabase[8], servings: 1 },
    ],
    lunch: [
      { food: foodDatabase[0], servings: 1.5 },
      { food: foodDatabase[1], servings: 1 },
      { food: foodDatabase[2], servings: 1 },
    ],
    dinner: [],
    snacks: [
      { food: foodDatabase[4], servings: 1 },
    ],
  },
  recipes: [
    {
      id: 'r1',
      name: 'Salad Ayam Sederhana',
      servings: 2,
      ingredients: [
        { food: foodDatabase[0], servings: 2 },
        { food: foodDatabase[9], servings: 2 },
      ]
    }
  ],
};

export const micronutrientGoals = {
  vitaminC: 75, // mg
  vitaminD: 600, // IU
  calcium: 1000, // mg
  iron: 18, // mg
  fiber: 25, // g
};

const detailedInternationalMenu: RecipeWithIngredients[] = [
    { name: 'Oatmeal with berries and nuts', ingredients: [{ food: foodDatabase[6], servings: 1 }, { food: foodDatabase[4], servings: 0.5 }, { food: foodDatabase[5], servings: 0.25 }] },
    { name: 'Grilled Chicken Salad', ingredients: [{ food: foodDatabase[0], servings: 1.5 }, { food: foodDatabase[9], servings: 2 }, { food: foodDatabase[3], servings: 0.5 }] },
    { name: 'Salmon with Quinoa and Asparagus', ingredients: [{ food: foodDatabase[3], servings: 1.5 }, { food: foodDatabase[1], servings: 1 }, { food: foodDatabase[2], servings: 0.5 }] },
    { name: 'Scrambled eggs with spinach and whole wheat toast', ingredients: [{ food: foodDatabase[7], servings: 2 }, { food: foodDatabase[9], servings: 1 }, { food: foodDatabase[1], servings: 0.5 }] },
    { name: 'Lentil Soup and a side salad', ingredients: [{ food: foodDatabase[9], servings: 2 }] },
    { name: 'Beef Stir-fry with mixed vegetables', ingredients: [] },
    { name: 'Greek yogurt with granola and honey', ingredients: [{ food: foodDatabase[8], servings: 1 }] },
    { name: 'Turkey and avocado wrap', ingredients: [] },
    { name: 'Pasta with marinara sauce and a side of broccoli', ingredients: [{ food: foodDatabase[2], servings: 1 }] },
    { name: 'Smoothie with protein powder, banana, and almond milk', ingredients: [{ food: foodDatabase[5], servings: 0.5 }] },
    { name: 'Tuna salad sandwich on whole wheat', ingredients: [] },
    { name: 'Baked cod with roasted potatoes and green beans', ingredients: [] },
    { name: 'Cottage cheese with peaches', ingredients: [] },
    { name: 'Leftover beef stir-fry', ingredients: [] },
    { name: 'Chicken and vegetable skewers', ingredients: [{ food: foodDatabase[0], servings: 1 }] },
];

const detailedNusantaraMenu: RecipeWithIngredients[] = [
    { name: 'Bubur ayam tanpa kerupuk', ingredients: [{ food: foodDatabase[0], servings: 1 }] },
    { name: 'Gado-gado dengan sedikit saus kacang', ingredients: [{ food: foodDatabase[7], servings: 1 }, { food: foodDatabase[9], servings: 1 }] },
    { name: 'Pepes ikan dengan nasi merah', ingredients: [{ food: foodDatabase[3], servings: 1.5 }, { food: foodDatabase[1], servings: 1 }] },
    { name: 'Nasi uduk (porsi kecil) dengan telur dadar', ingredients: [{ food: foodDatabase[1], servings: 0.8 }, { food: foodDatabase[7], servings: 1 }] },
    { name: 'Soto ayam bening dengan bihun', ingredients: [{ food: foodDatabase[0], servings: 1.2 }] },
    { name: 'Sayur asem dengan ikan bakar', ingredients: [{ food: foodDatabase[3], servings: 1 }] },
    { name: 'Lontong sayur dengan tahu dan tempe', ingredients: [] },
    { name: 'Urap sayuran dengan dada ayam rebus', ingredients: [{ food: foodDatabase[0], servings: 1 }] },
    { name: 'Tumis kangkung dengan udang', ingredients: [] },
    { name: 'Ketan serundeng', ingredients: [] },
    { name: 'Ikan pindang kuah bening', ingredients: [{ food: foodDatabase[3], servings: 1 }] },
    { name: 'Sate ayam (tanpa lemak) dengan lontong', ingredients: [{ food: foodDatabase[0], servings: 1.5 }] },
    { name: 'Bubur kacang hijau tanpa santan', ingredients: [] },
    { name: 'Leftover sayur asem', ingredients: [] },
    { name: 'Gulai ikan patin (kuah lebih encer)', ingredients: [{ food: foodDatabase[3], servings: 1 }] },
];

const internationalMenu = Array.from({ length: 30 }, (_, i) => {
    const dayIndex = i % 5;
    return {
        breakfast: detailedInternationalMenu[dayIndex * 3].name,
        lunch: detailedInternationalMenu[dayIndex * 3 + 1].name,
        dinner: detailedInternationalMenu[dayIndex * 3 + 2].name,
    };
});

const nusantaraMenu = Array.from({ length: 30 }, (_, i) => {
    const dayIndex = i % 5;
    return {
        breakfast: detailedNusantaraMenu[dayIndex * 3].name,
        lunch: detailedNusantaraMenu[dayIndex * 3 + 1].name,
        dinner: detailedNusantaraMenu[dayIndex * 3 + 2].name,
    };
});


export const mealPlan30Days = {
    en: {
        international: internationalMenu,
        nusantara: nusantaraMenu.map(day => ({
             breakfast: day.breakfast.replace('Bubur ayam tanpa kerupuk', 'Chicken porridge without crackers').replace('Nasi uduk (porsi kecil) dengan telur dadar', 'Small portion of coconut rice with omelette').replace('Lontong sayur dengan tahu dan tempe', 'Rice cake with vegetable stew, tofu, and tempeh').replace('Ketan serundeng', 'Sticky rice with spiced grated coconut').replace('Bubur kacang hijau tanpa santan', 'Mung bean porridge without coconut milk'),
             lunch: day.lunch.replace('Gado-gado dengan sedikit saus kacang', 'Mixed vegetable salad with light peanut sauce').replace('Soto ayam bening dengan bihun', 'Clear chicken soup with rice vermicelli').replace('Urap sayuran dengan dada ayam rebus', 'Mixed vegetables with spiced coconut and boiled chicken breast').replace('Ikan pindang kuah bening', 'Clear-broth spiced fish soup').replace('Leftover sayur asem', 'Leftover tamarind vegetable soup'),
             dinner: day.dinner.replace('Pepes ikan dengan nasi merah', 'Steamed spiced fish with red rice').replace('Sayur asem dengan ikan bakar', 'Tamarind vegetable soup with grilled fish').replace('Tumis kangkung dengan udang', 'Stir-fried water spinach with shrimp').replace('Sate ayam (tanpa lemak) dengan lontong', 'Lean chicken satay with rice cakes').replace('Gulai ikan patin (kuah lebih encer)', 'Patin fish curry (thinner broth)'),
        }))
    },
    id: {
        international: internationalMenu.map(day => ({
            breakfast: day.breakfast.replace('Oatmeal with berries and nuts', 'Oatmeal dengan buah beri dan kacang').replace('Scrambled eggs with spinach and whole wheat toast', 'Telur orak-arik dengan bayam dan roti gandum').replace('Greek yogurt with granola and honey', 'Yogurt Yunani dengan granola dan madu').replace('Smoothie with protein powder, banana, and almond milk', 'Smoothie dengan bubuk protein, pisang, dan susu almond').replace('Cottage cheese with peaches', 'Keju cottage dengan buah persik').replace('Grilled Chicken Salad', 'Salad Ayam Panggang'),
            lunch: day.lunch.replace('Grilled Chicken Salad', 'Salad Ayam Panggang').replace('Lentil Soup and a side salad', 'Sup Lentil dan salad pendamping').replace('Turkey and avocado wrap', 'Wrap kalkun dan alpukat').replace('Tuna salad sandwich on whole wheat', 'Sandwich salad tuna dengan roti gandum').replace('Leftover beef stir-fry', 'Sisa tumis daging sapi'),
            dinner: day.dinner.replace('Salmon with Quinoa and Asparagus', 'Salmon dengan Quinoa dan Asparagus').replace('Beef Stir-fry with mixed vegetables', 'Tumis daging sapi dengan sayuran campur').replace('Pasta with marinara sauce and a side of broccoli', 'Pasta dengan saus marinara dan brokoli').replace('Baked cod with roasted potatoes and green beans', 'Ikan kod panggang dengan kentang panggang dan buncis').replace('Chicken and vegetable skewers', 'Sate ayam dan sayuran'),
        })),
        nusantara: nusantaraMenu
    }
};

export const detailedRecipes = {
    en: [
        ...detailedInternationalMenu,
        ...detailedNusantaraMenu.map(r => ({
            ...r,
            name: mealPlan30Days.en.nusantara.flatMap(d => [d.breakfast, d.lunch, d.dinner]).find(n => n.includes(r.name.substring(0, 10))) || r.name
        }))
    ],
    id: [
        ...detailedNusantaraMenu,
        ...detailedInternationalMenu.map(r => {
            const i18nName = mealPlan30Days.id.international.flatMap(d => [d.breakfast, d.lunch, d.dinner]).find(n => n.includes(r.name.substring(0, 10)));
            return {
                ...r,
                name: i18nName || r.name
            }
        })
    ]
}

export const motivationalQuotes = (t: (key: TranslationKey) => string) => {
    return Array.from({ length: 40 }, (_, i) => t(`quote${i + 1}` as TranslationKey));
};

    
