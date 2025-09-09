// ©2024 Austin App House. All rights reserved.
import Notification from '../../../components/notification';

const addFundsToDwollaBalanceBySuperAdminOnSubmit = (values) => {
  const result = {};
  if (!(Number(values.amount) > 0)) {
    result.bankName = 'Please enter correct payment amount!';
    Notification('warning', {
      message: 'Please enter correct payment amount!',
    });
  }
  if (!values?.fundingSource || !values.fundingSource?.value) {
    result.bankName = 'Please select Funding Source';
    Notification('warning', {
      message: 'Please select Funding Source',
    });
  }
  return result;
};

export default addFundsToDwollaBalanceBySuperAdminOnSubmit;
