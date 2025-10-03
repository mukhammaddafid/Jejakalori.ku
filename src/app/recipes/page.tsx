
import * as React from 'react';
import { RecipeCalculator } from '@/components/recipes/recipe-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UtensilsCrossed, Soup } from 'lucide-react';
import { PotentialCard } from '@/components/profile/potential-card';


const mealPlanRecommendations = {
    'Sarapan': [
        'Oatmeal dengan buah beri dan segenggam kacang almond.',
        'Smoothie bayam, pisang, dan protein powder.',
        'Telur orak-arik dengan roti gandum utuh.'
    ],
    'Makan Siang': [
        'Dada ayam panggang dengan nasi merah dan brokoli kukus.',
        'Salad quinoa dengan buncis, paprika, dan saus lemon.',
        'Bungkus kalkun dengan selada, tomat, dan hummus.'
    ],
    'Makan Malam': [
        'Salad salmon dengan sayuran hijau, tomat ceri, dan saus lemon.',
        'Sup lentil dengan sayuran akar.',
        'Tumis tahu dengan paprika, bawang, dan saus kedelai.'
    ],
    'Camilan': [
        'Yogurt Yunani dengan potongan buah apel.',
        'Wortel dan seledri dengan hummus.',
        'Segenggam kecil kacang campuran.'
    ],
};


function HealthyMealPlan() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><UtensilsCrossed /> Rekomendasi Rencana Menu Sehat</CardTitle>
                <CardDescription>
                    Berikut adalah contoh rencana makan sehat untuk membantu Anda mencapai tujuan.
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
            <h1 className="text-2xl font-bold font-headline">Ayo Hitung Kalorimu!</h1>
            <p className="text-muted-foreground">
            Buat resep Anda sendiri dan lihat rincian nutrisinya secara instan.
            </p>
        </div>
      </div>
      
      <RecipeCalculator />
      <HealthyMealPlan />
      <PotentialCard />
    </div>
  );
}
