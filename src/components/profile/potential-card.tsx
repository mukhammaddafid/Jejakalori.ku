'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Star, Mail, Bell, Zap, BookOpen, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/language-provider';

function SubscriptionTier({
    icon,
    title,
    price,
    description,
    buttonText,
    isCurrent = false,
  }: {
    icon: React.ReactNode;
    title: string;
    price: string;
    description: string;
    buttonText: string;
    isCurrent?: boolean;
  }) {
    return (
      <div className="p-4 border rounded-lg flex flex-col items-center text-center">
        {icon}
        <h4 className="font-bold mt-2">{title}</h4>
        <p className="text-xl font-bold">{price}</p>
        <p className="text-xs text-muted-foreground min-h-[30px]">{description}</p>
        <Button className="mt-3 w-full" disabled={isCurrent}>
          {isCurrent ? 'Current Plan' : buttonText}
        </Button>
      </div>
    );
  }

export function PotentialCard() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [hobbies, setHobbies] = React.useState(['Reading', 'Sports']);
  const [newHobby, setNewHobby] = React.useState('');
  const [email, setEmail] = React.useState('jane.doe@example.com');
  const [notifications, setNotifications] = React.useState(true);

  const addHobby = () => {
    if (newHobby && !hobbies.includes(newHobby)) {
      setHobbies([...hobbies, newHobby]);
      setNewHobby('');
      toast({
        title: t('hobbyAdded'),
        description: t('hobbyAddedDescription', { hobby: newHobby }),
      });
    }
  };

  const handleSaveChanges = () => {
    toast({
      title: t('changesSaved'),
      description: t('changesSavedDescription'),
    });
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl"><Star /> {t('potential')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="hobbies" className="font-semibold">{t('hobbies')}</Label>
              <p className="text-sm text-muted-foreground mb-2">{t('hobbiesDescription')}</p>
              <div className="flex gap-2 mb-2 flex-wrap">
                {hobbies.map(hobby => <Badge key={hobby} variant="secondary">{hobby}</Badge>)}
              </div>
              <div className="flex gap-2">
                <Input
                  id="hobbies"
                  placeholder={t('hobbiesPlaceholder')}
                  value={newHobby}
                  onChange={(e) => setNewHobby(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addHobby()}
                />
                <Button onClick={addHobby}>{t('add')}</Button>
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor="email" className="font-semibold">{t('email')}</Label>
              <div className="flex gap-2">
                <Mail className="h-5 w-5 text-muted-foreground mt-2" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="notifications" className="font-semibold cursor-pointer">{t('emailScheduleNotifications')}</Label>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div>
                <h3 className="font-semibold mb-3">Subscription Tiers</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SubscriptionTier 
                        icon={<BookOpen className="w-8 h-8 text-green-500" />}
                        title="Reading"
                        price="Free"
                        description="Climb ranks and earn badges within 24 hours."
                        buttonText="Select Plan"
                        isCurrent={true}
                    />
                    <SubscriptionTier 
                        icon={<Trophy className="w-8 h-8 text-yellow-500" />}
                        title="Sport"
                        price="Rp 75.000/mo"
                        description="or Rp 650.000/year"
                        buttonText="Upgrade"
                    />
                    <SubscriptionTier 
                        icon={<Zap className="w-8 h-8 text-purple-500" />}
                        title="Champion"
                        price="Rp 100.000/mo"
                        description="or Rp 1.000.000/year"
                        buttonText="Upgrade"
                    />
                </div>
            </div>

            <Button onClick={handleSaveChanges} className='w-full sm:w-auto'>{t('saveChanges')}</Button>
        </CardContent>
    </Card>
  );
}
