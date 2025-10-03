
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

export function PotentialCard() {
  const { toast } = useToast();
  const [hobbies, setHobbies] = React.useState(['Membaca', 'Olahraga']);
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
        title: 'Hobi Ditambahkan',
        description: `${newHobby} telah ditambahkan ke daftar hobi Anda.`,
      });
    }
  };

  const handleSaveChanges = () => {
    toast({
      title: 'Perubahan Disimpan',
      description: 'Pengaturan potensi dan notifikasi Anda telah diperbarui.',
    });
  };

  const handleUpgrade = () => {
    toast({
      title: 'Segera Hadir!',
      description: 'Fungsionalitas peningkatan ke premium akan segera tersedia.',
    });
  };

  return (
    <Card>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="potential">
          <AccordionTrigger className="px-6 py-4">
            <CardTitle className="flex items-center gap-2 text-xl"><Star /> Potensi</CardTitle>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 space-y-6">
            <div>
              <Label htmlFor="hobbies" className="font-semibold">Hobi</Label>
              <p className="text-sm text-muted-foreground mb-2">Tambahkan hobi untuk mendapatkan rekomendasi aktivitas yang dipersonalisasi.</p>
              <div className="flex gap-2 mb-2 flex-wrap">
                {hobbies.map(hobby => <Badge key={hobby} variant="secondary">{hobby}</Badge>)}
              </div>
              <div className="flex gap-2">
                <Input
                  id="hobbies"
                  placeholder="e.g. Bersepeda"
                  value={newHobby}
                  onChange={(e) => setNewHobby(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addHobby()}
                />
                <Button onClick={addHobby}>Tambah</Button>
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor="email" className="font-semibold">Email</Label>
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
                <Label htmlFor="notifications" className="font-semibold cursor-pointer">Notifikasi Jadwal via Email</Label>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            {premiumCheckDone && !isPremium && (
              <div className="p-4 bg-secondary rounded-lg text-center">
                <h4 className="font-semibold">Tingkatkan Pengalaman Anda</h4>
                <p className="text-sm text-muted-foreground mt-1 mb-3">Masa uji coba 7 hari Anda telah berakhir. Tingkatkan ke premium untuk membuka semua fitur.</p>
                <Button onClick={handleUpgrade}>Tingkatkan ke Premium</Button>
              </div>
            )}
            <Button onClick={handleSaveChanges} className='w-full sm:w-auto'>Simpan Perubahan</Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
