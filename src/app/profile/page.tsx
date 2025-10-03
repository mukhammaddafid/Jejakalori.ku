
'use client';
import * as React from 'react';
import { TdeeCalculator } from '@/components/profile/tdee-calculator';
import { GoalSetter } from '@/components/profile/goal-setter';
import { mockUserData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UtensilsCrossed, Bed, Smartphone, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mealPlanRecommendations = [
    { meal: 'Sarapan', suggestion: 'Oatmeal dengan buah beri dan segenggam kacang almond.' },
    { meal: 'Makan Siang', suggestion: 'Dada ayam panggang dengan nasi merah dan brokoli kukus.' },
    { meal: 'Makan Malam', suggestion: 'Salad salmon dengan sayuran hijau, tomat ceri, dan saus lemon.' },
    { meal: 'Camilan', suggestion: 'Yogurt Yunani dengan potongan buah apel.' },
];

function HealthyMealPlan() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><UtensilsCrossed /> Rekomendasi Rencana Menu Sehat</CardTitle>
                <CardDescription>
                    Berikut adalah contoh rencana makan sehat untuk membantu Anda mencapai tujuan.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {mealPlanRecommendations.map((item, index) => (
                        <li key={index} className="flex flex-col sm:flex-row gap-2">
                            <strong className="sm:w-1/4">{item.meal}:</strong>
                            <span className="sm:w-3/4 text-muted-foreground">{item.suggestion}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

function PremiumFeatureCard({ icon, title, description, children }: { icon: React.ReactNode, title: string, description: string, children: React.ReactNode }) {
  return (
    <Card className="relative overflow-hidden">
       <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">{icon} {title}</CardTitle>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <ShieldCheck className="h-4 w-4" />
                <span>Premium</span>
            </div>
        </div>
         <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}


export default function ProfilePage() {
  const userData = mockUserData;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="space-y-6">
        <TdeeCalculator initialProfile={userData.profile} />
        <GoalSetter initialGoals={userData.goals} />
        <HealthyMealPlan />
        <PremiumFeatureCard
            icon={<Bed />}
            title="Pelacak Durasi Tidur"
            description="Pantau kualitas dan durasi tidur Anda untuk pemulihan optimal."
        >
            <div className="text-center p-4 text-muted-foreground">
                <p>Fitur ini tersedia untuk anggota Premium.</p>
                <Button variant="link" className="text-primary">Tingkatkan Sekarang</Button>
            </div>
        </PremiumFeatureCard>
        <PremiumFeatureCard
            icon={<Smartphone />}
            title="Jeda Menggunakan Gawai"
            description="Atur pengingat untuk beristirahat dari layar dan menjaga kesehatan mata."
        >
            <div className="text-center p-4 text-muted-foreground">
                <p>Fitur ini tersedia untuk anggota Premium.</p>
                <Button variant="link" className="text-primary">Tingkatkan Sekarang</Button>
            </div>
        </PremiumFeatureCard>
      </div>
    </div>
  );
}
