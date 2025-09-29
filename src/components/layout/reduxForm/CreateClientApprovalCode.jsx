// ©2024 Austin App House. All rights reserved.
import React, { useEffect, useState } from 'react';
import {
  Field, Form, reduxForm,
} from 'redux-form';
import Notification from '../../notification';
import InputField from './customFields/InputField';
import ReactSelectField from './customFields/ReactSelectField';
import SectionContainerOneCol from '../SectionContainerOneCol';
import { workOrderCustomFieldTypes } from '../../../utils/constants';

const options = [
  { label: 'Required', value: true },
  { label: 'Not Required', value: false },
]
// eslint-disable-next-line import/no-mutable-exports
let CreateClientApprovalCodeReduxForm = ({
  handleSubmit,
  error,
  disabled,
  initialValues,
  change,
}) => {

  useEffect(() => {
    if (
      initialValues.hasOwnProperty('isRequired')
    ) {
      change('isRequired', options.find(o => o.value === initialValues.isRequired));
    }
    
  }, [initialValues]);

  useEffect(() => {
    if (error) Notification('error', { message: error });
  }, [error]);

  const preventSubmitOnEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onKeyPress={preventSubmitOnEnter}
    >
      <SectionContainerOneCol>
      <div className="field_block">
      <label className="field_name" htmlFor="approvalCodeName">Name</label>

        <Field
          name="name"
          component={InputField}
          type="text"
          placeholder="Approval Code Name"
          label="Name"
          id="approvalCodeName"
          required
          className="form_control"
          inputClassName="form_control"
          paddingBottomClassName="no-paddings"
          disabled={disabled}
        />
        </div>
        <br />
        <div className="field_block">
        <label className="field_name" htmlFor="approvalCodeIsRequired">Is Required</label>
        <Field
          name="isRequired"
          component={ReactSelectField}
          className="form_control"
          label="Is Required"
          // disabled={disabled}
          value={initialValues.isRequired}
          // placeholder="Select Custom Field Type"
          options={options}
          required
          paddingBottomClassName="no-paddings"
          inputClassName="form_control"
          customSelectStyleType="white"
          isSearchable={false}
        />
        </div>
      </SectionContainerOneCol>
    </Form>
  );
};

CreateClientApprovalCodeReduxForm = reduxForm({
  form: 'createClientApprovalCodeReduxForm',
})(CreateClientApprovalCodeReduxForm);

export default CreateClientApprovalCodeReduxForm;
