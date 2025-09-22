// ©2024 Austin App House. All rights reserved.
import React, { useState } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { withRouter } from 'withroute';
import {
  MDBBtn, MDBRow, MDBCol, MDBIcon,
} from 'mdbreact';
import InputField from './customFields/InputField';

let LoginReduxForm = ({ handleSubmit, submit }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form onSubmit={handleSubmit}>
      <MDBRow className="headsignin" style={{ justifyContent: 'center', color: '#253273' }}>
        <h2>Welcome Back!</h2>
      </MDBRow>
      <MDBRow style={{ justifyContent: 'center' }}>
        <div>
          <MDBCol md="12">
            <div className="form-group signinput">
              <Field
                label="Email"
                type="email"
                component={InputField}
                inputClassName="form-control"
                name="email"
                labelClassName="font12"
                className="flex-column align-items-center"
                dimensionClassName="w-100"
              />
            </div>
          </MDBCol>
        </div>
        <div>
          <MDBCol md="12">
            <div className="form-group signinput">
              <MDBIcon
                icon={!showPassword ? 'eye' : 'eye-slash'}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                style={{
                  position: 'absolute',
                  top: '38px',
                  right: '20px',
                }}
              />
              <Field
                label="Password"
                type={showPassword ? 'text' : 'password'}
                component={InputField}
                inputClassName="form-control"
                name="password"
                labelClassName="font12"
                className="flex-column align-items-center"
                dimensionClassName="w-100"
              />
            </div>
          </MDBCol>
        </div>
      </MDBRow>
      <MDBRow />
      <div className="buttondivsignin">
        <MDBRow style={{ justifyContent: 'center' }}>
          <MDBBtn color="info" className="signbutton" onClick={submit}>
            Sign in
          </MDBBtn>
        </MDBRow>
      </div>
    </Form>
  );
};

LoginReduxForm = reduxForm({
  form: 'loginReduxForm',
})(LoginReduxForm);

export default withRouter(LoginReduxForm);
