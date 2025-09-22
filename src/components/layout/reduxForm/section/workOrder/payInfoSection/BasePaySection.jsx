// ©2024 Austin App House. All rights reserved.
import React, {useMemo, useState} from 'react';
import { Field } from 'redux-form';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import InputField from '../../../customFields/InputField';
import { localCurrencySettings } from '../../../../../../utils/constans_old';
import SelectField from '../../../customFields/SelectField';
import CheckboxField from '../../../customFields/CheckboxField';

const BasePaySection = ({
  amount,
  quantity,
  basicType,
  requirements,
  enableEmptyValue,
}) => {
  return (
    <MDBCol className="flex-grow-0" style={{ minWidth: '36rem' }}>
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <h6 className="font-weight-bold font14">
              Base Pay
            </h6>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <Field
              name="amount"
              component={InputField}
              type="number"
              placeholder="$0.00"
              label="Amount"
              required={requirements !== 'disabled'}
              inputClassName="form-control small-styled-input"
              min={0.00}
            />
            <Field
              name="quantity"
              component={InputField}
              type="number"
              placeholder="00"
              label={`Qty${basicType === 'Site' ? ' (Est Hours)' : ''}`}
              required={requirements !== 'disabled'}
              inputClassName="form-control small-styled-input"
              min={0}
            />
            <div className="flex-box justify-content-between padding-bottom-10">
              <label>Est.Pay</label>
              <label>
                {((amount * (basicType === 'Site' ? 1 : quantity)) || 0).toLocaleString('en-US', localCurrencySettings)}
              </label>
            </div>
          </MDBCol>
          <MDBCol>
            <Field
              name="basicType"
              component={SelectField}
              label="Per"
              required={requirements !== 'disabled'}
              className="padding-bottom-10 padding-left-12-5"
              inputClassName="browser-default custom-select per"
              enableEmptyValue={enableEmptyValue}
              options={[
                {
                  value: 'Hour',
                  label: 'Hour',
                },
                {
                  value: 'Device',
                  label: 'Device',
                },
                {
                  value: 'Site',
                  label: 'Site / Flat',
                },
              ]}
            />
            <Field
              name="payOutsideOfApp"
              component={CheckboxField}
              label="Pay Outside Of App"
              className="padding-bottom-05"
              labelClassName="font14"
              title="This can be used if you have agreed to pay the contractor directly. No funds will be deducted and no payments will be made if this is checked."
            />
            <Field
              name="payBaseRateAsMinimum"
              component={CheckboxField}
              label="Pay Base Rate As Minimum"
              className="padding-bottom-05"
              labelClassName="font14"
              title="This will pay the contractor the base pay rate entered as a minimum payment regardless of how long they spend onsite."
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBCol>
  )
};

export default BasePaySection;
