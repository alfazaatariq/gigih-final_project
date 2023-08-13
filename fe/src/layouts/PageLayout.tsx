import React, { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return <div className='container mx-auto md:p-4'>{children}</div>;
};

export default PageLayout;
