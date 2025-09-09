// ©2024 Austin App House. All rights reserved.
import { SubmissionError } from 'redux-form';
import validate from '../validate/contractorBankingInformationOnSubmit';
import { acceptPolicingAgreement, updateContractorBankingInfo } from '../../../storage/actions/profile';
import checkIsIdTypeFieldDirty from '../../checkIsIdTypeFieldDirty';
import Notification from '../../../components/notification';

const contractorBankingInformationReduxForm = async (values, dispatch, props) => {
  const validationErrors = validate(values);
  if (Object.keys(validationErrors).length) throw new SubmissionError(validationErrors);
  const isDirtyAccount = checkIsIdTypeFieldDirty('account', props.initialValues, values);
  const isDirtyRouting = checkIsIdTypeFieldDirty('routing', props.initialValues, values);
  if (!props.dirty) return Notification('warning', { message: 'None changes found!' });
  await dispatch(acceptPolicingAgreement());
  await dispatch(updateContractorBankingInfo({
    ...values,
    accountType: values.accountType.value,
    accountStatus: values.accountStatus.value,
    isDirtyAccount,
    isDirtyRouting,
  }));
  return {};
};

export default contractorBankingInformationReduxForm;
