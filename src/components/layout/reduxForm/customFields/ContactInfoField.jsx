// ©2024 Austin App House. All rights reserved.
import React from 'react';
import FieldLabel from '../../FieldLabel';
import ContactInfoForWorkOrder from '../../workOrderEditElements/contactInfoForWorkOrder';

const ContactInfoField = field => (
  <div className={`flex-box justify-content-between ${field.className || ''}`}>
    <FieldLabel
      label={field.label}
      className={field.labelClassName}
      required={field.required}
    />
    <div>
      <ContactInfoForWorkOrder
        handlerChanges={field.input.onChange}
        contactList={field.input.value}
        inputClassName={field.inputClassName}
      />
    </div>
    {
      field.meta.touched && field.meta.error
      && <span className="span-error">{field.meta.error}</span>
    }
  </div>
);

export default ContactInfoField;
