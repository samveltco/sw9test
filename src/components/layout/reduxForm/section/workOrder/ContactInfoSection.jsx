// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { MDBCol } from 'mdbreact';
import { Field } from 'redux-form';
import ContactInfoField from '../../customFields/ContactInfoField';

const ContactInfoSection = ({ requirements }) => (
  <MDBCol>
    <Field
      name="contactInfo"
      component={ContactInfoField}
      label="Contact Info"
      placeholder="Add Contact"
      required={requirements !== 'disabled'}
      className="flex-column font-size-08"
      inputClassName="form-control"
    />
  </MDBCol>
);

export default ContactInfoSection;
