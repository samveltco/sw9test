// ©2024 Austin App House. All rights reserved.
import Notification from '../../../components/notification';

const verifyFundingSourceOnSubmit = (values) => {
  const result = {};

  if (!values.fundingSourceId) {
    Notification('error', {
      message: 'Please reload page and try again later!',
    });
  }

  if (!values.amount1 || !(Number(values.amount1) > 0)) {
    result.amount1 = 'Please enter correct Amount 1';
    Notification('warning', {
      message: 'Please enter correct Amount 1',
    });
  }

  if (!values.amount2 || !(Number(values.amount2) > 0)) {
    result.amount2 = 'Please enter correct Amount 2';
    Notification('warning', {
      message: 'Please enter correct Amount 2',
    });
  }

  return result;
};

export default verifyFundingSourceOnSubmit;
