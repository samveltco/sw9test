// ©2024 Austin App House. All rights reserved.
const isDeviceType = (type, variableType, variableAmount) => (type === 'Device' || (variableType === 'Device' && variableAmount));

export default isDeviceType;
