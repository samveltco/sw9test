// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

import setAuthToken from '../../utils/setAuthToken';
import {
    GET_ERRORS, SET_CURRENT_USER, REGISTER_SUCCESS, USER_LOADING, INIT, SUBMIT_WORK_ORDER,
} from './types';
import { getContractorBankingInfo, getProfile } from './profile';
import Notification from '../../components/notification';
import { toggleModal, toggleSecondModalClose } from './modalsActions';
import { reloadData } from './applicationStateActions';

// Register User
export const registerUser = (newUser) => async (dispatch) => {
    try {
        const res = await axios.post("/api/auth/register", newUser);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
        console.log(res)

        console.log("Register success:", res.data);

        return { success: true, data: res.data };

    } catch (err) {
        console.error("Register error:", err);

        const errorPayload = err.response?.data || { message: err.message };

        dispatch({
            type: GET_ERRORS,
            payload: errorPayload,
        });

        return { success: false, message: errorPayload.message || "Registration failed" };
    }
};

export const getUsers = (userId) => dispatch => {
    axios.get('/api/users/getUsers', { params: { user_id: userId } })
        .then(res => {
            dispatch(getUsers(res));
        })
        .catch(error => {
            console.error('err', error);
            Notification('error', {
                message: error.response?.data?.message || error.message,
            });
            dispatch({
                type: GET_ERRORS,
                payload: error.response?.data,
            });
        });
};

export const loginUser = (userData, history) => async dispatch => {
    try {
        const res = await axios.post('/api/auth/login', userData);

        const { token } = res.data;
        if (!token) {
            throw new Error('Token not found');
        }

        localStorage.setItem('jwtToken', token);

        setAuthToken(token);

        const decoded = jwtDecode(token);

        dispatch(setCurrentUser(decoded));

        history.push('/dashboard');

    } catch (error) {
        Notification('error', {
            message: error.response?.data?.message || error.message,
        });

        dispatch({
            type: GET_ERRORS,
            payload: error.response?.data || { message: error.message },
        });
    }
};

// eslint-disable-next-line camelcase
export const forgot_password = userData => dispatch => {
    axios
        .post('/api/users/forgot_password', userData)
        .then(res => {
            console.log('res sucess', res);
            // window.confirm("Kindly check your email ")

            // Save to localStorage
            // Set token to localStorage
            // const { token } = res.data;
            // localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            // setAuthToken(token);
            // Decode token to get user data
            // const decoded = jwtDecode(token);
            // Set current user
            // dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            console.log('errr', err);

            dispatch({
                type: GET_ERRORS,
                payload: err,
            });
        });
};

// eslint-disable-next-line camelcase
export const reset_password = (userData, history) => dispatch => {
    axios
        .post('/api/users/reset_password', userData)
        .then(res => {
            console.log('res sucess', res);
            history.push('/login');
            window.confirm('Password reset sucessfully');

            // Save to localStorage
            // Set token to localStorage
            // const { token } = res.data;
            // localStorage.setItem("jwtToken", token);
            //
            // setAuthToken(token);
            //
            // const decoded = jwtDecode(token);
            //
            // dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            console.log('errr', err);

            dispatch({
                type: GET_ERRORS,
                payload: err,
            });
        });
};

export const resendVerifyEmail = (email, sms) => async dispatch => {
    return axios
        .post('/api/auth/resend-verify-email', { email, sms })
        .then(res => {
            Notification('success', {
                message: res.data.message,
            });
            return true
        })
        .catch(error => {
            Notification('error', {
                message: error.response?.data?.message || error.message,
            });
            dispatch({
                type: GET_ERRORS,
                payload: error,
            });
            return false
        });
};

// eslint-disable-next-line camelcase
export const verify_email = (use) => dispatch => (
    axios
        .post('/api/users/verify_email', use)
        .then(res => {
            console.log('res sucess', res);

            // Save to localStorage
            // Set token to localStorage
        })
        .catch(err => {
            console.log('err', err);
            dispatch({
                type: GET_ERRORS,
                payload: err,
            });
        })
);


// User loading
export const setUserLoading = () => ({
    type: USER_LOADING,
});

// Log user out
export const logoutUser = (logoutFunction = () => {}) => dispatch => {
    logoutFunction();
    // Remove token from local storage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    window.location.href = '/';
};

export const submitWorkOrderInProcess = submitStatus => ({
    type: SUBMIT_WORK_ORDER,
    payload: submitStatus,
});

// eslint-disable-next-line camelcase
export const delete_user_Details = (id, reassignedTo) => dispatch => {
    dispatch(toggleModal(true, 'loader', true));
    return axios // @TODO: Delete return after rewriting user management page!!!
        .delete(`/api/users/delete_client_users/?id=${id}&reassignedTo=${reassignedTo}`)
        .then(res => {
            dispatch(toggleSecondModalClose('loader'));
            dispatch(reloadData());
            Notification('success', res.data);
        })
        .catch(error => {
            dispatch(toggleSecondModalClose('loader'));
            Notification('error', {
                message: error.response?.data?.message || error.message || 'Delete failed!',
            });
        });
};

// Set logged in user
export const setCurrentUser = decoded => ({
    type: SET_CURRENT_USER,
    payload: decoded,
});

export const init = () => dispatch => {
    // eslint-disable-next-line no-console
    console.log('init');
    const token = window.localStorage.getItem('jwtToken');
    let decoded = null;
    if (token) {
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        decoded = jwtDecode(token);
    }
    initApiVersion();
    dispatch(setInitData(decoded));
};

export const setInitData = decoded => ({
    type: INIT,
    payload: decoded,
});

const initApiVersion = () => {
    axios.get('/api/version').then(res => {
        if (res.data.payload.version) {
            window.localStorage.setItem('api-version', res.data.payload.version);
        }
    }).catch(error => {
        Notification('error', {
            message: error.response?.data?.message || error.message || 'init api version failed',
        });
    });
};

const confirm = async (dispatch, message) => {
    return new Promise((resolve) => dispatch(toggleModal(true, 'confirmModal', true, {
        onAccept: () => resolve(true),
        header: message,
        buttonLabels: {
            reject: 'No',
            confirm: 'Yes'
        },
    })))
}