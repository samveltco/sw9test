// ©2024 Austin App House. All rights reserved.
import {
  SET_ACTIVE_TAB,
  RELOAD_DATA,
  SET_SELECTED_WORK_ORDERS_ID,
  SET_PAGE,
  SET_PER_PAGE,
} from '../actions/types';

const initialState = {
  activeTab: 'all',
  isReload: false,
  perPage: 10,
  currentPage: 1,
  selectedWorkOrders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_TAB:
      return {
        ...state,
        currentPage: 1,
        activeTab: action.payload,
      };
    case RELOAD_DATA:
      return {
        ...state,
        isReload: !state.isReload,
      };
    case SET_SELECTED_WORK_ORDERS_ID:
      return {
        ...state,
        selectedWorkOrders: action.payload,
      };
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_PER_PAGE:
      return {
        ...state,
        perPage: action.payload,
      };
    default:
      return state;
  }
}
