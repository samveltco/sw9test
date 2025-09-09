// ©2024 Austin App House. All rights reserved.
import React from 'react';

const SelectField = field => (
  <div className={`flex-box justify-content-between ${field.className || ''}`}>
    
    <div>
      <select
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...field.input}
        placeholder={field.placeholder}
        required={field.required}
        className={field.inputClassName}
        disabled={field.disabled}
      >
        {
          field?.enableEmptyValue
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            ? <option />
            : <></>
        }
        {
          field.options.map(item => (
            <option key={item.label} value={item.value}>{item.label}</option>
          ))
        }
      </select>
      {
        field.meta.touched && field.meta.error
        && <span className="span-error">{field.meta.error}</span>
      }
    </div>
  </div>
);

export default SelectField;
