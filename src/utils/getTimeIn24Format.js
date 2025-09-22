// ©2024 Austin App House. All rights reserved.
export const getMatch = (time) => {
  let parts = time.match(/(\d+):(\d+):(\d+)(AM|PM)/) || time.match(/(\d+):(\d+):(\d+) (AM|PM)/);
  if (parts) return { parts, i: 1 };
  parts = time.match(/(\d+):(\d+)(AM|PM)/) || time.match(/(\d+):(\d+) (AM|PM)/);
  if (parts) return { parts, i: 0 };
  return {};
};

export const getTimeIn24Format = (date, time, returnHoursAndMinutes) => {
  if (!time) {
    return (returnHoursAndMinutes
      ? {
        hours: 0,
        minutes: 0,
      }
      : date
    );
  }
  const { parts, i } = getMatch(time);
  if (parts) {
    let hours = parseInt(parts[1], 10);
    const minutes = parseInt(parts[2], 10);
    const tt = parts[3 + i];
    if (tt === 'PM' && hours < 12) hours += 12;
    if (tt === 'AM' && hours === 12) hours = 0;
    if (returnHoursAndMinutes) return { hours, minutes };
    date.setHours(hours, minutes, 0, 0);
    return date;
  }
  return date;
};
