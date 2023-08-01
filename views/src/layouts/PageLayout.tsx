import React, { ReactNode } from 'react';
import Header from '../components/header/Header';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className='container mx-auto md:p-4'>
      <Header />
      {children}
      {/* footer */}
    </div>
  );
};

export default PageLayout;
