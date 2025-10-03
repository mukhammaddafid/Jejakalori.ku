import * as React from 'react';
import { RecipeCalculator } from '@/components/recipes/recipe-calculator';
import { Soup } from 'lucide-react';

export default function RecipesPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg text-primary">
            <Soup size={32} />
        </div>
        <div>
            <h1 className="text-2xl font-bold font-headline">Ayo Hitung Kalorimu!</h1>
            <p className="text-muted-foreground">
            Buat resep Anda sendiri dan lihat rincian nutrisinya secara instan.
            </p>
        </div>
      </div>
      
      <RecipeCalculator />
    </div>
  );
}
