'use client';

import * as React from 'react';
import { foodDatabase } from '@/lib/data';
import type { Food, MealLog } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus } from 'lucide-react';

interface FoodSearchProps {
  onAddFood: (mealLog: MealLog) => void;
}

export function FoodSearch({ onAddFood }: FoodSearchProps) {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<Food[]>([]);
  const [servings, setServings] = React.useState<{ [key: string]: number }>({});

  React.useEffect(() => {
    if (query.length > 1) {
      const filtered = foodDatabase.filter(food =>
        food.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 5));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleAdd = (food: Food) => {
    const numServings = servings[food.id] || 1;
    onAddFood({ food, servings: numServings });
    setQuery('');
  };

  const handleServingsChange = (foodId: string, value: string) => {
    const num = parseFloat(value);
    setServings(prev => ({ ...prev, [foodId]: isNaN(num) ? 1 : num }));
  };

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Cari makanan..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
      />
      {results.length > 0 && (
        <ScrollArea className="h-[200px] w-full rounded-md border p-2">
          <ul className="space-y-2">
            {results.map(food => (
              <li key={food.id} className="flex items-center justify-between gap-2 p-2 rounded-md hover:bg-secondary">
                <div>
                  <p className="font-semibold">{food.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {food.calories} kkal, {food.servingSize}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                   <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    className="h-8 w-20"
                    placeholder="1"
                    value={servings[food.id] || ''}
                    onChange={e => handleServingsChange(food.id, e.target.value)}
                  />
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleAdd(food)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  );
}
