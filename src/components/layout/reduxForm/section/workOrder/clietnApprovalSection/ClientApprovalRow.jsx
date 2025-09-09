// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { MDBIcon, MDBTooltip } from 'mdbreact';
import { workOrderCustomFieldTypes } from '../../../../../../utils/constans_old';

const ClientApprovalRow = ({
  customField,
  removeField,
  editField,
}) => (
  <tr>
    <td>{customField.name}</td>
    <td>{customField.required ? 'Yes' : 'No'}</td>
    <td>
      <MDBTooltip
        domElement
        tag="span"
        placement="top"
      >
        <span>
          <MDBIcon
            far
            icon="edit mr-3"
            onClick={editField}
          />
        </span>
        <span>Edit</span>
      </MDBTooltip>
      <MDBTooltip
        domElement
        tag="span"
        placement="top"
      >
        <span>
          <MDBIcon
            far
            icon="trash-alt"
            onClick={removeField}
          />
        </span>
        <span>Remove</span>
      </MDBTooltip>
    </td>
  </tr>
);

export default ClientApprovalRow;
