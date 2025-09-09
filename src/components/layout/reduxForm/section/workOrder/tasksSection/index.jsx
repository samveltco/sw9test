// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { MDBCol } from 'mdbreact';
import { Field } from 'redux-form';
import TasksField from './TasksField';

const TasksSection = () => (
  <MDBCol>
    <Field name="tasks" component={TasksField} />
  </MDBCol>
);

export default TasksSection;
