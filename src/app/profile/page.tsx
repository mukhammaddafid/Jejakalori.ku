import * as React from 'react';
import { TdeeCalculator } from '@/components/profile/tdee-calculator';
import { GoalSetter } from '@/components/profile/goal-setter';
import { mockUserData } from '@/lib/data';

export default function ProfilePage() {
  const userData = mockUserData;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold font-headline">Profile & Goals</h1>
        <p className="text-muted-foreground">Manage your personal information and nutrition targets.</p>
      </div>
      
      <div className="space-y-6">
        <TdeeCalculator initialProfile={userData.profile} />
        <GoalSetter initialGoals={userData.goals} />
      </div>
    </div>
  );
}
