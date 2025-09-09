// ©2024 Austin App House. All rights reserved.
import React, { useEffect, useState } from 'react';
import {
  Field, Form, reduxForm,
} from 'redux-form';
import Notification from '../../notification';
import InputField from './customFields/InputField';
import ReactSelectField from './customFields/ReactSelectField';
import SectionContainerOneCol from '../SectionContainerOneCol';
import { workOrderCustomFieldTypes } from '../../../utils/constans_old';
import { white as customSelectStyle } from '../../../utils/customSelectStyle';
import Select from 'react-select';

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

  console.log({initialValues})
  useEffect(() => {
    if (
      initialValues.hasOwnProperty('isRequired')
    ) {
      console.log(options.find(o => o.value === initialValues.isRequired))
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
        <Field
          name="name"
          component={InputField}
          type="text"
          placeholder="Approval Code Name"
          label="Name"
          required
          className="flex-column"
          inputClassName="width-100-percent input-field"
          paddingBottomClassName="no-paddings"
          disabled={disabled}
        />
        <Field
          name="isRequired"
          component={ReactSelectField}
          className="flex-column"
          label="Is Required"
          // disabled={disabled}
          value={initialValues.isRequired}
          // placeholder="Select Custom Field Type"
          options={options}
          required
          paddingBottomClassName="no-paddings"
          inputClassName="width-inherit input-field no-paddings"
          customSelectStyleType="white"
          isSearchable={false}
        />
      </SectionContainerOneCol>
    </Form>
  );
};

CreateClientApprovalCodeReduxForm = reduxForm({
  form: 'createClientApprovalCodeReduxForm',
})(CreateClientApprovalCodeReduxForm);

export default CreateClientApprovalCodeReduxForm;
