import type { Food, UserData } from '@/lib/types';

export const foodDatabase: Food[] = [
  { id: 'f1', name: 'Dada Ayam', calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: '100g', nutrients: { vitaminC: 0, iron: 1.3, calcium: 15, saturatedFat: 1, unsaturatedFat: 2.1 } },
  { id: 'f2', name: 'Nasi Merah', calories: 111, protein: 2.6, carbs: 23, fat: 0.9, servingSize: '100g matang', nutrients: { vitaminC: 0, iron: 0.5, calcium: 10, saturatedFat: 0.2, unsaturatedFat: 0.6 } },
  { id: 'f3', name: 'Brokoli', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, servingSize: '1 cup', nutrients: { vitaminC: 135, iron: 1, calcium: 62, fiber: 5.1, saturatedFat: 0.1, unsaturatedFat: 0.4 } },
  { id: 'f4', name: 'Salmon', calories: 206, protein: 22, carbs: 0, fat: 12, servingSize: '100g', nutrients: { vitaminD: 526, iron: 0.4, calcium: 12, saturatedFat: 2.5, unsaturatedFat: 8.5 } },
  { id: 'f5', name: 'Apel', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, servingSize: '1 medium', nutrients: { vitaminC: 14, iron: 0.2, calcium: 10, fiber: 4.4, saturatedFat: 0, unsaturatedFat: 0.1 } },
  { id: 'f6', name: 'Almond', calories: 164, protein: 6, carbs: 6, fat: 14, servingSize: '1/4 cup', nutrients: { vitaminC: 0, iron: 1.1, calcium: 76, fiber: 3.5, saturatedFat: 1.1, unsaturatedFat: 12.4 } },
  { id: 'f7', name: 'Oat', calories: 150, protein: 5, carbs: 27, fat: 2.5, servingSize: '1/2 cup kering', nutrients: { vitaminC: 0, iron: 2, calcium: 20, fiber: 4, saturatedFat: 0.5, unsaturatedFat: 1.8 } },
  { id: 'f8', name: 'Telur', calories: 78, protein: 6, carbs: 0.6, fat: 5, servingSize: '1 besar', nutrients: { vitaminD: 41, iron: 0.6, calcium: 28, saturatedFat: 1.6, unsaturatedFat: 3 } },
  { id: 'f9', name: 'Yogurt Yunani', calories: 100, protein: 17, carbs: 6, fat: 0.7, servingSize: '170g', nutrients: { vitaminC: 0, iron: 0, calcium: 187, saturatedFat: 0.5, unsaturatedFat: 0.2 } },
  { id: 'f10', name: 'Bayam', calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1, servingSize: '1 cup', nutrients: { vitaminC: 28, iron: 0.8, calcium: 30, saturatedFat: 0, unsaturatedFat: 0 } },
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
