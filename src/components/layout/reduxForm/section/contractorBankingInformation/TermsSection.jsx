// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { Field } from 'redux-form';
import CheckboxField from '../../customFields/CheckboxField';

const TermsSection = () => (
  <MDBContainer className="padding-bottom-10">
    <MDBRow className="h-paddings-half">
      <MDBCol
        className="flex-box"
      >
        <div
          className="checkboxdivres"
          style={{
            background: 'white',
            padding: '10px',
          }}
        >
          <Field
            name="acceptTerms"
            component={CheckboxField}
            label="."
            className="padding-bottom-05"
            filled
            inputClassName="regcheck"
          />
          <span className="font12" style={{ color: 'black' }}>
            I have read and agreed to the
            {' '}
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a
              href="https://www.sourcew9.com/SW9(209G)_Terms_Updated.2024.12.06.pdf"
              target="_blank"
              style={{
                textDecorationLine: 'underline',
                color: '#e87b68',
              }}
            >
              Term of Service
            </a>
            {', '}
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a
              href="https://www.sourcew9.com/Privacy_Policy.pdf"
              target="_blank"
              style={{
                textDecorationLine: 'underline',
                color: '#e87b68',
              }}
            >
              Customer Privacy Policy
            </a>
          </span>
        </div>
      </MDBCol>
    </MDBRow>
    <MDBRow>
      <MDBCol>
        <div
          style={{
            textAlign: 'center',
            background: '#ffff32',
            color: '#333333',
          }}
        >
          <span>
            Must agree to terms & policies
          </span>
        </div>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
);

export default TermsSection;
