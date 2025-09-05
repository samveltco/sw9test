// ©2024 Austin App House. All rights reserved.
import isEmpty from 'is-empty';
import {
  SET_CURRENT_USER,
  USER_LOADING,
  INIT,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  init: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        init: true,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
