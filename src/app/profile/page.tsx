import * as React from 'react';
import { TdeeCalculator } from '@/components/profile/tdee-calculator';
import { GoalSetter } from '@/components/profile/goal-setter';
import { mockUserData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UtensilsCrossed } from 'lucide-react';

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


export default function ProfilePage() {
  const userData = mockUserData;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="space-y-6">
        <TdeeCalculator initialProfile={userData.profile} />
        <GoalSetter initialGoals={userData.goals} />
        <HealthyMealPlan />
      </div>
    </div>
  );
}
