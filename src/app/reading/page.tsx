'use client';
import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Smartphone, BookOpen, Clock, Calendar, BarChart, LineChart as LineChartIcon, FileText, FlaskConical, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '@/lib/language-provider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const readingData = Array.from({ length: 12 }, (_, i) => ({
  month: new Date(0, i).toLocaleString('default', { month: 'short' }),
  books: Math.floor(Math.random() * 5) + 1,
  duration: Math.floor(Math.random() * 20) + 5,
}));

const quotes = [
  { quote: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
  { quote: "A reader lives a thousand lives before he dies . . . The man who never reads lives only one.", author: "George R.R. Martin" },
  { quote: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
  { quote: "I have always imagined that Paradise will be a kind of library.", author: "Jorge Luis Borges" },
  { quote: "You can never get a cup of tea large enough or a book long enough to suit me.", author: "C.S. Lewis" },
  { quote: "Reading is essential for those who seek to rise above the ordinary.", author: "Jim Rohn" },
  { quote: "Think before you speak. Read before you think.", author: "Fran Lebowitz" },
  { quote: "A book is a dream that you hold in your hands.", author: "Neil Gaiman" },
  { quote: "The reading of all good books is like a conversation with the finest minds of past centuries.", author: "René Descartes" },
  { quote: "Books are a uniquely portable magic.", author: "Stephen King" },
];

const scientificSources = [
    { title: "Mifflin-St Jeor Equation for BMR", source: "A new predictive equation for resting energy expenditure in healthy individuals. J Am Diet Assoc. 1990 May;90(5):664-9." },
    { title: "Activity Level Multipliers (TDEE)", source: "Harris JA, Benedict FG. A biometric study of basal metabolism in man. Washington, DC: Carnegie Institution of Washington; 1919. (Publication No. 279)" },
    { title: "Macronutrient Roles in Health", source: "Institute of Medicine. 2005. Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, Cholesterol, Protein, and Amino Acids. Washington, DC: The National Academies Press." },
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

function DeviceUsageBreak() {
    const { t } = useLanguage();
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Smartphone /> {t('deviceUsageBreak')}</CardTitle>
                <CardDescription>{t('deviceUsageBreakDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <h4 className="font-semibold mb-2 text-center">{t('weeklyTrend')}</h4>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={screenTimeData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }}/>
                        <Tooltip />
                        <Line type="monotone" dataKey="hours" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
                <Button className="w-full mt-4">{t('setBreakReminder')}</Button>
            </CardContent>
        </Card>
    );
}


export default function ReadingPage() {
    const { t } = useLanguage();
    return (
        <div className="p-4 sm:p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookOpen /> {t('reading')}</CardTitle>
                    <CardDescription>{t('quoteCollageDescription')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {quotes.map((q, i) => (
                                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1 h-full">
                                        <Card className="flex flex-col justify-center p-4 bg-muted/50 h-full">
                                            <FileText className="h-6 w-6 mb-2 text-muted-foreground" />
                                            <blockquote className="text-sm italic flex-grow">"{q.quote}"</blockquote>
                                            <p className="text-xs text-right mt-2 font-semibold">- {q.author}</p>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="ml-10" />
                        <CarouselNext className="mr-10" />
                    </Carousel>
                     <Accordion type="single" collapsible className="w-full mt-6">
                        <AccordionItem value="sources">
                            <AccordionTrigger>
                                <div className="flex items-center gap-2 font-semibold">
                                    <FlaskConical className="h-5 w-5" />
                                    {t('scientificSources')}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 space-y-3">
                                {scientificSources.map((source, index) => (
                                    <div key={index}>
                                        <p className="font-semibold text-sm">{source.title}</p>
                                        <p className="text-xs text-muted-foreground italic">{source.source}</p>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Brain /> {t('brainTime')}</CardTitle>
                    <CardDescription>{t('brainTimeDescription')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="book-title">{t('bookTitle')}</Label>
                            <Input id="book-title" placeholder="e.g. Atomic Habits" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="start-date">{t('startDate')}</Label>
                            <Input id="start-date" type="date" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="start-time">{t('startTime')}</Label>
                            <Input id="start-time" type="time" />
                        </div>
                    </div>
                    <Button className="w-full sm:w-auto">{t('trackReading')}</Button>

                    <div className="pt-4">
                         <h4 className="text-center font-semibold mb-4">{t('readingHistory')}</h4>
                         <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={readingData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis yAxisId="left" label={{ value: t('booksRead'), angle: -90, position: 'insideLeft' }} />
                                <YAxis yAxisId="right" orientation="right" label={{ value: t('readingDuration'), angle: -90, position: 'insideRight' }} />
                                <Tooltip />
                                <Legend />
                                <Line yAxisId="left" type="monotone" dataKey="books" name={t('booksRead')} stroke="hsl(var(--chart-1))" />
                                <Line yAxisId="right" type="monotone" dataKey="duration" name={t('readingDuration')} stroke="hsl(var(--chart-2))" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
            
            <DeviceUsageBreak />

        </div>
    );
}
