import { AppLayout } from '@/components/layout/app-layout';

export default function ReadingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
