'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { date: 'Mon', calories: 1800 },
  { date: 'Tue', calories: 2100 },
  { date: 'Wed', calories: 1950 },
  { date: 'Thu', calories: 2200 },
  { date: 'Fri', calories: 2300 },
  { date: 'Sat', calories: 2500 },
  { date: 'Sun', calories: 2150 },
];

const chartConfig = {
  calories: {
    label: 'Calories',
    color: 'hsl(var(--chart-1))',
  },
};

export function WeeklyTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Trends</CardTitle>
        <CardDescription>Your calorie intake for the last 7 days.</CardDescription>
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
