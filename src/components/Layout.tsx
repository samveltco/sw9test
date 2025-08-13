import React from 'react';
import Header from './Header';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

// Mock user data - in a real app this would come from state management
const mockUser = {
  name: 'Moni Roy',
  type: 'Client',
  avatar: '/images/avatar.jpg',
  company: 'Might Deployment Solutions',
  registrationDate: '10/7/2020',
  lastLogin: '7/9/2025, 2:08:32 PM',
  address: '3075 6th St SW, Loveland, Colorado 80537',
  website: 'www.sourcew9.com',
  phone: '(402) 202-2996',
  email: 'stephanieb@mightdeployment.com',
  bio: 'We are a service project management company that handles networking, POS, and cabling work.'
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="root">
      <div className="header_sidebar">
        <Header 
          user={mockUser}
          availableFunds="$1,268.22"
          notificationCount={6}
        />
        <Navigation />
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout; 