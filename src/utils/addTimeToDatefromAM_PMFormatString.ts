// ©2024 Austin App House. All rights reserved.
import { getLocalISODate, getISODateAndTime } from './getDateWithOffset';

export default (date: Date, time: string) => {
  if (!time) {
    return getLocalISODate(date, false, true);
  }
  const parts = time.match(/(\d+):(\d+)(AM|PM)/);
  if (parts) {
    let hours = parseInt(parts[1], 10);
    const minutes = parseInt(parts[2], 10);
    const tt = parts[3];
    if (tt === 'PM' && hours < 12) hours += 12;
    if (tt === 'AM' && hours === 12) hours = 0;
    date.setHours(hours, minutes, 0, 0);
    return getISODateAndTime(new Date(date), false, true);
  }
  console.error('Invalide time formate');
  return getLocalISODate(date, false, true);
};
