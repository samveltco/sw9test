// ©2024 Austin App House. All rights reserved.
import addFundingSourceToDwollaBySuperAdminOnSubmit from '../validate/addFundingSourceToDwollaBySuperAdminOnSubmit';
import addFundsToDwollaBalanceBySuperAdminOnSubmit from '../validate/addFundsToDwollaBalanceBySuperAdminOnSubmit';
import Notification from '../../../components/notification';

const addFundingSourceAndFundsToDwollaBalance = (values) => {
  let result = {}

  if(!values.agree) {
    result.agree = 'Please agree to the terms of the processing fee';
    Notification('warning', {
      message: 'Please agree to the terms of the processing fee',
    })
  }

  if (!(Number(values.amount) > 0)) {
    result.amount = 'Please enter correct payment amount!';
    !values.fundingSource && Notification('warning', {
      message: 'Please enter correct payment amount!',
    });
  }

  if(!values.fundingSource) {
    Object.assign(result, addFundingSourceToDwollaBySuperAdminOnSubmit(values))
  }

  if(values.fundingSource) {
    Object.assign(result, addFundsToDwollaBalanceBySuperAdminOnSubmit(values))
  }

  return result
}

export default addFundingSourceAndFundsToDwollaBalance