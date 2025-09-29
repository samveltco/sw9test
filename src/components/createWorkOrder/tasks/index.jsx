// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { Field } from 'redux-form';
import TasksField from './TasksField';

const TasksSection = ({ toggleModal }) => (
  <Field name="tasks" component={TasksField} toggleModal={toggleModal} />
);

export default TasksSection;
