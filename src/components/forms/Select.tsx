import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
  wrapperClassName?: string;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ 
  label, 
  options, 
  error, 
  wrapperClassName = '', 
  className = '', 
  placeholder = 'Select',
  id,
  ...props 
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`field_block ${wrapperClassName}`}>
      {label && (
        <label className="field_name" htmlFor={selectId}>
          {label}
        </label>
      )}
      <div className="field_block">
        <select
          id={selectId}
          className={className}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="field_error">{error}</div>}
    </div>
  );
};

export default Select; 