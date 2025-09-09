// ©2024 Austin App House. All rights reserved.
import { SubmissionError } from 'redux-form';
import { loginUser } from '../../../storage/actions/authActions';
import Notification from '../../../components/notification';
import validate from '../validate/login';

const login = async (values, dispatch, props) => {
  if (!props.dirty) return Notification('warning', { message: 'Plese enter new email adress and password' });

  const validationErrors = validate(values);
  if (Object.keys(validationErrors).length) throw new SubmissionError(validationErrors);
  const { email, password } = values;

  const data = {
    email,
    password,
    message_reg: '',
  };

  dispatch(loginUser(data, props.history));

  return {};
};

export default login;
