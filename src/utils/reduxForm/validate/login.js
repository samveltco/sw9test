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

  if (!values.password) {
    result.error = 'Password field is required';
    Notification('error', {
      message: 'Password field is required',
    });
  }

  return result;
};

export default verifyFundingSourceOnSubmit;
