// ©2024 Austin App House. All rights reserved.
import { SubmissionError } from 'redux-form';
import validate from '../validate/contractorTaxInformationOnSubmit';
import { updateContractorTaxInfo } from '../../../storage/actions/profile';
import checkIsIdTypeFieldDirty from '../../checkIsIdTypeFieldDirty';
import Notification from '../../../components/notification';

const contractorTaxInformationReduxForm = async (values, dispatch, props) => {
  const validationErrors = validate(values);
  if (Object.keys(validationErrors).length) throw new SubmissionError(validationErrors);
  const isIdTypeFieldDirty = checkIsIdTypeFieldDirty(values.isEINDisplayed ? 'EIN' : 'SSN', props.initialValues, values);
  if (!props.dirty) return Notification('warning', { message: 'None changes found!' });
  await dispatch(updateContractorTaxInfo({ ...values, isIdTypeFieldDirty }));
  return {};
};

export default contractorTaxInformationReduxForm;
