// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import {
  UPDATE_PROFILE,
  SET_TAX_INFORMATION,
  SET_BANK_INFORMATION,
  SET_WORK_ORDER_SEARCH_RANGE,
} from './types';
import Notification from '../../components/notification';
import { reloadData } from './applicationStateActions';
import { toggleModal, toggleSecondModalClose } from './modalsActions';

// Update Profile
export const updateProfile = (newProfile, user, onlyCards) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  const path = `/api/${user.userType.replace('superAdmin', 'admin')}/updateProfile/${onlyCards ? 'cards' : ''}`
  const headers = {
    'content-type': 'multipart/form-data'
  }
  return axios.patch(path, newProfile, {headers})
    .then(() => {
      dispatch(toggleSecondModalClose('loader', true));
      dispatch(getProfile(user.id));
      return {
        success: true,
      };
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
      return {
        success: false,
      };
    });
};

export const getProfile = (userProfile) => (dispatch) => {
  axios.get('/api/users/getProfile', {
    params: { userId: userProfile },
  })
    .then((res) => {
      if (res.data.success) {
        dispatch(getUpdateUserProfile(res.data?.payload));
        if(res.data?.payload.defaultDistance) {
          dispatch({ type: SET_WORK_ORDER_SEARCH_RANGE, payload: res.data.payload.defaultDistance })
        }
        // @TODO: Delete userType filter. If get permission.
        if ((res.data?.payload.userType === 'contractor' || res.data?.payload.userType === 'client') && !res.data?.payload.policingAgreements) {
          dispatch(toggleModal(true, 'acceptAgreements'));
        }
      } else {
        Notification('error', {
          message: res.data?.message,
        });
      }
    })
    .catch((error) => {
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};

export const acceptPolicingAgreement = (userId) => async (dispatch) => {
  try {
    await axios.post('/api/contractor/accept-policing-agreements', {});
    if (userId) {
      dispatch(getProfile(userId));
    }
  } catch (error) {
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
  }
};

export const deactivateUser = (reason) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/users/deactivate', { reason });
    if (data.success) {
      dispatch(getUpdateUserProfile({ status: 'deactivated' }));
      dispatch(reloadData());
    } else {
      Notification('error', {
        message: data.message,
      });
    }
    return {
      success: data.success,
    };
  } catch (error) {
    Notification('error', {
      message: error.response?.data.message || error.message,
    });
    return {
      success: false,
    };
  }
};

export const activateUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/users/activate');
    if (data.success) {
      dispatch(getUpdateUserProfile({ status: 'active' }));
      dispatch(reloadData());
    } else {
      Notification('error', {
        message: data.message,
      });
    }
    return {
      success: data.success,
    };
  } catch (error) {
    Notification('error', {
      message: error.response?.data.message || error.message,
    });
    return {
      success: false,
    };
  }
};

export const getUpdateUserProfile = updatingData => ({
  type: UPDATE_PROFILE,
  payload: updatingData,
});

// block companies by contractor
// eslint-disable-next-line no-unused-vars
export const sendBlockCompanyRequest = (companyId) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  axios.patch('/api/contractor/companies/block', { companyId })
    .then(res => {
      dispatch(toggleSecondModalClose('loader'));
      Notification('success', {
        message: res.data.message,
      });
      dispatch(reloadData());
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      console.error('error: ', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};

// eslint-disable-next-line no-unused-vars
export const sendUnblockCompanyRequest = (companyId) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  axios.patch('/api/contractor/companies/unblock', { companyId })
    .then(res => {
      dispatch(toggleSecondModalClose('loader'));
      Notification('success', {
        message: res.data.message,
      });
      dispatch(reloadData());
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      console.error('error: ', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};
// block companies by contractor end

// payment info
export const getAccountBalanceByClient = () => dispatch => {
  axios.get('/api/companies/balance')
    .then(res => dispatch(getUpdateUserProfile({ balance: res.data?.payload?.balance })))
    .catch(error => {
      console.error('error', error);
      Notification('error', {
        message: error.response?.data.message || error.message,
      });
    });
};
// payment info end

// Contractor Tax Information
export const setTaxInfo = taxInfo => ({
  type: SET_TAX_INFORMATION,
  payload: taxInfo,
});



export const changeDefaultDistance = (distance) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  return axios.post('/api/contractor/change-default-distance', { distance }).then(res => {
    dispatch(toggleSecondModalClose('loader', true));
    dispatch({ type: SET_WORK_ORDER_SEARCH_RANGE, payload: distance })
    dispatch(getUpdateUserProfile({ defaultDistance: distance }))
    return res
  })
}
export const getContractorTaxInfo = () => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  return axios.get('/api/contractor/taxInformation')
    .then(res => {
      dispatch(toggleSecondModalClose('loader', true));
      dispatch(setTaxInfo(res.data?.payload?.taxInfo));
      return res;
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader'));
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};

export const updateContractorTaxInfo = taxInfo => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  return axios.post('/api/contractor/taxInformation', taxInfo)
    .then(res => {
      dispatch(toggleSecondModalClose('loader', !res.data.success));
      Notification(res.data.success ? 'success' : 'warning', {
        message: res.data.message,
      });
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};
// Contractor Tax Information End

// Contractor Banking Information
export const setBankingInfo = info => ({
  type: SET_BANK_INFORMATION,
  payload: info,
});

export const getContractorBankingInfo = () => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  return axios.get('/api/contractor/bankInformation')
    .then(res => {
      if (!res.data?.payload?.bankInfo?.account && !res.data?.payload?.bankInfo?.bankName) {
        dispatch(toggleModal(true, 'setUpBankInfoForContractor'));
      }
      dispatch(setBankingInfo(res.data?.payload?.bankInfo));
      return res;
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader'));
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};

export const updateContractorBankingInfo = bankInfo => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  return axios.put('/api/contractor/bankInformation', bankInfo)
    .then(res => {
      dispatch(toggleSecondModalClose('loader', !res.data.success));
      Notification(res.data.success ? 'success' : 'warning', {
        message: res.data.message,
      });
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};
// Contractor Banking Information End

export const submitCertificationTests = (
  certificationTypeId, answers, history, reset,
) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  return axios.post(`/api/certificates/${certificationTypeId}/tests`, { answers })
    .then(res => {
      dispatch(toggleSecondModalClose('loader', !res.data.success));
      Notification(res.data.success ? 'success' : 'warning', {
        message: res.data.message,
      });
      if (res.data.success) history.push('/certifications');
      dispatch(toggleModal(true, 'testFailed', false, {
        certificationTypeId,
        reset,
        ...res.data,
      }));
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader'));
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};
