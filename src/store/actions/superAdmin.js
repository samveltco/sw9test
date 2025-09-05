// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../components/notification';
import { reloadData } from './applicationStateActions';
import { toggleModal, toggleSecondModalClose } from './modalsActions';
import { GET_ERRORS } from './types';

export const updateCompanyInfoBySuperAdmin = data => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  return axios.patch('/api/admin/company', data)
    .then(res => {
      dispatch(toggleSecondModalClose('loader', !res.data.success));
      Notification(res.data.success ? 'success' : 'warning', {
        message: res.data.message,
      });
      dispatch(reloadData());
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};

export const generateToken = (email) => dispatch => {
  axios
    .post('/api/admin/generateToken', { email })
    .then(res => {
      // eslint-disable-next-line no-console
      Notification('success', {
        message: `generated auth token for ${email}`,
      });
      dispatch(reloadData());
    }) // re-direct to login on successful register
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

export const addFundsToDwollaBalance = data => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  return axios.post('/api/dwolla/transactions', data)
    .then(res => {
      dispatch(toggleSecondModalClose('loader', !res.data.success));
      Notification(res.data.success ? 'success' : 'warning', {
        message: res.data.message,
      });
      dispatch(reloadData());
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};

// Dwolla Founding Sources

export const addFundingSourceToDwollaBySuperAdmin = data => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  return axios.post('/api/dwolla/funding-sources', data)
    .then(res => {
      dispatch(toggleSecondModalClose('loader', !res.data.success));
      Notification(res.data.success ? 'success' : 'warning', {
        message: res.data.message,
      });
      dispatch(reloadData());
      return res.data.payload.fundingSource
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};

export const makePrimaryFundingSource = fundingSourceId => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  axios.patch(`/api/dwolla/funding-sources/${fundingSourceId}/primary`)
    .then(res => {
      dispatch(toggleSecondModalClose('loader', !res.data.success));
      Notification(res.data.success ? 'success' : 'warning', {
        message: res.data.message,
      });
      dispatch(reloadData());
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};

export const verifyFundingSource = (fundingSourceId, data) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  return axios.post(`/api/dwolla/funding-sources/${fundingSourceId}/verify`, data)
    .then(res => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification(res.data.success ? 'success' : 'warning', {
        message: res.data.message,
      });
      dispatch(reloadData());
      return res.data;
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
      return error.response?.data || error;
    });
};

export const deleteFundingSource = fundingSourceId => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  axios.delete(`/api/dwolla/funding-sources/${fundingSourceId}`)
    .then(res => {
      dispatch(toggleSecondModalClose('loader', !res.data.success));
      Notification(res.data.success ? 'success' : 'warning', {
        message: res.data.message,
      });
      dispatch(reloadData());
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};

// Dwolla Founding Sources End
