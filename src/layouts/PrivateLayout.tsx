import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const PrivateLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
    </>
  );
};

export default PrivateLayout;
