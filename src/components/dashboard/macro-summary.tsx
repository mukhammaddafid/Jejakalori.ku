import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/lib/language-provider';
import type { NutrientTotals, UserGoals } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface MacroSummaryProps {
  totals: NutrientTotals;
  goals: UserGoals;
}

function MacroBar({ label, consumed, goal, colorClass, unit = 'g' }: { label: string; consumed: number; goal: number; colorClass: string, unit?: string }) {
  const percentage = goal > 0 ? (consumed / goal) * 100 : 0;
  const displayGoal = goal > 0 ? ` / ${goal}${unit}` : '';
  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between text-sm font-medium">
        <span>{label}</span>
        <span className="text-muted-foreground">{Math.round(consumed)}{unit}{displayGoal}</span>
      </div>
      <Progress value={percentage} className={`[&>*]:bg-${colorClass} h-2`} />
    </div>
  );
}

function AccordionMacroBar({ label, consumed, goal, colorClass, unit = 'g' }: { label: string; consumed: number; goal: number; colorClass: string, unit?: string }) {
    const percentage = goal > 0 ? (consumed / goal) * 100 : 0;
    return (
        <div className='w-full'>
            <Progress value={percentage} className={`[&>*]:bg-${colorClass} h-2 mb-1`} />
            <div className="flex justify-between text-sm font-medium">
                <span>{label}</span>
                <span className="text-muted-foreground">{Math.round(consumed)}{unit} / {goal}{unit}</span>
            </div>
        </div>
    );
}

export function MacroSummary({ totals, goals }: MacroSummaryProps) {
  const { t } = useLanguage();
  const proteinGoal = goals.protein;
  const carbGoal = goals.carbs;
  const fatGoal = goals.fat;
  
  // Assuming goals for sub-categories are proportional to the main goal, or could be set separately in a more advanced setup.
  const animalProteinGoal = proteinGoal > 0 ? proteinGoal * 0.7 : 0; // Example: 70% from animal
  const plantProteinGoal = proteinGoal > 0 ? proteinGoal * 0.3 : 0; // Example: 30% from plant
  const fiberGoal = 30; // General recommendation
  const sugarGoal = carbGoal > 0 ? carbGoal * 0.1 : 0; // Example: 10% of carbs from sugar
  const starchGoal = carbGoal > 0 ? carbGoal - (totals.fiber > fiberGoal ? totals.fiber : fiberGoal) - sugarGoal : 0;
  const saturatedFatGoal = goals.saturatedFat;
  const unsaturatedFatGoal = fatGoal > 0 ? fatGoal - saturatedFatGoal : 0;


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('macronutrients')}</CardTitle>
        <CardDescription>{t('macronutrientsDescription')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        <Accordion type="multiple">
          <AccordionItem value="protein" className="border-b-0">
            <AccordionTrigger className="py-2 hover:no-underline -mx-2 px-2 rounded-md hover:bg-muted">
                <AccordionMacroBar label={t('protein')} consumed={totals.protein} goal={proteinGoal} colorClass="chart-1" />
            </AccordionTrigger>
            <AccordionContent className="pl-4 pt-2 space-y-3">
              <MacroBar label={t('animalProtein')} consumed={totals.animalProtein} goal={animalProteinGoal} colorClass="purple-500" />
              <MacroBar label={t('plantProtein')} consumed={totals.plantProtein} goal={plantProteinGoal} colorClass="green-500" />
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="carbs" className="border-b-0">
            <AccordionTrigger className="py-2 hover:no-underline -mx-2 px-2 rounded-md hover:bg-muted">
                <AccordionMacroBar label={t('carbohydrates')} consumed={totals.carbs} goal={carbGoal} colorClass="chart-2" />
            </AccordionTrigger>
            <AccordionContent className="pl-4 pt-2 space-y-3">
              <MacroBar label={t('starch')} consumed={totals.starch} goal={starchGoal > 0 ? starchGoal : 1} colorClass="yellow-500" />
              <MacroBar label={t('sugar')} consumed={totals.sugar} goal={sugarGoal} colorClass="pink-500" />
              <MacroBar label={t('fiber')} consumed={totals.fiber} goal={fiberGoal} colorClass="teal-500" />
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="fat" className="border-b-0">
            <AccordionTrigger className="py-2 hover:no-underline -mx-2 px-2 rounded-md hover:bg-muted">
                <AccordionMacroBar label={t('fat')} consumed={totals.fat} goal={fatGoal} colorClass="chart-3" />
            </AccordionTrigger>
            <AccordionContent className="pl-4 pt-2 space-y-3">
              <MacroBar label={t('saturatedFat')} consumed={totals.saturatedFat} goal={saturatedFatGoal} colorClass="chart-4" />
              <MacroBar label={t('unsaturatedFat')} consumed={totals.unsaturatedFat} goal={unsaturatedFatGoal > 0 ? unsaturatedFatGoal : 1} colorClass="chart-5" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
