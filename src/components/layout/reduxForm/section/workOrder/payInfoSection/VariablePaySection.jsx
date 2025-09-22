// ©2024 Austin App House. All rights reserved.
import React, { useEffect } from 'react';
import { Field } from 'redux-form';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import InputField from '../../../customFields/InputField';
import SelectField from '../../../customFields/SelectField';

const VariablePaySection = ({
  basicType,
  variableType,
  quantity,
  variablePayAfter,
  maxQuantity,
  change,
  reduxFormName = 'createWorkOrderReduxForm',
  enableEmptyValue,
}) => {
  useEffect(() => {
    if (
      (variableType === basicType) || ((variableType === 'Hour') && (basicType === 'Site'))
      && (variablePayAfter !== quantity)
    ) {
      change(reduxFormName, 'variablePayAfter', quantity);
    }
  }, [basicType, variableType, quantity]);

  useEffect(() => {
    if (+variablePayAfter > +maxQuantity) {
      change(reduxFormName, 'maxQuantity', variablePayAfter || 0);
    }
  }, [variablePayAfter]);

  return (
    <MDBCol
      className="variable_div flex-grow-0"
      style={{
        maxWidth: '36rem',
        minWidth: '30rem',
      }}
    >
      <h6 className="font-weight-bold font14">
        Variable Pay (Optional)
      </h6>
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <Field
              name="variableAmount"
              component={InputField}
              type="number"
              placeholder="$0.00"
              label="Amount"
              inputClassName="form-control small-styled-input"
              min={0.00}
            />
            <Field
              name="variablePayAfter"
              component={InputField}
              type="number"
              placeholder="00"
              label="After"
              inputClassName="form-control small-styled-input"
              disabled={(variableType === basicType) || ((variableType === 'Hour') && (basicType === 'Site'))}
              min={0}
            />
            <Field
              name="maxQuantity"
              component={InputField}
              type="number"
              placeholder="00"
              label="Max Qty"
              inputClassName="form-control small-styled-input"
              min={variablePayAfter || 0}
            />
          </MDBCol>
          <MDBCol md="6">
            <Field
              name="variableType"
              component={SelectField}
              label="Per"
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
              ]}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBCol>
  );
};

export default VariablePaySection;
