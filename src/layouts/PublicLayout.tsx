import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const PublicLayout = ({ children }: LayoutProps) => {
  return (
    <>
      {children}
    </>
  );
};

export default PublicLayout;
