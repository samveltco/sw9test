// ©2024 Austin App House. All rights reserved.
import React, { useEffect } from 'react';
import WorkOrderTasks from './WorkOrderTasks';

const TasksField = ({
  input: { value, onChange },
}) => {
  useEffect(() => {
    if (!value) {
      onChange({
        preArrivalRequirements: [],
        onSiteRequirements: [],
        completionRequirements: [],
      });
    }
  }, []);

  return <WorkOrderTasks handler={onChange} tasks={value} />;
};

export default TasksField;
