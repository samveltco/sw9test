// ©2024 Austin App House. All rights reserved.
import React from 'react';
import DatePicker from 'react-datepicker';

const DatePickedField = field => (
  <>
  
      <DatePicker
        disabled={field.disabled}
        className={field.inputClassName || ''}
        dateFormat={field.dateFormat}
        /* eslint-disable-next-line camelcase */
        selected={field.input.value ? new Date(field.input.value) : null}
        onChange={(date) => field.input.onChange(date ? date.toISOString() : null)}
        placeholder={field.label}
        style={{ marginRight: '10px' }}
        minDate={field.minDate}
        required={field.required}
        filterDate={field.filterDate}
      />
  </>
);

export default DatePickedField;
