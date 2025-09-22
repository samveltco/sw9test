// ©2024 Austin App House. All rights reserved.
const findOption = (options, fieldsName, searchValue, defaultOption) => (
  options?.reduce(
    (acc, item) => ((fieldsName.some(field => item[field] === searchValue)) ? item : acc),
    defaultOption || options[0],
  )
);

export default findOption;
