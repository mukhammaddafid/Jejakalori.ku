import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Zap, ShieldCheck } from 'lucide-react';
import type { DailyLog } from '@/lib/types';
import { micronutrientGoals } from '@/lib/data';

interface MicronutrientTrackerProps {
  log: DailyLog;
}

function calculateTotalMicros(log: DailyLog) {
  const totals = { vitaminC: 0, vitaminD: 0, calcium: 0, iron: 0, fiber: 0 };
  const meals = Object.values(log).flat();
  
  for (const item of meals) {
    for (const key in totals) {
      if (item.food.nutrients[key]) {
        totals[key as keyof typeof totals] += item.food.nutrients[key] * item.servings;
      }
    }
  }
  return totals;
}

function MicroBar({ label, unit, consumed, goal }: { label: string; unit: string; consumed: number; goal: number }) {
  const percentage = goal > 0 ? (consumed / goal) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{Math.round(consumed)}{unit} / {goal}{unit}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}


export function MicronutrientTracker({ log }: MicronutrientTrackerProps) {
  const totals = calculateTotalMicros(log);

  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle>Micronutrients</CardTitle>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <ShieldCheck className="h-4 w-4" />
                <span>Premium</span>
            </div>
        </div>
        <CardDescription>Track key vitamins and minerals.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MicroBar label="Fiber" unit="g" consumed={totals.fiber} goal={micronutrientGoals.fiber} />
            <MicroBar label="Iron" unit="mg" consumed={totals.iron} goal={micronutrientGoals.iron} />
            <MicroBar label="Calcium" unit="mg" consumed={totals.calcium} goal={micronutrientGoals.calcium} />
            <MicroBar label="Vitamin C" unit="mg" consumed={totals.vitaminC} goal={micronutrientGoals.vitaminC} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center p-4">
                <Zap className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-2 text-lg font-semibold">Unlock Full Tracking</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    Upgrade to Premium to track 12+ micronutrients and get detailed insights.
                </p>
                <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">Upgrade Now</Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
