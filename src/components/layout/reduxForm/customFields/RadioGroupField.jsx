// ©2024 Austin App House. All rights reserved.
import React from 'react';
import FieldLabel from '../../FieldLabel';

const RadioGroupField = field => (
  <div className={field.paddingBottomClassName || 'padding-bottom-10'}>
    <div className={`flex-box justify-content-between ${field.className || ''}`}>
      <FieldLabel
        label={field.label}
        className={field.labelClassName}
        required={field.required}
      />
      <div className={field.inputClassName}>
        {
          field.options.map(answer => (
            <input
              key={answer.value}
              gap
              onClick={() => field.input.onChange(answer.value)}
              checked={field.input.value === answer.value}
              label={answer.label}
              type="radio"
              id={`${field.input.name}-${answer.value}`}
            />
          ))
        }
      </div>
    </div>
    {
      field.meta.touched && field.meta.error
      && <span className="span-error">{field.meta.error}</span>
    }
  </div>
);

export default RadioGroupField;
