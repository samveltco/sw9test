// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { withRouter } from 'withroute';
import { MDBBtn, MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import InputField from './customFields/InputField';
import SelectContractor from '../SelectContractor';
import { compact } from 'lodash';

let AddOrEditGroupsReduxForm = ({
  handleSubmit, submit, closeModal, handleSelectContractor, removeContractor, selectedContractors, setAllContractors
}) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="name"
      component={InputField}
      type="text"
      label="Group name"
      className="flex-box flex-md-column"
    />
    <SelectContractor
      selectedContractor={null}
      getSelectedContractor={handleSelectContractor}
      setFetchedContractors={setAllContractors}
      placeholder="type to find contractors!"
    />

    {compact(selectedContractors).map(contractor =>
      <MDBRow
        className="flex-box justify-content-end w-100"
        style={{ justifyContent: 'flex-end', margin: '10px 5px' }}
        key={contractor?.value._id}
      >
        <MDBCol md='10' className='text-elipses'>
          {contractor.label}
        </MDBCol>
        <MDBCol md='2'>
          <MDBIcon
            icon="trash"
            size="lg"
            onClick={() => removeContractor(contractor.value.userId)}
            title="Delete"
            style={{
              color: '#41566a',
              cursor: 'pointer',
              padding: '5px',
            }}
          />
        </MDBCol>
      </MDBRow>
    )}
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

AddOrEditGroupsReduxForm = reduxForm({
  form: 'addOrEditGroupsReduxForm',
  enableReinitialize: true,
})(AddOrEditGroupsReduxForm);

export default withRouter(AddOrEditGroupsReduxForm);
