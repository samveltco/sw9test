import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  hint, 
  wrapperClassName = '', 
  className = '', 
  id,
  ...props 
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`field_block ${wrapperClassName}`}>
      {label && (
        <label className="field_name" htmlFor={inputId}>
          {label}
          {hint && <div className="field_hints">{hint}</div>}
        </label>
      )}
      <div className="field_block">
        <input
          id={inputId}
          className={className}
          {...props}
        />
      </div>
      {error && <div className="field_error">{error}</div>}
    </div>
  );
};

export default Input; 