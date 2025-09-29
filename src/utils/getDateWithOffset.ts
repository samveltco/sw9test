// ©2024 Austin App House. All rights reserved.
export const getDateWithOffset = (date: Date | string) => {
  if (!date) return undefined;
  const currentDate = new Date(date as any);
  const tzOffset = currentDate.getTimezoneOffset();
  return new Date(currentDate.getTime() + tzOffset * 60 * 1000);
};

export const getLocalISODate = (date: Date | string, isMaxTime: boolean, isUTC: boolean) => {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return '';
  const time = isMaxTime ? '23:59:59.999' : '00:00:00.000';
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const pad = (number: number) => (number < 10 ? `0${number}` : number);
  return `${year}-${pad(month)}-${pad(day)}T${time}${isUTC ? 'Z' : ''}`;
};

export const getISODateAndTime = (date: Date | string, deleteTime: boolean, isUTC: boolean) => {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return '';
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = deleteTime ? 0 : d.getHours();
  const minutes = deleteTime ? 0 : d.getMinutes();
  const pad = (number: number) => (number < 10 ? `0${number}` : number);
  return `${year}-${pad(month)}-${pad(day)}T${pad(hours)}:${pad(minutes)}:00.000${isUTC ? 'Z' : ''}`;
};

export const getLocalDateString = (value: string) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US');
};
