// ©2024 Austin App House. All rights reserved.
import React, { useState } from 'react';
import ContractorInfoAddEdit from './ContractorInfoAddEdit';

const ContactInfoRow = ({
  contact,
  editContact,
  deleteContact,
  inputClassName,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const editContactInfo = data => {
    editContact(data);
    setIsEdit(false);
  };

  return (
      isEdit ? (
        <ContractorInfoAddEdit
          contractorToEdit={contact}
          returnContractor={editContactInfo}
          closeEdit={() => setIsEdit(false)}
          inputClassName={inputClassName}
        />
      ) : (
        <>
       
          <tr key={contact.email}>

          <td>{contact?.fname || ''}</td>
          <td>{contact?.role || ''}</td>
          <td>{contact?.email || ''}</td>
          <td>{contact?.ofc_phn || ''}</td>
          <td>{contact?.mobile || ''}</td>
          <td className="flex-box" style={{ justifyContent: 'center' }}>
            <a href="#" type="button" className="icon_pencil" onClick={(e) => { e.preventDefault(); setIsEdit(true); }} aria-label="edit">edit</a>
            <a href="#" type="button" className="icon_delete" onClick={(e) => { e.preventDefault(); deleteContact(); }} aria-label="delete">close</a>
          </td>
          </tr>
        </>
      )
  );
};

export default ContactInfoRow;


