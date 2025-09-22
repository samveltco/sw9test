// ©2024 Austin App House. All rights reserved.
import React, { useEffect } from 'react';
import CustomSelect from '../../../Select';

const ReactSelectField = field => {
  useEffect(() => {
    if (field?.input?.value?._id && !(field?.input?.value?.value && field?.input?.value?.label)) {
      field.input.onChange({
        value: field?.input?.value?._id,
        label: field?.input?.value?.name || field?.input?.value?.title,
      });
    } else if (field?.input?.value && (typeof field?.input?.value === 'string')) {
      field.input.onChange({
        value: field?.input?.value,
        label: field?.input?.value.replace(/^\w/, c => c.toUpperCase()),
      });
    }
  }, []);

  return (
    <CustomSelect
      name={field.input.name}
      value={field.input.value}
      hideSelectedOptions={false}
      options={field.options}
      placeholder={field.placeholder}
      required={field.required}
      isLoading={field.isLoading}
      onChange={field.input.onChange}
      isDisabled={field.disabled}
      isClearable={field.isClearable}
      isSearchable={field.isSearchable}
      isMulti={field.isMulti}
    />
  );
};

export default ReactSelectField;
