// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../components/notification';
import { reloadData } from './applicationStateActions';
import { toggleModal, toggleSecondModalClose } from './modalsActions';
import { GET_ERRORS } from './types';
import { getAccountBalanceByClient } from './profile';

// eslint-disable-next-line import/prefer-default-export
export const addPaymentTransaction = (amount, paymentMethod) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  axios.post('/api/payment/payment-transaction', { amount, paymentMethod })
    .then(res => {
      Notification('success', res.data);
      dispatch(reloadData());
      dispatch(getAccountBalanceByClient());
      dispatch(toggleSecondModalClose('loader'));
    })
    .catch(error => {
      dispatch(toggleModal(false, 'loader', true));
      const message = error.response?.data?.message || error.message;
      Notification('error', { message });
      dispatch({
        type: GET_ERRORS,
        payload: error.response?.data || error,
      });
    });
};
