import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

interface NavigationProps {
    isCollapsed?: boolean;
    onToggle?: () => void;
}

interface TokenPayload {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: string;
    status: string;
    iat: number;
    exp: number;
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

    const token = localStorage.getItem('jwtToken');
    let userType: string | null = null;
    if (token) {
        try {
            const decoded = jwtDecode<TokenPayload>(token);
            userType = decoded.userType;
        } catch (error) {
            console.error('Invalid token:', error);
        }
    }

    const allMenuItems = [
        { path: '/', label: 'Dashboard', icon: 'icon_dashboard' },
        { path: '/find-contractor', label: 'Find Contractor', icon: 'icon_products' },
        { path: '/certificates-contractors', label: 'Certification', icon: 'icon_contact' },
        { path: '/recruits', label: 'Recruits', icon: 'icon_contact' },
        { path: '/preferred-contractors', label: 'Preferred', icon: 'icon_contact' },
        { path: '/manage-custom', label: 'Manage Custom Fields', icon: 'icon_stock' },
        { path: '/manage-companies', label: 'Manage Companies', icon: 'icon_stock' },
        { path: '/pm-tools', label: 'PM Tools', icon: 'icon_file' },
        { path: '/manage-teams', label: 'Manage Teams', icon: 'icon_contact' },
        { path: '/user-management', label: 'User Management', icon: 'icon_chart' },
        { path: '/transaction-history', label: 'Payment History', icon: 'icon_chat' },
        { path: '/manage-funds', label: 'Manage Funds', icon: 'icon_chat' },
        { path: '/funding-sources', label: 'Funding Sources', icon: 'icon_stock' },
        { path: '/payment-methods', label: 'Payment Methods', icon: 'icon_invoice' },
        { path: '/clients-transactions-history', label: 'Clients Transactions', icon: 'icon_chat' },
        { path: '/templates', label: 'Templates', icon: 'icon_lists' }
    ];

    const menuItems = (() => {
        if (userType === 'contractor') {
            return allMenuItems.filter(item =>
                ['/', '/transaction-history'].includes(item.path)
            );
        } else if (userType === 'client') {
            return allMenuItems.filter(item =>
                ['/', '/find-contractor', '/preferred-contractors', '/manage-custom', '/pm-tools', '/manage-teams', '/user-management', '/manage-funds', '/payment-methods', '/templates'].includes(item.path)
            );
        }
        else if (userType === 'superAdmin') {
            return allMenuItems.filter(item =>
                ['/', '/certificates-contractors', '/recruits', '/manage-companies', '/manage-funds', '/funding-sources', '/clients-transactions-history'].includes(item.path)
            );
        }
        return allMenuItems;
    })();

    const isActive = (path: string) => location.pathname === path;

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
                <button
                    className="logout_btn icon_logout"
                    onClick={handleLogout}
                    aria-label="logout"
                >
                    <span>Log out</span>
                </button>
            </div>
        </div>
    );
};

export default Navigation;
