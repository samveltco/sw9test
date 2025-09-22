// ©2024 Austin App House. All rights reserved.
import React, { useState } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { withRouter } from 'withroute';
import {
  MDBBtn, MDBCol, MDBIcon, MDBRow,
} from 'mdbreact';
import InputField from './customFields/InputField';

const ResetPasswordReduxForm = ({ handleSubmit, submit }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Form onSubmit={handleSubmit}>
      <div className="headingdivr">
        <h2>Reset Password</h2>
      </div>
      <MDBRow className="justify-content-center">
        <MDBCol md="8">
          <div className="form-group registeinput">
            <MDBIcon
              icon={showPassword ? 'eye-slash' : 'eye'}
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                top: '38px',
                right: '20px',
              }}
            />
            <Field
              label="Password"
              name="password"
              component={InputField}
              type={showPassword ? 'text' : 'password'}
              inputClassName="form-control"
              labelClassName="font12"
              className="flex-column align-items-center "
              dimensionClassName="w-100"
            />
          </div>
        </MDBCol>
        <MDBCol md="8">
          <div className="form-group registeinput">
            <MDBIcon
              icon={showPassword ? 'eye-slash' : 'eye'}
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                top: '38px',
                right: '20px',
              }}
            />
            <Field
              label="Confirm Password"
              name="confirmPassword"
              component={InputField}
              type={showPassword ? 'text' : 'password'}
              labelClassName="font12"
              inputClassName="form-control"
              className="flex-column align-items-center"
              dimensionClassName="w-100"
            />
          </div>
        </MDBCol>
      </MDBRow>
      <MDBRow />
      <MDBRow style={{ justifyContent: 'center' }}>
        <MDBBtn color="info" className="signbutton" onClick={submit}>
          Submit
        </MDBBtn>
      </MDBRow>
    </Form>
  );
};

export default withRouter(reduxForm({
  form: 'resetPasswordReduxForm',
})(React.memo(ResetPasswordReduxForm)));
