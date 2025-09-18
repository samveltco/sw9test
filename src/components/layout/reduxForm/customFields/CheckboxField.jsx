// ©2024 Austin App House. All rights reserved.
import React from 'react';

const CheckboxField = field => (
  <div
    className={field.className}
    title={field.title || ''}
  >
    <input
      filled={field.filled}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...field.input}
      disabled={field.disabled}
      className={field.inputClassName}
      label={field.label}
      type="checkbox"
      id={field.input.name}
      checked={field.input.value}
      labelClass={field.labelClassName}
      style={{ padding: '0' }}
      required={field.required}
    />
    {
      field.meta.touched && field.meta.error
      && <span className="span-error">{field.meta.error}</span>
    }
  </div>
);

export default CheckboxField;
