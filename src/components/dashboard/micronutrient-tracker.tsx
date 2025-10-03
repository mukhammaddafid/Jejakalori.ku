'use client';

import * as React from 'react';
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
  const [trialEndDate, setTrialEndDate] = React.useState<Date | null>(null);
  const [isTrialActive, setIsTrialActive] = React.useState(false);

  React.useEffect(() => {
    const storedEndDate = localStorage.getItem('micronutrientTrialEnd');
    if (storedEndDate) {
      setTrialEndDate(new Date(storedEndDate));
    }
  }, []);

  React.useEffect(() => {
    if (trialEndDate) {
      const now = new Date();
      if (now < trialEndDate) {
        setIsTrialActive(true);
      } else {
        setIsTrialActive(false);
        // localStorage.removeItem('micronutrientTrialEnd');
      }
    }
  }, [trialEndDate]);
  
  const startTrial = () => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    localStorage.setItem('micronutrientTrialEnd', endDate.toISOString());
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

  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle>Mikronutrien</CardTitle>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <ShieldCheck className="h-4 w-4" />
                <span>Premium</span>
            </div>
        </div>
        <CardDescription>Lacak vitamin dan mineral utama.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MicroBar label="Serat" unit="g" consumed={totals.fiber} goal={micronutrientGoals.fiber} />
            <MicroBar label="Zat Besi" unit="mg" consumed={totals.iron} goal={micronutrientGoals.iron} />
            <MicroBar label="Kalsium" unit="mg" consumed={totals.calcium} goal={micronutrientGoals.calcium} />
            <MicroBar label="Vitamin C" unit="mg" consumed={totals.vitaminC} goal={micronutrientGoals.vitaminC} />
        </div>
        {!isTrialActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center p-4">
                <Zap className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-2 text-lg font-semibold">Buka Pelacakan Penuh</h3>
                {trialEndDate && new Date() > trialEndDate ? (
                    <>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Masa uji coba Anda telah berakhir. Tingkatkan untuk terus menggunakan fitur ini. Hanya Rp 50.000/bulan.
                        </p>
                        <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">Tingkatkan ke Premium</Button>
                    </>
                ) : (
                    <>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Coba pelacakan penuh GRATIS selama 7 hari. Lacak 12+ mikronutrien dan dapatkan wawasan terperinci.
                        </p>
                        <Button onClick={startTrial} className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">Mulai Uji Coba 7 Hari</Button>
                    </>
                )}
            </div>
        </div>
        )}
         {isTrialActive && (
          <div className="mt-4 rounded-lg bg-primary/10 p-3 text-center text-sm text-primary-foreground">
            <p className="font-semibold text-primary">Uji Coba Premium Aktif</p>
            <p className="text-primary/80">{getTimeRemaining()}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
