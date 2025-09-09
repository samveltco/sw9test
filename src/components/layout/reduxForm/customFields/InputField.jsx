// ©2024 Austin App House. All rights reserved.
import React from 'react';

const InputField = field => {
  return (
    <input
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...field.input}
      type={field.type}
      placeholder={field.placeholder}
      required={field.required}
      className={field.inputClassName}
      disabled={field.disabled}
      title={field.title || ''}
      min={field.min}
      max={field.max}
      step={field.step}
      style={field.dimension ? ({ paddingRight: 0 }) : ({})}
    />
  )
};

export default InputField;
