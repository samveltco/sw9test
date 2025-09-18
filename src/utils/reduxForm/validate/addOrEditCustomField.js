// ©2024 Austin App House. All rights reserved.
import Notification from '../../../components/notification';

const validateCustomFields = (values) => {
  const result = {};

  if (!values?.name?.trim()) {
    result.name = 'Name field is empty';
    Notification('error', {
      message: 'Please enter name!',
    });
  }

  if (values?.name?.length > 35) {
    result.name = 'Name is longer than maximum allowed length (35)';
    Notification('error', {
      message: 'Name is longer than maximum allowed length (35)',
    });
  }

  return result;
};

export default validateCustomFields;
