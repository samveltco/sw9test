// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { MDBCol, MDBInput, MDBRow } from 'mdbreact';
import FieldLabel from '../../../../FieldLabel';

const EntityTypeField = field => {
  const types = [
    'Individual/sole proprietor',
    'Partnership',
    'Trust/estate',
    'C Corporation',
    'S Corporation',
    'LLC C Corporation',
    'LLC S Corporation',
    'LLC Partnership',
    'Exempt payee',
  ];

  const handlerRadioClick = value => {
    field.input.onChange(value);
  };

  const handlerChanges = event => {
    field.input.onChange(event.target.value);
  };

  return (
    <div className="padding-bottom-10">
      <MDBRow className={`${field.className || ''}`}>
        <MDBCol md="3">
          <FieldLabel
            label={field.label}
            className={field.labelClassName}
            required={field.required}
          />
        </MDBCol>
        <MDBCol md="7">
          <MDBRow>
            {
              types.map(typeName => (
                <MDBCol
                  key={typeName}
                  md="5"
                  className="no-paddings"
                >
                  <MDBInput
                    id={typeName}
                    type="radio"
                    name="entityType"
                    label={typeName}
                    containerClass="no-paddings"
                    value={typeName}
                    checked={field.input.value === typeName}
                    onClick={handlerRadioClick}
                  />
                </MDBCol>
              ))
            }
            <MDBCol md="5" className="no-paddings">
              <div className="flex-box">
                <MDBInput
                  id="other"
                  type="radio"
                  name="entityType"
                  label="Other"
                  containerClass="no-paddings"
                  checked={!types.includes(field.input.value)}
                  onClick={() => field.input.onChange('')}
                />
                <input
                  type="text"
                  className="form-control other-value-input-right"
                  value={!types.includes(field.input.value) ? field.input.value : ''}
                  onChange={handlerChanges}
                />
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
      {
        field.meta.touched && field.meta.error
        && <span className="span-error">{field.meta.error}</span>
      }
    </div>
  );
};

export default EntityTypeField;
