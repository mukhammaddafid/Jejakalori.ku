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

const internationalMenu = Array.from({ length: 30 }, (_, i) => {
    const menus = [
        { breakfast: 'Oatmeal with berries and nuts', lunch: 'Grilled Chicken Salad', dinner: 'Salmon with Quinoa and Asparagus' },
        { breakfast: 'Scrambled eggs with spinach and whole wheat toast', lunch: 'Lentil Soup and a side salad', dinner: 'Beef Stir-fry with mixed vegetables' },
        { breakfast: 'Greek yogurt with granola and honey', lunch: 'Turkey and avocado wrap', dinner: 'Pasta with marinara sauce and a side of broccoli' },
        { breakfast: 'Smoothie with protein powder, banana, and almond milk', lunch: 'Tuna salad sandwich on whole wheat', dinner: 'Baked cod with roasted potatoes and green beans' },
        { breakfast: 'Cottage cheese with peaches', lunch: 'Leftover beef stir-fry', dinner: 'Chicken and vegetable skewers' },
    ];
    return menus[i % menus.length];
});

const nusantaraMenu = Array.from({ length: 30 }, (_, i) => {
    const menus = [
        { breakfast: 'Bubur ayam tanpa kerupuk', lunch: 'Gado-gado dengan sedikit saus kacang', dinner: 'Pepes ikan dengan nasi merah' },
        { breakfast: 'Nasi uduk (porsi kecil) dengan telur dadar', lunch: 'Soto ayam bening dengan bihun', dinner: 'Sayur asem dengan ikan bakar' },
        { breakfast: 'Lontong sayur dengan tahu dan tempe', lunch: 'Urap sayuran dengan dada ayam rebus', dinner: 'Tumis kangkung dengan udang' },
        { breakfast: 'Ketan serundeng', lunch: 'Ikan pindang kuah bening', dinner: 'Sate ayam (tanpa lemak) dengan lontong' },
        { breakfast: 'Bubur kacang hijau tanpa santan', lunch: 'Leftover sayur asem', dinner: 'Gulai ikan patin (kuah lebih encer)' },
    ];
    return menus[i % menus.length];
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
            breakfast: day.breakfast.replace('Oatmeal with berries and nuts', 'Oatmeal dengan buah beri dan kacang').replace('Scrambled eggs with spinach and whole wheat toast', 'Telur orak-arik dengan bayam dan roti gandum').replace('Greek yogurt with granola and honey', 'Yogurt Yunani dengan granola dan madu').replace('Smoothie with protein powder, banana, and almond milk', 'Smoothie dengan bubuk protein, pisang, dan susu almond').replace('Cottage cheese with peaches', 'Keju cottage dengan buah persik'),
            lunch: day.lunch.replace('Grilled Chicken Salad', 'Salad Ayam Panggang').replace('Lentil Soup and a side salad', 'Sup Lentil dan salad pendamping').replace('Turkey and avocado wrap', 'Wrap kalkun dan alpukat').replace('Tuna salad sandwich on whole wheat', 'Sandwich salad tuna dengan roti gandum').replace('Leftover beef stir-fry', 'Sisa tumis daging sapi'),
            dinner: day.dinner.replace('Salmon with Quinoa and Asparagus', 'Salmon dengan Quinoa dan Asparagus').replace('Beef Stir-fry with mixed vegetables', 'Tumis daging sapi dengan sayuran campur').replace('Pasta with marinara sauce and a side of broccoli', 'Pasta dengan saus marinara dan brokoli').replace('Baked cod with roasted potatoes and green beans', 'Ikan kod panggang dengan kentang panggang dan buncis').replace('Chicken and vegetable skewers', 'Sate ayam dan sayuran'),
        })),
        nusantara: nusantaraMenu
    }
};
