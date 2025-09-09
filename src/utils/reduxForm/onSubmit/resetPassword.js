// ©2024 Austin App House. All rights reserved.
import { SubmissionError } from 'redux-form';
import validate from '../validate/resetPassword';
import Notification from '../../../components/notification';
import resetPassword from '../../api/post/resetPassword';
import { toggleModal } from '../../../storage/actions/modalsActions';

const resetPasswordOnSubmit = async (
  values, dispatch, props,
) => {
  if (!props.dirty) return Notification('warning', { message: 'Plese enter new password' });

  const validationErrors = validate(values);
  if (Object.keys(validationErrors).length) throw new SubmissionError(validationErrors);

  const data = {
    randId: props.id,
    password: values.password,
    confirmPassword: values.confirmPassword,
  };

  const success = await resetPassword(data);

  if (success) {
    dispatch(toggleModal(true, 'loginModal'));
  }
  return {};
};

export default resetPasswordOnSubmit;
