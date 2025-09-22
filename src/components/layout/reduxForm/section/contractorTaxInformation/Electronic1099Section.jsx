// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { MDBCol, MDBRow } from 'mdbreact';
import { Field } from 'redux-form';
import CheckboxField from '../../customFields/CheckboxField';

const Electronic1099Section = () => (
  <MDBRow>
    <MDBCol>
      <h6><b>Electronic 1099</b></h6>
      <Field
        name="isElectronic1099Checked"
        component={CheckboxField}
        label="I would like to save paper and receive my 1099 electronically."
        className="padding-bottom-05"
        labelClassName="font14"
        filled
        inputClassName="regcheck"
      />
    </MDBCol>
  </MDBRow>
);

export default Electronic1099Section;
