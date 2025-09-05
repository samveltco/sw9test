// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import { toggleModal, toggleSecondModalClose } from './modalsActions';
import Notification from '../../components/notification';
import { reloadData } from './applicationStateActions';

export const blockForCompany = contractorId => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  axios.patch('/api/companies/block', { contractorId })
    .then(res => {
      Notification('success', res.data);
      dispatch(reloadData());
      dispatch(toggleSecondModalClose('loader'));
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      console.error('error', error);
      Notification('error', error.response?.data?.message || error.message);
    });
};

export const blockForWorkOrder = (workOrderId, contractorId) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  axios.post('/api/orders/block_user_for_order', {
    workOrderId,
    contractorId,
  })
    .then(res => {
      Notification('success', res.data);
      dispatch(reloadData());
      dispatch(toggleSecondModalClose('loader'));
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      console.error('error', error);
      Notification('error', error.response?.data?.message || error.message);
    });
};

export const setBlackListPerProject = (
  projectIdsBlockIds, projectIdsUnblockIds, contractorId,
) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  axios.patch('/api/projects/block', {
    projectIdsBlockIds,
    projectIdsUnblockIds,
    contractorId,
  })
    .then(res => {
      Notification('success', res.data);
      dispatch(reloadData());
      dispatch(toggleSecondModalClose('loader'));
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      console.error('error', error);
      Notification('error', error.response?.data?.message || error.message);
    });
};

export const setBlackListPerCompany = (
  woCompanyBlockIds, woCompanyUnblockIds, contractorId,
) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  axios.patch('/api/wo-companies/block', {
    woCompanyBlockIds,
    woCompanyUnblockIds,
    contractorId,
  })
    .then(res => {
      Notification('success', res.data);
      dispatch(reloadData());
      dispatch(toggleSecondModalClose('loader'));
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      console.error('error', error);
      Notification('error', error.response?.data?.message || error.message);
    });
};
