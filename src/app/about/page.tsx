'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/lib/language-provider';
import { Info, Target, FlaskConical, Rocket, AlertTriangle, Wrench, Utensils, Drumstick, Wheat, Carrot, Fish, Apple, Nut, Egg, Milk, Salad, Beef, Croissant, Cookie, CupSoda, Candy, Coffee, Pizza, Sandwich, Soup, Popcorn, Donut, CakeSlice, IceCream, Cherry } from 'lucide-react';
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

const TechLogo: React.FC<{ name: string, logo: React.ReactNode }> = ({ name, logo }) => (
    <div className="flex flex-col items-center gap-2 text-center">
        <div className="h-12 w-12 flex items-center justify-center">{logo}</div>
        <span className="text-xs font-semibold">{name}</span>
    </div>
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
                                <Section icon={<Utensils className="h-7 w-7" />} title={t('foodAndBeverageTitle')}>
                                    <p>{t('foodAndBeverageContent')}</p>
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
                         <ul className="list-disc list-outside ml-5 space-y-2">
                            <li><strong>{t('apiSupport1Title')}</strong>: {t('apiSupport1')}</li>
                            <li><strong>{t('apiSupport2Title')}</strong>: {t('apiSupport2')}</li>
                        </ul>
                    </Section>

                    <Section icon={<AlertTriangle className="h-7 w-7 text-amber-500" />} title={t('limitationsTitle')}>
                        <ul className="list-disc list-outside ml-5 space-y-2">
                            <li><strong>{t('limitations1Title')}</strong>: {t('limitations1')}</li>
                            <li><strong>{t('limitations2Title')}</strong>: {t('limitations2')}</li>
                            <li><strong>{t('limitations3Title')}</strong>: {t('limitations3')}</li>
                        </ul>
                    </Section>

                    <div className="text-center pt-4">
                        <p className="text-sm text-muted-foreground">{t('builtWith')}</p>
                        <div className="flex justify-center items-center gap-6 mt-4 text-muted-foreground">
                            <TechLogo name="Next.js" logo={
                                <svg width="48" height="48" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128Z" fill="currentColor"/>
                                    <path d="M99.2365 38.8365L59.0231 92.1153V65.8076L40.7307 38.8365H99.2365ZM107 30.8365H31L67.0192 80.1153V103L107 30.8365Z" fill="white"/>
                                </svg>
                            } />
                            <TechLogo name="React" logo={
                                 <svg width="48" height="48" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="0" cy="0" r="2" fill="currentColor" fillOpacity="0.8"></circle>
                                    <g stroke="currentColor" strokeOpacity="0.8" stroke-width="1" fill="none">
                                        <ellipse rx="10" ry="4.5"></ellipse>
                                        <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                                        <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
                                    </g>
                                </svg>
                            } />
                            <TechLogo name="Tailwind CSS" logo={
                               <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 2.25C17.3827 2.25 21.7501 6.61741 21.7501 12C21.7501 17.3826 17.3827 21.75 12.0001 21.75C6.6175 21.75 2.25006 17.3826 2.25006 12C2.25006 6.61741 6.6175 2.25 12.0001 2.25ZM10.059 15.0211C12.0353 15.0211 13.568 13.9147 14.282 12.0166H10.106V9.08864H16.8941V10.6321C16.143 13.435 13.9013 15.75 10.059 15.75C6.73286 15.75 4.69111 13.8211 4.50006 10.5976H7.89209C7.99444 12.0721 8.87786 12.9376 10.059 12.9376ZM8.01602 6.25C11.3081 6.25 13.3498 8.17894 13.5068 11.4024H10.1148C10.0125 9.92791 9.12902 9.06243 8.01602 9.06243C6.03969 9.06243 4.50702 10.1688 3.79302 12.0669H7.96902V15.021H1.18109V13.4475C1.93209 10.6125 4.17384 6.25 8.01602 6.25Z" fill="currentColor" fill-opacity="0.8"></path>
                                </svg>
                            } />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
