'use client';

import * as React from 'react';
import { Target, MinusCircle, Flame } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { RadialBar, RadialBarChart, Tooltip } from 'recharts';

interface CalorieSummaryProps {
  consumed: number;
  goal: number;
}

export function CalorieSummary({ consumed, goal }: CalorieSummaryProps) {
  const remaining = goal - consumed;

  const chartData = [
    { name: 'Terkonsumsi', value: consumed, fill: 'hsl(var(--primary))' },
  ];

  return (
    <Card className="flex flex-col w-full p-4">
      <CardContent className="flex flex-1 flex-col items-center justify-between gap-4">
        <div className="relative h-40 w-40">
          <ChartContainer config={{}} className="absolute inset-0">
            <RadialBarChart
              innerRadius="75%"
              outerRadius="100%"
              data={chartData}
              startAngle={90}
              endAngle={450}
              barSize={12}
              maxBarSize={12}
              domain={[0, goal]}
            >
              <RadialBar
                dataKey="value"
                background={{ fill: 'hsl(var(--muted))' }}
                cornerRadius={6}
              />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                content={({ payload }) => {
                  if (payload && payload.length > 0) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Terkonsumsi</span>
                          <span className="font-bold text-foreground">{`${Math.round(consumed)} / ${goal} kkal`}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </RadialBarChart>
          </ChartContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
             <span className="text-3xl font-bold font-headline text-primary">{Math.round(consumed)}</span>
             <span className="text-xs text-muted-foreground">kkal</span>
          </div>
        </div>
        
        <div className="w-full space-y-2 text-sm">
            <div className="flex items-center justify-between gap-2">
                <div className='flex items-center gap-2 text-muted-foreground'>
                    <Target className="h-4 w-4" />
                    <span>Target Harian</span>
                </div>
                <span className="font-semibold">{goal}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
                <div className='flex items-center gap-2 text-muted-foreground'>
                    <MinusCircle className="h-4 w-4" />
                    <span>Tersisa</span>
                </div>
                <span className="font-semibold">{Math.round(remaining)}</span>
            </div>
        </div>

      </CardContent>
    </Card>
  );
}
