// ©2024 Austin App House. All rights reserved.
import { SubmissionError } from 'redux-form';
import validate from '../validate/addFundingSourceToDwollaBySuperAdminOnSubmit';
import Notification from '../../../components/notification';
import { addFundingSourceToDwollaBySuperAdmin } from '../../../storage/actions/superAdmin';

const addFundingSourceToDwollaBySuperAdminReduxForm = async (values, dispatch, props) => {
  const validationErrors = validate(values);
  if (Object.keys(validationErrors).length) throw new SubmissionError(validationErrors);
  if (!props.dirty) return Notification('warning', { message: 'None changes found!' });
  await dispatch(addFundingSourceToDwollaBySuperAdmin({
    ...values,
    accountStatus: values.accountStatus.value,
  }));
  return {};
};

export default addFundingSourceToDwollaBySuperAdminReduxForm;
