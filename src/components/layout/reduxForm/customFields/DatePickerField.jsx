// ©2024 Austin App House. All rights reserved.
import React from 'react';
import DatePicker from 'react-datepicker';
import { MDBIcon } from 'mdbreact';
import FieldLabel from '../../FieldLabel';

const DatePickedField = field => (
  <>
    <FieldLabel
      label={field.label}
      className={field.labelClassName}
      required={field.required}
    />
    <div className="d-flex">
      <DatePicker
        disabled={field.disabled}
        className={field.inputClassName || ''}
        dateFormat={field.dateFormat}
        /* eslint-disable-next-line camelcase */
        selected={field.input.value}
        onChange={field.input.onChange}
        placeholder={field.label}
        style={{ marginRight: '10px' }}
        minDate={field.minDate}
        required={field.required}
        filterDate={field.filterDate}
      />
      <MDBIcon
        far
        icon="calendar-alt"
        size="lg"
        style={{
          backgroundColor: '#1e2f41',
          color: '#394d61',
          padding: '8px',
        }}
      />
    </div>
    {
      field.meta.touched && field.meta.error
      && <span className="span-error">{field.meta.error}</span>
    }
  </>
);

export default DatePickedField;
