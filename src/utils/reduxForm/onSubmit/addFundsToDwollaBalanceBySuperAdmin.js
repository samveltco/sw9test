// ©2024 Austin App House. All rights reserved.
import { SubmissionError } from 'redux-form';
import validate from '../validate/addFundsToDwollaBalanceBySuperAdminOnSubmit';
import Notification from '../../../components/notification';
import { addFundsToDwollaBalance } from '../../../storage/actions/superAdmin';

const addFundsToDwollaBalanceBySuperAdmin = async (values, dispatch, props) => {
  const validationErrors = validate(values);
  if (Object.keys(validationErrors).length) throw new SubmissionError(validationErrors);
  if (!props.dirty) return Notification('warning', { message: 'None changes found!' });
  await dispatch(addFundsToDwollaBalance({
    id: values.fundingSource.value,
    amount: values.amount,
  }));
  return {};
};

export default addFundsToDwollaBalanceBySuperAdmin;
