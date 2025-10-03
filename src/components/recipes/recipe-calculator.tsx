'use client';

import * as React from 'react';
import type { Food, MealLog } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FoodSearch } from '@/components/dashboard/food-search';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Totals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export function RecipeCalculator() {
  const [recipeName, setRecipeName] = React.useState('');
  const [servings, setServings] = React.useState(1);
  const [ingredients, setIngredients] = React.useState<MealLog[]>([]);
  const [totals, setTotals] = React.useState<Totals>({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const { toast } = useToast();

  React.useEffect(() => {
    let newTotals: Totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    ingredients.forEach(item => {
      newTotals.calories += item.food.calories * item.servings;
      newTotals.protein += item.food.protein * item.servings;
      newTotals.carbs += item.food.carbs * item.servings;
      newTotals.fat += item.food.fat * item.servings;
    });
    setTotals(newTotals);
  }, [ingredients]);

  const addIngredient = (ingredient: MealLog) => {
    setIngredients(prev => [...prev, ingredient]);
    toast({
      title: 'Bahan Ditambahkan',
      description: `${ingredient.servings} x ${ingredient.food.name} ditambahkan ke resep.`,
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
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Inputs */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Buat Resep</CardTitle>
            <CardDescription>Tambahkan bahan untuk menghitung total nutrisi.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="recipe-name">Nama Resep</Label>
                <Input id="recipe-name" value={recipeName} onChange={e => setRecipeName(e.target.value)} placeholder="cth., Smoothie Protein Saya" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="servings">Porsi</Label>
                <Input id="servings" type="number" value={servings} onChange={e => setServings(Math.max(1, parseInt(e.target.value) || 1))} min="1" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Bahan-bahan</CardTitle>
            </CardHeader>
            <CardContent>
                <FoodSearch onAddFood={addIngredient} />
                <Separator className="my-4" />
                <h3 className="font-semibold mb-2">Bahan Saat Ini</h3>
                <div className="space-y-2">
                    {ingredients.length > 0 ? ingredients.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 rounded-md bg-secondary">
                            <div>
                                <p className="font-medium">{item.food.name}</p>
                                <p className="text-sm text-muted-foreground">{item.servings} porsi</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeIngredient(index)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    )) : (
                        <p className="text-sm text-muted-foreground text-center py-4">Belum ada bahan yang ditambahkan.</p>
                    )}
                </div>
            </CardContent>
        </Card>
      </div>

      {/* Right Column: Nutrition Summary */}
      <div className="lg:col-span-1">
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle>{recipeName || "Nutrisi Resep"}</CardTitle>
            <CardDescription>Fakta nutrisi total untuk resep Anda.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-center mb-2">Nutrisi Per Porsi</h4>
              <div className="text-center">
                <p className="text-3xl font-bold font-headline text-primary">{Math.round(perServing.calories)}</p>
                <p className="text-sm text-muted-foreground">Kalori</p>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div><p className="font-bold">{Math.round(perServing.protein)}g</p><p className="text-xs text-muted-foreground">Protein</p></div>
                  <div><p className="font-bold">{Math.round(perServing.carbs)}g</p><p className="text-xs text-muted-foreground">Karbo</p></div>
                  <div><p className="font-bold">{Math.round(perServing.fat)}g</p><p className="text-xs text-muted-foreground">Lemak</p></div>
              </div>
            </div>

            <Separator />
            
            <div>
              <h4 className="font-semibold mb-2">Total untuk Resep ({servings} porsi)</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span>Kalori:</span> <span className="font-medium">{Math.round(totals.calories)} kkal</span></div>
                <div className="flex justify-between"><span>Protein:</span> <span className="font-medium">{Math.round(totals.protein)} g</span></div>
                <div className="flex justify-between"><span>Karbohidrat:</span> <span className="font-medium">{Math.round(totals.carbs)} g</span></div>
                <div className="flex justify-between"><span>Lemak:</span> <span className="font-medium">{Math.round(totals.fat)} g</span></div>
              </div>
            </div>

            <Button className="w-full mt-4">
                <PlusCircle className="mr-2 h-4 w-4" /> Simpan Resep
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
