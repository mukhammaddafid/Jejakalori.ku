'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { date: 'Sen', calories: 1800 },
  { date: 'Sel', calories: 2100 },
  { date: 'Rab', calories: 1950 },
  { date: 'Kam', calories: 2200 },
  { date: 'Jum', calories: 2300 },
  { date: 'Sab', calories: 2500 },
  { date: 'Min', calories: 2150 },
];

const chartConfig = {
  calories: {
    label: 'Kalori',
    color: 'hsl(var(--chart-1))',
  },
};

export function WeeklyTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tren Mingguan</CardTitle>
        <CardDescription>Asupan kalori Anda selama 7 hari terakhir.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="calories" fill="var(--color-calories)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
