import * as React from 'react';
import { RecipeCalculator } from '@/components/recipes/recipe-calculator';

export default function RecipesPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold font-headline">Recipe Calculator</h1>
        <p className="text-muted-foreground">
          Build your own recipes and instantly see the nutritional breakdown.
        </p>
      </div>
      
      <RecipeCalculator />
    </div>
  );
}
