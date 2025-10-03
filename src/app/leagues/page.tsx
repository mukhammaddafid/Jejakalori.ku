'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trophy, Shield, Info, Goal, GraduationCap, Award, Star, Diamond, Zap, BookOpen, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/language-provider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const tiers = [
  { name: 'Bronze', color: 'text-yellow-600', bgColor: 'bg-yellow-600/10', points: 0, icon: <Trophy className="h-5 w-5" /> },
  { name: 'Silver', color: 'text-slate-500', bgColor: 'bg-slate-500/10', points: 500, icon: <Shield className="h-5 w-5" /> },
  { name: 'Gold', color: 'text-amber-500', bgColor: 'bg-amber-500/10', points: 1000, icon: <Award className="h-5 w-5" /> },
  { name: 'Platinum', color: 'text-cyan-500', bgColor: 'bg-cyan-500/10', points: 1500, icon: <Star className="h-5 w-5" /> },
  { name: 'Diamond', color: 'text-blue-500', bgColor: 'bg-blue-500/10', points: 2000, icon: <Diamond className="h-5 w-5" /> },
  { name: 'Master', color: 'text-purple-500', bgColor: 'bg-purple-500/10', points: 2500, icon: <Zap className="h-5 w-5" /> },
  { name: 'Grandmaster', color: 'text-red-600', bgColor: 'bg-red-600/10', points: 3000, icon: <BookOpen className="h-5 w-5" /> },
];

const leaderboardData = [
  { rank: 1, name: 'Alex', tier: 'Grandmaster', points: 3200 },
  { rank: 2, name: 'You', tier: 'Master', points: 2750 },
  { rank: 3, name: 'Ben', tier: 'Master', points: 2600 },
  { rank: 4, name: 'Chloe', tier: 'Diamond', points: 2100 },
  { rank: 5, name: 'David', tier: 'Platinum', points: 1800 },
];

const CountdownTimer = () => {
    const { t } = useLanguage();
    const [timeLeft, setTimeLeft] = React.useState({ hours: 23, minutes: 59, seconds: 59 });

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                let { hours, minutes, seconds } = prevTime;
                if (seconds > 0) {
                    seconds--;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes--;
                    } else {
                        minutes = 59;
                        if (hours > 0) {
                            hours--;
                        } else {
                            // Reset timer
                            return { hours: 23, minutes: 59, seconds: 59 };
                        }
                    }
                }
                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="text-right">
            <p className="text-sm text-muted-foreground">{t('seasonEndsIn')}</p>
            <div className="text-2xl font-bold font-mono text-primary">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
            </div>
        </div>
    );
};

export default function LeaguesPage() {
    const { t } = useLanguage();
    const topTiers = tiers.slice().reverse().slice(0, 3);
    const otherTiers = tiers.slice().reverse().slice(3);

    return (
        <div className="p-4 sm:p-6 space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold font-headline flex items-center justify-center gap-2">
                    <Trophy className="h-8 w-8 text-primary" />
                    {t('consistencyLeague')}
                </h1>
                <p className="text-muted-foreground">{t('consistencyLeagueDescription')}</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Goal /> Langkah dan Target</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="font-semibold flex items-center gap-2"><Info /> {t('yourMission')}</h3>
                        <p className="text-muted-foreground">{t('missionDescription')}</p>
                    </div>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="how-to-succeed">
                            <AccordionTrigger>
                                <h3 className="font-semibold flex items-center gap-2"><GraduationCap /> {t('howToSucceed')}</h3>
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                                    <li>{t('succeedTip1')}</li>
                                    <li>{t('succeedTip2')}</li>
                                    <li>{t('succeedTip3')}</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t('consistencyTiers')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {topTiers.map((tier) => (
                        <div key={tier.name} className={`p-3 rounded-lg ${tier.bgColor}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {React.cloneElement(tier.icon, { className: `h-6 w-6 ${tier.color}` })}
                                    <span className={`font-semibold ${tier.color}`}>{t(tier.name.toLowerCase() as any)}</span>
                                </div>
                                <span className="text-sm font-mono">{tier.points} {t('points')}</span>
                            </div>
                        </div>
                    ))}
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="more-tiers">
                            <AccordionTrigger className="text-sm text-muted-foreground justify-center">
                                Show More Tiers
                            </AccordionTrigger>
                            <AccordionContent className="space-y-4 pt-4">
                                {otherTiers.map((tier) => (
                                    <div key={tier.name} className={`p-3 rounded-lg ${tier.bgColor}`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {React.cloneElement(tier.icon, { className: `h-6 w-6 ${tier.color}` })}
                                                <span className={`font-semibold ${tier.color}`}>{t(tier.name.toLowerCase() as any)}</span>
                                            </div>
                                            <span className="text-sm font-mono">{tier.points} {t('points')}</span>
                                        </div>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-start justify-between">
                    <div>
                        <CardTitle>{t('leaderboard')}</CardTitle>
                        <CardDescription>{t('leaderboardDescription')}</CardDescription>
                    </div>
                    <CountdownTimer />
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">{t('rank')}</TableHead>
                                <TableHead>{t('user')}</TableHead>
                                <TableHead>{t('tier')}</TableHead>
                                <TableHead className="text-right">{t('points')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaderboardData.map(user => (
                                <TableRow key={user.rank} className={user.name === 'You' ? 'bg-primary/10' : ''}>
                                    <TableCell className="font-bold">{user.rank}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`border-0 ${tiers.find(t => t.name === user.tier)?.bgColor} ${tiers.find(t => t.name === user.tier)?.color}`}>
                                            {t(user.tier.toLowerCase() as any)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-mono">{user.points}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
}
