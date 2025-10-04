'use client';

import * as React from 'react';
import type { Food, MealLog, RecipeWithIngredients } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FoodSearch } from '@/components/dashboard/food-search';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, Trash2, Soup, BookCopy, PieChart, Info, Flame, Drumstick, Wheat, Droplets } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/lib/language-provider';
import { mealPlan30Days, detailedRecipes } from '@/lib/data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '../ui/scroll-area';

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
  const [instructions, setInstructions] = React.useState<string[]>([]);
  const [totals, setTotals] = React.useState<Totals>({ calories: 0, protein: 0, carbs: 0, fat: 0, saturatedFat: 0, unsaturatedFat: 0 });
  const [openDialog, setOpenDialog] = React.useState(false);

  const { toast } = useToast();
  const { t, language } = useLanguage();

  const recipeNameOptions = React.useMemo(() => {
    const internationalRecipes = detailedRecipes[language].international;
    const nusantaraRecipes = detailedRecipes[language].nusantara;
    return [...internationalRecipes, ...nusantaraRecipes].map(r => r.name);
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
  
  React.useEffect(() => {
    if (recipeName) {
      const allRecipes = [...detailedRecipes[language].international, ...detailedRecipes[language].nusantara];
      const selectedRecipe = allRecipes.find(r => r.name === recipeName);
      
      if (selectedRecipe) {
        setIngredients(selectedRecipe.ingredients);
        setInstructions(selectedRecipe.instructions);
      } else {
        setIngredients([]);
        setInstructions([]);
      }
    }
  }, [recipeName, language]);

  const addIngredient = (ingredient: MealLog) => {
    setIngredients(prev => [...prev, ingredient]);
    toast({
      title: t('ingredientAdded'),
      description: t('ingredientAddedDescription', { servings: ingredient.servings, name: t(ingredient.food.id as any) }),
    })
  };

  const removeIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSaveAndShow = () => {
    if (!recipeName || ingredients.length === 0) {
        toast({
            variant: 'destructive',
            title: t('error'),
            description: "Please provide a recipe name and add at least one ingredient.",
        });
        return;
    }
    setOpenDialog(true);
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

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Soup /> {t('createRecipe')}</CardTitle>
                <CardDescription>{t('createRecipeDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Recipe Name & Servings */}
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

                <Separator />

                {/* Ingredients */}
                <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2"><BookCopy /> {t('composition')}</h3>
                    <FoodSearch onAddFood={addIngredient} />
                    <div className="space-y-2 mt-4">
                        {ingredients.length > 0 ? ingredients.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-2 rounded-md bg-secondary">
                                <div>
                                    <p className="font-medium">{t(item.food.id as any)}</p>
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
                </div>
                
                <Separator />

                {/* Nutrition Summary */}
                <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2"><PieChart /> {t('recipeNutrition')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-center mb-2">{t('nutritionPerServing')}</h4>
                            <div className="text-center">
                                <p className="text-3xl font-bold font-headline text-primary">{Math.round(perServing.calories)}</p>
                                <p className="text-sm text-muted-foreground">{t('calories')}</p>
                            </div>
                            <ChartContainer config={{}} className="h-[120px] w-full">
                                <ResponsiveContainer>
                                    <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
                                        <XAxis type="number" hide />
                                        <YAxis type="category" dataKey="name" hide />
                                        <Tooltip cursor={{fill: 'hsl(var(--muted))'}} contentStyle={{backgroundColor: 'hsl(var(--background))'}}/>
                                        <Bar dataKey="value" radius={4} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </div>
                         <div>
                            <h4 className="font-semibold text-center mb-2">{t('totalForRecipe', { servings })}</h4>
                             <div className="text-center">
                                <p className="text-3xl font-bold font-headline text-primary">{Math.round(totals.calories)}</p>
                                <p className="text-sm text-muted-foreground">{t('calories')}</p>
                            </div>
                            <div className="space-y-1 text-sm mt-2">
                                <div className="flex justify-between"><span>{t('protein')}:</span> <span className="font-medium">{Math.round(totals.protein)} g</span></div>
                                <div className="flex justify-between"><span>{t('carbohydrates')}:</span> <span className="font-medium">{Math.round(totals.carbs)} g</span></div>
                                <div className="flex justify-between"><span>{t('fat')}:</span> <span className="font-medium">{Math.round(totals.fat)} g</span></div>
                                <div className="flex justify-between text-muted-foreground"><span className="pl-4">{t('saturatedFat')}:</span> <span className="font-medium">{Math.round(totals.saturatedFat)} g</span></div>
                                <div className="flex justify-between text-muted-foreground"><span className="pl-4">{t('unsaturatedFat')}:</span> <span className="font-medium">{Math.round(totals.unsaturatedFat)} g</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                <Button className="w-full mt-4" onClick={handleSaveAndShow}>
                    <PlusCircle className="mr-2 h-4 w-4" /> {t('saveRecipe')} &amp; View Details
                </Button>
            </CardContent>
        </Card>

        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle className="text-2xl">{recipeName || t('recipeDetails')}</DialogTitle>
                <DialogDescription>
                    {t('recipeDetailsDescription', { servings: servings })}
                </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh]">
                <div className="pr-6 space-y-6">
                    {/* Nutrition Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2"><PieChart />{t('nutritionPerServing')}</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <p className="text-xs text-primary">{t('calories')}</p>
                                <p className="text-xl font-bold text-primary">{Math.round(perServing.calories)}</p>
                            </div>
                             <div className="p-2 bg-secondary rounded-lg">
                                <p className="text-xs text-secondary-foreground">{t('protein')}</p>
                                <p className="text-xl font-bold">{Math.round(perServing.protein)}g</p>
                            </div>
                            <div className="p-2 bg-secondary rounded-lg">
                                <p className="text-xs text-secondary-foreground">{t('carbohydrates')}</p>
                                <p className="text-xl font-bold">{Math.round(perServing.carbs)}g</p>
                            </div>
                            <div className="p-2 bg-secondary rounded-lg">
                                <p className="text-xs text-secondary-foreground">{t('fat')}</p>
                                <p className="text-xl font-bold">{Math.round(perServing.fat)}g</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Ingredients */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2"><Info />{t('currentIngredients')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                {ingredients.map((item, index) => (
                                    <li key={index}>
                                        {item.servings} {t(item.food.servingSize.includes('g') ? 'g' : 'serving(s)')} {t(item.food.id as any)}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    
                    {/* Cooking Instructions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2"><BookCopy />{t('cookingInstructions')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {instructions.length > 0 ? (
                                <ol className="list-decimal list-inside space-y-2">
                                    {instructions.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ol>
                            ) : (
                                <p className="text-sm text-muted-foreground">{t('noInstructionsAvailable')}</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </ScrollArea>
        </DialogContent>
    </Dialog>
  );
}
