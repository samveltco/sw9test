// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { Field } from 'redux-form';
import ClientApprovalField from './ClientApprovalField';

const ClientApprovalCodeSection = ({
  toggleModal,
}) => (
  <Field
    name="clientApprovalCodes"
    component={ClientApprovalField}
    toggleModal={toggleModal}
  />
);

export default ClientApprovalCodeSection;
