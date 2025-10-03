import * as React from 'react';
import { RecipeCalculator } from '@/components/recipes/recipe-calculator';

export default function RecipesPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold font-headline">Kalkulator Resep</h1>
        <p className="text-muted-foreground">
          Buat resep Anda sendiri dan lihat rincian nutrisinya secara instan.
        </p>
      </div>
      
      <RecipeCalculator />
    </div>
  );
}
