// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { Field } from 'redux-form';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import InputField from '../../../customFields/InputField';

const DividedPaySection = ({
  percentCommunication,
  percentWork,
  percentDeliverables,
  change,
  reduxFormName = 'createWorkOrderReduxForm',
  requirements,
}) => {
  const handlerValidate = (value) => {
    if ((value > 100) || (value < 0)) return 'Value must be more or equal 0, and less or equal than 100';
    return undefined;
  };

  const handlerBlur = (event) => {
    const communication = +percentCommunication || 0;
    const work = +percentWork || 0;
    const deliverables = +percentDeliverables || 0;
    if (communication && work && deliverables) return;
    if ((100 - (communication + work + deliverables)) <= 0) return;
    const emptyCount = !communication + !work + !deliverables;
    if (emptyCount === 3) return;
    event.preventDefault();
    const dif = 100 - (communication + work + deliverables);
    change(reduxFormName, 'percentCommunication', (communication || dif / emptyCount).toFixed(2));
    change(reduxFormName, 'percentWork', (work || dif / emptyCount).toFixed(2));
    change(reduxFormName, 'percentDeliverables', (deliverables || dif / emptyCount).toFixed(2));
  };

  return (
    <MDBCol className="flex-grow-0" style={{ minWidth: '18rem' }}>
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <h6 className="font-weight-bold font14">
              How Pay is Divided
            </h6>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <Field
              required={requirements !== 'disabled'}
              name="percentCommunication"
              component={InputField}
              type="number"
              placeholder="00%"
              label="Soft Skills"
              inputClassName="form-control small-styled-input"
              validate={handlerValidate}
              onBlur={handlerBlur}
              title="Soft Skills, Work and Deliverables should total to 100%."
              min={0.00}
              step={0.01}
            />
            <Field
              required={requirements !== 'disabled'}
              name="percentWork"
              component={InputField}
              type="number"
              placeholder="00%"
              label="Work"
              inputClassName="form-control small-styled-input"
              validate={handlerValidate}
              onBlur={handlerBlur}
              title="Soft Skills, Work and Deliverables should total to 100%."
              min={0.00}
              step={0.01}
            />
            <Field
              required={requirements !== 'disabled'}
              name="percentDeliverables"
              component={InputField}
              type="number"
              placeholder="00%"
              label="Deliverables"
              inputClassName="form-control small-styled-input"
              validate={handlerValidate}
              onBlur={handlerBlur}
              title="Soft Skills, Work and Deliverables should total to 100%."
              min={0.00}
              step={0.01}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBCol>
  );
};

export default DividedPaySection;
