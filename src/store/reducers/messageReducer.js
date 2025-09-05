// ©2024 Austin App House. All rights reserved.
import { SET_MESSAGES_COUNTERS, SET_MESSAGES_SEEN } from "../actions/types";

const initialState = {
  unReadMessages:{}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_MESSAGES_COUNTERS:
            return {
                ...state,
                unReadMessages: action.payload,
            };
        case SET_MESSAGES_SEEN:
            state.unReadMessages[action.payload.workOrderId].unread = 0;
            return {
                ...state,
            };
        default:
            return state;
    }
}
