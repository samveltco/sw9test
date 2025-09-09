// ©2024 Austin App House. All rights reserved.
import React, { useEffect } from 'react';
import Select from 'react-select';
import customSelectStyle from '../../../../utils/customSelectStyle';
import FieldLabel from '../../FieldLabel';

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
    <div className={field.paddingBottomClassName || 'padding-bottom-10'}>
      <div className={`flex-box justify-content-between ${field.className || ''}`}>
        <FieldLabel
          label={field.label}
          className={field.labelClassName}
          required={field.required}
        />
        <div className={field.inputClassName}>
          <Select
            name={field.input.name}
            value={field.input.value}
            hideSelectedOptions={false}
            options={field.options}
            styles={customSelectStyle[field.customSelectStyleType || 'dark']}
            placeholder={field.placeholder}
            required={field.required}
            isLoading={field.isLoading}
            onChange={field.input.onChange}
            isDisabled={field.disabled}
            isClearable={field.isClearable}
            isSearchable={field.isSearchable}
            isMulti={field.isMulti}
          />
        </div>
      </div>
      {
        field.meta.touched && field.meta.error
        && <span className="span-error">{field.meta.error}</span>
      }
    </div>
  );
};

export default ReactSelectField;
