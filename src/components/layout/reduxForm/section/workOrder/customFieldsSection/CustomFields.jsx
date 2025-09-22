// ©2024 Austin App House. All rights reserved.
import React from 'react';
import {
  MDBBtn,
  MDBCol,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdbreact';
import CustomFieldRow from './CustomFieldRow';

const CustomFields = field => {
  const editField = (customField, index) => {
    field.toggleModal(
      true,
      'editCustomFieldModal',
      false,
      { index, field: customField, input: field.input },
    );
  };

  const removeField = fieldIndex => {
    const newValue = field.input.value.filter((item, index) => index !== fieldIndex);
    field.input.onChange(newValue);
  };

  return (
    <MDBCol>
      <MDBBtn
        color="primary"
        className="cancle_button"
        onClick={() => field.toggleModal(
          true,
          'createOrAddCustomFieldToWorkOrder',
          false,
          { input: field.input },
        )}
      >
        Add Custom Field
      </MDBBtn>
      <div>
        <MDBTable className="ccwo_table">
          <MDBTableHead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody className="font12">
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
          </MDBTableBody>
        </MDBTable>
      </div>
    </MDBCol>
  );
};

export default CustomFields;
