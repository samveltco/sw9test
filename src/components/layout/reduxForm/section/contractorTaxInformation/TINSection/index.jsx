// ©2024 Austin App House. All rights reserved.
import React, { useEffect, useState } from 'react';
import { MDBCol, MDBRow } from 'mdbreact';
import { connect } from 'react-redux';
import { Field, change, formValueSelector } from 'redux-form';
import InputField from '../../../customFields/InputField';
import EINDisplayControlField from './EINDisplayControlField';
import normalizeEIN from '../../../../../../utils/reduxForm/normalize/EIN';
import normalizeSSN from '../../../../../../utils/reduxForm/normalize/SSN';

const contractorTaxInformationReduxFormSelector = formValueSelector('contractorTaxInformationReduxForm');

const TINSection = ({
  profile, change, isEINDisplayed, initialValues,
}) => {
  const [init, setInit] = useState(false);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isEINDisplayed) {
      if (init) return change('contractorTaxInformationReduxForm', 'nameAssociatedWithTIN', '');
      setInit(true);
    } else {
      change('contractorTaxInformationReduxForm', 'nameAssociatedWithTIN', profile.name);
    }
  }, [isEINDisplayed]);

  useEffect(() => {
    if (
      !profile?.taxInfo?.SSN
      && profile?.taxInfo?.EIN
    ) change('contractorTaxInformationReduxForm', 'isEINDisplayed', true);
  }, []);

  const normalize = value => {
    if (isEINDisplayed) {
      return normalizeEIN(value);
    }
    return normalizeSSN(value);
  };

  const clearOnFocus = (event, name) => {
    if (event.target.value === initialValues[name]) change('contractorTaxInformationReduxForm', name, '');
  };

  return (
    <>
      <MDBRow>
        <MDBCol>
          <h6 className="border-bottom-line-red">Part I: Taxpayer Identification Number (TIN)</h6>
          <p>
            Enter your TIN in the appropriate box.&nbsp;
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            The TIN provided must match the name given on the "Name" line to avoid backup&nbsp;
            withholding. For individuals, this is your social security number (SSN).&nbsp;
            However, for a resident alien, sole proprietor, or disregarded entity,&nbsp;
            see the Part I instructions on page 3. For other entities,&nbsp;
            it is your employer identification number (EIN). If you do not have a number,&nbsp;
            see How to get a TIN on page 3.&nbsp;
          </p>
          <p>
            <b>Note.</b>
            &nbsp;If the account is in more than one name, see the chart on page 4&nbsp;
            for guidelines on whose number to enter.
          </p>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md="8">
          <Field
            name="isEINDisplayed"
            component={EINDisplayControlField}
            type="checkbox"
            label="Do you have an Employer Identification Number (EIN)?:"
            className="font-size-08"
          />
        </MDBCol>
      </MDBRow>
      {
        !isEINDisplayed
          ? (
            <MDBRow>
              <MDBCol>
                {`Full name associated with TIN: ${profile?.name}`}
              </MDBCol>
            </MDBRow>
          )
          : <></>
      }
      <MDBRow>
        <MDBCol md="6">
          <Field
            name="nameAssociatedWithTIN"
            component={InputField}
            type="text"
            label="Company Name associated with TIN:"
            required
            className={`font-size-08 ${isEINDisplayed ? '' : 'hide-element'}`}
            inputClassName="small-styled-input"
          />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md="6">
          <Field
            name="businessName"
            component={InputField}
            type="text"
            label="Business Name:"
            required
            className="font-size-08"
            inputClassName="small-styled-input"
          />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md="6">
          <Field
            name={isEINDisplayed ? 'EIN' : 'SSN'}
            component={InputField}
            type="text"
            label={`${isEINDisplayed ? 'EIN' : 'SSN'}:`}
            required
            className="font-size-08"
            inputClassName="small-styled-input"
            normalize={normalize}
            onFocus={clearOnFocus}
          />
        </MDBCol>
        <MDBCol className="flex-box align-items-center">
          <label className="no-margins padding-bottom-10">
            {isEINDisplayed ? '(xx-xxxxxxx)' : '(xxx-xx-xxxx)'}
          </label>
        </MDBCol>
      </MDBRow>
    </>
  );
};

const mapDispatchToProps = {
  change,
};

const mapStateToProps = state => ({
  profile: state.profile,
  isEINDisplayed: contractorTaxInformationReduxFormSelector(state, 'isEINDisplayed'),
});

export default connect(mapStateToProps, mapDispatchToProps)(TINSection);
