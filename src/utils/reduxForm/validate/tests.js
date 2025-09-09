// ©2024 Austin App House. All rights reserved.
import Notification from '../../../components/notification';

const verifyFundingSourceOnSubmit = (values) => {
  const result = {};

  if (!values.certificationTypeId) {
    Notification('error', {
      message: 'Please reload page and try again later!',
    });
  }

  return result;
};

export default verifyFundingSourceOnSubmit;
