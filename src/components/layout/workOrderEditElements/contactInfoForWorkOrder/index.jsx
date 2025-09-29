// ©2024 Austin App House. All rights reserved.
import React from 'react';
import ContractorInfoAddEdit from './ContractorInfoAddEdit';
import ContactInfoRow from './ContactInfoRow';

const ContactInfoForWorkOrder = ({
  contactList,
  handlerChanges,
  inputClassName,
}) => {
  const safeList = Array.isArray(contactList) ? contactList : [];

  const addContact = (newContactInfo) => {
    handlerChanges([...safeList, newContactInfo]);
  };

  const editContact = (newContactInfo, index) => {
    handlerChanges(safeList.map((item, i) => (index === i ? newContactInfo : item)));
  };

  const deleteContact = (index) => {
    handlerChanges(safeList.filter((item, i) => index !== i));
  };

  return (
    <div className="contact-info">
      <div className="contact-info__editor">
        <ContractorInfoAddEdit returnContractor={addContact} inputClassName={inputClassName} />
      </div>
       
        <table className="custom_table">
      <thead>
        <tr>
          <th className="name">Name</th>
          <th className="value">Role</th>
          <th className="value">Email</th>
          <th className="value">Office Phone</th>
          <th className="value">Mobile</th>
          <th className="type">Action</th>
        </tr>
      </thead>
      
    <tbody>

        {safeList.map((contact, i) => (
          <ContactInfoRow
            /* eslint-disable-next-line react/no-array-index-key */
            key={`${contact.email || 'contact'}-${i}`}
            contact={contact}
            deleteContact={() => deleteContact(i)}
            editContact={(newContactInfo) => editContact(newContactInfo, i)}
            inputClassName={inputClassName}
          />
        ))}
        </tbody>
    </table>

    </div>
  );
};

export default ContactInfoForWorkOrder;


