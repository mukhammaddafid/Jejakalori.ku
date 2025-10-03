
import * as React from 'react';
import { RecipeCalculator } from '@/components/recipes/recipe-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UtensilsCrossed, Soup } from 'lucide-react';
import { PotentialCard } from '@/components/profile/potential-card';


const mealPlanRecommendations = {
    'Breakfast': [
        'Oatmeal with berries and a handful of almonds.',
        'Spinach, banana, and protein powder smoothie.',
        'Scrambled eggs with whole wheat toast.'
    ],
    'Lunch': [
        'Grilled chicken breast with brown rice and steamed broccoli.',
        'Quinoa salad with black beans, bell peppers, and lemon dressing.',
        'Turkey wrap with lettuce, tomato, and hummus.'
    ],
    'Dinner': [
        'Salmon salad with mixed greens, cherry tomatoes, and lemon dressing.',
        'Lentil soup with root vegetables.',
        'Tofu stir-fry with bell peppers, onions, and soy sauce.'
    ],
    'Snacks': [
        'Greek yogurt with apple slices.',
        'Carrots and celery with hummus.',
        'Small handful of mixed nuts.'
    ],
};


function HealthyMealPlan() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><UtensilsCrossed /> Healthy Meal Plan Recommendations</CardTitle>
                <CardDescription>
                    Here are some healthy meal plan examples to help you reach your goals.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {Object.entries(mealPlanRecommendations).map(([meal, suggestions]) => (
                     <div key={meal}>
                        <h3 className="font-semibold text-lg mb-2">{meal}</h3>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            {suggestions.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

export default function RecipesPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg text-primary">
            <Soup size={32} />
        </div>
        <div>
            <h1 className="text-2xl font-bold font-headline">Let's Count Your Calories!</h1>
            <p className="text-muted-foreground">
            Create your own recipes and see their nutritional breakdown instantly.
            </p>
        </div>
      </div>
      
      <RecipeCalculator />
      <HealthyMealPlan />
      <PotentialCard />
    </div>
  );
}
