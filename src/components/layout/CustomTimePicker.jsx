// ©2024 Austin App House. All rights reserved.
import React, { useEffect, useState } from 'react';

const CustomTimePicker = ({
  hours = '',
  minutes = '',
  dayTime = 'AM',
  getValue,
  className,
  style,
  required,
}) => {
  const correctingValue = value => (value < 10 ? (`0${value}`) : value).toString();

  const [hourSelected, setHour] = useState('');
  const [minutesSelected, setMinutes] = useState('');
  const [dayTypeSelected, setDayType] = useState('AM');

  useEffect(() => {
    setHour(hours || '');
    setMinutes(minutes || '');
    setDayType(dayTime || 'AM');
  }, [hours, minutes, dayTime]);

  const saveChanges = {
    hour: setHour,
    minutes: setMinutes,
    dayType: setDayType,
  };

  const returnValue = ({
    hourSelected,
    minutesSelected,
    dayTypeSelected,
  }) => {
    if (!hourSelected.length && !minutesSelected.length) return getValue('');
    const h = hourSelected.length ? Number(hourSelected) : 0;
    const m = minutesSelected.length ? Number(minutesSelected) : 0;
    if (h > 12) return handlerChanges('12', 'hour');
    if (m > 59) return handlerChanges('59', 'minutes');
    if (h < 1 && hourSelected.length > 1) return handlerChanges('01', 'hour');
    if (m < 0) return handlerChanges('00', 'minutes');
    if (Number.isNaN(h) || Number.isNaN(m)) return getValue('');
    let returnedValue = correctingValue(h);
    returnedValue = returnedValue.concat(':', correctingValue(m));
    returnedValue += returnedValue.length ? dayTypeSelected : '';
    return getValue(returnedValue);
  };

  const handlerChanges = async (value, name) => {
    await saveChanges[name](value);
    returnValue({
      hourSelected,
      minutesSelected,
      dayTypeSelected,
      [`${name}Selected`]: value,
    });
  };

  return (
    <div className="flex-box flex-align-center" style={style}>
      <input
        required={required}
        className={`form-control ${className}`}
        style={{
          width: '4rem',
          padding: '0.1rem',
          textAlign: 'center',
        }}
        name="hour"
        value={hourSelected}
        max={12}
        maxLength={2}
        type="text"
        pattern="[0-9]+"
        onChange={event => handlerChanges(event.target.value, event.target.name)}
      />
      <span style={{ padding: '0 0.2rem' }}>:</span>
      <input
        required={required}
        style={{
          width: '4rem',
          padding: '0.1rem',
          textAlign: 'center',
        }}
        name="minutes"
        value={minutesSelected}
        max={59}
        maxLength={2}
        type="text"
        pattern="[0-9]+"
        onChange={event => handlerChanges(event.target.value, event.target.name)}
      />
      <select
        required={required}
        className={`form-control ${className}`}
        style={{
          marginLeft: '0.4rem',
          width: 'auto',
        }}
        name="dayType"
        onChange={event => handlerChanges(event.target.value, event.target.name)}
        value={dayTypeSelected}
      >
        <option name="AM">AM</option>
        <option name="PM">PM</option>
      </select>
    </div>
  );
};

export default CustomTimePicker;
