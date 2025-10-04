'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/lib/language-provider';
import { Info, Target, FlaskConical, Rocket, AlertTriangle, Wrench, Image as ImageIcon, Drumstick, Wheat, Carrot, Fish, Apple, Nut, Egg, Milk, Salad, Beef, Croissant, Cookie, CupSoda, Candy, Coffee, Pizza, Sandwich, Soup, Popcorn, Donut, CakeSlice, IceCream, Cherry } from 'lucide-react';
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

const IconCategoryCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 pt-0">
            {children}
        </CardContent>
    </Card>
);

export default function AboutPage() {
    const { t } = useLanguage();

    const foodIcons = {
        protein: [
            { id: 'f1', icon: <Drumstick className="h-6 w-6"/>, desc: 'proteinSource' },
            { id: 'f4', icon: <Fish className="h-6 w-6"/>, desc: 'proteinSource' },
            { id: 'f8', icon: <Egg className="h-6 w-6"/>, desc: 'eggSource' },
            { id: 'f11', icon: <Beef className="h-6 w-6" />, desc: 'proteinSource' },
            { id: 'f32', icon: <Fish className="h-6 w-6" />, desc: 'proteinSource' },
        ],
        carbs: [
            { id: 'f2', icon: <Wheat className="h-6 w-6"/>, desc: 'carbohydrateSource' },
            { id: 'f12', icon: <Croissant className="h-6 w-6" />, desc: 'carbohydrateSource' },
            { id: 'f17', icon: <Pizza className="h-6 w-6" />, desc: 'carbohydrateSource' },
            { id: 'f19', icon: <Sandwich className="h-6 w-6" />, desc: 'carbohydrateSource' },
            { id: 'f30', icon: <Wheat className="h-6 w-6" />, desc: 'carbohydrateSource' },
            { id: 'f34', icon: <Wheat className="h-6 w-6" />, desc: 'carbohydrateSource' },
            { id: 'f35', icon: <Wheat className="h-6 w-6" />, desc: 'carbohydrateSource' },
        ],
        fats: [
             { id: 'f6', icon: <Nut className="h-6 w-6"/>, desc: 'nutsAndSeedsSource' },
             { id: 'f28', icon: <Apple className="h-6 w-6" />, desc: 'healthyFatSource' }, // Avocado
             { id: 'f50', icon: <Nut className="h-6 w-6" />, desc: 'healthyFatSource' }, // Coconut
        ],
        fruitsAndVeg: [
            { id: 'f3', icon: <Carrot className="h-6 w-6"/>, desc: 'vegetableSource' },
            { id: 'f5', icon: <Apple className="h-6 w-6"/>, desc: 'fruitSource' },
            { id: 'f10', icon: <Salad className="h-6 w-6"/>, desc: 'leafyGreensSource' },
            { id: 'f21', icon: <Soup className="h-6 w-6" />, desc: 'vegetableSource' },
            { id: 'f27', icon: <Cherry className="h-6 w-6" />, desc: 'fruitSource' },
            { id: 'f29', icon: <Carrot className="h-6 w-6" />, desc: 'vegetableSource' }, // Mushroom
            { id: 'f33', icon: <Carrot className="h-6 w-6" />, desc: 'vegetableSource' }, // Broccoli
            { id: 'f36', icon: <Carrot className="h-6 w-6" />, desc: 'vegetableSource' }, // Corn
            { id: 'f37', icon: <Carrot className="h-6 w-6" />, desc: 'vegetableSource' },
            { id: 'f38', icon: <Carrot className="h-6 w-6" />, desc: 'vegetableSource' },
            { id: 'f39', icon: <Carrot className="h-6 w-6" />, desc: 'vegetableSource' },
            { id: 'f40', icon: <Carrot className="h-6 w-6" />, desc: 'vegetableSource' },
            { id: 'f41', icon: <Carrot className="h-6 w-6" />, desc: 'vegetableSource' },
            { id: 'f42', icon: <Apple className="h-6 w-6" />, desc: 'fruitSource' },
            { id: 'f43', icon: <Apple className="h-6 w-6" />, desc: 'fruitSource' },
            { id: 'f44', icon: <Apple className="h-6 w-6" />, desc: 'fruitSource' },
            { id: 'f45', icon: <Apple className="h-6 w-6" />, desc: 'fruitSource' },
            { id: 'f46', icon: <Apple className="h-6 w-6" />, desc: 'fruitSource' },
            { id: 'f47', icon: <Apple className="h-6 w-6" />, desc: 'fruitSource' },
            { id: 'f48', icon: <Apple className="h-6 w-6" />, desc: 'fruitSource' },
            { id: 'f49', icon: <Apple className="h-6 w-6" />, desc: 'fruitSource' },
            { id: 'f51', icon: <Apple className="h-6 w-6" />, desc: 'fruitSource' },
            { id: 'f52', icon: <Apple className="h-6 w-6" />, desc: 'fruitSource' },
            { id: 'f53', icon: <Apple className="h-6 w-6" />, desc: 'fruitSource' },
            { id: 'f54', icon: <Apple className="h-6 w-6" />, desc: 'fruitSource' },
            { id: 'f55', icon: <Apple className="h-6 w-6" />, desc: 'fruitSource' },
        ],
        snacksAndDrinks: [
            { id: 'f9', icon: <Milk className="h-6 w-6" />, desc: 'dairySource' },
            { id: 'f13', icon: <Cookie className="h-6 w-6" />, desc: 'snacks' },
            { id: 'f14', icon: <CupSoda className="h-6 w-6" />, desc: 'snacks' },
            { id: 'f15', icon: <Candy className="h-6 w-6" />, desc: 'snacks' },
            { id: 'f16', icon: <Coffee className="h-6 w-6" />, desc: 'snacks' },
            { id: 'f18', icon: <Coffee className="h-6 w-6" />, desc: 'healthyDrink' },
            { id: 'f20', icon: <CupSoda className="h-6 w-6" />, desc: 'healthyDrink' },
            { id: 'f22', icon: <Popcorn className="h-6 w-6" />, desc: 'snacks' },
            { id: 'f23', icon: <Donut className="h-6 w-6" />, desc: 'snacks' },
            { id: 'f24', icon: <Wheat className="h-6 w-6" />, desc: 'carbohydrateSource' },
            { id: 'f25', icon: <CakeSlice className="h-6 w-6" />, desc: 'snacks' },
            { id: 'f26', icon: <IceCream className="h-6 w-6" />, desc: 'snacks' },
            { id: 'f31', icon: <Milk className="h-6 w-6" />, desc: 'dairySource' },
        ]
    }

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
                            <AccordionContent className="pt-4 space-y-6">
                                <IconCategoryCard title={t('proteinSource')}>
                                    {foodIcons.protein.map(item => <IconExplanation key={item.id} icon={item.icon} name={t(item.id as any)} description={t(item.desc as any)} />)}
                                </IconCategoryCard>
                                <IconCategoryCard title={t('carbohydrateSource')}>
                                    {foodIcons.carbs.map(item => <IconExplanation key={item.id} icon={item.icon} name={t(item.id as any)} description={t(item.desc as any)} />)}
                                </IconCategoryCard>
                                <IconCategoryCard title={t('healthyFatSource')}>
                                     {foodIcons.fats.map(item => <IconExplanation key={item.id} icon={item.icon} name={t(item.id as any)} description={t(item.desc as any)} />)}
                                </IconCategoryCard>
                                <IconCategoryCard title={t('fruitAndVegetableSource')}>
                                     {foodIcons.fruitsAndVeg.map(item => <IconExplanation key={item.id} icon={item.icon} name={t(item.id as any)} description={t(item.desc as any)} />)}
                                </IconCategoryCard>
                                 <IconCategoryCard title={t('snacksAndDrinks')}>
                                     {foodIcons.snacksAndDrinks.map(item => <IconExplanation key={item.id} icon={item.icon} name={t(item.id as any)} description={t(item.desc as any)} />)}
                                </IconCategoryCard>
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
