'use client';
import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Smartphone, BookOpen, Clock, Calendar, BarChart as BarChartIcon, LineChart as LineChartIcon, FileText, FlaskConical, Brain, MoreVertical, PieChart, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie, Cell, Bar as RechartsBar, BarChart as RechartsBarChart } from 'recharts';
import { useLanguage } from '@/lib/language-provider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';


const readingData = Array.from({ length: 12 }, (_, i) => ({
  month: new Date(0, i).toLocaleString('default', { month: 'short' }),
  books: Math.floor(Math.random() * 5) + 1,
  duration: Math.floor(Math.random() * 20) + 5,
}));

const quotes = [
    { quote: "Menulis adalah bekerja untuk keabadian.", author: "Pramoedya Ananta Toer" },
    { quote: "Orang boleh pandai setinggi langit, tapi selama ia tidak menulis, ia akan hilang di dalam masyarakat dan dari sejarah.", author: "Pramoedya Ananta Toer" },
    { quote: "Bermimpilah, karena Tuhan akan memeluk mimpi-mimpimu.", author: "Andrea Hirata" },
    { quote: "Hidup ini singkat, jangan sia-siakan waktumu untuk hal yang tidak kamu sukai.", author: "Andrea Hirata" },
    { quote: "Cinta mungkin buta, tapi kadang, untuk bisa melihatnya dengan jelas, kita hanya butuh kacamata yang pas.", author: "Dewi Lestari" },
    { quote: "Setiap kisah cinta adalah sebuah semesta kecil.", author: "Dewi Lestari" },
    { quote: "Seperti dendam, rindu harus dibayar tuntas.", author: "Eka Kurniawan" },
    { quote: "Kecantikan hanyalah kulit luar. Yang penting adalah apa yang ada di dalam.", author: "Eka Kurniawan" },
    { quote: "Jangan pernah meremehkan kekuatan doa. Bahkan di saat kita merasa tidak pantas.", author: "Tere Liye" },
    { quote: "Hidup harus terus berlanjut, tidak peduli seberapa menyakitkan atau membahagiakan, biar waktu yang menjadi obat.", author: "Tere Liye" },
    { quote: "Aku ingin mencintaimu dengan sederhana.", author: "Sapardi Djoko Damono" },
    { quote: "Yang fana adalah waktu. Kita abadi.", author: "Sapardi Djoko Damono" },
    { quote: "Alangkah mengerikannya menjadi tua dengan kenangan masa muda yang hanya berisi kemacetan lalu lintas.", author: "Seno Gumira Ajidarma" },
    { quote: "Man jadda wajada. Siapa yang bersungguh-sungguh, akan berhasil.", author: "Ahmad Fuadi" },
    { quote: "Banyak hal yang bisa menjatuhkanmu. Tapi satu-satunya hal yang benar-benar dapat menjatuhkanmu adalah sikapmu sendiri.", author: "R.A. Kartini" },
    { quote: "Habis gelap terbitlah terang.", author: "R.A. Kartini" },
    { quote: "Aku ini binatang jalang dari kumpulannya terbuang.", author: "Chairil Anwar" },
    { quote: "Sekali berarti, sudah itu mati.", author: "Chairil Anwar" },
    { quote: "Kebenaran akan terus hidup, sekalipun kau lenyapkan. Jangan berharap kebenaran akan mati.", author: "Wiji Thukul" },
    { quote: "Pendidikan adalah senjata paling ampuh untuk mengubah dunia.", author: "Nelson Mandela (diadaptasi)" },
    { quote: "Hidup adalah serangkaian pilihan. Pilihlah dengan bijak.", author: "Anonim" },
    { quote: "Kegagalan adalah guru terbaik. Belajarlah darinya.", author: "Anonim" },
    { quote: "Jangan menunggu kesempatan, ciptakanlah.", author: "Anonim" },
    { quote: "Satu-satunya batasan adalah pikiranmu sendiri.", author: "Anonim" },
    { quote: "Masa depan adalah milik mereka yang percaya pada keindahan mimpi mereka.", author: "Eleanor Roosevelt (diadaptasi)" },
    { quote: "Jadilah perubahan yang ingin kamu lihat di dunia.", author: "Mahatma Gandhi (diadaptasi)" },
    { quote: "Membaca adalah jendela dunia.", author: "Anonim" },
    { quote: "Buku adalah sahabat paling setia.", author: "Anonim" },
    { quote: "Setiap lembar buku membawa petualangan baru.", author: "Anonim" },
    { quote: "Dengan membaca, kau tak akan pernah merasa sendirian.", author: "Anonim" },
    { quote: "Ilmu adalah cahaya yang menerangi kegelapan.", author: "Anonim" },
    { quote: "Berani melangkah adalah awal dari sebuah perjalanan besar.", author: "Anonim" },
    { quote: "Jangan takut salah, karena dari kesalahan kita belajar.", author: "Anonim" },
    { quote: "Konsistensi adalah kunci kesuksesan.", author: "Anonim" },
    { quote: "Kesabaran adalah seni dalam berharap.", author: "Anonim" },
    { quote: "Cinta kepada sesama adalah wujud cinta kepada Tuhan.", author: "Gus Dur" },
    { quote: "Tuhan tidak akan mengubah nasib suatu bangsa sebelum bangsa itu mengubah nasibnya sendiri.", author: "Soekarno" },
    { quote: "Beri aku 1.000 orang tua, niscaya akan kucabut semeru dari akarnya. Beri aku 10 pemuda niscaya akan kuguncangkan dunia.", author: "Soekarno" },
    { quote: "Lebih baik kita hancur lebur daripada tidak merdeka.", author: "Bung Tomo" },
    { quote: "Kemerdekaan hanyalah didapat dan dimiliki oleh bangsa yang jiwanya berkobar-kobar dengan tekad 'Merdeka, merdeka atau mati'!", author: "Jenderal Soedirman" },
    { quote: "Terkadang, kesulitan harus kamu rasakan terlebih dahulu sebelum kebahagiaan yang sempurna datang kepadamu.", author: "R.A. Kartini" },
    { quote: "Cita-cita persatuan Indonesia itu bukan omong kosong, tetapi benar-benar didukung oleh kekuatan-kekuatan yang timbul pada akar sejarah bangsa kita sendiri.", author: "Mohammad Yamin" },
    { quote: "Kurang cerdas dapat diperbaiki dengan belajar, kurang cakap dapat dihilangkan dengan pengalaman. Namun tidak jujur itu sulit diperbaiki.", author: "Mohammad Hatta" },
    { quote: "Jatuh bangunnya negara ini, sangat tergantung dari bangsa ini sendiri.", author: "Mohammad Hatta" },
    { quote: "Pahlawan yang setia itu berkorban, bukan buat dikenal namanya, tetapi semata-mata untuk membela cita-cita.", author: "Mohammad Hatta" },
    { quote: "Keberanian bukanlah ketidakhadiran rasa takut, melainkan kemenangan atasnya.", author: "Nelson Mandela (diadaptasi)" },
    { quote: "Masa lalu adalah pelajaran, masa kini adalah kenyataan, dan masa depan adalah harapan.", author: "Anonim" },
    { quote: "Hargai waktu, karena waktu tidak akan pernah kembali.", author: "Anonim" },
    { quote: "Kejujuran adalah mata uang yang berlaku di mana saja.", author: "Anonim" },
    { quote: "Senyum adalah ibadah termudah.", author: "Anonim" },
    { quote: "Berpikir positif akan membawamu pada hasil yang positif.", author: "Anonim" },
    { quote: "Jangan biarkan hari kemarin menyita terlalu banyak hari ini.", author: "Will Rogers (diadaptasi)" },
    { quote: "Hidup itu seperti bersepeda. Untuk menjaga keseimbangan, kamu harus terus bergerak.", author: "Albert Einstein (diadaptasi)" },
    { quote: "Dalam setiap kesulitan, selalu ada kesempatan.", author: "Anonim" },
    { quote: "Jadilah dirimu sendiri, orang lain sudah ada.", author: "Oscar Wilde (diadaptasi)" },
    { quote: "Keindahan sejati terpancar dari hati yang baik.", author: "Anonim" },
    { quote: "Doa adalah senjata orang beriman.", author: "Anonim" },
    { quote: "Kebersihan adalah sebagian dari iman.", author: "Hadis" },
    { quote: "Setiap langkah adalah sebuah awal yang baru.", author: "Anonim" },
    { quote: "Belajar sepanjang hayat.", author: "Anonim" },
    { quote: "Kata-kata memiliki kekuatan untuk membangun dan meruntuhkan.", author: "Anonim" },
    { quote: "Sastra adalah cara kita memahami dunia dengan lebih dalam.", author: "Goenawan Mohamad" },
    { quote: "Puisi adalah napas kata-kata.", author: "Joko Pinurbo" },
    { quote: "Di dalam sajak, aku menemukan diriku yang lain.", author: "Joko Pinurbo" },
    { quote: "Sejarah adalah cermin bagi generasi masa kini dan masa depan.", author: "Sartono Kartodirdjo" },
    { quote: "Memahami sejarah adalah memahami jati diri bangsa.", author: "Sartono Kartodirdjo" },
    { quote: "Kopi pertama pagi ini: pahit, seperti rindu yang tak sampai.", author: "Fiersa Besari" },
    { quote: "Beberapa orang tinggal dalam hidupmu agar kau belajar, beberapa pergi agar kau lebih bijaksana.", author: "Fiersa Besari" },
    { quote: "Humor adalah cara Tuhan menghibur kita di tengah keseriusan dunia.", author: "Abdurrahman Wahid (Gus Dur)" },
    { quote: "Perbedaan adalah rahmat.", author: "Abdurrahman Wahid (Gus Dur)" },
    { quote: "Seni adalah kebohongan yang membuat kita menyadari kebenaran.", author: "Pablo Picasso (diadaptasi)" },
    { quote: "Musik adalah bahasa universal umat manusia.", author: "Henry Wadsworth Longfellow (diadaptasi)" },
    { quote: "Tawa adalah musik terindah dari jiwa.", author: "Anonim" },
    { quote: "Jangan pernah berhenti belajar, karena hidup tak pernah berhenti mengajarkan.", author: "Anonim" },
    { quote: "Kebaikan adalah investasi yang tak pernah merugi.", author: "Anonim" },
    { quote: "Berbagi tidak akan membuatmu miskin.", author: "Anonim" },
    { quote: "Syukur adalah kunci pintu kebahagiaan.", author: "Anonim" },
    { quote: "Setiap hari adalah kesempatan kedua.", author: "Anonim" },
    { quote: "Fokus pada tujuan, abaikan gangguan.", author: "Anonim" },
    { quote: "Kerja keras mengalahkan bakat ketika bakat tidak bekerja keras.", author: "Tim Notke (diadaptasi)" },
    { quote: "Keberanian adalah awal dari kemenangan.", author: "Anonim" },
    { quote: "Waktu adalah aset paling berharga. Gunakan dengan bijak.", author: "Anonim" },
    { quote: "Impian tidak akan terwujud dengan sendirinya, butuh aksi nyata.", author: "Anonim" },
    { quote: "Jadilah versi terbaik dari dirimu sendiri.", author: "Anonim" },
    { quote: "Kesalahan adalah bukti bahwa kamu sedang mencoba.", author: "Anonim" },
    { quote: "Jangan bandingkan dirimu dengan orang lain. Bandingkan dengan dirimu yang kemarin.", author: "Anonim" },
    { quote: "Rintangan adalah ujian untuk melihat seberapa besar keinginanmu.", author: "Anonim" },
    { quote: "Berpikir besar, mulai dari yang kecil.", author: "Anonim" },
    { quote: "Lingkungan yang baik akan membentuk karakter yang baik.", author: "Anonim" },
    { quote: "Kesehatan adalah kekayaan yang sesungguhnya.", author: "Anonim" },
    { quote: "Cinta sejati adalah ketika dua jiwa saling menyempurnakan.", author: "Anonim" },
    { quote: "Keluarga adalah tempat di mana hidup dimulai dan cinta tak pernah berakhir.", author: "Anonim" },
    { quote: "Sahabat adalah saudara yang kita pilih sendiri.", author: "Anonim" },
    { quote: "Maafkanlah, agar hatimu damai.", author: "Anonim" },
    { quote: "Ikhlas adalah puncak tertinggi dari ilmu.", author: "Anonim" },
    { quote: "Percaya pada proses, nikmati perjalanannya.", author: "Anonim" },
    { quote: "Setiap awan gelap pasti memiliki sisi terang.", author: "Anonim" },
    { quote: "Hidup ini indah jika kita tahu cara menikmatinya.", author: "Anonim" },
    { quote: "Teruslah bergerak maju, jangan pernah menyerah.", author: "Anonim" },
    { quote: "Jadilah cahaya, bahkan dalam kegelapan.", author: "Anonim" }
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

const HOBBY_LIST = ['Sports', 'Music', 'Coding', 'Art', 'Cooking', 'Photography'];

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
    const [hobbies, setHobbies] = React.useState<{ [key: string]: number }>({ 'Brain Time': brainTime });
    const [selectedHobby, setSelectedHobby] = React.useState(HOBBY_LIST[0]);
    const [hobbyDuration, setHobbyDuration] = React.useState('');

    React.useEffect(() => {
        setHobbies(prev => ({ ...prev, 'Brain Time': brainTime }));
    }, [brainTime]);

    const handleLogHobby = () => {
        const duration = parseInt(hobbyDuration);
        if (!isNaN(duration) && duration > 0) {
            setHobbies(prev => ({
                ...prev,
                [selectedHobby]: (prev[selectedHobby] || 0) + duration,
            }));
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
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie data={hobbyChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
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
                                        {HOBBY_LIST.map(hobby => <SelectItem key={hobby} value={hobby}>{t(hobby.toLowerCase() as any) || hobby}</SelectItem>)}
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
                                        <ResponsiveContainer width="100%" height={250}>
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
    

    
