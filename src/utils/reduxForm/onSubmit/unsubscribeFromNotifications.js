// ©2024 Austin App House. All rights reserved.
import unsubscribeFromNotifications from '../../api/post/unsubscribeFromNotifications';
import { toggleModal } from '../../../storage/actions/modalsActions';

const unsubscribeFromNotificationsOnSubmit = async (_values, dispatch, props) => {
  const success = await unsubscribeFromNotifications(props.unsubscribeId);
  console.log(success)
  if (success) {
    dispatch(toggleModal(false, 'unsubscribeFromNotifications'));
  }
  return {};
};

export default unsubscribeFromNotificationsOnSubmit;
