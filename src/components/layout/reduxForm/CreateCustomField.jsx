// ©2024 Austin App House. All rights reserved.
import React, { useEffect, useState } from 'react';
import {
  Field, Form, reduxForm,
} from 'redux-form';
import Notification from '../../notification';
import InputField from './customFields/InputField';
import ReactSelectField from './customFields/ReactSelectField';
import { workOrderCustomFieldTypes } from '../../../utils/constants';

// eslint-disable-next-line import/no-mutable-exports
let CreateCustomFieldReduxForm = ({
  handleSubmit,
  error,
  disabled,
  initialValues,
  change,
}) => {
  const [customFieldTypeOptions, setCustomFieldTypeOptions] = useState([]);

  console.log('asdasd')
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
      <div className="field_col">
        <label className="field_name" htmlFor="name1">Name*</label>
        <div className="field_block">
          <Field
            component={InputField}
            type="text"
            name="name"
            id="name1"
            maxLength={50}
            placeholder="Field name"
          />
        </div>
      </div>
      <br />
      <br />
      <div className="field_col">
        <label className="field_name" htmlFor="Value">Value</label>
        <div className="field_block">
          <Field
            component={InputField}
            type="text"
            name="value"
            id="Value"
            maxLength={50}
            placeholder="Field name"
          />
        </div>
      </div>
      <div className="field_col">
        <label className="field_name" htmlFor="type">Type*</label>
        <div className="field_block">
          <Field
            component={ReactSelectField}
            name="type"
            id="type"
            options={customFieldTypeOptions}
          />
        </div>
      </div>

    </Form>
  );
};

CreateCustomFieldReduxForm = reduxForm({
  form: 'createCustomFieldReduxForm',
})(CreateCustomFieldReduxForm);

export default CreateCustomFieldReduxForm;
