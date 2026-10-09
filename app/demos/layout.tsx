import DemoShell from '@/components/demos/DemoShell';

export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return <DemoShell>{children}</DemoShell>;
}
