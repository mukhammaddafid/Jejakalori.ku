import { AppLayout } from '@/components/layout/app-layout';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
