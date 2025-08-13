import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'standard' | 'light' | 'dark' | 'lightest' | 'curry' | 'orange' | 'green';
  icon?: string;
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'standard', 
  icon, 
  loading = false,
  children, 
  className = '', 
  disabled,
  ...props 
}) => {
  const getButtonClass = () => {
    const baseClass = variant === 'primary' ? 'primary_btn' : 'standard_btn';
    let variantClass = '';
    
    switch (variant) {
      case 'light':
        variantClass = 'light_btn';
        break;
      case 'dark':
        variantClass = 'dark_btn';
        break;
      case 'lightest':
        variantClass = 'lightest_btn';
        break;
      case 'curry':
        variantClass = 'curry_btn';
        break;
      case 'orange':
        variantClass = 'orange_btn';
        break;
      case 'green':
        variantClass = 'green_btn';
        break;
      default:
        variantClass = '';
    }
    
    return `${baseClass} ${variantClass} ${icon ? icon : ''} ${className}`.trim();
  };

  return (
    <button
      className={getButtonClass()}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button; 