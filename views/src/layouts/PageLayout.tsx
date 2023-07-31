import React, { ReactNode } from 'react';
import Header from '../components/header/Header';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className='p-4 bg-gradient-to-b from-slate-900 to-purple-950 min-h-screen '>
      <Header />
      <div>{children}</div>
      {/* footer */}
    </div>
  );
};

export default PageLayout;
