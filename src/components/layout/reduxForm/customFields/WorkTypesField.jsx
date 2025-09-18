// ©2024 Austin App House. All rights reserved.
import React, { useEffect } from 'react';
import SelectWorkOrderWorkTypes from '../../workOrderEditElements/selectWorkOrderWorkTypes';
import FieldLabel from '../../FieldLabel';

const WorkTypesField = field => {
  useEffect(() => {
    const initValue = field?.input?.value?.length
      ? field?.input?.value?.map(item => ({
        label: item.title,
        // eslint-disable-next-line no-underscore-dangle
        value: item._id,
        item,
      }))
      : [];
    if (initValue.length) field.input.onChange(initValue);
  }, []);

  return (
    <>
      <FieldLabel
        label={field.label}
        className={field.labelClassName}
        required={field.required}
      />
      <SelectWorkOrderWorkTypes
        value={field.input.value}
        onChange={field.input.onChange}
        toolsElementClass={field.toolsElementClass}
        deleteElementIconColor={field.deleteElementIconColor}
      />
      {
        field.meta.touched && field.meta.error
        && <span className="span-error">{field.meta.error}</span>
      }
    </>
  );
};

export default WorkTypesField;
