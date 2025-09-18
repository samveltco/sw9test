// ©2024 Austin App House. All rights reserved.
import Notification from '../../../components/notification';

const addFundingSourceToDwollaBySuperAdminOnSubmit = (values) => {
  const result = {};

  if (!values.name) {
    result.name = 'Please enter Bank Name';
    Notification('warning', {
      message: 'Please enter correct Bank Name',
    });
  }
  if (!values.routing) {
    result.routing = 'Please enter Routing';
    Notification('warning', {
      message: 'Please enter Routing Number',
    });
  }
  if (!values.account) {
    result.account = 'Please enter Account';
    Notification('warning', {
      message: 'Please enter Account Number',
    });
  }
  if (!values?.accountStatus?.value) {
    result.accountStatus = 'Please select Account Status';
    Notification('warning', {
      message: 'Please select Account Status',
    });
  }
  return result;
};

export default addFundingSourceToDwollaBySuperAdminOnSubmit;
