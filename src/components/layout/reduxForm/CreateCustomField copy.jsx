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

// eslint-disable-next-line import/no-mutable-exports
let CreateCustomFieldReduxForm = ({
  handleSubmit,
  error,
  disabled,
  initialValues,
  change,
}) => {
  const [customFieldTypeOptions, setCustomFieldTypeOptions] = useState([]);

  useEffect(() => {
    const newCustomFieldTypeOptions = Object.entries(workOrderCustomFieldTypes).map(type => ({
      value: type[0],
      label: type[1],
    }));
    setCustomFieldTypeOptions(newCustomFieldTypeOptions);
  }, []);

  useEffect(() => {
    if (
      initialValues?.type
      && (typeof initialValues.type === 'string')
    ) {
      change('type', {
        value: initialValues?.type,
        label: workOrderCustomFieldTypes[initialValues?.type],
      });
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
          placeholder="Custom Field Name"
          label="Name"
          required
          className="flex-column"
          inputClassName="width-100-percent input-field"
          paddingBottomClassName="no-paddings"
          disabled={disabled}
        />
        <Field
          name="value"
          component={InputField}
          type="text"
          placeholder="Custom Field Value"
          label="Value"
          className="flex-column"
          inputClassName="width-100-percent input-field"
          paddingBottomClassName="no-paddings"
        />
        <Field
          name="type"
          component={ReactSelectField}
          className="flex-column"
          label="Type"
          placeholder="Select Custom Field Type"
          options={customFieldTypeOptions}
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

CreateCustomFieldReduxForm = reduxForm({
  form: 'createCustomFieldReduxForm',
})(CreateCustomFieldReduxForm);

export default CreateCustomFieldReduxForm;
