// ©2024 Austin App House. All rights reserved.
import React from 'react';

const FieldLabel = ({ label, required, className }) => (
  label
    ? (
      <div className="flex-box align-items-center">
        <label className={`no-margins ${className || ''}`}>
          {label}
          <span className="requiredField">
            {required ? '*' : ''}
          </span>
        </label>
      </div>
    )
    : <></>
);

export default FieldLabel;
