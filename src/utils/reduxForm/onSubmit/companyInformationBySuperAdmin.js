// ©2024 Austin App House. All rights reserved.
import { SubmissionError } from 'redux-form';
import validate from '../validate/companyInformationBySuperAdminOnSubmit';
import Notification from '../../../components/notification';
import { updateCompanyInfoBySuperAdmin } from '../../../storage/actions/superAdmin';

const companyInformationBySuperAdminReduxForm = async (values, dispatch, props) => {
  const validationErrors = validate(values);
  if (Object.keys(validationErrors).length) throw new SubmissionError(validationErrors);
  if (!props.dirty) return Notification('warning', { message: 'None changes found!' });
  await dispatch(updateCompanyInfoBySuperAdmin({
    ...values,
    processingFee: values.processingFee / 100,
  }));
  return {};
};

export default companyInformationBySuperAdminReduxForm;
