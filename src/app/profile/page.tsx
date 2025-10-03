'use client';
import * as React from 'react';
import { TdeeCalculator } from '@/components/profile/tdee-calculator';
import { GoalSetter } from '@/components/profile/goal-setter';
import { mockUserData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bed, Smartphone, ShieldCheck, Dumbbell, BookOpen, Music, Code, Brush, Cooking, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/lib/language-provider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const sleepData = [
    { day: 'Mon', hours: 6.5 },
    { day: 'Tue', hours: 7 },
    { day: 'Wed', hours: 8 },
    { day: 'Thu', hours: 6 },
    { day: 'Fri', hours: 7.5 },
    { day: 'Sat', hours: 9 },
    { day: 'Sun', hours: 8.5 },
];

const screenTimeData = [
  { day: 'Mon', hours: 5 },
  { day: 'Tue', hours: 6 },
  { day: 'Wed', hours: 4.5 },
  { day: 'Thu', hours: 7 },
  { day: 'Fri', hours: 8 },
  { day: 'Sat', hours: 9 },
  { day: 'Sun', hours: 7.5 },
];

const dailyScreenTimeData = [
    { name: 'Work', value: 4.5, fill: 'hsl(var(--chart-1))' },
    { name: 'Social', value: 2, fill: 'hsl(var(--chart-2))'},
    { name: 'Entertainment', value: 1.5, fill: 'hsl(var(--chart-3))' },
];

function PremiumFeatureCard({ icon, title, description, children }: { icon: React.ReactNode, title: string, description: string, children: React.ReactNode }) {
  const { t } = useLanguage();
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
                                <span>{t('premium')}</span>
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

function HobbiesSection() {
    const { t } = useLanguage();
    const hobbies = [
        { id: 'sports', label: t('sports'), icon: <Dumbbell className="h-5 w-5" /> },
        { id: 'reading', label: t('reading'), icon: <BookOpen className="h-5 w-5" /> },
        { id: 'music', label: t('music'), icon: <Music className="h-5 w-5" /> },
        { id: 'coding', label: t('coding'), icon: <Code className="h-5 w-5" /> },
        { id: 'art', label: t('art'), icon: <Brush className="h-5 w-5" /> },
        { id: 'cooking', label: t('cooking'), icon: <Cooking className="h-5 w-5" /> },
        { id: 'photography', label: t('photography'), icon: <Camera className="h-5 w-5" /> },
    ];
    return (
        <div className="space-y-4 pt-4">
            <Accordion type="single" collapsible>
                <AccordionItem value="hobbies">
                    <AccordionTrigger>{t('hobbies')}</AccordionTrigger>
                    <AccordionContent className="pt-4 grid grid-cols-2 gap-4">
                        {hobbies.map((hobby) => (
                            <div key={hobby.id} className="flex items-center space-x-2">
                                <Checkbox id={hobby.id} />
                                <Label htmlFor={hobby.id} className="flex items-center gap-2 font-normal">
                                    {hobby.icon}
                                    {hobby.label}
                                </Label>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default function ProfilePage() {
  const userData = mockUserData;
  const [isClient, setIsClient] = React.useState(false);
  const { t } = useLanguage();
  
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
        
        <PremiumFeatureCard
            icon={<Bed />}
            title={t('sleepDurationTracker')}
            description={t('sleepDurationTrackerDescription')}
        >
            <div className="space-y-4">
                 <h4 className="font-semibold">{t('weeklySleepTrend')}</h4>
                <ChartContainer config={{ hours: { label: t('hoursSlept'), color: 'hsl(var(--chart-1))' } }} className="h-[200px] w-full">
                    <BarChart data={sleepData} accessibilityLayer>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="hours" fill="var(--color-hours)" radius={4} />
                    </BarChart>
                </ChartContainer>
                <Button variant="link" className="text-primary p-0">{t('viewFullSleepReport')}</Button>
            </div>
        </PremiumFeatureCard>
        <PremiumFeatureCard
            icon={<Smartphone />}
            title={t('deviceUsageBreak')}
            description={t('deviceUsageBreakDescription')}
        >
             <HobbiesSection />
            <div className="grid md:grid-cols-2 gap-6 items-center pt-4">
                 <div>
                    <h4 className="font-semibold mb-2">{t('dailyUsage')}</h4>
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
                    <h4 className="font-semibold mb-2">{t('weeklyTrend')}</h4>
                    <ChartContainer config={{ hours: { label: t('hours'), color: 'hsl(var(--chart-2))' } }} className="h-[150px] w-full">
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
             <Button variant="link" className="text-primary p-0 mt-2">{t('setBreakReminder')}</Button>
        </PremiumFeatureCard>
      </div>
    </div>
  );
}
