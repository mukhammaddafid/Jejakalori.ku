'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const weeklyData = [
  { date: 'Sen', calories: 1800, protein: 120 },
  { date: 'Sel', calories: 2100, protein: 150 },
  { date: 'Rab', calories: 1950, protein: 135 },
  { date: 'Kam', calories: 2200, protein: 160 },
  { date: 'Jum', calories: 2300, protein: 155 },
  { date: 'Sab', calories: 2500, protein: 180 },
  { date: 'Min', calories: 2150, protein: 140 },
];

const dailyData = [
    { time: '8am', calories: 350 },
    { time: '10am', calories: 150 },
    { time: '1pm', calories: 750 },
    { time: '4pm', calories: 200 },
    { time: '7pm', calories: 650 },
];

const chartConfig = {
  calories: {
    label: 'Kalori',
    color: 'hsl(var(--chart-1))',
  },
  protein: {
    label: 'Protein',
    color: 'hsl(var(--chart-2))',
  }
};

export function WeeklyTrends() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Tren</CardTitle>
            <CardDescription>Analisis asupan Anda berdasarkan waktu.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="weekly">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="daily">Harian</TabsTrigger>
                    <TabsTrigger value="weekly">Mingguan</TabsTrigger>
                </TabsList>
                <TabsContent value="daily">
                    <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <LineChart data={dailyData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                            dataKey="time"
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
                            <Line dataKey="calories" type="monotone" fill="var(--color-calories)" stroke="var(--color-calories)" strokeWidth={2} dot={true} />
                        </LineChart>
                    </ChartContainer>
                </TabsContent>
                <TabsContent value="weekly">
                    <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <BarChart data={weeklyData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
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
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
  );
}
