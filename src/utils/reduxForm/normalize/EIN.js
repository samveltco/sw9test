// ©2024 Austin App House. All rights reserved.
const normalize = (value, previousValue) => {
  if (!value) return value;
  const currentValue = value.replace(/[^\d]/g, '');
  const cvLength = currentValue.length;

  if (!previousValue || value.length > previousValue.length) {
    if (cvLength < 3) return currentValue;
    return `${currentValue.slice(0, 2)}-${currentValue.slice(2, 9)}`;
  }
};

export default normalize;
