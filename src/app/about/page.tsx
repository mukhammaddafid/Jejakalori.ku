'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/lib/language-provider';
import { Info, Target, FlaskConical, Rocket, AlertTriangle, Wrench, Image as ImageIcon, Drumstick, Wheat, Carrot, Fish, Apple, Nut, Egg, Milk, Salad } from 'lucide-react';

const Section: React.FC<{
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}> = ({ icon, title, children }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1 text-primary">
            {icon}
        </div>
        <div className="flex-1 space-y-2">
            <h2 className="text-xl font-semibold font-headline">{title}</h2>
            <div className="text-muted-foreground">
                {children}
            </div>
        </div>
    </div>
);

const IconExplanation: React.FC<{ icon: React.ReactNode; name: string; description: string; }> = ({ icon, name, description }) => (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary">
        <div className="text-primary">{icon}</div>
        <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    </div>
);

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="text-center space-y-3">
                    <div className="inline-block p-3 bg-primary/10 rounded-full">
                        <Info className="h-10 w-10 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold font-headline">
                        {t('aboutTitle')}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t('aboutDescription')}</p>
                </header>

                <main className="space-y-10">
                    <Section icon={<Target className="h-7 w-7" />} title={t('backgroundTitle')}>
                        <p>{t('backgroundContent')}</p>
                    </Section>

                    <Section icon={<FlaskConical className="h-7 w-7" />} title={t('scientificBasisTitle')}>
                        <p>{t('scientificBasisContent')}</p>
                    </Section>
                    
                    <Section icon={<ImageIcon className="h-7 w-7" />} title={t('imageIconExplanationTitle')}>
                        <p>{t('imageIconExplanationContent')}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-4">
                            <IconExplanation icon={<Drumstick className="h-6 w-6"/>} name={t('f1')} description={t('proteinSource')} />
                            <IconExplanation icon={<Wheat className="h-6 w-6"/>} name={t('f2')} description={t('carbohydrateSource')} />
                            <IconExplanation icon={<Carrot className="h-6 w-6"/>} name={t('f3')} description={t('vegetableSource')} />
                            <IconExplanation icon={<Fish className="h-6 w-6"/>} name={t('f4')} description={t('healthyFatSource')} />
                            <IconExplanation icon={<Apple className="h-6 w-6"/>} name={t('f5')} description={t('fruitSource')} />
                            <IconExplanation icon={<Nut className="h-6 w-6"/>} name={t('f6')} description={t('nutsAndSeedsSource')} />
                             <IconExplanation icon={<Egg className="h-6 w-6"/>} name={t('f8')} description={t('eggSource')} />
                             <IconExplanation icon={<Milk className="h-6 w-6"/>} name={t('f9')} description={t('dairySource')} />
                             <IconExplanation icon={<Salad className="h-6 w-6"/>} name={t('f10')} description={t('leafyGreensSource')} />
                        </div>
                    </Section>

                    <Section icon={<Rocket className="h-7 w-7" />} title={t('potentialTitle')}>
                        <ul className="list-disc list-outside ml-5 space-y-2">
                            <li><strong>{t('potentialContent1Title')}</strong>: {t('potentialContent1')}</li>
                            <li><strong>{t('potentialContent2Title')}</strong>: {t('potentialContent2')}</li>
                            <li><strong>{t('potentialContent3Title')}</strong>: {t('potentialContent3')}</li>
                            <li><strong>{t('potentialContent4Title')}</strong>: {t('potentialContent4')}</li>
                        </ul>
                    </Section>

                    <Section icon={<Wrench className="h-7 w-7" />} title={t('apiSupportTitle')}>
                         <p>{t('apiSupportContent')}</p>
                    </Section>

                    <Section icon={<AlertTriangle className="h-7 w-7 text-amber-500" />} title={t('limitationsTitle')}>
                        <p>{t('limitationsContent')}</p>
                    </Section>
                </main>
            </div>
        </div>
    );
}
