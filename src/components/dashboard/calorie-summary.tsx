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
      <CardContent className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <div className="relative h-48 w-48">
          <ChartContainer config={{}} className="absolute inset-0">
            <RadialBarChart
              innerRadius="75%"
              outerRadius="100%"
              data={chartData}
              startAngle={225}
              endAngle={-45}
              barSize={16}
              maxBarSize={16}
              domain={[0, goal]}
            >
              <RadialBar
                dataKey="value"
                background={{ fill: 'hsl(var(--muted))' }}
                cornerRadius={8}
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
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
            <Flame className="h-10 w-10 text-primary" />
          </div>
        </div>

        <div className="mt-2">
             <span className="text-4xl font-bold font-headline text-primary">{Math.round(consumed)}</span>
             <p className="text-sm text-muted-foreground">kkal</p>
        </div>
        
        <div className="w-full space-y-2 text-sm text-left mt-4">
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
