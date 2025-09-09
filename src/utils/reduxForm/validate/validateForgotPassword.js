// ©2024 Austin App House. All rights reserved.
import Notification from '../../../components/notification';
import { isEmailValid } from '../../validators';

const verifyFundingSourceOnSubmit = (values) => {
  const result = {};

  if (!isEmailValid(values.email)) {
    result.error = 'Please enter valid email';
    Notification('error', {
      message: 'Please enter valid email',
    });
  }

  return result;
};

export default verifyFundingSourceOnSubmit;
