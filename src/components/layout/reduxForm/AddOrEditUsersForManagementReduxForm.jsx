// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { MDBBtn, MDBRow } from 'mdbreact';
import InputField from './customFields/InputField';
import SelectField from './customFields/SelectField';
import { userTypeOptions } from '../../../utils/constans_old';
import { normalizePhoneInput } from '../../../utils/validators';

let AddOrEditUsersForManagementReduxForm = ({ handleSubmit, submit, closeModal }) => (
  <Form onSubmit={handleSubmit} className="w-100">
    <Field
      name="firstName"
      component={InputField}
      type="text"
      label="First Name"
      className="flex-box flex-md-column"
      inputClassName="width-100-percent input-field"
      required
    />
    <Field
      name="lastName"
      component={InputField}
      type="text"
      label="Last Name"
      className="flex-box flex-md-column"
      inputClassName="width-100-percent input-field"
      required
    />
    <Field
      name="email"
      component={InputField}
      type="email"
      label="Email"
      className="flex-box flex-md-column"
      inputClassName="width-100-percent input-field"
      required
    />
    <Field
      name="phone"
      component={InputField}
      type="text"
      label="Phone number"
      className="flex-box flex-md-column"
      inputClassName="width-100-percent input-field"
      normalize={normalizePhoneInput}
      required
    />
    <Field
      name="role"
      component={SelectField}
      options={userTypeOptions}
      type="select"
      label="Role"
      className="flex-box flex-md-column"
      inputClassName="width-100-percent input-field"
      enableEmptyValue
    />
    <MDBRow
      className="flex-box justify-content-end"
      style={{ justifyContent: 'flex-end', margin: '10px 5px' }}
    >
      <MDBBtn color="info" className="submitbutc" onClick={submit}>
        Save
      </MDBBtn>
      <MDBBtn color="orange" onClick={closeModal} className="canbutc">
        Cancel
      </MDBBtn>
    </MDBRow>
  </Form>
);

AddOrEditUsersForManagementReduxForm = reduxForm({
  form: 'AddOrEditUsersForManagementReduxForm',
})(AddOrEditUsersForManagementReduxForm);

export default withRouter(AddOrEditUsersForManagementReduxForm);
