// ©2024 Austin App House. All rights reserved.
// Date picker filter function. Increa max year by 10 years from current year
export const startDateFilter = (date: Date) => {
  const pickedYear = new Date(date).getFullYear();
  return pickedYear < new Date().getFullYear() + 10;
};

export const endDateFilter = (date: Date, startDate: Date) => {
  const pickedYear = new Date(date).getFullYear();
  return startDate
    ? pickedYear < new Date(startDate).getFullYear() + 10
    : pickedYear < new Date().getFullYear() + 10;
};
