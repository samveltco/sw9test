// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { MDBCol, MDBRow } from 'mdbreact';
import { Field } from 'redux-form';
import CheckboxField from '../../customFields/CheckboxField';

const CertificationSection = () => (
  <>
    <MDBRow>
      <MDBCol>
        <h6 className="border-bottom-line-red">Part II: Certification</h6>
        <p>
          Under penalties of perjury, I certify that:
          <ol>
            <li>
              The number shown on this form is my correct taxpayer identification number&nbsp;
              (or I am waiting for a number to be issued to me), and
            </li>
            <li>
              I am not subject to backup withholding because: (a) I am exempt from backup&nbsp;
              withholding, or (b) I have not been notified by the Internal Revenue Service&nbsp;
              (IRS) that I am subject to backup withholding as a result of a failure to report&nbsp;
              all interest or dividends, or (c) the IRS has notified me that I am no longer&nbsp;
              subject to backup withholding, and&nbsp;
            </li>
            <li>
              I am a U.S. citizen or other U.S. person (defined below).
            </li>
          </ol>
        </p>
        <p>
          <b>Certification instructions.</b>
          &nbsp;You must cross out item 2 above if you have been notified by the IRS&nbsp;
          that you are currently subject to backup withholding because you have failed to&nbsp;
          report all interest and dividends on your tax return. For real estate transactions,&nbsp;
          item 2 does not apply. For mortgage interest paid, acquisition or abandonment of&nbsp;
          secured property, cancellation of debt, contributions to an individual retirement&nbsp;
          arrangement (IRA), and generally, payments other than interest and dividends, you&nbsp;
          are not required to sign the certification, but you must provide your correct TIN.&nbsp;
          See the instructions on page 4.
        </p>
      </MDBCol>
    </MDBRow>
    <MDBRow>
      <MDBCol>
        <Field
          name="isTaxInfoCorrect"
          component={CheckboxField}
          label="I certify that the above tax information is correct."
          className="padding-bottom-05"
          labelClassName="font14"
          filled
          inputClassName="regcheck"
        />
      </MDBCol>
    </MDBRow>
  </>
);

export default CertificationSection;
