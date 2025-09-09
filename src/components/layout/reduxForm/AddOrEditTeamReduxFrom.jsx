// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { MDBBtn, MDBRow } from 'mdbreact';
import InputField from './customFields/InputField';
import TeamMembersField from './customFields/TeamMembersField';

let AddOrEditTeamsReduxForm = ({
  users, handleSubmit, submit, closeModal,
}) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="name"
      component={InputField}
      type="text"
      label="Team name"
      className="flex-box flex-md-column"
    />
    <Field
      name="members"
      component={TeamMembersField}
      type="checkbox"
      className="flex-box flex-md-column"
      inputClassName="text-align-left"
      paddingBottomClassName="no-paddings"
      users={users}
      label="Members"
    />
    <MDBRow
      className="flex-box justify-content-end w-100"
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

AddOrEditTeamsReduxForm = reduxForm({
  form: 'addOrEditTeamsReduxForm',
  enableReinitialize: true,
})(AddOrEditTeamsReduxForm);

export default withRouter(AddOrEditTeamsReduxForm);
