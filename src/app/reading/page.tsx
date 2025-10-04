'use client';
import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Smartphone, BookOpen, Clock, Calendar, BarChart as BarChartIcon, LineChart as LineChartIcon, FileText, FlaskConical, Brain, MoreVertical, PieChart as PieChartIcon, Activity, Dumbbell, Music, Code, Brush, CookingPot, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie, Cell, Bar as RechartsBar, BarChart as RechartsBarChart, PieChart } from 'recharts';
import { useLanguage } from '@/lib/language-provider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


const readingData = Array.from({ length: 12 }, (_, i) => ({
  month: new Date(0, i).toLocaleString('default', { month: 'short' }),
  books: Math.floor(Math.random() * 5) + 1,
  duration: Math.floor(Math.random() * 20) + 5,
}));

export const quotes = [
    // 10 Indonesian Quotes
    { quote: "Orang boleh pandai setinggi langit, tapi selama ia tidak menulis, ia akan hilang di dalam masyarakat dan dari sejarah.", author: "Pramoedya Ananta Toer" },
    { quote: "Bermimpilah, karena Tuhan akan memeluk mimpi-mimpimu.", author: "Andrea Hirata" },
    { quote: "Seperti dendam, rindu harus dibayar tuntas.", author: "Eka Kurniawan" },
    { quote: "Hidup harus terus berlanjut, tidak peduli seberapa menyakitkan atau membahagiakan, biar waktu yang menjadi obat.", author: "Tere Liye" },
    { quote: "Aku ingin mencintaimu dengan sederhana.", author: "Sapardi Djoko Damono" },
    { quote: "Man jadda wajada. Siapa yang bersungguh-sungguh, akan berhasil.", author: "Ahmad Fuadi" },
    { quote: "Habis gelap terbitlah terang.", author: "R.A. Kartini" },
    { quote: "Aku ini binatang jalang dari kumpulannya terbuang.", author: "Chairil Anwar" },
    { quote: "Kebenaran akan terus hidup, sekalipun kau lenyapkan. Jangan berharap kebenaran akan mati.", author: "Wiji Thukul" },
    { quote: "Beri aku 1.000 orang tua, niscaya akan kucabut semeru dari akarnya. Beri aku 10 pemuda niscaya akan kuguncangkan dunia.", author: "Soekarno" },
    { quote: "Kurang cerdas dapat diperbaiki dengan belajar, kurang cakap dapat dihilangkan dengan pengalaman. Namun tidak jujur itu sulit diperbaiki.", author: "Mohammad Hatta" },
    
    // 70 International Quotes
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
    { quote: "That which does not kill us makes us stronger.", author: "Friedrich Nietzsche" },
    { quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { quote: "When the going gets tough, the tough get going.", author: "Joe Kennedy" },
    { quote: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
    { quote: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
    { quote: "Get busy living or get busy dying.", author: "Stephen King" },
    { quote: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { quote: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost" },
    { quote: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde" },
    { quote: "It is not the length of life, but depth of life.", author: "Ralph Waldo Emerson" },
    { quote: "The unexamined life is not worth living.", author: "Socrates" },
    { quote: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
    { quote: "I think, therefore I am.", author: "René Descartes" },
    { quote: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { quote: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
    { quote: "Life is a succession of lessons which must be lived to be understood.", author: "Ralph Waldo Emerson" },
    { quote: "The best way to predict your future is to create it.", author: "Abraham Lincoln" },
    { quote: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" },
    { quote: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas A. Edison" },
    { quote: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein" },
    { quote: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
    { quote: "Money and success don’t change people; they merely amplify what is already there.", author: "Will Smith" },
    { quote: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
    { quote: "Not how long, but how well you have lived is the main thing.", author: "Seneca" },
    { quote: "The whole secret of a successful life is to find out what is one’s destiny to do, and then do it.", author: "Henry Ford" },
    { quote: "The big lesson in life, baby, is never be scared of anyone or anything.", author: "Frank Sinatra" },
    { quote: "Life is not a problem to be solved, but a reality to be experienced.", author: "Soren Kierkegaard" },
    { quote: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { quote: "It is our choices, Harry, that show what we truly are, far more than our abilities.", author: "J.K. Rowling" },
    { quote: "If you're going through hell, keep going.", author: "Winston Churchill" },
    { quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
    { quote: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
    { quote: "It is never too late to be what you might have been.", author: "George Eliot" },
    { quote: "For every minute you are angry you lose sixty seconds of happiness.", author: "Ralph Waldo Emerson" },
    { quote: "If you can dream it, you can achieve it.", author: "Zig Ziglar" },
    { quote: "The mind is everything. What you think you become.", author: "Buddha" },
    { quote: "Everything has beauty, but not everyone can see.", author: "Confucius" },
    { quote: "What we think, we become.", author: "Buddha" },
    { quote: "An unexamined life is not worth living.", author: "Socrates" },
    { quote: "Eighty percent of success is showing up.", author: "Woody Allen" },
    { quote: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
    { quote: "Winning isn’t everything, but wanting to win is.", author: "Vince Lombardi" },
    { quote: "I am not a product of my circumstances. I am a product of my decisions.", author: "Stephen Covey" },
    { quote: "Every child is an artist. The problem is how to remain an artist once he grows up.", author: "Pablo Picasso" },
    { quote: "You can never cross the ocean until you have the courage to lose sight of the shore.", author: "Christopher Columbus" },
    { quote: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" },
    { quote: "The two most important days in your life are the day you are born and the day you find out why.", author: "Mark Twain" },
    { quote: "The best revenge is massive success.", author: "Frank Sinatra" },
    { quote: "People who are crazy enough to think they can change the world, are the ones who do.", author: "Rob Siltanen" },
    { quote: "There is only one way to avoid criticism: do nothing, say nothing, and be nothing.", author: "Aristotle" },
    { quote: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt" },
    { quote: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
    { quote: "I attribute my success to this: I never gave or took any excuse.", author: "Florence Nightingale" },
    { quote: "The most difficult thing is the decision to act, the rest is merely tenacity.", author: "Amelia Earhart" },
    { quote: "It is better to fail in originality than to succeed in imitation.", author: "Herman Melville" },
    { quote: "The successful warrior is the average man, with laser-like focus.", author: "Bruce Lee" },
    { quote: "A person who never made a mistake never tried anything new.", author: "Albert Einstein" },
    { quote: "The person who says it cannot be done should not interrupt the person who is doing it.", author: "Chinese Proverb" },
    { quote: "There are no traffic jams along the extra mile.", author: "Roger Staubach" },
    { quote: "It is not what you do for your children, but what you have taught them to do for themselves, that will make them successful human beings.", author: "Ann Landers" },
    { quote: "If you want to make your dreams come true, the first thing you have to do is wake up.", author: "J.M. Power" },
    { quote: "The secret of success is to do the common thing uncommonly well.", author: "John D. Rockefeller Jr." },
    { quote: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
    { quote: "Don’t be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
    { quote: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
    { quote: "If you are not willing to risk the usual, you will have to settle for the ordinary.", author: "Jim Rohn" },
    { quote: "All our dreams can come true if we have the courage to pursue them.", author: "Walt Disney" },
    { quote: "Things work out best for those who make the best of how things work out.", author: "John Wooden" },
    { quote: "Try not to become a man of success. Rather become a man of value.", author: "Albert Einstein" },
    { quote: "Don't be distracted by criticism. Remember -- the only taste of success some people get is to take a bite out of you.", author: "Zig Ziglar" },
    { quote: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas A. Edison" },
    { quote: "What's the point of being alive if you don't at least try to do something remarkable?", author: "John Green" },
    { quote: "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.", author: "Jimmy Dean" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "To handle yourself, use your head; to handle others, use your heart.", author: "Eleanor Roosevelt" },
    { quote: "Too many of us are not living our dreams because we are living our fears.", author: "Les Brown" },
    { quote: "Do or do not. There is no try.", author: "Yoda" },
];

const scientificSources = [
    { title: "Mifflin-St Jeor Equation for BMR", source: "A new predictive equation for resting energy expenditure in healthy individuals. J Am Diet Assoc. 1990 May;90(5):664-9." },
    { title: "Activity Level Multipliers (TDEE)", source: "Harris JA, Benedict FG. A biometric study of basal metabolism in man. Washington, DC: Carnegie Institution of Washington; 1919. (Publication No. 279)" },
    { title: "Macronutrient Roles in Health", source: "Institute of Medicine. 2005. Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, Cholesterol, Protein, and Amino Acids. Washington, DC: The National Academies Press." },
];

const screenTimeDataWeekly = [
  { day: 'Mon', hours: 5 },
  { day: 'Tue', hours: 6 },
  { day: 'Wed', hours: 4.5 },
  { day: 'Thu', hours: 7 },
  { day: 'Fri', hours: 8 },
  { day: 'Sat', hours: 9 },
  { day: 'Sun', hours: 7.5 },
];
const screenTimeDataMonthly = Array.from({ length: 30 }, (_, i) => ({
    day: `${i + 1}`,
    hours: Math.floor(Math.random() * 8) + 2,
}));

const hobbyIcons: { [key: string]: React.ReactNode } = {
    'Reading': <BookOpen className="h-5 w-5" />,
    'Sports': <Dumbbell className="h-5 w-5" />,
    'Music': <Music className="h-5 w-5" />,
    'Coding': <Code className="h-5 w-5" />,
    'Art': <Brush className="h-5 w-5" />,
    'Cooking': <CookingPot className="h-5 w-5" />,
    'Photography': <Camera className="h-5 w-5" />,
};

const HOBBY_LIST = Object.keys(hobbyIcons);

const PIE_CHART_COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
    '#A0522D', // Sienna
    '#D2691E', // Chocolate
    '#8A2BE2', // BlueViolet
];

function WellnessHub({ brainTime }: { brainTime: number }) {
    const { t } = useLanguage();
    const [hobbies, setHobbies] = React.useState<{ [key: string]: number }>({});
    const [selectedHobby, setSelectedHobby] = React.useState(HOBBY_LIST[0]);
    const [hobbyDuration, setHobbyDuration] = React.useState('');
    const [hobbyLog, setHobbyLog] = React.useState<{ name: string, duration: number, time: Date }[]>([]);

    React.useEffect(() => {
        setHobbies(prev => ({ ...prev, 'Reading': brainTime }));
    }, [brainTime]);

    const handleLogHobby = () => {
        const duration = parseInt(hobbyDuration);
        if (!isNaN(duration) && duration > 0) {
            setHobbies(prev => ({
                ...prev,
                [selectedHobby]: (prev[selectedHobby] || 0) + duration,
            }));
            setHobbyLog(prev => [...prev, { name: selectedHobby, duration, time: new Date() }]);
            setHobbyDuration('');
        }
    };

    const hobbyChartData = Object.entries(hobbies).map(([name, value]) => ({ name, value }));

    const chartConfig = {
        hours: {
            label: t('hoursSlept'), // Reusing translation, can be changed
            color: "hsl(var(--chart-1))",
        },
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Activity /> {t('timeWellSpent')}</CardTitle>
                <CardDescription>{t('timeWellSpentDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="hobbies">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="hobbies">{t('hobbies')}</TabsTrigger>
                        <TabsTrigger value="deviceUsageBreak">{t('deviceUsageBreak')}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="hobbies" className="space-y-4 pt-4">
                        <ResponsiveContainer width="100%" height={150}>
                            <PieChart>
                                <Pie data={hobbyChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                                     {hobbyChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="space-y-2">
                            <Label>{t('logHobby')}</Label>
                            <div className="flex gap-2">
                                <Select value={selectedHobby} onValueChange={setSelectedHobby}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('selectHobby')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {HOBBY_LIST.map(hobby => (
                                        <SelectItem key={hobby} value={hobby}>
                                            <div className="flex items-center gap-2">
                                                {hobbyIcons[hobby]}
                                                <span>{t(hobby.toLowerCase() as any) || hobby}</span>
                                            </div>
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Input 
                                    type="number" 
                                    placeholder={t('durationInMinutes')}
                                    value={hobbyDuration}
                                    onChange={(e) => setHobbyDuration(e.target.value)}
                                />
                                <Button onClick={handleLogHobby}>{t('log')}</Button>
                            </div>
                        </div>

                         <ScrollArea className="h-[150px] w-full rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Hobby</TableHead>
                                        <TableHead className="text-right">Duration</TableHead>
                                        <TableHead className="text-right">Time</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {hobbyLog.map((log, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="flex items-center gap-2">
                                                {hobbyIcons[log.name]}
                                                {log.name}
                                            </TableCell>
                                            <TableCell className="text-right">{log.duration} min</TableCell>
                                            <TableCell className="text-right text-xs">{log.time.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(',', '')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>

                    </TabsContent>
                    <TabsContent value="deviceUsageBreak" className="space-y-4 pt-4">
                         <p className="text-sm text-muted-foreground px-1">{t('deviceUsageBreakDescription')}</p>
                         <Tabs defaultValue="weekly">
                            <TabsContent value="weekly">
                                 <ChartContainer config={chartConfig} className="h-[200px] w-full">
                                    <RechartsBarChart data={screenTimeDataWeekly} accessibilityLayer>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <RechartsBar dataKey="hours" fill="var(--color-hours)" radius={4} />
                                    </RechartsBarChart>
                                </ChartContainer>
                            </TabsContent>
                             <TabsContent value="monthly">
                                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                                     <RechartsBarChart data={screenTimeDataMonthly} accessibilityLayer>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} interval={2} />
                                        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <RechartsBar dataKey="hours" fill="var(--color-hours)" radius={4} />
                                    </RechartsBarChart>
                                </ChartContainer>
                            </TabsContent>
                            <TabsList className="grid w-full grid-cols-2 mt-4">
                                <TabsTrigger value="weekly">{t('weekly')}</TabsTrigger>
                                <TabsTrigger value="monthly">{t('monthly')}</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}


export default function ReadingPage() {
    const { t } = useLanguage();
    const [readingDuration, setReadingDuration] = React.useState(0);
    const [startTime, setStartTime] = React.useState('');

    const handleTrackReading = () => {
        if (startTime) {
            const start = new Date(`1970-01-01T${startTime}`);
            const now = new Date();
            const nowTime = new Date(`1970-01-01T${now.toTimeString().split(' ')[0]}`);
            const diffMs = nowTime.getTime() - start.getTime();
            if (diffMs > 0) {
                setReadingDuration(prev => prev + Math.round(diffMs / 60000)); // add minutes
            }
        }
    };

    return (
        <div className="p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BookOpen /> {t('reading')}</CardTitle>
                            <CardDescription>{t('quoteCollageDescription')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Carousel
                                opts={{
                                    align: "start",
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
                                <CarouselPrevious className="-left-4" />
                                <CarouselNext className="absolute -right-4 top-[-1.5rem]"/>
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
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="book-title">{t('bookTitle')}</Label>
                                    <Input id="book-title" placeholder="e.g., Sapiens" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="start-date">{t('startDate')}</Label>
                                    <Input id="start-date" type="date" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="start-time">{t('startTime')}</Label>
                                    <Input id="start-time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                                </div>
                            </div>
                            <Button className="w-full" onClick={handleTrackReading}>{t('trackReading')}</Button>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="history">
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-2 font-semibold">
                                            <LineChartIcon className="h-5 w-5" />
                                            {t('readingHistory')}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-4">
                                        <ResponsiveContainer width="100%" height={200}>
                                            <LineChart data={readingData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis yAxisId="left" label={{ value: 'Books', angle: -90, position: 'insideLeft' }}/>
                                                <YAxis yAxisId="right" orientation="right" label={{ value: 'Hours', angle: -90, position: 'insideRight' }}/>
                                                <Tooltip />
                                                <Legend />
                                                <Line yAxisId="left" type="monotone" dataKey="books" name={t('booksRead')} stroke="hsl(var(--primary))" strokeWidth={2} />
                                                <Line yAxisId="right" type="monotone" dataKey="duration" name={t('readingDuration')} stroke="hsl(var(--chart-2))" strokeWidth={2} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <WellnessHub brainTime={readingDuration} />
                </div>
            </div>
        </div>
    );
}
    

    





