// ©2024 Austin App House. All rights reserved.
import {
  SET_ACTIVE_TAB, SET_SELECTED_WORK_ORDERS_ID, RELOAD_DATA, SET_PAGE, SET_PER_PAGE,
} from './types';

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});

export const setPerPage = (count) => ({
  type: SET_PER_PAGE,
  payload: count,
});

export const setActiveTab = tab => ({
  type: SET_ACTIVE_TAB,
  payload: tab,
});

export const reloadData = () => ({
  type: RELOAD_DATA,
});

export const selectWorkOrder = workOrdersId => ({
  type: SET_SELECTED_WORK_ORDERS_ID,
  payload: workOrdersId,
});
