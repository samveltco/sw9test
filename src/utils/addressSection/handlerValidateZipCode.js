// ©2024 Austin App House. All rights reserved.
const handlerValidateZipCode = (value, country) => {
  if (value) {
    const zi = country?.label === 'Canada'
      ? /^([A-CEGHJ-NPRSTVXY]\d[A-CEGHJ-NPRSTV-Z][ -]?\d[A-CEGHJ-NPRSTV-Z]\d)$/
      : /(^\d{5}$)|(^\d{5}-\d{5}$)/;
    if (!zi.test(value)) return 'Enter valid zipcode';
  }
  return undefined;
};

export default handlerValidateZipCode;
