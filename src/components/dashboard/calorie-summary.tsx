'use client';

import * as React from 'react';
import { Target, MinusCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { RadialBar, RadialBarChart } from 'recharts';

interface CalorieSummaryProps {
  consumed: number;
  goal: number;
}

export function CalorieSummary({ consumed, goal }: CalorieSummaryProps) {
  const percentage = goal > 0 ? (consumed / goal) * 100 : 0;
  const remaining = goal - consumed;

  const chartData = [
    { name: 'Calories', value: percentage, fill: 'hsl(var(--primary))' },
  ];

  return (
    <Card className="flex flex-col w-full p-4">
      <CardContent className="flex flex-1 flex-col items-center justify-between gap-4">
        <div className="relative h-28 w-28">
          <ChartContainer config={{}} className="absolute inset-0">
            <RadialBarChart
              innerRadius="80%"
              outerRadius="100%"
              data={chartData}
              startAngle={90}
              endAngle={450}
              barSize={8}
            >
              <RadialBar
                dataKey="value"
                background={{ fill: 'hsl(var(--muted))' }}
                cornerRadius={5}
              />
            </RadialBarChart>
          </ChartContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center -mt-2">
            <p className="text-3xl font-bold font-headline">{Math.round(consumed)}</p>
            <p className="text-xs text-muted-foreground">Terkonsumsi</p>
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
