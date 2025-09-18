// ©2024 Austin App House. All rights reserved.
import Notification from '../../../components/notification';
import { emailValidationRegExp } from '../../constans';

const validateUserManagement = values => {
  const result = {};

  if (!values.lastName.trim()) {
    result.lastName = 'Last name field is empty';
    Notification('error', {
      message: 'Last name field is empty',
    });
  }

  if (!values.firstName.trim()) {
    result.firstName = 'First name field is empty';
    Notification('error', {
      message: 'First name field is empty',
    });
  }

  if (!values.email.trim()) {
    result.email = 'Email field is empty';
    Notification('error', {
      message: 'Email field is empty',
    });
  }

  if (!emailValidationRegExp.test(values.email)) {
    result.email = 'Email is not valid';
    Notification('error', {
      message: 'Email is not valid',
    });
  }

  if (values.phone.length !== 14) {
    result.phone = 'Please enter valid phone number';
    Notification('error', {
      message: 'Please enter valid phone number',
    });
  }

  if (!values.userType) {
    result.role = 'Please select the role';
    Notification('error', {
      message: 'Please select the role',
    });
  }

  return result;
};

export default validateUserManagement;
