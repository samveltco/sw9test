// ©2024 Austin App House. All rights reserved.
const getMathMin = (...arg) => {
  if (!arg.length) return 0;
  return Math.min(...arg);
};

export default getMathMin;
