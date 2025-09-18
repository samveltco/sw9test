// ©2024 Austin App House. All rights reserved.
import { SubmissionError } from 'redux-form';
import validate from '../validate/addOrEditCustomField';
import { reloadData } from '../../../storage/actions/applicationStateActions';
import {
  toggleModal,
  toggleSecondModalClose,
} from '../../../storage/actions/modalsActions';
import updateCustomFieldName from '../../api/patch/updateCustomFieldName';
import createNewCustomField from '../../api/post/createNewCustomField';
import Notification from '../../../components/notification';

const addOrEditCustomField = async (values, dispatch, props) => {
  const validationErrors = validate(values);

  if (!props.dirty && values._id) return Notification('warning', { message: 'None changes found!' });
  if (Object.keys(validationErrors).length) throw new SubmissionError(validationErrors);

  dispatch(toggleModal(true, 'loader', true));

  let response;
  if (values._id) {
    response = await updateCustomFieldName(values._id, values.name);
  } else {
    response = await createNewCustomField(values.name);
  }
  dispatch(toggleSecondModalClose('loader', true));

  if (response.success) {
    dispatch(reloadData());

    dispatch(toggleModal(false, 'addOrEditUsersForManagement'));
  }
  return {};
};

export default addOrEditCustomField;
