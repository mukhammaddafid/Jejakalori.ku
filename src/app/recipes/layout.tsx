import { AppLayout } from '@/components/layout/app-layout';

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
