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
import { Plus, Salad, Sandwich, Utensils, Apple } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FoodLogProps {
  initialLog: DailyLog;
}

const mealNames: { [key in MealName]: string } = {
  breakfast: 'Sarapan',
  lunch: 'Makan Siang',
  dinner: 'Makan Malam',
  snacks: 'Camilan',
};

const mealIcons = {
  breakfast: <Sandwich className="h-5 w-5 mr-2" />,
  lunch: <Utensils className="h-5 w-5 mr-2" />,
  dinner: <Salad className="h-5 w-5 mr-2" />,
  snacks: <Apple className="h-5 w-5 mr-2" />,
};

type MealName = keyof DailyLog;

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
      title: 'Makanan Ditambahkan',
      description: `${mealLog.servings} x ${mealLog.food.name} ditambahkan ke ${mealNames[currentMeal]}.`,
    });
  };

  const openAddFoodDialog = (meal: MealName) => {
    setCurrentMeal(meal);
    setOpenDialog(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Catatan Hari Ini</CardTitle>
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
                          <div>
                            <p className="font-medium">{item.food.name}</p>
                            <p className="text-sm text-muted-foreground">{item.servings} porsi</p>
                          </div>
                          <p className="font-mono text-sm">{Math.round(item.food.calories * item.servings)} kkal</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">Belum ada makanan yang dicatat untuk {mealNames[mealName]}.</p>
                    )}
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="w-full mt-2" onClick={() => openAddFoodDialog(mealName)}>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Makanan
                      </Button>
                    </DialogTrigger>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tambah makanan ke {mealNames[currentMeal]}</DialogTitle>
            </DialogHeader>
            <FoodSearch onAddFood={handleAddFood} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
