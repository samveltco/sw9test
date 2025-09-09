// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { MDBRow } from 'mdbreact';
import ContactInfoForWorkOrder from '../../workOrderEditElements/contactInfoForWorkOrder';
import FieldLabel from '../../FieldLabel';

const ContactInfoField = field => (
  <div className={`flex-box justify-content-between ${field.className || ''}`}>
    <FieldLabel
      label={field.label}
      className={field.labelClassName}
      required={field.required}
    />
    <MDBRow>
      <ContactInfoForWorkOrder
        handlerChanges={field.input.onChange}
        contactList={field.input.value}
        inputClassName={field.inputClassName}
      />
    </MDBRow>
    {
      field.meta.touched && field.meta.error
      && <span className="span-error">{field.meta.error}</span>
    }
  </div>
);

export default ContactInfoField;
