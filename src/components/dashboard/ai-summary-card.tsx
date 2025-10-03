'use client';

import * as React from 'react';
import { BookOpen, Sparkles, KeyRound } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { UserData } from '@/lib/types';
import { getDailySummaryAction } from '@/actions/generate-summary';
import { Skeleton } from '../ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/language-provider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AiSummaryCardProps {
  userData: UserData;
}

export function AiSummaryCard({ userData }: AiSummaryCardProps) {
  const [summary, setSummary] = React.useState('');
  const [suggestions, setSuggestions] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [apiKey, setApiKey] = React.useState('');
  const [apiProvider, setApiProvider] = React.useState('gemini');
  const [customProviderName, setCustomProviderName] = React.useState('');
  const [isActivated, setIsActivated] = React.useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleGenerateSummary = async () => {
    if (!isActivated) {
      toast({
        variant: 'destructive',
        title: t('error'),
        description: t('apiKeyNotActivated'),
      });
      return;
    }
    setIsLoading(true);
    const result = await getDailySummaryAction(userData);
    setIsLoading(false);

    if (result.success && result.data) {
      setSummary(result.data.summary);
      setSuggestions(result.data.suggestions);
    } else {
      toast({
        variant: 'destructive',
        title: t('error'),
        description: result.error,
      });
    }
  };

  const handleActivate = () => {
    const providerToActivate = apiProvider === 'other' ? customProviderName : apiProvider;
    if (apiKey.trim() !== '') {
      // In a real app, you'd validate and save this key securely.
      setIsActivated(true);
      toast({
        title: t('apiKeyActivated'),
        description: t('apiKeyActivatedDescription', { provider: providerToActivate }),
      });
    } else {
      toast({
        variant: 'destructive',
        title: t('error'),
        description: t('apiKeyRequired'),
      });
    }
  };

  const getProviderDisplayName = () => {
    if (apiProvider === 'other') {
      return customProviderName || t('other');
    }
    return apiProvider.charAt(0).toUpperCase() + apiProvider.slice(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          <span>{t('dailySummary')}</span>
        </CardTitle>
        <CardDescription>
          {t('dailySummaryDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Label>{t('selectProvider')}</Label>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                        <span>{getProviderDisplayName()}</span>
                        <Sparkles className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                    <DropdownMenuRadioGroup value={apiProvider} onValueChange={setApiProvider}>
                        <DropdownMenuRadioItem value="gemini">Gemini</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="replicate">Replicate</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="deepseek">DeepSeek</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="chatgpt">ChatGPT</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="other">{t('other')}</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        {apiProvider === 'other' && (
          <div className="space-y-2">
            <Label htmlFor="custom-provider">{t('customProvider')}</Label>
            <Input
              id="custom-provider"
              type="text"
              placeholder={t('customProviderPlaceholder')}
              value={customProviderName}
              onChange={(e) => setCustomProviderName(e.target.value)}
            />
          </div>
        )}

        <div className="space-y-2">
            <Label htmlFor="api-key">{t('apiKey')}</Label>
            <div className="flex gap-2">
                <Input id="api-key" type="password" placeholder="••••••••••••••••••••" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
                <Button onClick={handleActivate} variant="secondary">
                    <KeyRound className="mr-2 h-4 w-4" />
                    {t('activate')}
                </Button>
            </div>
        </div>

        {isActivated && (
            <div className="text-center text-muted-foreground py-4">
                {isLoading ? (
                <div className="space-y-4">
                    <Skeleton className="h-4 w-1/4 mx-auto" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                    <Skeleton className="h-4 w-1/4 mx-auto mt-4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3 mx-auto" />
                </div>
                ) : summary ? (
                <div className="space-y-4 text-sm text-left">
                    <div>
                    <h4 className="font-semibold">{t('summary')}</h4>
                    <p className="text-muted-foreground">{summary}</p>
                    </div>
                    <div>
                    <h4 className="font-semibold">{t('suggestionsForTomorrow')}</h4>
                    <p className="text-muted-foreground">{suggestions}</p>
                    </div>
                </div>
                ) : (
                <p>{t('clickToGenerate')}</p>
                )}
            </div>
        )}
        
        <Button onClick={handleGenerateSummary} disabled={isLoading || !isActivated} className="w-full bg-primary hover:bg-primary/90">
          <Sparkles className="mr-2 h-4 w-4" />
          {isLoading ? t('generating') : t('generateMySummary')}
        </Button>
      </CardContent>
    </Card>
  );
}
