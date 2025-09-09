// ©2024 Austin App House. All rights reserved.
const amountToVerifyFundingSourceOnDwolla = (value, previousValue) => {
  if (!value) return '0.';
  const currentValue = Number(value);
  if (Number.isNaN(currentValue) || currentValue >= 1) return previousValue || '0.';
  const cvLength = value.replace(/[^\d]/g, '').length;
  if (cvLength === 1) return '0.';
  return `0.${currentValue.toFixed(Math.min(cvLength - 1, 2)).split('.')[1]}`;
};

export default amountToVerifyFundingSourceOnDwolla;
