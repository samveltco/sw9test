// ©2024 Austin App House. All rights reserved.
export const getDateWithOffset = (date: Date) => {
  if (!date) return undefined;
  const currentDate = new Date(date);
  const tzOffset = currentDate.getTimezoneOffset();
  return new Date(currentDate.getTime() + tzOffset * 60 * 1000);
};

export const getLocalISODate = (date: Date, isMaxTime: boolean, isUTC: boolean) => {
  if (!date) return '';
  const time = isMaxTime ? '23:59:59.999' : '00:00:00.000';
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const pad = (number: number) => (number < 10 ? `0${number}` : number);
  return `${year}-${pad(month)}-${pad(day)}T${time}${isUTC ? 'Z' : ''}`;
};

export const getISODateAndTime = (date: Date, deleteTime: boolean, isUTC: boolean) => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = deleteTime ? 0 : date.getHours();
  const minutes = deleteTime ? 0 : date.getMinutes();
  const pad = (number: number) => (number < 10 ? `0${number}` : number);
  return `${year}-${pad(month)}-${pad(day)}T${pad(hours)}:${pad(minutes)}:00.000${isUTC ? 'Z' : ''}`;
};

export const getLocalDateString = (value: string) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US');
};
