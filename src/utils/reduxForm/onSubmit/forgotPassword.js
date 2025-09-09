// ©2024 Austin App House. All rights reserved.
import { SubmissionError } from 'redux-form';
import { toggleModal } from '../../../storage/actions/modalsActions';
import fetchForgotPassword from '../../api/post/forgotPassword';
import Notification from '../../../components/notification';
import validate from '../validate/validateForgotPassword';

const forgotPassword = async (values, dispatch, props) => {
  if (!props.dirty) return Notification('warning', { message: 'Please enter your email address' });

  const validationErrors = validate(values);
  if (Object.keys(validationErrors).length) throw new SubmissionError(validationErrors);

  const success = await fetchForgotPassword(values.email, values.sms);

  if (success) {
    dispatch(toggleModal(true, 'loginModal'));
  }
  return {};
};

export default forgotPassword;
