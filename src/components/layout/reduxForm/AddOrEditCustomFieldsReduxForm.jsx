// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { withRouter } from 'withroute';
import { MDBBtn, MDBRow, MDBCol } from 'mdbreact';
import InputField from './customFields/InputField';

let AddOrEditCustomFieldsReduxForm = ({ handleSubmit, submit, closeModal }) => (
  <Form onSubmit={handleSubmit} className="w-100">
    <MDBCol style={{ margin: '2rem 0' }}>
      <Field
        name="name"
        component={InputField}
        type="text"
        label="Name"
        className="flex-box flex-md-column "
        inputClassName="width-100-percent input-field"
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
    </MDBCol>
  </Form>
);

AddOrEditCustomFieldsReduxForm = reduxForm({
  form: 'addOrEditCustomFieldsReduxForm',
})(AddOrEditCustomFieldsReduxForm);

export default withRouter(AddOrEditCustomFieldsReduxForm);
