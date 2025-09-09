// ©2024 Austin App House. All rights reserved.
import Notification from '../../../components/notification';

const createCustomField = values => {
  const result = {};

  if (!values.name) {
    result.name = 'Please enter custom field name!';
    Notification('error', {
      message: 'Please enter custom field name!',
    });
  }

  if (values.name?.length > 35) {
    result.name = 'Name is longer than maximum allowed length (35)';
    Notification('error', {
      message: 'Name is longer than maximum allowed length (35)',
    });
  }

  if (values.value?.length > 150) {
    result.value = 'Value is longer than maximum allowed length (150)';
    Notification('error', {
      message: 'Value is longer than maximum allowed length (150)',
    });
  }

  if (!values?.type || !values?.type?.value) {
    result.type = 'Please select custom field type!';
    Notification('warning', {
      message: 'Please select custom field type!',
    });
  }

  return result;
};

export default createCustomField;
