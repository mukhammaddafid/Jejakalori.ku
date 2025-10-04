'use client';

import * as React from 'react';
import type { DailyLog, MealLog } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FoodSearch } from './food-search';
import { Plus, Salad, Sandwich, Utensils, Apple, Drumstick, Wheat, Carrot, Fish, Egg, Milk, Nut, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/language-provider';

type MealName = keyof DailyLog;

const foodIcons: { [key: string]: React.ReactNode } = {
    'f1': <Drumstick className="h-6 w-6 text-orange-600" />,
    'f2': <Wheat className="h-6 w-6 text-amber-700" />,
    'f3': <Carrot className="h-6 w-6 text-green-600" />,
    'f4': <Fish className="h-6 w-6 text-sky-500" />,
    'f5': <Apple className="h-6 w-6 text-red-500" />,
    'f6': <Nut className="h-6 w-6 text-yellow-800" />,
    'f7': <Wheat className="h-6 w-6 text-amber-500" />,
    'f8': <Egg className="h-6 w-6 text-yellow-400" />,
    'f9': <Milk className="h-6 w-6 text-blue-300" />,
    'f10': <Salad className="h-6 w-6 text-lime-600" />,
};

function FoodItemIcon({ foodId }: { foodId: string }) {
    const icon = foodIcons[foodId] || <Apple className="h-6 w-6" />;
    return <div className="w-10 h-10 flex items-center justify-center bg-secondary rounded-md">{icon}</div>;
}

interface FoodLogProps {
  log: DailyLog;
  onLogChange: (log: DailyLog) => void;
}

export function FoodLog({ log, onLogChange }: FoodLogProps) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [currentMeal, setCurrentMeal] = React.useState<MealName>('breakfast');
  const { toast } = useToast();
  const { t } = useLanguage();

  const mealNames: { [key in MealName]: string } = {
    breakfast: t('breakfast'),
    lunch: t('lunch'),
    dinner: t('dinner'),
    snacks: t('snacks'),
  };
  
  const mealIcons = {
    breakfast: <Sandwich className="h-5 w-5 mr-2" />,
    lunch: <Utensils className="h-5 w-5 mr-2" />,
    dinner: <Salad className="h-5 w-5 mr-2" />,
    snacks: <Apple className="h-5 w-5 mr-2" />,
  };

  const handleAddFood = (mealLog: MealLog) => {
    const updatedLog = { ...log };
    updatedLog[currentMeal] = [...updatedLog[currentMeal], mealLog];
    onLogChange(updatedLog);

    setOpenDialog(false);
    toast({
      title: t('foodAdded'),
      description: t('foodAddedDescription', { servings: mealLog.servings, name: t(mealLog.food.id as any), meal: mealNames[currentMeal] }),
    });
  };

  const handleRemoveFood = (mealName: MealName, index: number) => {
    const updatedLog = { ...log };
    updatedLog[mealName] = updatedLog[mealName].filter((_, i) => i !== index);
    onLogChange(updatedLog);
  };

  const openAddFoodDialog = (meal: MealName) => {
    setCurrentMeal(meal);
    setOpenDialog(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('todaysLog')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <Accordion type="multiple" defaultValue={['breakfast', 'lunch', 'dinner', 'snacks']} className="w-full">
            {(Object.keys(log) as MealName[]).map(mealName => (
              <AccordionItem value={mealName} key={mealName}>
                <AccordionTrigger className="text-lg font-semibold capitalize">
                  <div className="flex items-center">
                    {mealIcons[mealName]}
                    {mealNames[mealName]}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {log[mealName].length > 0 ? (
                      log[mealName].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 rounded-md hover:bg-secondary/80 group">
                          <div className="flex items-center gap-3">
                            <FoodItemIcon foodId={item.food.id} />
                            <div>
                              <p className="font-medium">{t(item.food.id as any)}</p>
                              <p className="text-sm text-muted-foreground">{item.servings} {t('servings')}</p>
                            </div>
                          </div>
                          <div className='flex items-center'>
                            <p className="font-mono text-sm mr-2">{Math.round(item.food.calories * item.servings)} kcal</p>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100" onClick={() => handleRemoveFood(mealName, index)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">{t('noFoodLogged', { meal: mealNames[mealName] })}</p>
                    )}
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="w-full mt-2" onClick={() => openAddFoodDialog(mealName)}>
                        <Plus className="mr-2 h-4 w-4" /> {t('addFood')}
                      </Button>
                    </DialogTrigger>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('addFoodTo', { meal: mealNames[currentMeal] })}</DialogTitle>
            </DialogHeader>
            <FoodSearch onAddFood={handleAddFood} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
