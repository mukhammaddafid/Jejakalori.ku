'use client';

import * as React from 'react';
import { Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
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
    <Card className="flex flex-col w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Kalori</CardTitle>
        <Flame className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent className="flex flex-1 flex-col items-center justify-center gap-4">
        <div className="relative h-32 w-32">
          <ChartContainer config={{}} className="absolute inset-0">
            <RadialBarChart
              innerRadius="80%"
              outerRadius="100%"
              data={chartData}
              startAngle={90}
              endAngle={450}
              barSize={10}
            >
              <RadialBar
                dataKey="value"
                background={{ fill: 'hsl(var(--muted))' }}
                cornerRadius={5}
              />
            </RadialBarChart>
          </ChartContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold font-headline">{consumed}</p>
            <p className="text-xs text-muted-foreground">Terkonsumsi</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">{goal}</p>
          <p className="text-sm text-muted-foreground">Target Harian</p>
        </div>
        <p className="text-xs text-muted-foreground">{remaining >= 0 ? `${remaining} kkal tersisa` : `${Math.abs(remaining)} kkal berlebih`}</p>
      </CardContent>
    </Card>
  );
}
