// ©2024 Austin App House. All rights reserved.
import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  reqType: ''
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        ...action.payload
      };
    case CLEAR_ERRORS: {
      return initialState;
    }
    default:
      return state;
  }
}