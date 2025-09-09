// ©2024 Austin App House. All rights reserved.
import validate from '../validate/addFundingSourceAndFundsToDwollaBalance';
import Notification from '../../../components/notification';
import { SubmissionError } from 'redux-form';
import { addFundingSourceToDwollaBySuperAdmin, addFundsToDwollaBalance } from '../../../storage/actions/superAdmin';

const addFundingSourceAndFundsToDwollaBalance = async (values, dispatch, props) => {
  const validationErrors = validate(values);
  if (Object.keys(validationErrors).length) throw new SubmissionError(validationErrors);
  if (!props.dirty) return Notification('warning', { message: 'None changes found!' });
  let { fundingSource, amount } = values

  if(!fundingSource) {
    const { amount, ... payload } = values;
    fundingSource = await dispatch(addFundingSourceToDwollaBySuperAdmin({
      ... payload,
      accountStatus: payload.accountStatus.value,
    }));
  }

  if(fundingSource) {
    await dispatch(addFundsToDwollaBalance({
      id: fundingSource.value,
      amount: amount,
    }));
  }

  return {};
};

export default addFundingSourceAndFundsToDwollaBalance;
