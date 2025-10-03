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
import { Plus, Salad, Sandwich, Utensils, Apple, Drumstick, Wheat, Carrot, Fish, Egg, Milk, Nut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FoodLogProps {
  initialLog: DailyLog;
}

const mealNames: { [key in MealName]: string } = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snacks: 'Snacks',
};

const mealIcons = {
  breakfast: <Sandwich className="h-5 w-5 mr-2" />,
  lunch: <Utensils className="h-5 w-5 mr-2" />,
  dinner: <Salad className="h-5 w-5 mr-2" />,
  snacks: <Apple className="h-5 w-5 mr-2" />,
};

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

export function FoodLog({ initialLog }: FoodLogProps) {
  const [log, setLog] = React.useState<DailyLog>(initialLog);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [currentMeal, setCurrentMeal] = React.useState<MealName>('breakfast');
  const { toast } = useToast();

  const handleAddFood = (mealLog: MealLog) => {
    setLog(prevLog => {
      const updatedMeal = [...prevLog[currentMeal], mealLog];
      return { ...prevLog, [currentMeal]: updatedMeal };
    });
    setOpenDialog(false);
    toast({
      title: 'Food Added',
      description: `${mealLog.servings} x ${mealLog.food.name} added to ${mealNames[currentMeal]}.`,
    });
  };

  const openAddFoodDialog = (meal: MealName) => {
    setCurrentMeal(meal);
    setOpenDialog(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Log</CardTitle>
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
                        <div key={index} className="flex justify-between items-center p-2 rounded-md bg-secondary">
                          <div className="flex items-center gap-3">
                            <FoodItemIcon foodId={item.food.id} />
                            <div>
                              <p className="font-medium">{item.food.name}</p>
                              <p className="text-sm text-muted-foreground">{item.servings} serving(s)</p>
                            </div>
                          </div>
                          <p className="font-mono text-sm">{Math.round(item.food.calories * item.servings)} kcal</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">No food logged for {mealNames[mealName]} yet.</p>
                    )}
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="w-full mt-2" onClick={() => openAddFoodDialog(mealName)}>
                        <Plus className="mr-2 h-4 w-4" /> Add Food
                      </Button>
                    </DialogTrigger>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add food to {mealNames[currentMeal]}</DialogTitle>
            </DialogHeader>
            <FoodSearch onAddFood={handleAddFood} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
