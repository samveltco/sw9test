// ©2024 Austin App House. All rights reserved.
import React, { useEffect, useState } from 'react';
import CustomTimePicker from '../../CustomTimePicker';
import FieldLabel from '../../FieldLabel';
import { getMatch } from '../../../../utils/getTimeIn24Format';

const TimePickedField = field => {
  const [hours, setHour] = useState();
  const [minutes, setMinutes] = useState();
  const [dayTime, setDayType] = useState();

  useEffect(() => {
    if (field.input.value) {
      const { parts, i } = getMatch(field.input.value);
      if (parts) {
        setHour(parts[1]);
        setMinutes(parts[2]);
        setDayType(parts[3 + i]);
      }
    }
  }, []);

  return (
    <>
      <FieldLabel
        label={field.label}
        className={field.labelClassName}
        required={field.required}
      />
      <CustomTimePicker
        getValue={field.input.onChange}
        dayTime={dayTime}
        hours={hours}
        minutes={minutes}
        placeholder={field.label}
        required={field.required}
      />
      {
        field.meta.touched && field.meta.error
        && <span className="span-error">{field.meta.error}</span>
      }
    </>
  );
};

export default TimePickedField;
