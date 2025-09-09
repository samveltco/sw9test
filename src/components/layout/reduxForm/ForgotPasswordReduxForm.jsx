// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { MDBBtn, MDBRow, MDBCol } from 'mdbreact';
import InputField from './customFields/InputField';
import RadioGroupField from "./customFields/RadioGroupField";

let ForgotPasswordReduxForm = ({ handleSubmit, submit }) => (
  <Form onSubmit={handleSubmit}>
    <div className="buttondivsignin">
      <MDBCol md="12">
        <div className="form-group signinput">
          <Field
            label="Email"
            type="email"
            component={InputField}
            name="email"
            labelClassName="font12"
            inputClassName="form-control"
            className="flex-column align-items-center"
            dimensionClassName="w-100"
          />
          <Field
            name="sms"
            component={RadioGroupField}
            type="radiobox"
            labelClassName="font12"
            options={[
              {label: "Use Phone For Verifcation", value: true},
              {label: "Use Email Address For Verifcation", value: false},
            ]}
          />
        </div>
      </MDBCol>
      <MDBRow style={{ justifyContent: 'center' }}>
        <MDBBtn color="info" className="signbutton" onClick={submit}>
          Submit
        </MDBBtn>
      </MDBRow>
    </div>
  </Form>
);

ForgotPasswordReduxForm = reduxForm({
  form: 'forgotPasswordReduxForm',
})(ForgotPasswordReduxForm);

export default withRouter(ForgotPasswordReduxForm);
