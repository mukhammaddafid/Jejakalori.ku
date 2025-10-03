
'use client';
import * as React from 'react';
import { TdeeCalculator } from '@/components/profile/tdee-calculator';
import { GoalSetter } from '@/components/profile/goal-setter';
import { mockUserData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bed, Smartphone, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PotentialCard } from '@/components/profile/potential-card';


const sleepData = [
    { day: 'Sen', hours: 6.5 },
    { day: 'Sel', hours: 7 },
    { day: 'Rab', hours: 8 },
    { day: 'Kam', hours: 6 },
    { day: 'Jum', hours: 7.5 },
    { day: 'Sab', hours: 9 },
    { day: 'Min', hours: 8.5 },
];

const screenTimeData = [
  { day: 'Sen', hours: 5 },
  { day: 'Sel', hours: 6 },
  { day: 'Rab', hours: 4.5 },
  { day: 'Kam', hours: 7 },
  { day: 'Jum', hours: 8 },
  { day: 'Sab', hours: 9 },
  { day: 'Min', hours: 7.5 },
];

const dailyScreenTimeData = [
    { name: 'Kerja', value: 4.5, fill: 'hsl(var(--chart-1))' },
    { name: 'Sosmed', value: 2, fill: 'hsl(var(--chart-2))'},
    { name: 'Hiburan', value: 1.5, fill: 'hsl(var(--chart-3))' },
];

function PremiumFeatureCard({ icon, title, description, children }: { icon: React.ReactNode, title: string, description: string, children: React.ReactNode }) {
  return (
    <Card className="relative overflow-hidden">
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="premium-feature">
                <AccordionTrigger className="px-6 py-4">
                    <div className='w-full'>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2 text-xl">{icon} {title}</CardTitle>
                            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                                <ShieldCheck className="h-4 w-4" />
                                <span>Premium</span>
                            </div>
                        </div>
                        <CardDescription className='text-left'>{description}</CardDescription>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                    {children}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </Card>
  );
}


export default function ProfilePage() {
  const userData = mockUserData;
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="space-y-6">
        <TdeeCalculator initialProfile={userData.profile} />
        <GoalSetter initialGoals={userData.goals} />
        
        <PotentialCard />

        <PremiumFeatureCard
            icon={<Bed />}
            title="Pelacak Durasi Tidur"
            description="Pantau kualitas dan durasi tidur Anda untuk pemulihan optimal."
        >
            <div className="space-y-4">
                 <h4 className="font-semibold">Tren Tidur Mingguan</h4>
                <ChartContainer config={{ hours: { label: 'Jam Tidur', color: 'hsl(var(--chart-1))' } }} className="h-[200px] w-full">
                    <BarChart data={sleepData} accessibilityLayer>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="hours" fill="var(--color-hours)" radius={4} />
                    </BarChart>
                </ChartContainer>
                <Button variant="link" className="text-primary p-0">Lihat Laporan Tidur Lengkap</Button>
            </div>
        </PremiumFeatureCard>
        <PremiumFeatureCard
            icon={<Smartphone />}
            title="Jeda Menggunakan Gawai"
            description="Atur pengingat untuk beristirahat dari layar dan menjaga kesehatan mata."
        >
            <div className="grid md:grid-cols-2 gap-6 items-center">
                 <div>
                    <h4 className="font-semibold mb-2">Penggunaan Harian</h4>
                     <ChartContainer config={{}} className="h-[150px] w-full">
                        <PieChart accessibilityLayer>
                           <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                           <Pie data={dailyScreenTimeData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={60}>
                             {dailyScreenTimeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                           </Pie>
                        </PieChart>
                    </ChartContainer>
                 </div>
                 <div>
                    <h4 className="font-semibold mb-2">Tren Mingguan</h4>
                    <ChartContainer config={{ hours: { label: 'Jam', color: 'hsl(var(--chart-2))' } }} className="h-[150px] w-full">
                        <BarChart data={screenTimeData} accessibilityLayer margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                            <YAxis tickLine={false} axisLine={false} tickMargin={8} width={20}/>
                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                            <Bar dataKey="hours" fill="var(--color-hours)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                 </div>
            </div>
             <Button variant="link" className="text-primary p-0 mt-2">Atur Pengingat Jeda</Button>
        </PremiumFeatureCard>
      </div>
    </div>
  );
}
