// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { Field } from 'redux-form';
import CustomFields from './CustomFields';

const CustomFieldsSection = ({
  toggleModal,
}) => (
  <Field
    name="customFields"
    component={CustomFields}
    toggleModal={toggleModal}
  />
);

export default CustomFieldsSection;
