// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { Field } from 'redux-form';
import { MDBCol } from 'mdbreact';
import InputField from '../../customFields/InputField';

const Fee = () => {
  const handleChange = (event, newValue) => {
    if (Number.isNaN(Number(newValue))) event.preventDefault();
  };

  return (
    <MDBCol md="4">
      <Field
        name="processingFee"
        component={InputField}
        type="text"
        placeholder="Fee"
        label="Fee:"
        title="Fee must be greater than or equal to 3"
        className="justify-content-end"
        inputClassName="input-field small-styled-input-half text-align-right"
        paddingBottomClassName="no-paddings"
        dimension="%"
        dimensionClassName="dimension-to-white-input"
        onChange={handleChange}
      />
    </MDBCol>
  );
};

export default Fee;
