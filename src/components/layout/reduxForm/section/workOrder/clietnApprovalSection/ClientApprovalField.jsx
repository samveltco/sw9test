// ©2024 Austin App House. All rights reserved.
import React from 'react';
import {
  MDBBtn,
  MDBCol,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdbreact';
import ClientApprovalRow from './ClientApprovalRow';

const ClientApprovalField = field => {
  console.log({field})
  const editField = (clientApprovalCode, index) => {
    field.toggleModal(
      true,
      'editClientApprovalCodeModal',
      false,
      { index, field: clientApprovalCode, input: field.input },
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
          'createOrAddClientApprovalCodeToWorkOrder',
          false,
          { input: field.input },
        )}
      >
        Add Client Approval Code 
      </MDBBtn>
      <div>
        <MDBTable className="ccwo_table">
          <MDBTableHead>
            <tr>
              <th>Name</th>
              <th>Required Y/N</th>
            </tr>
          </MDBTableHead>
          {console.log(field.input.value, 'asdfgh')}
          <MDBTableBody className="font12">
            {
              field?.input?.value?.length
                ? field.input.value.map((customField, index) => (
                  <ClientApprovalRow
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

export default ClientApprovalField
;
