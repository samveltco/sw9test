// ©2024 Austin App House. All rights reserved.
import { localCurrencySettings } from '../constans_old';

export const getLocalCurrencyString = (value) => {
  if (!value && value !== 0) return '';
  const number = Number(value);
  if (Number.isNaN(number)) return '';
  return number.toLocaleString('en-US', localCurrencySettings);
};

export const getLocalAmountString = value => {
  const localString = getLocalCurrencyString(value);
  return localString || getLocalCurrencyString(0);
};
