// ©2024 Austin App House. All rights reserved.
import React from 'react';
import FieldLabel from '../../FieldLabel';
import Editor from '../../editor';

const EditorField = field => {

  return (
    <div
      className={`flex-box justify-content-between ${field.className || ''}`}
      style={{ width: '100%' }}
    >
      <FieldLabel
        label={field.label}
        className={field.labelClassName} 
        required={field.required}
      />
      <Editor
        data={field.input.value} 
        onChange={value => field.input.onChange(value)}
      />
      {
        field.meta.touched && field.meta.error
        && <span className="span-error">{field.meta.error}</span>
      }
    </div>
  )
};

export default EditorField;
