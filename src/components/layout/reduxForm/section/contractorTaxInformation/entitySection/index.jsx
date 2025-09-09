// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { MDBCol, MDBRow } from 'mdbreact';
import { Field } from 'redux-form';
import AddressSection from './AddressSection';
import EntityTypeField from './EntityTypeField';

const EntitySection = () => (
  <>
    <MDBRow>
      <MDBCol md="12" className="no-paddings">
        <h6 className="border-bottom-line-red">
          Request for Taxpayer Identification Number and Certification
        </h6>
      </MDBCol>
      <MDBCol>
        <p>
          The following information is required by law to report your earnings to the IRS.&nbsp;
          The Tax Identification Number will be used solely for this purpose.&nbsp;
          You must provide a Tax Identification Number in order to withdraw funds from your&nbsp;
          account. For instructions on filling out this form please see the&nbsp;
          <a href="https://www.irs.gov/pub/irs-pdf/fw9.pdf">official IRS Form W-9</a>
          .
        </p>
      </MDBCol>
    </MDBRow>
    <MDBRow>
      <MDBCol>
        <Field
          name="entityType"
          component={EntityTypeField}
          type="text"
          placeholder=""
          label="Entity Type:"
          required
          className="font-size-08"
        />
      </MDBCol>
    </MDBRow>
    <MDBRow className="flex-column">
      <AddressSection />
    </MDBRow>
  </>
);

export default EntitySection;
