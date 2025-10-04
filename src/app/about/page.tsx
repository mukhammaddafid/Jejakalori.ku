'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/lib/language-provider';
import { Info, Target, FlaskConical, Rocket, AlertTriangle, Wrench } from 'lucide-react';

const InfoSection: React.FC<{
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}> = ({ icon, title, children }) => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-3">
                {icon}
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            {children}
        </CardContent>
    </Card>
);


export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <div className="p-4 sm:p-6 space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold font-headline flex items-center justify-center gap-3">
                    <Info className="h-8 w-8 text-primary" />
                    {t('aboutTitle')}
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">{t('aboutDescription')}</p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
                <InfoSection icon={<Target className="h-6 w-6 text-primary" />} title={t('backgroundTitle')}>
                    <p>{t('backgroundContent')}</p>
                </InfoSection>

                <InfoSection icon={<FlaskConical className="h-6 w-6 text-primary" />} title={t('scientificBasisTitle')}>
                    <p>{t('scientificBasisContent')}</p>
                </InfoSection>

                <InfoSection icon={<Rocket className="h-6 w-6 text-primary" />} title={t('potentialTitle')}>
                    <ul className="list-disc list-inside space-y-2">
                        <li>{t('potentialContent1')}</li>
                        <li>{t('potentialContent2')}</li>
                        <li>{t('potentialContent3')}</li>
                        <li>{t('potentialContent4')}</li>
                    </ul>
                </InfoSection>
                
                <InfoSection icon={<Wrench className="h-6 w-6 text-primary" />} title={t('apiSupportTitle')}>
                     <p>{t('apiSupportContent')}</p>
                </InfoSection>

                <InfoSection icon={<AlertTriangle className="h-6 w-6 text-amber-500" />} title={t('limitationsTitle')}>
                    <p>{t('limitationsContent')}</p>
                </InfoSection>
            </div>
        </div>
    );
}
