// ©2024 Austin App House. All rights reserved.
import { SubmissionError } from 'redux-form';
import validate from '../validate/userManagement';
import { reloadData } from '../../../storage/actions/applicationStateActions';
import { toggleModal, toggleSecondModalClose } from '../../../storage/actions/modalsActions';
import editClientUser from '../../api/post/editClientUser';
import sendClientInvite from '../../api/post/sendClientInvite';
import Notification from '../../../components/notification';

const addOrEditUserForManagement = async (values, dispatch, props) => {
  const newValues = {
    ...values,
    firstname: values.firstName,
    lastname: values.lastName,
    userType: values.role,
    number: values.phone,
  };

  if (!props.dirty && newValues._id) return Notification('warning', { message: 'None changes found!' });
  const validationErrors = validate(newValues);
  if (Object.keys(validationErrors).length) throw new SubmissionError(validationErrors);
  dispatch(toggleModal(true, 'loader', true));

  const response = newValues.id
    ? await editClientUser(newValues)
    : await sendClientInvite(newValues);
  dispatch(toggleSecondModalClose('loader', true));

  if (response.success) {
    dispatch(reloadData());
    dispatch(toggleModal(false, 'addOrEditUsersForManagement'));
  }

  return {};
};

export default addOrEditUserForManagement;
