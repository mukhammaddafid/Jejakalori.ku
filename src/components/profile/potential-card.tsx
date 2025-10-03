'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Star, Mail, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/language-provider';

export function PotentialCard() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [hobbies, setHobbies] = React.useState(['Reading', 'Sports']);
  const [newHobby, setNewHobby] = React.useState('');
  const [email, setEmail] = React.useState('jane.doe@example.com');
  const [notifications, setNotifications] = React.useState(true);
  const [isPremium, setIsPremium] = React.useState(false);
  const [premiumCheckDone, setPremiumCheckDone] = React.useState(false);

  React.useEffect(() => {
    // This effect should only run on the client
    const joinDate = new Date(); // Simulating user join date
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    if (joinDate < sevenDaysAgo) {
      setIsPremium(true);
    }
    setPremiumCheckDone(true);
  }, []);

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

  const handleUpgrade = () => {
    toast({
      title: t('comingSoon'),
      description: t('comingSoonDescription'),
    });
  };

  return (
    <Card>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="potential">
          <AccordionTrigger className="px-6 py-4">
            <CardTitle className="flex items-center gap-2 text-xl"><Star /> {t('potential')}</CardTitle>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 space-y-6">
            <div>
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

            {premiumCheckDone && !isPremium && (
              <div className="p-4 bg-secondary rounded-lg text-center">
                <h4 className="font-semibold">{t('enhanceExperience')}</h4>
                <p className="text-sm text-muted-foreground mt-1 mb-3">{t('trialEndedUpgrade')}</p>
                <Button onClick={handleUpgrade}>{t('upgradeToPremium')}</Button>
              </div>
            )}
            <Button onClick={handleSaveChanges} className='w-full sm:w-auto'>{t('saveChanges')}</Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
