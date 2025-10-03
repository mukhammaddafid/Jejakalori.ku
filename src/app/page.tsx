
'use client';

import * as React from 'react';
import { mockUserData } from '@/lib/data';
import type { DailyLog, NutrientTotals } from '@/lib/types';
import { CalorieSummary } from '@/components/dashboard/calorie-summary';
import { MacroSummary } from '@/components/dashboard/macro-summary';
import { FoodLog } from '@/components/dashboard/food-log';
import { WeeklyTrends } from '@/components/dashboard/weekly-trends';
import { AiSummaryCard } from '@/components/dashboard/ai-summary-card';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { ShieldCheck, Dumbbell, BrainCircuit, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MicronutrientTracker } from '@/components/dashboard/micronutrient-tracker';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Helper function to calculate totals
function calculateTotals(log: DailyLog): NutrientTotals {
  const totals: NutrientTotals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    saturatedFat: 0,
    unsaturatedFat: 0,
  };

  const allMeals = [
    ...log.breakfast,
    ...log.lunch,
    ...log.dinner,
    ...log.snacks,
  ];

  allMeals.forEach(item => {
    totals.calories += (item.food.calories || 0) * item.servings;
    totals.protein += (item.food.protein || 0) * item.servings;
    totals.carbs += (item.food.carbs || 0) * item.servings;
    totals.fat += (item.food.fat || 0) * item.servings;
    totals.saturatedFat += (item.food.nutrients.saturatedFat || 0) * item.servings;
    totals.unsaturatedFat += (item.food.nutrients.unsaturatedFat || 0) * item.servings;
  });

  return totals;
}

const PremiumFeatureWithTrial: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  trialDays: number;
  storageKey: string;
  children: React.ReactNode;
}> = ({ icon, title, description, trialDays, storageKey, children }) => {
  const [trialEndDate, setTrialEndDate] = React.useState<Date | null>(null);
  const [isTrialActive, setIsTrialActive] = React.useState(false);

  React.useEffect(() => {
    const storedEndDate = localStorage.getItem(storageKey);
    if (storedEndDate) {
      const endDate = new Date(storedEndDate);
      setTrialEndDate(endDate);
      setIsTrialActive(new Date() < endDate);
    }
  }, [storageKey]);

  const startTrial = () => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + trialDays);
    localStorage.setItem(storageKey, endDate.toISOString());
    setTrialEndDate(endDate);
    setIsTrialActive(true);
  };

  const getTimeRemaining = () => {
    if (!trialEndDate) return '';
    const now = new Date();
    const difference = trialEndDate.getTime() - now.getTime();

    if (difference <= 0) return 'Uji coba berakhir.';

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days} hari ${hours} jam tersisa`;
  };

  const isTrialEnded = trialEndDate && new Date() > trialEndDate;

  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">{icon} {title}</CardTitle>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <ShieldCheck className="h-4 w-4" />
                <span>Premium</span>
            </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isTrialActive && 
          <div className="rounded-lg bg-primary/10 p-3 text-center text-sm text-primary-foreground">
            <p className="font-semibold text-primary">Uji Coba Premium Aktif</p>
            <p className="text-primary/80">{getTimeRemaining()}</p>
          </div>
        }
        {children}
      </CardContent>
      {(!isTrialActive && !trialEndDate || isTrialEnded) && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center p-4">
                <Zap className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-2 text-lg font-semibold">Buka Fitur {title}</h3>
                {isTrialEnded ? (
                    <>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Masa uji coba Anda telah berakhir. Tingkatkan untuk terus menggunakan fitur ini.
                        </p>
                        <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">Tingkatkan ke Premium</Button>
                    </>
                ) : (
                    <>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Coba fitur ini GRATIS selama {trialDays} hari dan dapatkan wawasan penuh.
                        </p>
                        <Button onClick={startTrial} className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">Mulai Uji Coba {trialDays} Hari</Button>
                    </>
                )}
            </div>
        </div>
        )}
    </Card>
  );
};

export default function DashboardPage() {
  const userData = mockUserData;
  const totals = calculateTotals(userData.log);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
      return null;
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-1 flex">
              <CalorieSummary consumed={totals.calories} goal={userData.goals.calories} />
            </div>
            <div className="sm:col-span-2 flex">
              <MacroSummary totals={totals} goals={userData.goals} />
            </div>
          </div>
          <FoodLog initialLog={userData.log} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          <AiSummaryCard userData={userData} />
          <WeeklyTrends />
          <MicronutrientTracker log={userData.log} />
           <PremiumFeatureWithTrial
            icon={<BrainCircuit />}
            title="Analisis Kebiasaan"
            description="AI akan menganalisis pola makan Anda dan memberikan wawasan."
            trialDays={3}
            storageKey="habitAnalysisTrialEnd"
           >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <span className="font-semibold">Pilih Jenis Analisis</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                    <RadioGroup defaultValue="pola-makan">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="pola-makan" id="pola-makan" />
                            <Label htmlFor="pola-makan">Analisis Pola Makan</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="waktu-makan" id="waktu-makan" />
                            <Label htmlFor="waktu-makan">Analisis Waktu Makan</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="asupan-nutrisi" id="asupan-nutrisi" />
                            <Label htmlFor="asupan-nutrisi">Analisis Asupan Nutrisi</Label>
                        </div>
                    </RadioGroup>
                    <Button className="w-full">Mulai Analisis</Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
           </PremiumFeatureWithTrial>
           <PremiumFeatureWithTrial
            icon={<Dumbbell />}
            title="Rencana Latihan Massa"
            description="Rencana latihan yang dipersonalisasi oleh AI untuk diet Anda."
            trialDays={5}
            storageKey="workoutPlanTrialEnd"
           >
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <span className="font-semibold">Pilih Tujuan Latihan</span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                        <RadioGroup defaultValue="weight-loss">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="weight-loss" id="weight-loss" />
                                <Label htmlFor="weight-loss">Penurunan Berat Badan</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="muscle-gain" id="muscle-gain" />
                                <Label htmlFor="muscle-gain">Peningkatan Massa Otot</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="stamina" id="stamina" />
                                <Label htmlFor="stamina">Peningkatan Stamina</Label>
                            </div>
                        </RadioGroup>
                        <Button className="w-full">Buat Rencana Latihan</Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
           </PremiumFeatureWithTrial>
        </div>
      </div>
    </div>
  );
}
