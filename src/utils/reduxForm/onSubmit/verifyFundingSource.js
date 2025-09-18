// ©2024 Austin App House. All rights reserved.
import { SubmissionError } from 'redux-form';
import validate from '../validate/verifyFundingSource';
import Notification from '../../../components/notification';
import { verifyFundingSource } from '../../../storage/actions/superAdmin';

const verifyFundingSourceReduxForm = async (values, dispatch, props) => {
  const validationErrors = validate(values);
  if (Object.keys(validationErrors).length) throw new SubmissionError(validationErrors);
  if (!props.dirty) return Notification('warning', { message: 'None changes found!' });
  const {
    amount1,
    amount2,
    fundingSourceId,
  } = values;
  const result = await dispatch(verifyFundingSource(
    fundingSourceId,
    { amount1, amount2 },
  ));
  if (!result.success) throw new SubmissionError({ _error: result.message });
  return {};
};

export default verifyFundingSourceReduxForm;
