// ©2024 Austin App House. All rights reserved.
import Notification from '../../../components/notification';

const companyInformationBySuperAdminOnSubmit = (values) => {
  const result = {};
  if (!values.companyId) {
    Notification('error', {
      message: 'something went wrong, Please reload the page and try again!',
    });
  }
  if (!values.processingFee) {
    result.bankName = 'Please enter Fee';
    Notification('warning', {
      message: 'Please enter correct Fee',
    });
  } else if (!(values.processingFee >= 3)) {
    result.bankName = 'Fee must be greater than or equal to 3%';
    Notification('warning', {
      message: 'Fee must be greater than or equal to 3%',
    });
  } else if (!(values.processingFee < 100)) {
    result.bankName = 'Fee must be less than 100%';
    Notification('warning', {
      message: 'Fee must be less than 100%',
    });
  }

  return result;
};

export default companyInformationBySuperAdminOnSubmit;
