// ©2024 Austin App House. All rights reserved.
import React from 'react';
import CustomFieldRow from './CustomFieldRow';

const CustomFields = field => {
  const editField = (customField, index) => {
    field.toggleModal(
      true,
      'editCustomFieldModal',
      false,
      { index, field: customField, input: field.input },
      // { index, field: customField, form: field.meta?.form || 'createWorkOrderReduxForm', fieldName: field.input.name },
    );
  };

  const removeField = fieldIndex => {
    const newValue = field.input.value.filter((item, index) => index !== fieldIndex);
    field.input.onChange(newValue);
  };

  return (
    <div className="add_btns">
      <button type="button" className="standard_btn icon_plus" aria-label="add custom field" onClick={() => field.toggleModal(
        true,
        'createOrAddCustomFieldToWorkOrder',
        false,
        { form: field.meta?.form || 'createWorkOrderReduxForm', field: field.input.name, value: field.input.value || [] },
      )}>Add custom field</button>
      <div className="fields_group">
       
        <div className="block_title">Custom filds</div>
        <table className="custom_table">
          <thead>
            <tr>
              <th className="name">Name</th>
              <th className="value">Value</th>
              <th className="type">Type</th>
              <th className="action">Action</th>
            </tr>
          </thead>
          <tbody>
          {
          field?.input?.value?.length
            ? field.input.value.map((customField, index) => (
              <CustomFieldRow
                /* eslint-disable-next-line react/no-array-index-key */
                key={`${customField.name} - ${index}`}
                customField={customField}
                removeField={() => removeField(index)}
                editField={() => editField(customField, index)}
              />
            ))
            : <></>
        }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomFields;
