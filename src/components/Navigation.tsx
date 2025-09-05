import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavigationProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isCollapsed);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    const el = document.querySelector('.sidebar');
    if (el) el.classList.toggle('opened');
    if (onToggle) onToggle();
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/home');
  };

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: 'icon_dashboard' },
    { path: '/find-contractor', label: 'Find Contractor', icon: 'icon_products' },
    { path: '/preferred-contractors', label: 'Preferred', icon: 'icon_contact' },
    { path: '/manage-custom', label: 'Manage Custom Fields', icon: 'icon_stock' },
    { path: '/pm-tools', label: 'PM Tools', icon: 'icon_file' },
    { path: '/manage-teams', label: 'Manage Teams', icon: 'icon_contact' },
    { path: '/user-management', label: 'User Management', icon: 'icon_chart' },
    { path: '/transaction-history', label: 'Manage founds', icon: 'icon_chat' },
    { path: '/payment-methods', label: 'Payment Methods', icon: 'icon_invoice' },
    { path: '/templates', label: 'Templates', icon: 'icon_lists' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="menu_btn_block">
        <button 
          className="menu_btn icon_menu" 
          aria-label="sidebar toggle" 
          onClick={toggleSidebar}
        ></button>
      </div>
      <div className="sidebar_inner">
        <div className="sidebar_menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${item.icon} ${isActive(item.path) ? 'current' : ''}`}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        <button className="logout_btn icon_logout" onClick={handleLogout} aria-label="logout">
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation; 