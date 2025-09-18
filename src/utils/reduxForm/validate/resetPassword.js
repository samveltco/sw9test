// ©2024 Austin App House. All rights reserved.
import Notification from '../../../components/notification';

const validateResetPassword = (values) => {
  const result = {};

  if (!values.password) {
    result.error = '';
    Notification('error', {
      message: 'Password field is empty',
    });
  }

  if (!values.confirmPassword) {
    result.error = '';
    Notification('error', {
      message: 'Confirm password field is empty',
    });
  }

  return result;
};

export default validateResetPassword;
