// ©2024 Austin App House. All rights reserved.
import { getLocalISODate } from './getDateWithOffset';

const prepareFilters = (filters) => {
  const result = { ...filters };
  [
    'startDate',
    'endDate',
    'createdDate',
    'assignedDate',
    'completedDate',
    'approvedDate',
    'paidDate',
  ].forEach(key => {
    if (result[key]) {
      const tmpDate = { ...result[key] };
      if (tmpDate?.from) tmpDate.from = getLocalISODate(tmpDate.from, false, true);
      if (tmpDate?.to) tmpDate.to = getLocalISODate(tmpDate.to, true, true);
      result[key] = tmpDate;
    }
  });
  return result;
};

export default prepareFilters;
