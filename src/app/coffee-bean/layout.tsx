import { ReactNode } from 'react';

export default function CoffeeBeanLayout({ children }: { children: ReactNode }) {
  return (
    <main className={'px-4'}>
      <h1 className={'text-xl font-bold'}>Coffee Bean</h1>
      <div className={'mt-5'}>{children}</div>
    </main>
  );
}
