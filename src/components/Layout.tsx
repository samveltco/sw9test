import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="root">
      <Header 
        user={user}
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