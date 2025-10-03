'use client';

import * as React from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { UserData } from '@/lib/types';
import { getDailySummaryAction } from '@/actions/generate-summary';
import { Skeleton } from '../ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/language-provider';

interface AiSummaryCardProps {
  userData: UserData;
}

export function AiSummaryCard({ userData }: AiSummaryCardProps) {
  const [summary, setSummary] = React.useState('');
  const [suggestions, setSuggestions] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleGenerateSummary = async () => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <span>{t('dailySummary')}</span>
        </CardTitle>
        <CardDescription>
          {t('dailySummaryDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/4 mt-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : summary ? (
          <div className="space-y-4 text-sm">
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
          <div className="text-center text-muted-foreground py-8">
            <p>{t('clickToGenerate')}</p>
          </div>
        )}

        <Button onClick={handleGenerateSummary} disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
          <Sparkles className="mr-2 h-4 w-4" />
          {isLoading ? t('generating') : t('generateMySummary')}
        </Button>
      </CardContent>
    </Card>
  );
}
