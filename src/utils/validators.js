// ©2024 Austin App House. All rights reserved.
import {
  emailValidationRegExp,
  nameSymbolsOnlyRegExp,
  PROCESSING_MIN_AMOUNT,
} from './constans_old';

export const fundsInputValueValidator = value => {
  const typedAmount = value.match(/\d+(\.\d{0,2})?/g) || [''];
  if (!typedAmount[1]
    && +typedAmount[0] >= PROCESSING_MIN_AMOUNT
    || typedAmount[0] === '') {
    return {
      success: true,
      value: typedAmount[0],
    };
  }
  return { success: false };
};

// eslint-disable-next-line consistent-return
export const normalizePhoneInput = (value) => {
  if (!value) return value;
  const currentValue = value.replace(/[^\d]/g, '');
  const cvLength = currentValue.length;

  if (cvLength < 4) return currentValue;
  if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
  return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
};

export const isEmailValid = email => emailValidationRegExp.test(String(email).toLowerCase());

export const isNameSymbolsOnly = value => nameSymbolsOnlyRegExp.test(String(value));
