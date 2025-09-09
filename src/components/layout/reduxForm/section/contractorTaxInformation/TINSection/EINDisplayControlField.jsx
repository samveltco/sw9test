// ©2024 Austin App House. All rights reserved.
import { MDBInput } from 'mdbreact';
import React from 'react';
import FieldLabel from '../../../../FieldLabel';

const EINDisplayControlField = field => (
  <div className="flex-box justify-content-between">
    <FieldLabel
      label={field.label}
      className={field.labelClassName}
      required={field.required}
    />
    <div className="flex-box">
      <MDBInput
        id="YES"
        type="radio"
        name="YesNo"
        label="YES"
        checked={field.input.checked}
        onClick={() => field.input.onChange(true)}
      />
      <MDBInput
        id="NO"
        type="radio"
        name="YesNo"
        label="NO"
        checked={!field.input.checked}
        onClick={() => field.input.onChange(false)}
      />
    </div>
  </div>
);

export default EINDisplayControlField;
