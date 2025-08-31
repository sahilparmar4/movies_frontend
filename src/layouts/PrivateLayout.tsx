import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const PrivateLayout = ({ children }: LayoutProps) => {
  return (
    <>

      {children}

    </>
  );
};

export default PrivateLayout;
