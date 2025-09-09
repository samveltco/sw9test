// ©2024 Austin App House. All rights reserved.
import { SubmissionError } from 'redux-form';
import validate from '../validate/validateForgotPassword';
import Notification from '../../../components/notification';
import { toggleModal } from '../../../storage/actions/modalsActions';
import { resendVerifyEmail } from "../../../storage/actions/authActions";

const verifyAccount = async (values, dispatch, props) => {
  if (!props.dirty) return Notification('warning', { message: 'Please enter your email address' });

  const validationErrors = validate(values);
  if (Object.keys(validationErrors).length) throw new SubmissionError(validationErrors);

  const success = await dispatch(resendVerifyEmail(values.email, values.sms));
  if(success) dispatch(toggleModal(true, 'loginModal'));

  return {};
};

export default verifyAccount;
