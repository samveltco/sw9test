// ©2024 Austin App House. All rights reserved.
const getSliceOfArray = (array, start, end) => {
  if (!array || !array.length) return [];
  return array.slice(start, end);
};

export default getSliceOfArray;
