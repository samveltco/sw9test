// ©2024 Austin App House. All rights reserved.
import { SET_MESSAGES_COUNTERS, SET_MESSAGES_SEEN } from "./types";

export const setMessagesCount = counters => {
    return {
        type: SET_MESSAGES_COUNTERS,
        payload: counters
    };
};
export const setMessagesSeen = data => {
    return {
        type: SET_MESSAGES_SEEN,
        payload: data
    };
};
