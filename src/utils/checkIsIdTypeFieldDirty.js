// ©2024 Austin App House. All rights reserved.
const checkIsIdTypeFieldDirty = (idType, initialValues, values) => (
  initialValues[idType] !== values[idType]
);

export default checkIsIdTypeFieldDirty;
