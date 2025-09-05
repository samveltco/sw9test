// ©2024 Austin App House. All rights reserved.
import {
  UPDATE_PROFILE,
  SET_TAX_INFORMATION,
  SET_BANK_INFORMATION,
} from '../actions/types';

const initialState = {
  balance: {},
  taxInfo: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    case SET_TAX_INFORMATION:
      return {
        ...state,
        taxInfo: {
          ...state.taxInfo,
          ...action.payload,
        },
      };
    case SET_BANK_INFORMATION:
      return {
        ...state,
        bankInfo: {
          ...state.bankInfo,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
