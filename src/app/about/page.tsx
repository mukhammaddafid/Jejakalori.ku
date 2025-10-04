'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/lib/language-provider';
import { Info, Target, FlaskConical, Rocket, AlertTriangle, Wrench, Image as ImageIcon, Drumstick, Wheat, Carrot, Fish, Apple, Nut, Egg, Milk, Salad, Beef, Croissant, Cookie, CupSoda, Candy, Coffee, Pizza, Beer, Sandwich, Wine, Soup, Popcorn, Donut, Burger, CakeSlice, IceCream, Cherry, Cheese } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
                    
                    <Accordion type="single" collapsible>
                        <AccordionItem value="image-icons">
                            <AccordionTrigger>
                                <Section icon={<ImageIcon className="h-7 w-7" />} title={t('imageIconExplanationTitle')}>
                                    <p>{t('imageIconExplanationContent')}</p>
                                </Section>
                            </AccordionTrigger>
                            <AccordionContent>
                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 pt-4 pl-12">
                                    <IconExplanation icon={<Drumstick className="h-6 w-6"/>} name={t('f1')} description={t('proteinSource')} />
                                    <IconExplanation icon={<Wheat className="h-6 w-6"/>} name={t('f2')} description={t('carbohydrateSource')} />
                                    <IconExplanation icon={<Carrot className="h-6 w-6"/>} name={t('f3')} description={t('vegetableSource')} />
                                    <IconExplanation icon={<Fish className="h-6 w-6"/>} name={t('f4')} description={t('healthyFatSource')} />
                                    <IconExplanation icon={<Apple className="h-6 w-6"/>} name={t('f5')} description={t('fruitSource')} />
                                    <IconExplanation icon={<Nut className="h-6 w-6"/>} name={t('f6')} description={t('nutsAndSeedsSource')} />
                                    <IconExplanation icon={<Egg className="h-6 w-6"/>} name={t('f8')} description={t('eggSource')} />
                                    <IconExplanation icon={<Milk className="h-6 w-6"/>} name={t('f9')} description={t('dairySource')} />
                                    <IconExplanation icon={<Salad className="h-6 w-6"/>} name={t('f10')} description={t('leafyGreensSource')} />
                                    <IconExplanation icon={<Beef className="h-6 w-6" />} name={t('f11')} description={t('proteinSource')} />
                                    <IconExplanation icon={<Croissant className="h-6 w-6" />} name={t('f12')} description={t('carbohydrateSource')} />
                                    <IconExplanation icon={<Cookie className="h-6 w-6" />} name={t('f13')} description={t('snacks')} />
                                    <IconExplanation icon={<CupSoda className="h-6 w-6" />} name={t('f14')} description={t('snacks')} />
                                    <IconExplanation icon={<Candy className="h-6 w-6" />} name={t('f15')} description={t('snacks')} />
                                    <IconExplanation icon={<Coffee className="h-6 w-6" />} name={t('f16')} description={t('snacks')} />
                                    <IconExplanation icon={<Pizza className="h-6 w-6" />} name={t('f17')} description={t('carbohydrateSource')} />
                                    <IconExplanation icon={<Beer className="h-6 w-6" />} name={t('f18')} description={t('snacks')} />
                                    <IconExplanation icon={<Sandwich className="h-6 w-6" />} name={t('f19')} description={t('carbohydrateSource')} />
                                    <IconExplanation icon={<Wine className="h-6 w-6" />} name={t('f20')} description={t('snacks')} />
                                    <IconExplanation icon={<Soup className="h-6 w-6" />} name={t('f21')} description={t('vegetableSource')} />
                                    <IconExplanation icon={<Popcorn className="h-6 w-6" />} name={t('f22')} description={t('snacks')} />
                                    <IconExplanation icon={<Donut className="h-6 w-6" />} name={t('f23')} description={t('snacks')} />
                                    <IconExplanation icon={<Burger className="h-6 w-6" />} name={t('f24')} description={t('carbohydrateSource')} />
                                    <IconExplanation icon={<CakeSlice className="h-6 w-6" />} name={t('f25')} description={t('snacks')} />
                                    <IconExplanation icon={<IceCream className="h-6 w-6" />} name={t('f26')} description={t('snacks')} />
                                    <IconExplanation icon={<Cherry className="h-6 w-6" />} name={t('f27')} description={t('fruitSource')} />
                                    <IconExplanation icon={<Apple className="h-6 w-6" />} name={t('f28')} description={t('healthyFatSource')} />
                                    <IconExplanation icon={<Carrot className="h-6 w-6" />} name={t('f29')} description={t('vegetableSource')} />
                                    <IconExplanation icon={<Wheat className="h-6 w-6" />} name={t('f30')} description={t('carbohydrateSource')} />
                                    <IconExplanation icon={<Cheese className="h-6 w-6" />} name={t('f31')} description={t('dairySource')} />
                                    <IconExplanation icon={<Fish className="h-6 w-6" />} name={t('f32')} description={t('proteinSource')} />
                                    <IconExplanation icon={<Carrot className="h-6 w-6" />} name={t('f33')} description={t('vegetableSource')} />
                                    <IconExplanation icon={<Wheat className="h-6 w-6" />} name={t('f34')} description={t('carbohydrateSource')} />
                                    <IconExplanation icon={<Wheat className="h-6 w-6" />} name={t('f35')} description={t('carbohydrateSource')} />
                                    <IconExplanation icon={<Carrot className="h-6 w-6" />} name={t('f36')} description={t('vegetableSource')} />
                                    <IconExplanation icon={<Carrot className="h-6 w-6" />} name={t('f37')} description={t('vegetableSource')} />
                                    <IconExplanation icon={<Carrot className="h-6 w-6" />} name={t('f38')} description={t('vegetableSource')} />
                                    <IconExplanation icon={<Carrot className="h-6 w-6" />} name={t('f39')} description={t('vegetableSource')} />
                                    <IconExplanation icon={<Carrot className="h-6 w-6" />} name={t('f40')} description={t('vegetableSource')} />
                                    <IconExplanation icon={<Carrot className="h-6 w-6" />} name={t('f41')} description={t('vegetableSource')} />
                                    <IconExplanation icon={<Apple className="h-6 w-6" />} name={t('f42')} description={t('fruitSource')} />
                                    <IconExplanation icon={<Apple className="h-6 w-6" />} name={t('f43')} description={t('fruitSource')} />
                                    <IconExplanation icon={<Apple className="h-6 w-6" />} name={t('f44')} description={t('fruitSource')} />
                                    <IconExplanation icon={<Apple className="h-6 w-6" />} name={t('f45')} description={t('fruitSource')} />
                                    <IconExplanation icon={<Apple className="h-6 w-6" />} name={t('f46')} description={t('fruitSource')} />
                                    <IconExplanation icon={<Apple className="h-6 w-6" />} name={t('f47')} description={t('fruitSource')} />
                                    <IconExplanation icon={<Apple className="h-6 w-6" />} name={t('f48')} description={t('fruitSource')} />
                                    <IconExplanation icon={<Apple className="h-6 w-6" />} name={t('f49')} description={t('fruitSource')} />
                                    <IconExplanation icon={<Nut className="h-6 w-6" />} name={t('f50')} description={t('healthyFatSource')} />
                                    <IconExplanation icon={<Apple className="h-6 w-6" />} name={t('f51')} description={t('fruitSource')} />
                                    <IconExplanation icon={<Apple className="h-6 w-6" />} name={t('f52')} description={t('fruitSource')} />
                                    <IconExplanation icon={<Apple className="h-6 w-6" />} name={t('f53')} description={t('fruitSource')} />
                                    <IconExplanation icon={<Apple className="h-6 w-6" />} name={t('f54')} description={t('fruitSource')} />
                                    <IconExplanation icon={<Apple className="h-6 w-6" />} name={t('f55')} description={t('fruitSource')} />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>


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
