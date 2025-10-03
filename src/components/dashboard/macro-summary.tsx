import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface MacroSummaryProps {
  protein: { consumed: number; goal: number };
  carbs: { consumed: number; goal: number };
  fat: { consumed: number; goal: number };
}

function MacroBar({ label, consumed, goal, colorClass }: { label: string; consumed: number; goal: number; colorClass: string }) {
  const percentage = goal > 0 ? (consumed / goal) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm font-medium">
        <span>{label}</span>
        <span className="text-muted-foreground">{Math.round(consumed)} / {goal}g</span>
      </div>
      <Progress value={percentage} className={`[&>*]:bg-[${colorClass}] h-2`} />
    </div>
  );
}

export function MacroSummary({ protein, carbs, fat }: MacroSummaryProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Makronutrien</CardTitle>
        <CardDescription>Asupan makro harian Anda.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <MacroBar label="Protein" consumed={protein.consumed} goal={protein.goal} colorClass='hsl(var(--chart-1))' />
        <MacroBar label="Karbohidrat" consumed={carbs.consumed} goal={carbs.goal} colorClass='hsl(var(--chart-2))' />
        <MacroBar label="Lemak" consumed={fat.consumed} goal={fat.goal} colorClass='hsl(var(--chart-3))' />
      </CardContent>
    </Card>
  );
}
