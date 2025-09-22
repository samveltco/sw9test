// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { MDBCol } from 'mdbreact';
import { Field } from 'redux-form';
import WorkTypesField from '../../customFields/WorkTypesField';

const WorkTypesSection = ({ requirements }) => (
  <MDBCol>
    <Field
      name="workTypes"
      component={WorkTypesField}
      label="Work Type"
      required={requirements !== 'disabled'}
      toolsElementClass="chip"
      deleteElementIconColor="#41566a"
    />
  </MDBCol>
);

export default WorkTypesSection;
