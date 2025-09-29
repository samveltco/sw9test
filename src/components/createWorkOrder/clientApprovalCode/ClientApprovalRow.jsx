import React from 'react';
import { MDBIcon, MDBTooltip } from 'mdbreact';
import { workOrderCustomFieldTypes } from '../../../utils/constants';

const ClientApprovalRow = ({
  customField,
  removeField,
  editField,
}) => (
  <tr>
    <td>{customField.name}</td>
    <td>{customField.required ? 'Yes' : 'No'}</td>
    <td>
      <span style={{ marginBottom: 10, width: 'fit-content' }} className="chip">
        <a
          href="#"
          className="icon_pencil"
          aria-label="edit task"
          onClick={(e) => {
            e.preventDefault();
            removeField();
          }}
          style={{ paddingLeft: '6px' }}
        >edit</a>
      </span>
      <span style={{ marginBottom: 10, width: 'fit-content' }} className="chip">
        <a
          href="#"
          className="icon_close"
          aria-label="delete task"
          onClick={(e) => {
            e.preventDefault();
            editField();
          }}
          style={{ paddingLeft: '6px' }}
        >close</a>
      </span>
    </td>
  </tr>
);

export default ClientApprovalRow;
