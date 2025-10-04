import type { Food, UserData, RecipeWithIngredients, TranslationKey } from '@/lib/types';
import type { translations } from './translations';

export const foodDatabase: Food[] = [
  { id: 'f1', calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: '100g', nutrients: { vitaminC: 0, iron: 1.3, calcium: 15, saturatedFat: 1, unsaturatedFat: 2.1, fiber: 0, animalProtein: 31, plantProtein: 0, starch: 0, sugar: 0, vitaminD: 5, potassium: 256, magnesium: 29, vitaminA: 0, vitaminB1: 0.07, vitaminB6: 0.6, vitaminB12: 0.3, vitaminE: 0.2, vitaminK: 0.1 } },
  { id: 'f2', calories: 111, protein: 2.6, carbs: 23, fat: 0.9, servingSize: '100g matang', nutrients: { vitaminC: 0, iron: 0.5, calcium: 10, saturatedFat: 0.2, unsaturatedFat: 0.6, fiber: 1.8, animalProtein: 0, plantProtein: 2.6, starch: 21, sugar: 0.2, vitaminD: 0, potassium: 83, magnesium: 43, vitaminA: 0, vitaminB1: 0.1, vitaminB6: 0.2, vitaminB12: 0, vitaminE: 0.1, vitaminK: 0 } },
  { id: 'f3', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, servingSize: '1 cup', nutrients: { vitaminC: 135, iron: 1, calcium: 62, fiber: 5.1, saturatedFat: 0.1, unsaturatedFat: 0.4, animalProtein: 0, plantProtein: 3.7, starch: 2, sugar: 3, vitaminD: 0, potassium: 320, magnesium: 22, vitaminA: 10191, vitaminB1: 0.1, vitaminB6: 0.2, vitaminB12: 0, vitaminE: 0.8, vitaminK: 13.2 } },
  { id: 'f4', calories: 206, protein: 22, carbs: 0, fat: 12, servingSize: '100g', nutrients: { vitaminD: 526, iron: 0.4, calcium: 12, saturatedFat: 2.5, unsaturatedFat: 8.5, fiber: 0, animalProtein: 22, plantProtein: 0, starch: 0, sugar: 0, potassium: 363, magnesium: 27, vitaminA: 50, vitaminB1: 0.2, vitaminB6: 0.6, vitaminB12: 3, vitaminE: 0.4, vitaminK: 0.1 } },
  { id: 'f5', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, servingSize: '1 medium', nutrients: { vitaminC: 14, iron: 0.2, calcium: 10, fiber: 4.4, saturatedFat: 0, unsaturatedFat: 0.1, animalProtein: 0, plantProtein: 0.5, starch: 0, sugar: 19, vitaminD: 0, potassium: 195, magnesium: 9, vitaminA: 98, vitaminB1: 0.03, vitaminB6: 0.07, vitaminB12: 0, vitaminE: 0.3, vitaminK: 4 } },
  { id: 'f6', calories: 164, protein: 6, carbs: 6, fat: 14, servingSize: '1/4 cup', nutrients: { vitaminC: 0, iron: 1.1, calcium: 76, fiber: 3.5, saturatedFat: 1.1, unsaturatedFat: 12.4, animalProtein: 0, plantProtein: 6, starch: 0.5, sugar: 1.5, vitaminD: 0, potassium: 200, magnesium: 76, vitaminA: 0, vitaminB1: 0.06, vitaminB6: 0.04, vitaminB12: 0, vitaminE: 7.3, vitaminK: 0 } },
  { id: 'f7', calories: 150, protein: 5, carbs: 27, fat: 2.5, servingSize: '1/2 cup kering', nutrients: { vitaminC: 0, iron: 2, calcium: 20, fiber: 4, saturatedFat: 0.5, unsaturatedFat: 1.8, animalProtein: 0, plantProtein: 5, starch: 20, sugar: 1, vitaminD: 0, potassium: 170, magnesium: 60, vitaminA: 0, vitaminB1: 0.3, vitaminB6: 0.1, vitaminB12: 0, vitaminE: 0.2, vitaminK: 0 } },
  { id: 'f8', calories: 78, protein: 6, carbs: 0.6, fat: 5, servingSize: '1 besar', nutrients: { vitaminD: 41, iron: 0.6, calcium: 28, saturatedFat: 1.6, unsaturatedFat: 3, fiber: 0, animalProtein: 6, plantProtein: 0, starch: 0.1, sugar: 0.5, potassium: 69, magnesium: 6, vitaminA: 260, vitaminB1: 0.02, vitaminB6: 0.1, vitaminB12: 0.6, vitaminE: 0.5, vitaminK: 0.3 } },
  { id: 'f9', calories: 100, protein: 17, carbs: 6, fat: 0.7, servingSize: '170g', nutrients: { vitaminC: 0, iron: 0, calcium: 187, saturatedFat: 0.5, unsaturatedFat: 0.2, fiber: 0, animalProtein: 17, plantProtein: 0, starch: 0, sugar: 6, vitaminD: 0, potassium: 250, magnesium: 20, vitaminA: 0, vitaminB1: 0.05, vitaminB6: 0.06, vitaminB12: 0.7, vitaminE: 0, vitaminK: 0 } },
  { id: 'f10', calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1, servingSize: '1 cup', nutrients: { vitaminC: 28, iron: 0.8, calcium: 30, fiber: 0.7, saturatedFat: 0, unsaturatedFat: 0, animalProtein: 0, plantProtein: 0.9, starch: 0.1, sugar: 0.1, vitaminD: 0, potassium: 167, magnesium: 24, vitaminA: 2813, vitaminB1: 0.02, vitaminB6: 0.06, vitaminB12: 0, vitaminE: 0.6, vitaminK: 145 } },
  { id: 'f11', calories: 250, protein: 26, carbs: 0, fat: 15, servingSize: '100g', nutrients: { vitaminC: 0, iron: 2.6, calcium: 18, saturatedFat: 6, unsaturatedFat: 7, fiber: 0, animalProtein: 26, plantProtein: 0, starch: 0, sugar: 0, vitaminD: 7, potassium: 318, magnesium: 21, vitaminA: 0, vitaminB1: 0.05, vitaminB6: 0.4, vitaminB12: 2.6, vitaminE: 0.1, vitaminK: 1.1 } },
  { id: 'f12', calories: 231, protein: 4.8, carbs: 26, fat: 12, servingSize: '1 medium', nutrients: { vitaminC: 0, iron: 1.5, calcium: 28, saturatedFat: 7, unsaturatedFat: 4, fiber: 1.5, animalProtein: 0, plantProtein: 4.8, starch: 20, sugar: 5, vitaminD: 0, potassium: 80, magnesium: 15, vitaminA: 220, vitaminB1: 0.1, vitaminB6: 0.05, vitaminB12: 0.1, vitaminE: 0.4, vitaminK: 0.5 } },
  { id: 'f13', calories: 50, protein: 0.5, carbs: 6, fat: 2.5, servingSize: '1 buah', nutrients: { vitaminC: 0, iron: 0.3, calcium: 3, saturatedFat: 1, unsaturatedFat: 1.3, fiber: 0.2, animalProtein: 0, plantProtein: 0.5, starch: 3, sugar: 3, vitaminD: 0, potassium: 15, magnesium: 3, vitaminA: 10, vitaminB1: 0.01, vitaminB6: 0.01, vitaminB12: 0, vitaminE: 0.1, vitaminK: 0 } },
  { id: 'f14', calories: 140, protein: 0, carbs: 39, fat: 0, servingSize: '1 kaleng (355ml)', nutrients: { vitaminC: 0, iron: 0, calcium: 0, saturatedFat: 0, unsaturatedFat: 0, fiber: 0, animalProtein: 0, plantProtein: 0, starch: 0, sugar: 39, vitaminD: 0, potassium: 0, magnesium: 0, vitaminA: 0, vitaminB1: 0, vitaminB6: 0, vitaminB12: 0, vitaminE: 0, vitaminK: 0 } },
  { id: 'f15', calories: 60, protein: 0, carbs: 15, fat: 0, servingSize: '15g', nutrients: { vitaminC: 0, iron: 0, calcium: 0, saturatedFat: 0, unsaturatedFat: 0, fiber: 0, animalProtein: 0, plantProtein: 0, starch: 0, sugar: 15, vitaminD: 0, potassium: 0, magnesium: 0, vitaminA: 0, vitaminB1: 0, vitaminB6: 0, vitaminB12: 0, vitaminE: 0, vitaminK: 0 } },
  { id: 'f16', calories: 2, protein: 0, carbs: 0, fat: 0, servingSize: '1 cangkir', nutrients: { vitaminC: 0, iron: 0, calcium: 0, saturatedFat: 0, unsaturatedFat: 0, fiber: 0, animalProtein: 0, plantProtein: 0, starch: 0, sugar: 0, vitaminD: 0, potassium: 116, magnesium: 7, vitaminA: 0, vitaminB1: 0, vitaminB6: 0, vitaminB12: 0, vitaminE: 0, vitaminK: 0 } },
  { id: 'f17', calories: 285, protein: 12, carbs: 36, fat: 10, servingSize: '1 potong', nutrients: { vitaminC: 2, iron: 2.5, calcium: 200, saturatedFat: 4.5, unsaturatedFat: 4.5, fiber: 2.5, animalProtein: 6, plantProtein: 6, starch: 25, sugar: 5, vitaminD: 0, potassium: 220, magnesium: 25, vitaminA: 550, vitaminB1: 0.2, vitaminB6: 0.1, vitaminB12: 0.5, vitaminE: 1, vitaminK: 2 } },
  { id: 'f18', calories: 80, protein: 0.5, carbs: 20, fat: 0.1, servingSize: '1 gelas (240ml)', nutrients: { vitaminC: 2, iron: 0.3, calcium: 20, saturatedFat: 0, unsaturatedFat: 0, fiber: 0.5, animalProtein: 0, plantProtein: 0.5, starch: 0, sugar: 18, vitaminD: 0, potassium: 150, magnesium: 10, vitaminA: 0, vitaminB1: 0.01, vitaminB6: 0.02, vitaminB12: 0, vitaminE: 0, vitaminK: 0 } },
  { id: 'f19', calories: 350, protein: 15, carbs: 40, fat: 15, servingSize: '1 buah', nutrients: { vitaminC: 5, iron: 3, calcium: 150, saturatedFat: 5, unsaturatedFat: 8, fiber: 4, animalProtein: 10, plantProtein: 5, starch: 30, sugar: 6, vitaminD: 0, potassium: 300, magnesium: 40, vitaminA: 400, vitaminB1: 0.3, vitaminB6: 0.2, vitaminB12: 0.8, vitaminE: 1.2, vitaminK: 5 } },
  { id: 'f20', calories: 70, protein: 1, carbs: 15, fat: 1, servingSize: '1 gelas (240ml)', nutrients: { vitaminC: 5, iron: 0.5, calcium: 25, saturatedFat: 0.8, unsaturatedFat: 0.1, fiber: 1, animalProtein: 0, plantProtein: 1, starch: 0, sugar: 12, vitaminD: 0, potassium: 400, magnesium: 15, vitaminA: 0, vitaminB1: 0.02, vitaminB6: 0.03, vitaminB12: 0, vitaminE: 0.1, vitaminK: 0 } },
  { id: 'f21', calories: 100, protein: 5, carbs: 10, fat: 4, servingSize: '1 mangkuk', nutrients: { vitaminC: 10, iron: 1, calcium: 30, saturatedFat: 1, unsaturatedFat: 2.5, fiber: 2, animalProtein: 3, plantProtein: 2, starch: 5, sugar: 3, vitaminD: 0, potassium: 250, magnesium: 20, vitaminA: 1000, vitaminB1: 0.1, vitaminB6: 0.15, vitaminB12: 0.2, vitaminE: 0.5, vitaminK: 8 } },
  { id: 'f22', calories: 100, protein: 3, carbs: 20, fat: 1, servingSize: '3 cangkir', nutrients: { vitaminC: 0, iron: 1, calcium: 10, saturatedFat: 0.2, unsaturatedFat: 0.7, fiber: 3.5, animalProtein: 0, plantProtein: 3, starch: 15, sugar: 0.1, vitaminD: 0, potassium: 90, magnesium: 35, vitaminA: 0, vitaminB1: 0.1, vitaminB6: 0.1, vitaminB12: 0, vitaminE: 0.1, vitaminK: 0 } },
  { id: 'f23', calories: 250, protein: 4, carbs: 30, fat: 14, servingSize: '1 buah', nutrients: { vitaminC: 0, iron: 1.5, calcium: 20, saturatedFat: 6, unsaturatedFat: 7, fiber: 1, animalProtein: 0, plantProtein: 4, starch: 15, sugar: 15, vitaminD: 0, potassium: 100, magnesium: 10, vitaminA: 50, vitaminB1: 0.1, vitaminB6: 0.05, vitaminB12: 0, vitaminE: 0.5, vitaminK: 1 } },
  { id: 'f24', calories: 400, protein: 20, carbs: 30, fat: 20, servingSize: '1 buah', nutrients: { vitaminC: 2, iron: 3, calcium: 100, saturatedFat: 8, unsaturatedFat: 10, fiber: 2, animalProtein: 18, plantProtein: 2, starch: 25, sugar: 5, vitaminD: 0, potassium: 400, magnesium: 30, vitaminA: 300, vitaminB1: 0.3, vitaminB6: 0.3, vitaminB12: 1.5, vitaminE: 1, vitaminK: 4 } },
  { id: 'f25', calories: 350, protein: 4, carbs: 50, fat: 15, servingSize: '1 potong', nutrients: { vitaminC: 0, iron: 1, calcium: 30, saturatedFat: 8, unsaturatedFat: 6, fiber: 1, animalProtein: 1, plantProtein: 3, starch: 20, sugar: 30, vitaminD: 0, potassium: 120, magnesium: 15, vitaminA: 200, vitaminB1: 0.1, vitaminB6: 0.05, vitaminB12: 0.1, vitaminE: 0.8, vitaminK: 0.5 } },
  { id: 'f26', calories: 200, protein: 4, carbs: 25, fat: 10, servingSize: '1/2 cangkir', nutrients: { vitaminC: 1, iron: 0, calcium: 100, saturatedFat: 6, unsaturatedFat: 3.5, fiber: 0, animalProtein: 4, plantProtein: 0, starch: 0, sugar: 24, vitaminD: 40, potassium: 150, magnesium: 10, vitaminA: 400, vitaminB1: 0.03, vitaminB6: 0.05, vitaminB12: 0.5, vitaminE: 0.2, vitaminK: 0 } },
  { id: 'f27', calories: 50, protein: 1, carbs: 12, fat: 0.3, servingSize: '1 cangkir', nutrients: { vitaminC: 10, iron: 0.3, calcium: 16, saturatedFat: 0.1, unsaturatedFat: 0.1, fiber: 1.5, animalProtein: 0, plantProtein: 1, starch: 0, sugar: 10, vitaminD: 0, potassium: 173, magnesium: 11, vitaminA: 64, vitaminB1: 0.03, vitaminB6: 0.05, vitaminB12: 0, vitaminE: 0.1, vitaminK: 2.1 } },
  { id: 'f28', calories: 240, protein: 3, carbs: 12, fat: 22, servingSize: '1 buah', nutrients: { vitaminC: 17, iron: 1, calcium: 18, saturatedFat: 3, unsaturatedFat: 18, fiber: 10, animalProtein: 0, plantProtein: 3, starch: 0, sugar: 1, vitaminD: 0, potassium: 728, magnesium: 44, vitaminA: 214, vitaminB1: 0.1, vitaminB6: 0.4, vitaminB12: 0, vitaminE: 3.1, vitaminK: 31.5 } },
  { id: 'f29', calories: 22, protein: 3, carbs: 3, fat: 0.3, servingSize: '100g', nutrients: { vitaminC: 2, iron: 0.5, calcium: 3, saturatedFat: 0.1, unsaturatedFat: 0.1, fiber: 1, animalProtein: 0, plantProtein: 3, starch: 1, sugar: 2, vitaminD: 25, potassium: 318, magnesium: 9, vitaminA: 0, vitaminB1: 0.1, vitaminB6: 0.1, vitaminB12: 0, vitaminE: 0.01, vitaminK: 0 } },
  { id: 'f30', calories: 80, protein: 3, carbs: 15, fat: 1, servingSize: '1 lembar', nutrients: { vitaminC: 0, iron: 1, calcium: 30, saturatedFat: 0.2, unsaturatedFat: 0.7, fiber: 1, animalProtein: 0, plantProtein: 3, starch: 12, sugar: 2, vitaminD: 0, potassium: 40, magnesium: 10, vitaminA: 0, vitaminB1: 0.1, vitaminB6: 0.05, vitaminB12: 0, vitaminE: 0.1, vitaminK: 0.2 } },
  { id: 'f31', calories: 113, protein: 7, carbs: 1, fat: 9, servingSize: '30g', nutrients: { vitaminC: 0, iron: 0.2, calcium: 200, saturatedFat: 6, unsaturatedFat: 2.5, fiber: 0, animalProtein: 7, plantProtein: 0, starch: 0, sugar: 0.5, vitaminD: 11, potassium: 28, magnesium: 8, vitaminA: 330, vitaminB1: 0.01, vitaminB6: 0.02, vitaminB12: 0.2, vitaminE: 0.1, vitaminK: 0.7 } },
  { id: 'f32', calories: 85, protein: 20, carbs: 0, fat: 0.5, servingSize: '100g', nutrients: { vitaminC: 0, iron: 0.5, calcium: 64, saturatedFat: 0.1, unsaturatedFat: 0.2, fiber: 0, animalProtein: 20, plantProtein: 0, starch: 0, sugar: 0, vitaminD: 0, potassium: 220, magnesium: 30, vitaminA: 0, vitaminB1: 0.03, vitaminB6: 0.1, vitaminB12: 1.1, vitaminE: 0.6, vitaminK: 0.1 } },
  { id: 'f33', calories: 34, protein: 3, carbs: 7, fat: 0.4, servingSize: '100g', nutrients: { vitaminC: 89, iron: 0.7, calcium: 47, saturatedFat: 0.1, unsaturatedFat: 0.2, fiber: 2.6, animalProtein: 0, plantProtein: 3, starch: 1, sugar: 3, vitaminD: 0, potassium: 316, magnesium: 21, vitaminA: 623, vitaminB1: 0.07, vitaminB6: 0.17, vitaminB12: 0, vitaminE: 0.8, vitaminK: 101.6 } },
  { id: 'f34', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, servingSize: '100g', nutrients: { vitaminC: 0, iron: 0.2, calcium: 10, saturatedFat: 0.1, unsaturatedFat: 0.1, fiber: 0.4, animalProtein: 0, plantProtein: 2.7, starch: 27, sugar: 0.1, vitaminD: 0, potassium: 115, magnesium: 23, vitaminA: 0, vitaminB1: 0.2, vitaminB6: 0.1, vitaminB12: 0, vitaminE: 0.03, vitaminK: 0 } },
  { id: 'f35', calories: 77, protein: 2, carbs: 17, fat: 0.1, servingSize: '100g', nutrients: { vitaminC: 20, iron: 0.8, calcium: 12, saturatedFat: 0, unsaturatedFat: 0, fiber: 2.2, animalProtein: 0, plantProtein: 2, starch: 15, sugar: 1, vitaminD: 0, potassium: 421, magnesium: 23, vitaminA: 2, vitaminB1: 0.08, vitaminB6: 0.3, vitaminB12: 0, vitaminE: 0.01, vitaminK: 1.9 } },
  { id: 'f36', calories: 86, protein: 3.2, carbs: 19, fat: 1.2, servingSize: '100g', nutrients: { vitaminC: 6, iron: 0.5, calcium: 2, saturatedFat: 0.2, unsaturatedFat: 0.8, fiber: 2.7, animalProtein: 0, plantProtein: 3.2, starch: 5, sugar: 3.2, vitaminD: 0, potassium: 270, magnesium: 37, vitaminA: 187, vitaminB1: 0.15, vitaminB6: 0.1, vitaminB12: 0, vitaminE: 0.1, vitaminK: 0.3 } },
  { id: 'f37', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, servingSize: '100g', nutrients: { vitaminC: 14, iron: 0.3, calcium: 10, saturatedFat: 0, unsaturatedFat: 0.1, fiber: 1.2, animalProtein: 0, plantProtein: 0.9, starch: 0, sugar: 2.6, vitaminD: 0, potassium: 237, magnesium: 11, vitaminA: 833, vitaminB1: 0.04, vitaminB6: 0.08, vitaminB12: 0, vitaminE: 0.5, vitaminK: 7.9 } },
  { id: 'f38', calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, servingSize: '100g', nutrients: { vitaminC: 7, iron: 0.2, calcium: 23, saturatedFat: 0, unsaturatedFat: 0, fiber: 1.7, animalProtein: 0, plantProtein: 1.1, starch: 4, sugar: 4.2, vitaminD: 0, potassium: 146, magnesium: 10, vitaminA: 0, vitaminB1: 0.05, vitaminB6: 0.12, vitaminB12: 0, vitaminE: 0.02, vitaminK: 0.4 } },
  { id: 'f39', calories: 149, protein: 6.4, carbs: 33, fat: 0.5, servingSize: '100g', nutrients: { vitaminC: 31, iron: 1.7, calcium: 181, saturatedFat: 0.1, unsaturatedFat: 0.2, fiber: 2.1, animalProtein: 0, plantProtein: 6.4, starch: 20, sugar: 1, vitaminD: 0, potassium: 401, magnesium: 25, vitaminA: 9, vitaminB1: 0.2, vitaminB6: 1.2, vitaminB12: 0, vitaminE: 0.1, vitaminK: 1.7 } },
  { id: 'f40', calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, servingSize: '100g', nutrients: { vitaminC: 2.8, iron: 0.3, calcium: 16, saturatedFat: 0, unsaturatedFat: 0, fiber: 0.5, animalProtein: 0, plantProtein: 0.7, starch: 1, sugar: 2, vitaminD: 0, potassium: 147, magnesium: 13, vitaminA: 105, vitaminB1: 0.03, vitaminB6: 0.04, vitaminB12: 0, vitaminE: 0.03, vitaminK: 16.4 } },
  { id: 'f41', calories: 31, protein: 1, carbs: 6, fat: 0.3, servingSize: '100g', nutrients: { vitaminC: 128, iron: 0.4, calcium: 7, saturatedFat: 0.1, unsaturatedFat: 0.1, fiber: 2.1, animalProtein: 0, plantProtein: 1, starch: 1, sugar: 4.2, vitaminD: 0, potassium: 211, magnesium: 12, vitaminA: 3131, vitaminB1: 0.05, vitaminB6: 0.3, vitaminB12: 0, vitaminE: 1.6, vitaminK: 7.4 } },
  { id: 'f42', calories: 30, protein: 0.6, carbs: 7.6, fat: 0.2, servingSize: '100g', nutrients: { vitaminC: 8, iron: 0.2, calcium: 7, saturatedFat: 0, unsaturatedFat: 0.1, fiber: 0.4, animalProtein: 0, plantProtein: 0.6, starch: 0, sugar: 6, vitaminD: 0, potassium: 112, magnesium: 10, vitaminA: 569, vitaminB1: 0.03, vitaminB6: 0.05, vitaminB12: 0, vitaminE: 0.05, vitaminK: 0.1 } },
  { id: 'f43', calories: 69, protein: 0.7, carbs: 18, fat: 0.2, servingSize: '100g', nutrients: { vitaminC: 3, iron: 0.4, calcium: 10, saturatedFat: 0.1, unsaturatedFat: 0, fiber: 0.9, animalProtein: 0, plantProtein: 0.7, starch: 0, sugar: 15, vitaminD: 0, potassium: 191, magnesium: 5, vitaminA: 64, vitaminB1: 0.03, vitaminB6: 0.07, vitaminB12: 0, vitaminE: 0.2, vitaminK: 2.2 } },
  { id: 'f44', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, servingSize: '100g', nutrients: { vitaminC: 8.7, iron: 0.3, calcium: 5, saturatedFat: 0.1, unsaturatedFat: 0.1, fiber: 2.6, animalProtein: 0, plantProtein: 1.1, starch: 5, sugar: 12, vitaminD: 0, potassium: 358, magnesium: 27, vitaminA: 64, vitaminB1: 0.03, vitaminB6: 0.4, vitaminB12: 0, vitaminE: 0.1, vitaminK: 0.5 } },
  { id: 'f45', calories: 47, protein: 0.9, carbs: 12, fat: 0.1, servingSize: '100g', nutrients: { vitaminC: 53, iron: 0.1, calcium: 40, saturatedFat: 0, unsaturatedFat: 0, fiber: 2.4, animalProtein: 0, plantProtein: 0.9, starch: 0, sugar: 9, vitaminD: 0, potassium: 181, magnesium: 10, vitaminA: 288, vitaminB1: 0.04, vitaminB6: 0.06, vitaminB12: 0, vitaminE: 0.1, vitaminK: 1.4 } },
  { id: 'f46', calories: 50, protein: 0.5, carbs: 13, fat: 0.1, servingSize: '100g', nutrients: { vitaminC: 48, iron: 0.3, calcium: 13, saturatedFat: 0, unsaturatedFat: 0, fiber: 1.4, animalProtein: 0, plantProtein: 0.5, starch: 0, sugar: 10, vitaminD: 0, potassium: 109, magnesium: 12, vitaminA: 58, vitaminB1: 0.08, vitaminB6: 0.1, vitaminB12: 0, vitaminE: 0.02, vitaminK: 0.7 } },
  { id: 'f47', calories: 32, protein: 0.7, carbs: 8, fat: 0.3, servingSize: '100g', nutrients: { vitaminC: 59, iron: 0.4, calcium: 16, saturatedFat: 0, unsaturatedFat: 0.1, fiber: 2, animalProtein: 0, plantProtein: 0.7, starch: 0, sugar: 5, vitaminD: 0, potassium: 153, magnesium: 13, vitaminA: 12, vitaminB1: 0.02, vitaminB6: 0.05, vitaminB12: 0, vitaminE: 0.3, vitaminK: 2.2 } },
  { id: 'f48', calories: 57, protein: 0.7, carbs: 14, fat: 0.3, servingSize: '100g', nutrients: { vitaminC: 10, iron: 0.3, calcium: 6, saturatedFat: 0, unsaturatedFat: 0.1, fiber: 2.4, animalProtein: 0, plantProtein: 0.7, starch: 0, sugar: 10, vitaminD: 0, potassium: 77, magnesium: 6, vitaminA: 54, vitaminB1: 0.03, vitaminB6: 0.05, vitaminB12: 0, vitaminE: 0.6, vitaminK: 19.3 } },
  { id: 'f49', calories: 29, protein: 1.1, carbs: 9, fat: 0.3, servingSize: '100g', nutrients: { vitaminC: 53, iron: 0.6, calcium: 26, saturatedFat: 0, unsaturatedFat: 0.1, fiber: 2.8, animalProtein: 0, plantProtein: 1.1, starch: 3, sugar: 2.5, vitaminD: 0, potassium: 138, magnesium: 8, vitaminA: 22, vitaminB1: 0.04, vitaminB6: 0.08, vitaminB12: 0, vitaminE: 0.2, vitaminK: 0 } },
  { id: 'f50', calories: 354, protein: 3.3, carbs: 15, fat: 33, servingSize: '100g', nutrients: { vitaminC: 3.3, iron: 2.4, calcium: 14, saturatedFat: 30, unsaturatedFat: 1.5, fiber: 9, animalProtein: 0, plantProtein: 3.3, starch: 0, sugar: 6, vitaminD: 0, potassium: 356, magnesium: 32, vitaminA: 0, vitaminB1: 0.07, vitaminB6: 0.05, vitaminB12: 0, vitaminE: 0.2, vitaminK: 0.2 } },
  { id: 'f51', calories: 61, protein: 1.1, carbs: 15, fat: 0.5, servingSize: '100g', nutrients: { vitaminC: 93, iron: 0.3, calcium: 34, saturatedFat: 0, unsaturatedFat: 0.3, fiber: 3, animalProtein: 0, plantProtein: 1.1, starch: 0, sugar: 9, vitaminD: 0, potassium: 312, magnesium: 17, vitaminA: 87, vitaminB1: 0.03, vitaminB6: 0.06, vitaminB12: 0, vitaminE: 1.5, vitaminK: 40.3 } },
  { id: 'f52', calories: 60, protein: 0.8, carbs: 15, fat: 0.4, servingSize: '100g', nutrients: { vitaminC: 36, iron: 0.2, calcium: 11, saturatedFat: 0.1, unsaturatedFat: 0.2, fiber: 1.6, animalProtein: 0, plantProtein: 0.8, starch: 0, sugar: 14, vitaminD: 0, potassium: 168, magnesium: 10, vitaminA: 1082, vitaminB1: 0.03, vitaminB6: 0.1, vitaminB12: 0, vitaminE: 0.9, vitaminK: 4.2 } },
  { id: 'f53', calories: 57, protein: 0.4, carbs: 15, fat: 0.1, servingSize: '100g', nutrients: { vitaminC: 4.3, iron: 0.2, calcium: 9, saturatedFat: 0, unsaturatedFat: 0, fiber: 3.1, animalProtein: 0, plantProtein: 0.4, starch: 0, sugar: 10, vitaminD: 0, potassium: 116, magnesium: 7, vitaminA: 2, vitaminB1: 0.01, vitaminB6: 0.03, vitaminB12: 0, vitaminE: 0.1, vitaminK: 4.4 } },
  { id: 'f54', calories: 39, protein: 0.9, carbs: 10, fat: 0.3, servingSize: '100g', nutrients: { vitaminC: 6.6, iron: 0.3, calcium: 6, saturatedFat: 0, unsaturatedFat: 0.1, fiber: 1.5, animalProtein: 0, plantProtein: 0.9, starch: 0, sugar: 8, vitaminD: 0, potassium: 190, magnesium: 8, vitaminA: 326, vitaminB1: 0.02, vitaminB6: 0.03, vitaminB12: 0, vitaminE: 0.7, vitaminK: 2.6 } },
  { id: 'f55', calories: 46, protein: 0.7, carbs: 11, fat: 0.3, servingSize: '100g', nutrients: { vitaminC: 9.5, iron: 0.2, calcium: 6, saturatedFat: 0, unsaturatedFat: 0.1, fiber: 1.4, animalProtein: 0, plantProtein: 0.7, starch: 0, sugar: 10, vitaminD: 0, potassium: 157, magnesium: 7, vitaminA: 345, vitaminB1: 0.03, vitaminB6: 0.03, vitaminB12: 0, vitaminE: 0.2, vitaminK: 6.4 } }
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
      ],
      instructions: []
    }
  ],
};

export const micronutrientGoals = {
  vitaminC: 75, // mg
  vitaminD: 600, // IU
  calcium: 1000, // mg
  iron: 18, // mg
  fiber: 25, // g
  potassium: 3500, // mg
  magnesium: 320, // mg
  vitaminA: 700, // mcg
  vitaminB1: 1.1, // mg
  vitaminB6: 1.3, // mg
  vitaminB12: 2.4, // mcg
  vitaminE: 15, // mg
  vitaminK: 90, // mcg
};

type DetailedRecipeCollection = {
    international: RecipeWithIngredients[];
    nusantara: RecipeWithIngredients[];
}

const detailedInternationalMenu: RecipeWithIngredients[] = [
    { name: 'Oatmeal with berries and nuts', ingredients: [{ food: foodDatabase.find(f=>f.id==='f7')!, servings: 1 }, { food: foodDatabase.find(f=>f.id==='f47')!, servings: 0.5 }, { food: foodDatabase.find(f=>f.id==='f6')!, servings: 0.25 }], instructions: ["Cook oatmeal with water or milk.", "Top with fresh berries and a sprinkle of nuts."] },
    { name: 'Grilled Chicken Salad', ingredients: [{ food: foodDatabase.find(f=>f.id==='f1')!, servings: 1.5 }, { food: foodDatabase.find(f=>f.id==='f10')!, servings: 2 }, { food: foodDatabase.find(f=>f.id==='f37')!, servings: 0.5 }], instructions: ["Grill chicken breast until cooked through.", "Chop lettuce, tomatoes, and other vegetables.", "Slice the chicken and place on top of the salad."] },
    { name: 'Salmon with Quinoa and Asparagus', ingredients: [{ food: foodDatabase.find(f=>f.id==='f4')!, servings: 1.5 }, { food: foodDatabase.find(f=>f.id==='f2')!, servings: 1 }, { food: foodDatabase.find(f=>f.id==='f3')!, servings: 0.5 }], instructions: ["Bake salmon at 200°C for 12-15 minutes.", "Cook quinoa according to package directions.", "Roast asparagus with olive oil and salt."] },
    { name: 'Scrambled eggs with spinach and whole wheat toast', ingredients: [{ food: foodDatabase.find(f=>f.id==='f8')!, servings: 2 }, { food: foodDatabase.find(f=>f.id==='f10')!, servings: 1 }, { food: foodDatabase.find(f=>f.id==='f30')!, servings: 1 }], instructions: ["Wilt spinach in a pan.", "Scramble eggs and mix with spinach.", "Serve with toasted whole wheat bread."] },
    { name: 'Lentil Soup and a side salad', ingredients: [{ food: foodDatabase.find(f=>f.id==='f10')!, servings: 2 }], instructions: ["Sauté onions, carrots, and celery.", "Add lentils, vegetable broth, and spices.", "Simmer for 25-30 minutes until lentils are tender."] },
    { name: 'Beef Stir-fry with mixed vegetables', ingredients: [{ food: foodDatabase.find(f=>f.id==='f11')!, servings: 1.5 }, { food: foodDatabase.find(f=>f.id==='f3')!, servings: 1 }, { food: foodDatabase.find(f=>f.id==='f41')!, servings: 1 }], instructions: ["Slice beef and stir-fry until browned.", "Add vegetables and stir-fry until tender-crisp.", "Add your favorite stir-fry sauce and serve."] },
    { name: 'Greek yogurt with granola and honey', ingredients: [{ food: foodDatabase.find(f=>f.id==='f9')!, servings: 1 }], instructions: ["Spoon Greek yogurt into a bowl.", "Top with granola and a drizzle of honey."] },
    { name: 'Avocado Toast', ingredients: [{ food: foodDatabase.find(f=>f.id==='f28')!, servings: 1 }, { food: foodDatabase.find(f=>f.id==='f30')!, servings: 2 }], instructions: ["Toast bread to your liking.", "Mash avocado and spread on toast.", "Season with salt, pepper, and optional red pepper flakes."] },
    { name: 'Pasta with marinara sauce and a side of broccoli', ingredients: [{ food: foodDatabase.find(f=>f.id==='f3')!, servings: 1 }], instructions: ["Cook pasta according to package directions.", "Heat marinara sauce.", "Steam or roast broccoli.", "Combine pasta and sauce, serve with broccoli on the side."] },
    { name: 'Smoothie with protein powder, banana, and almond milk', ingredients: [{ food: foodDatabase.find(f=>f.id==='f44')!, servings: 0.5 }], instructions: ["Combine all ingredients in a blender.", "Blend until smooth."] },
    { name: 'Tuna salad sandwich on whole wheat', ingredients: [{ food: foodDatabase.find(f=>f.id==='f30')!, servings: 2 }], instructions: ["Mix canned tuna with mayonnaise or Greek yogurt.", "Serve between two slices of whole wheat bread with lettuce."] },
    { name: 'Baked cod with roasted potatoes and green beans', ingredients: [{ food: foodDatabase.find(f=>f.id==='f35')!, servings: 2 }], instructions: ["Season cod and bake until flaky.", "Toss potatoes and green beans with oil and roast until tender."] },
    { name: 'Cottage cheese with peaches', ingredients: [], instructions: ["Simply combine cottage cheese and sliced peaches in a bowl."] },
    { name: 'Leftover beef stir-fry', ingredients: [{ food: foodDatabase.find(f=>f.id==='f11')!, servings: 1.5 }, { food: foodDatabase.find(f=>f.id==='f3')!, servings: 1 }, { food: foodDatabase.find(f=>f.id==='f41')!, servings: 1 }], instructions: ["Reheat stir-fry in a pan or microwave until warm."] },
    { name: 'Chicken and vegetable skewers', ingredients: [{ food: foodDatabase.find(f=>f.id==='f1')!, servings: 1 }], instructions: ["Cube chicken and chop vegetables.", "Thread onto skewers and grill or bake until chicken is cooked."] },
];

const detailedNusantaraMenu: RecipeWithIngredients[] = [
    { name: 'Bubur ayam tanpa kerupuk', ingredients: [{ food: foodDatabase.find(f=>f.id==='f1')!, servings: 1 }], instructions: ["Masak beras dengan kaldu ayam hingga menjadi bubur.", "Sajikan dengan suwiran ayam, cakwe, dan bawang goreng."] },
    { name: 'Gado-gado dengan sedikit saus kacang', ingredients: [{ food: foodDatabase.find(f=>f.id==='f8')!, servings: 1 }, { food: foodDatabase.find(f=>f.id==='f10')!, servings: 1 }], instructions: ["Rebus sayuran (kangkung, tauge, kacang panjang) dan kentang.", "Sajikan dengan telur rebus, tahu, dan sedikit saus kacang."] },
    { name: 'Pepes ikan dengan nasi merah', ingredients: [{ food: foodDatabase.find(f=>f.id==='f4')!, servings: 1.5 }, { food: foodDatabase.find(f=>f.id==='f2')!, servings: 1 }], instructions: ["Bumbui ikan dengan bumbu kuning (kunyit, bawang, kemiri).", "Bungkus dengan daun pisang dan kukus hingga matang."] },
    { name: 'Nasi uduk (porsi kecil) dengan telur dadar', ingredients: [{ food: foodDatabase.find(f=>f.id==='f34')!, servings: 0.8 }, { food: foodDatabase.find(f=>f.id==='f8')!, servings: 1 }], instructions: ["Masak nasi dengan santan encer, serai, dan daun salam.", "Sajikan dengan telur dadar tipis dan irisan timun."] },
    { name: 'Soto ayam bening dengan bihun', ingredients: [{ food: foodDatabase.find(f=>f.id==='f1')!, servings: 1.2 }], instructions: ["Rebus ayam untuk membuat kaldu bening dengan bumbu soto.", "Sajikan suwiran ayam dengan bihun, tauge, dan seledri."] },
    { name: 'Sayur asem dengan ikan bakar', ingredients: [{ food: foodDatabase.find(f=>f.id==='f4')!, servings: 1 }], instructions: ["Masak sayuran (melinjo, kacang panjang, labu siam) dengan bumbu asam jawa.", "Bakar ikan yang sudah dibumbui hingga matang."] },
    { name: 'Lontong sayur dengan tahu dan tempe', ingredients: [], instructions: ["Rebus lontong hingga padat.", "Masak sayur labu siam dengan santan encer.", "Sajikan lontong dengan sayur, tahu, dan tempe bacem."] },
    { name: 'Urap sayuran dengan dada ayam rebus', ingredients: [{ food: foodDatabase.find(f=>f.id==='f1')!, servings: 1 }], instructions: ["Rebus berbagai sayuran (bayam, tauge, kacang panjang).", "Campur dengan kelapa parut yang sudah dibumbui.", "Sajikan dengan dada ayam rebus yang disuwir."] },
    { name: 'Tumis kangkung dengan udang', ingredients: [{ food: foodDatabase.find(f=>f.id==='f32')!, servings: 1 }], instructions: ["Tumis bawang putih dan cabai hingga harum.", "Masukkan udang, masak hingga berubah warna, lalu masukkan kangkung.", "Bumbui dengan saus tiram dan masak cepat."] },
    { name: 'Ketan serundeng', ingredients: [], instructions: ["Kukus beras ketan hingga matang.", "Sajikan dengan taburan serundeng (kelapa parut sangrai)."] },
    { name: 'Ikan pindang kuah bening', ingredients: [{ food: foodDatabase.find(f=>f.id==='f4')!, servings: 1 }], instructions: ["Rebus ikan pindang dengan bumbu iris (bawang, cabai, tomat) dan belimbing wuluh."] },
    { name: 'Sate ayam (tanpa lemak) dengan lontong', ingredients: [{ food: foodDatabase.find(f=>f.id==='f1')!, servings: 1.5 }], instructions: ["Bumbui potongan dada ayam dan bakar hingga matang.", "Sajikan dengan lontong dan bumbu kacang terpisah."] },
    { name: 'Bubur kacang hijau tanpa santan', ingredients: [], instructions: ["Rebus kacang hijau dengan jahe dan gula merah hingga empuk."] },
    { name: 'Leftover sayur asem', ingredients: [], instructions: ["Panaskan kembali sayur asem hingga hangat."] },
    { name: 'Gulai ikan patin (kuah lebih encer)', ingredients: [{ food: foodDatabase.find(f=>f.id==='f4')!, servings: 1 }], instructions: ["Masak ikan patin dengan bumbu gulai dan santan encer."] },
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
            lunch: day.lunch.replace('Grilled Chicken Salad', 'Salad Ayam Panggang').replace('Lentil Soup and a side salad', 'Sup Lentil dan salad pendamping').replace('Avocado Toast', 'Roti Panggang Alpukat').replace('Tuna salad sandwich on whole wheat', 'Sandwich salad tuna dengan roti gandum').replace('Leftover beef stir-fry', 'Sisa tumis daging sapi'),
            dinner: day.dinner.replace('Salmon with Quinoa and Asparagus', 'Salmon dengan Quinoa dan Asparagus').replace('Beef Stir-fry with mixed vegetables', 'Tumis daging sapi dengan sayuran campur').replace('Pasta with marinara sauce and a side of broccoli', 'Pasta dengan saus marinara dan brokoli').replace('Baked cod with roasted potatoes and green beans', 'Ikan kod panggang dengan kentang panggang dan buncis').replace('Chicken and vegetable skewers', 'Sate ayam dan sayuran'),
        })),
        nusantara: nusantaraMenu
    }
};

export const detailedRecipes: {
    en: {
        international: RecipeWithIngredients[];
        nusantara: RecipeWithIngredients[];
    };
    id: {
        international: RecipeWithIngredients[];
        nusantara: RecipeWithIngredients[];
    };
} = {
    en: {
        international: detailedInternationalMenu,
        nusantara: detailedNusantaraMenu.map(r => {
            const i18nName = mealPlan30Days.en.nusantara
                .flatMap(d => [d.breakfast, d.lunch, d.dinner])
                .find(n => n.includes(r.name.substring(0, 10)));
            return {
                ...r,
                name: i18nName || r.name
            };
        })
    },
    id: {
        nusantara: detailedNusantaraMenu,
        international: detailedInternationalMenu.map(r => {
            const i18nName = mealPlan30Days.id.international
                .flatMap(d => [d.breakfast, d.lunch, d.dinner])
                .find(n => n.includes(r.name.substring(0, 10)));
            return {
                ...r,
                name: i18nName || r.name
            };
        })
    }
};


export const motivationalQuotes = (t: (key: TranslationKey) => string) => {
    return Array.from({ length: 40 }, (_, i) => t(`quote${i + 1}` as TranslationKey));
};
