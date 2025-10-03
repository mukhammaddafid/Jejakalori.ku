'use client';
import * as React from 'react';
import { TdeeCalculator } from '@/components/profile/tdee-calculator';
import { GoalSetter } from '@/components/profile/goal-setter';
import { mockUserData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bed, Smartphone, ShieldCheck, Dumbbell, BookOpen, Music, Code, Brush, CookingPot, Camera, TrendingUp, TrendingDown, Hourglass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell, LineChart, Line, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/lib/language-provider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const sleepData = [
    { day: 'Mon', hours: 6.5, date: new Date(2024, 6, 1) },
    { day: 'Tue', hours: 7, date: new Date(2024, 6, 2) },
    { day: 'Wed', hours: 8, date: new Date(2024, 6, 3) },
    { day: 'Thu', hours: 6, date: new Date(2024, 6, 4) },
    { day: 'Fri', hours: 7.5, date: new Date(2024, 6, 5) },
    { day: 'Sat', hours: 9, date: new Date(2024, 6, 6) },
    { day: 'Sun', hours: 8.5, date: new Date(2024, 6, 7) },
    { day: 'Mon', hours: 5.5, date: new Date(2024, 6, 8) },
    { day: 'Tue', hours: 7, date: new Date(2024, 6, 9) },
    { day: 'Wed', hours: 8, date: new Date(2024, 6, 10) },
    { day: 'Thu', hours: 6.5, date: new Date(2024, 6, 11) },
    { day: 'Fri', hours: 7.5, date: new Date(2024, 6, 12) },
    { day: 'Sat', hours: 9, date: new Date(2024, 6, 13) },
    { day: 'Sun', hours: 8, date: new Date(2024, 6, 14) },
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

export default function ProfilePage() {
  const userData = mockUserData;
  const [isClient, setIsClient] = React.useState(false);
  const { t } = useLanguage();
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const sleepStats = React.useMemo(() => {
    const hours = sleepData.map(d => d.hours);
    const total = hours.reduce((acc, h) => acc + h, 0);
    return {
      average: total / hours.length,
      longest: Math.max(...hours),
      shortest: Math.min(...hours),
    };
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
            title={t('sleepTracking')}
            description={t('sleepDurationTrackerDescription')}
        >
            <div className="space-y-4">
                <Tabs defaultValue="weekly">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="weekly">{t('weekly')}</TabsTrigger>
                        <TabsTrigger value="monthly">{t('monthly')}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="weekly">
                        <h4 className="font-semibold text-center mb-4 pt-4">{t('weeklySleepTrend')}</h4>
                        <ChartContainer config={{ hours: { label: t('hoursSlept'), color: 'hsl(var(--chart-1))' } }} className="h-[200px] w-full">
                            <BarChart data={sleepData.slice(0, 7)} accessibilityLayer>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="hours" fill="var(--color-hours)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </TabsContent>
                     <TabsContent value="monthly">
                        <h4 className="font-semibold text-center mb-4 pt-4">{t('monthlySleepView')}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center my-4">
                            <Card>
                                <CardHeader className="p-4">
                                    <CardTitle className="flex items-center justify-center gap-2 text-base font-semibold"><Hourglass className="h-5 w-5 text-muted-foreground"/> {t('averageSleep')}</CardTitle>
                                    <p className="text-2xl font-bold font-headline text-primary">{sleepStats.average.toFixed(1)}h</p>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader className="p-4">
                                    <CardTitle className="flex items-center justify-center gap-2 text-base font-semibold"><TrendingUp className="h-5 w-5 text-muted-foreground"/> {t('longestSleep')}</CardTitle>
                                    <p className="text-2xl font-bold font-headline text-primary">{sleepStats.longest.toFixed(1)}h</p>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader className="p-4">
                                    <CardTitle className="flex items-center justify-center gap-2 text-base font-semibold"><TrendingDown className="h-5 w-5 text-muted-foreground"/> {t('shortestSleep')}</CardTitle>
                                    <p className="text-2xl font-bold font-headline text-primary">{sleepStats.shortest.toFixed(1)}h</p>
                                </CardHeader>
                            </Card>
                        </div>

                        <ChartContainer config={{ hours: { label: t('hoursSlept'), color: 'hsl(var(--chart-1))' } }} className="h-[200px] w-full">
                            <LineChart data={sleepData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Line type="monotone" dataKey="hours" stroke="var(--color-hours)" strokeWidth={2} dot={{ r: 4, fill: 'var(--color-hours)' }} activeDot={{ r: 6 }}/>
                            </LineChart>
                        </ChartContainer>
                        <div className="flex justify-center mt-4">
                            <Button variant="link" className="text-primary p-0">{t('viewFullSleepReport')}</Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </PremiumFeatureCard>
      </div>
    </div>
  );
}
