import * as React from 'react';
import { RecipeCalculator } from '@/components/recipes/recipe-calculator';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function RecipesPage() {
  const recipeImage = PlaceHolderImages.find(img => img.id === 'recipe-page-hero');

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-4">
        {recipeImage && (
            <Image 
                src={recipeImage.imageUrl} 
                alt="Ayo Hitung Kalorimu"
                width={64}
                height={64}
                className="rounded-lg"
                data-ai-hint={recipeImage.imageHint} 
            />
        )}
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
