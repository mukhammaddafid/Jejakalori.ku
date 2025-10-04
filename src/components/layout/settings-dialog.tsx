'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, User, Mail, KeyRound, Smartphone, Monitor, Watch, Shield } from 'lucide-react';
import { useLanguage } from '@/lib/language-provider';
import { mockUserData } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';
import { SidebarMenuButton } from '../ui/sidebar';

export function SettingsDialog() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [name, setName] = React.useState(mockUserData.profile.name);
  const [email, setEmail] = React.useState('jane.doe@example.com');

  const handleSaveChanges = () => {
    toast({
        title: t('changesSaved'),
        description: t('changesSavedDescription')
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton variant="ghost" className="w-full justify-start h-10 p-2" tooltip={t('settings')}>
            <Settings />
            <span>{t('settings')}</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Settings />{t('settings')}</DialogTitle>
          <DialogDescription>{t('settingsDescription')}</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">{t('account')}</TabsTrigger>
            <TabsTrigger value="sync">{t('sync')}</TabsTrigger>
            <TabsTrigger value="privacy">{t('privacy')}</TabsTrigger>
          </TabsList>
          <div className="py-6">
            <TabsContent value="account" className="m-0 space-y-6">
                 <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2"><User />{t('name')}</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2"><Mail />{t('email')}</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label className="flex items-center gap-2"><KeyRound />{t('password')}</Label>
                    <Button variant="outline" className="w-full">{t('changePassword')}</Button>
                </div>
                <Separator />
                <div className="space-y-4">
                  <Label className="flex items-center gap-2"><Shield />{t('twoFactorAuth')}</Label>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                      <p className="text-sm text-muted-foreground">{t('twoFactorAuthDescription')}</p>
                      <Switch id="two-factor-auth" />
                  </div>
                </div>
            </TabsContent>
            <TabsContent value="sync" className="m-0 space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                        <Smartphone />
                        <Label htmlFor="sync-smartphone" className="font-medium">{t('smartphoneSync')}</Label>
                    </div>
                    <Switch id="sync-smartphone" defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                        <Monitor />
                        <Label htmlFor="sync-desktop" className="font-medium">{t('desktopSync')}</Label>
                    </div>
                    <Switch id="sync-desktop" defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                        <Watch />
                        <Label htmlFor="sync-smartwatch" className="font-medium">{t('smartwatchSync')}</Label>
                    </div>
                    <Switch id="sync-smartwatch" />
                </div>
                 <p className="text-xs text-muted-foreground pt-2">{t('syncDescription')}</p>
            </TabsContent>
            <TabsContent value="privacy" className="m-0 space-y-4">
                 <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold">{t('dataPrivacyTitle')}</h4>
                        <p className="text-sm text-muted-foreground">{t('dataPrivacyContent')}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold">{t('communicationPreferences')}</h4>
                        <p className="text-sm text-muted-foreground">{t('communicationPreferencesContent')}</p>
                    </div>
                </div>
            </TabsContent>
          </div>
        </Tabs>
        <DialogFooter>
          <Button onClick={handleSaveChanges}>{t('saveChanges')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
