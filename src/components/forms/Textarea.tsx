import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: React.ReactNode;
  wrapperClassName?: string;
}

const Textarea: React.FC<TextareaProps> = ({ 
  label, 
  error, 
  hint, 
  wrapperClassName = '', 
  className = '', 
  id,
  ...props 
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`field_row ${wrapperClassName}`}>
      <div className="field_name">
        {label && (
          <label htmlFor={textareaId}>
            {label}
          </label>
        )}
        {hint && <div className="field_hints">{hint}</div>}
      </div>
      <div className="field_block">
        <textarea
          id={textareaId}
          className={className}
          {...props}
        />
      </div>
      {error && <div className="field_error">{error}</div>}
    </div>
  );
};

export default Textarea; 