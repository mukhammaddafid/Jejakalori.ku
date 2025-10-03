'use client';

import * as React from 'react';
import type { Food, MealLog } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FoodSearch } from '@/components/dashboard/food-search';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, Trash2, Soup, BookCopy, PieChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/lib/language-provider';
import { mealPlan30Days } from '@/lib/data';

interface Totals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  saturatedFat: number;
  unsaturatedFat: number;
}

export function RecipeCalculator() {
  const [recipeName, setRecipeName] = React.useState('');
  const [servings, setServings] = React.useState(1);
  const [ingredients, setIngredients] = React.useState<MealLog[]>([]);
  const [totals, setTotals] = React.useState<Totals>({ calories: 0, protein: 0, carbs: 0, fat: 0, saturatedFat: 0, unsaturatedFat: 0 });
  const { toast } = useToast();
  const { t, language } = useLanguage();

  const recipeNameOptions = React.useMemo(() => {
    const internationalRecipes = mealPlan30Days[language].international.flatMap(day => [day.breakfast, day.lunch, day.dinner]);
    const nusantaraRecipes = mealPlan30Days[language].nusantara.flatMap(day => [day.breakfast, day.lunch, day.dinner]);
    return [...new Set([...internationalRecipes, ...nusantaraRecipes])];
  }, [language]);


  React.useEffect(() => {
    let newTotals: Totals = { calories: 0, protein: 0, carbs: 0, fat: 0, saturatedFat: 0, unsaturatedFat: 0 };
    ingredients.forEach(item => {
      newTotals.calories += item.food.calories * item.servings;
      newTotals.protein += item.food.protein * item.servings;
      newTotals.carbs += item.food.carbs * item.servings;
      newTotals.fat += item.food.fat * item.servings;
      newTotals.saturatedFat += (item.food.nutrients.saturatedFat || 0) * item.servings;
      newTotals.unsaturatedFat += (item.food.nutrients.unsaturatedFat || 0) * item.servings;
    });
    setTotals(newTotals);
  }, [ingredients]);

  const addIngredient = (ingredient: MealLog) => {
    setIngredients(prev => [...prev, ingredient]);
    toast({
      title: t('ingredientAdded'),
      description: t('ingredientAddedDescription', { servings: ingredient.servings, name: ingredient.food.name }),
    })
  };

  const removeIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };
  
  const perServing = {
    calories: servings > 0 ? totals.calories / servings : 0,
    protein: servings > 0 ? totals.protein / servings : 0,
    carbs: servings > 0 ? totals.carbs / servings : 0,
    fat: servings > 0 ? totals.fat / servings : 0,
    saturatedFat: servings > 0 ? totals.saturatedFat / servings : 0,
    unsaturatedFat: servings > 0 ? totals.unsaturatedFat / servings : 0,
  };

  const chartData = [
    { name: t('protein'), value: Math.round(perServing.protein), fill: 'hsl(var(--chart-1))' },
    { name: t('carbohydrates'), value: Math.round(perServing.carbs), fill: 'hsl(var(--chart-2))' },
    { name: t('fat'), value: Math.round(perServing.fat), fill: 'hsl(var(--chart-3))' },
  ];

  const chartDataTotal = [
    { name: t('protein'), value: Math.round(totals.protein), fill: 'hsl(var(--chart-1))' },
    { name: t('carbohydrates'), value: Math.round(totals.carbs), fill: 'hsl(var(--chart-2))' },
    { name: t('fat'), value: Math.round(totals.fat), fill: 'hsl(var(--chart-3))' },
    { name: t('saturatedFat'), value: Math.round(totals.saturatedFat), fill: 'hsl(var(--chart-4))' },
    { name: t('unsaturatedFat'), value: Math.round(totals.unsaturatedFat), fill: 'hsl(var(--chart-5))' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Inputs */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Soup /> {t('createRecipe')}</CardTitle>
            <CardDescription>{t('createRecipeDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="recipe-name">{t('recipeName')}</Label>
                <Select onValueChange={setRecipeName} value={recipeName}>
                    <SelectTrigger>
                        <SelectValue placeholder={t('recipeNamePlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                        {recipeNameOptions.map((name) => (
                            <SelectItem key={name} value={name}>{name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="servings">{t('servings')}</Label>
                <Input id="servings" type="number" value={servings} onChange={e => setServings(Math.max(1, parseInt(e.target.value) || 1))} min="1" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookCopy /> {t('composition')}</CardTitle>
                <CardDescription>{t('compositionDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <FoodSearch onAddFood={addIngredient} />
                <Separator className="my-4" />
                <h3 className="font-semibold mb-2">{t('currentIngredients')}</h3>
                <div className="space-y-2">
                    {ingredients.length > 0 ? ingredients.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 rounded-md bg-secondary">
                            <div>
                                <p className="font-medium">{item.food.name}</p>
                                <p className="text-sm text-muted-foreground">{item.servings} {t('servings')}</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeIngredient(index)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    )) : (
                        <p className="text-sm text-muted-foreground text-center py-4">{t('noIngredients')}</p>
                    )}
                </div>
            </CardContent>
        </Card>
      </div>

      {/* Right Column: Nutrition Summary */}
      <div className="lg:col-span-1">
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><PieChart />{recipeName || t('recipeNutrition')}</CardTitle>
            <CardDescription>{t('recipeNutritionDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-center mb-2">{t('nutritionPerServing')}</h4>
              <div className="text-center">
                <p className="text-3xl font-bold font-headline text-primary">{Math.round(perServing.calories)}</p>
                <p className="text-sm text-muted-foreground">{t('calories')}</p>
              </div>
              <ChartContainer config={{}} className="h-[120px] w-full">
                <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 10 }}>
                    <XAxis type="number" hide />
                    <Tooltip cursor={{fill: 'hsl(var(--muted))'}} contentStyle={{backgroundColor: 'hsl(var(--background))'}}/>
                    <Bar dataKey="value" radius={4} />
                </BarChart>
              </ChartContainer>
            </div>

            <Separator />
            
            <div>
              <h4 className="font-semibold mb-2">{t('totalForRecipe', { servings })}</h4>
              <ChartContainer config={{}} className="h-[150px] w-full">
                <BarChart data={chartDataTotal} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                    <Tooltip cursor={{fill: 'hsl(var(--muted))'}} contentStyle={{backgroundColor: 'hsl(var(--background))'}}/>
                    <Bar dataKey="value" radius={4}>
                        {chartDataTotal.map((entry, index) => (
                            <div key={`cell-${index}`} style={{ backgroundColor: entry.fill }} />
                        ))}
                    </Bar>
                </BarChart>
              </ChartContainer>
               <div className="space-y-1 text-sm mt-2">
                <div className="flex justify-between"><span>{t('saturatedFat')}:</span> <span className="font-medium">{Math.round(totals.saturatedFat)} g</span></div>
                <div className="flex justify-between"><span>{t('unsaturatedFat')}:</span> <span className="font-medium">{Math.round(totals.unsaturatedFat)} g</span></div>
              </div>
            </div>

            <Button className="w-full mt-4">
                <PlusCircle className="mr-2 h-4 w-4" /> {t('saveRecipe')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
