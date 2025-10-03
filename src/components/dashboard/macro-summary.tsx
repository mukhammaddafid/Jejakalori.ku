import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { NutrientTotals, UserGoals } from '@/lib/types';

interface MacroSummaryProps {
  totals: NutrientTotals;
  goals: UserGoals;
}

function MacroBar({ label, consumed, goal, colorClass, unit = 'g' }: { label: string; consumed: number; goal: number; colorClass: string, unit?: string }) {
  const percentage = goal > 0 ? (consumed / goal) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm font-medium">
        <span>{label}</span>
        <span className="text-muted-foreground">{Math.round(consumed)} / {goal}{unit}</span>
      </div>
      <Progress value={percentage} className={`[&>*]:bg-[${colorClass}] h-2`} />
    </div>
  );
}

export function MacroSummary({ totals, goals }: MacroSummaryProps) {
  const totalFat = totals.fat;
  const totalSaturatedFat = totals.saturatedFat;
  const totalUnsaturatedFat = totals.unsaturatedFat;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Makronutrien</CardTitle>
        <CardDescription>Asupan makro harian Anda.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <MacroBar label="Protein" consumed={totals.protein} goal={goals.protein} colorClass='hsl(var(--chart-1))' />
          <MacroBar label="Karbohidrat" consumed={totals.carbs} goal={goals.carbs} colorClass='hsl(var(--chart-2))' />
          <div className='space-y-2'>
            <MacroBar label="Lemak" consumed={totalFat} goal={goals.fat} colorClass='hsl(var(--chart-3))' />
            <div className='pl-4 space-y-2'>
              <MacroBar label="Lemak Jenuh" consumed={totalSaturatedFat} goal={goals.saturatedFat} colorClass='hsl(var(--chart-4))' unit="g"/>
              <MacroBar label="Lemak Tak Jenuh" consumed={totalUnsaturatedFat} goal={goals.fat - goals.saturatedFat} colorClass='hsl(var(--chart-5))' unit="g"/>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
