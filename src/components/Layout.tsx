import React from 'react';
import Header from './Header';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // TODO get user data from store

  return (
    <div className="root">
      <Header 
        availableFunds="$1,268.22"
        notificationCount={6}
      />
      <Navigation />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout; 