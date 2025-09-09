// ©2024 Austin App House. All rights reserved.
import { SubmissionError } from 'redux-form';
import validate from '../validate/teams';
import updateTeam from '../../api/patch/updateTeam';
import createTeam from '../../api/post/createTeam';
import { reloadData } from '../../../storage/actions/applicationStateActions';
import { toggleModal, toggleSecondModalClose } from '../../../storage/actions/modalsActions';

const addOrEditTeam = async (values, dispatch) => {
  const validationErrors = validate(values);
  if (Object.keys(validationErrors).length) throw new SubmissionError(validationErrors);

  dispatch(toggleModal(true, 'loader', true));

  let response;
  if (values._id) {
    response = await updateTeam(values);
  } else {
    response = await createTeam(values);
  }

  if (response.success) dispatch(reloadData());
  if (!response.success) dispatch(toggleSecondModalClose('loader', true));

  return {};
};

export default addOrEditTeam;
