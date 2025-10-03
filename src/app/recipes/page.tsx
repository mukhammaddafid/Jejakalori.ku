import * as React from 'react';
import { RecipeCalculator } from '@/components/recipes/recipe-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UtensilsCrossed, Soup } from 'lucide-react';
import { PotentialCard } from '@/components/profile/potential-card';
import { useLanguage } from '@/lib/language-provider';


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

const mealPlanRecommendationsId = {
    'Sarapan': [
        'Oatmeal dengan buah beri dan segenggam almond.',
        'Smoothie bayam, pisang, dan bubuk protein.',
        'Telur orak-arik dengan roti gandum.'
    ],
    'Makan Siang': [
        'Dada ayam panggang dengan nasi merah dan brokoli kukus.',
        'Salad quinoa dengan kacang hitam, paprika, dan saus lemon.',
        'Wrap kalkun dengan selada, tomat, dan hummus.'
    ],
    'Makan Malam': [
        'Salad salmon dengan sayuran campur, tomat ceri, dan saus lemon.',
        'Sup lentil dengan sayuran akar.',
        'Tumis tahu dengan paprika, bawang, dan kecap.'
    ],
    'Camilan': [
        'Yogurt Yunani dengan irisan apel.',
        'Wortel dan seledri dengan hummus.',
        'Segenggam kecil kacang campur.'
    ],
};


function HealthyMealPlan() {
    const { t, language } = useLanguage();
    const recommendations = language === 'id' ? mealPlanRecommendationsId : mealPlanRecommendations;
    const mealTitles = language === 'id' ? Object.keys(mealPlanRecommendationsId) : Object.keys(mealPlanRecommendations);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><UtensilsCrossed /> {t('healthyMealPlan')}</CardTitle>
                <CardDescription>
                    {t('healthyMealPlanDescription')}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {Object.values(recommendations).map((suggestions, i) => (
                     <div key={mealTitles[i]}>
                        <h3 className="font-semibold text-lg mb-2">{mealTitles[i]}</h3>
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
  const { t } = useLanguage();
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg text-primary">
            <Soup size={32} />
        </div>
        <div>
            <h1 className="text-2xl font-bold font-headline">{t('letsCountCalories')}</h1>
            <p className="text-muted-foreground">
            {t('letsCountCaloriesDescription')}
            </p>
        </div>
      </div>
      
      <RecipeCalculator />
      <HealthyMealPlan />
      <PotentialCard />
    </div>
  );
}
