// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import {
  SET_CURRENT_WORK_ORDER,
  SET_APPLICANTS_FOR_CURRENT_WORK_ORDER,
  SET_ROUTED_FOR_CURRENT_WORK_ORDER,
  SET_CURRENT_APPLICANTS, GET_ERRORS,
  FETCH_AVAILABLE_APPLICANTS,
  SET_LOADED_STATUS,
  SET_WORK_ORDER_FILTERS,
  SET_WORK_ORDER_SORT_BY,
  SET_WORK_ORDER_SEARCH,
  SET_CURRENT_TEMPLATE,
  SET_IS_DOWNLOAD_DOCUMENTS,
} from './types';
import { toggleModal, toggleSecondModalClose } from './modalsActions';
import {reloadData, selectWorkOrder, setActiveTab, setPage} from './applicationStateActions';
import { getAccountBalanceByClient } from './profile';
import Notification from '../../components/notification';
import { getDateWithOffset } from '../../utils/getDateWithOffset';
import combineDateAndTime from '../../utils/addTimeToDatefromAM_PMFormatString';
import {calculateFundsRequiredSum} from "../../utils/calculateFundsRequiredSum";

export const setLoadedStatus = (loadedStatus) => ({
  type: SET_LOADED_STATUS,
  payload: loadedStatus,
});

export const setCurrentWorkOrder = (workOrder) => ({
  type: SET_CURRENT_WORK_ORDER,
  payload: workOrder,
});
export const setDocumentsDownloadInProcess = (isDownloading) => ({
  type: SET_IS_DOWNLOAD_DOCUMENTS,
  payload: isDownloading,
});

export const setRoutedForCurrentWorkOrder = (routedApplicants) => ({
  type: SET_ROUTED_FOR_CURRENT_WORK_ORDER,
  payload: routedApplicants,
});

export const setApplicantsForCurrentWorkOrder = (applicants) => ({
  type: SET_APPLICANTS_FOR_CURRENT_WORK_ORDER,
  payload: applicants,
});

export const setCurrentApplicants = (applicants) => ({
  type: SET_CURRENT_APPLICANTS,
  payload: applicants,
});

export const fetchAvailableApplicants = (applicants) => ({
  type: FETCH_AVAILABLE_APPLICANTS,
  payload: applicants.data,
});

export const setFilters = (filters = {}) => ({
  type: SET_WORK_ORDER_FILTERS,
  payload: filters,
});

export const setSortBy = (key, value) => ({
  type: SET_WORK_ORDER_SORT_BY,
  payload: { [key]: value },
});

export const setSearch = (search) => ({
  type: SET_WORK_ORDER_SEARCH,
  payload: search,
});

export const setFiltersObject = (filters = {}) => dispatch => {
  dispatch(setPage(1));
  dispatch(setFilters(filters));
};

export const setSortType = (key, value) => dispatch => {
  dispatch(setPage(1));
  dispatch(setSortBy(key, value));
};

export const setSearchObject = (search) => dispatch => {
  dispatch(setPage(1));
  dispatch(setSearch(search));
};

export const fetchApplicantsForWorkOrder = (workOrderId) => (dispatch) => {
  const fetchData = async () => {
    await dispatch(setLoadedStatus({ applicantsLoaded: false }));
    dispatch(setLoadedStatus({ routedApplicantsLoaded: false }));
    const applicants = await axios.post('/api/users/view_applicants', { work_order_id: workOrderId });
    const routedApplicants = await axios.post('/api/users/view_routed', { work_order_id: workOrderId });
    dispatch(setApplicantsForCurrentWorkOrder(applicants.data));
    dispatch(setRoutedForCurrentWorkOrder(routedApplicants.data));
  };
  fetchData();
};

export const revertWorkOrderTo = (status, order) => async dispatch => {
    try {
        dispatch(toggleModal(true, 'loader', true))
        await axios.patch(`/api/orders/${order}/revert/${status}`)
        await dispatch(setActiveTab(status))
        await dispatch(fetchWorkOrderById(order))
    }
    catch (error) {
        Notification('error', {
            message: error.response?.data?.message || error.message
        })
    }
    finally {
        dispatch(toggleSecondModalClose('loader', true))
    }
}

export const fetchWorkOrderById = (workOrderId, win) => (dispatch) => {
  const fetchData = async () => {
    try {
      dispatch(toggleModal(true, 'loader', true));
      dispatch(setLoadedStatus({ currentWorkOrderLoaded: false }));
      const res = await axios.get('/api/orders', { params: { workOrderId, win } });

      const workOrder = res.data.payload;


      if (workOrder?.clientInfo?.ratings) {
        const { total, count } = workOrder.clientInfo.ratings;
        workOrder.clientInfo.ratings = ((total / (count * 3)) * 100).toFixed(2)
          .replace(/\.?0+$/, '');
      }
      workOrder.startDate = getDateWithOffset(workOrder.startDate);
      workOrder.endDate = getDateWithOffset(workOrder.endDate);
      workOrder.amount = workOrder.bidAmountBase || workOrder.amount

      dispatch(setCurrentWorkOrder(workOrder));
      dispatch(fetchApplicantsForWorkOrder(workOrder._id));
      dispatch(toggleSecondModalClose('loader', true));
    } catch (error) {
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
      dispatch(toggleSecondModalClose('loader'));
    }
  };
  return fetchData();
};

export const editOnHoldStatusWorkOrder = (data) => (dispatch) => {
  dispatch(toggleModal(true, 'loader', true));
  axios
    .post('/api/orders/hold', data)
    .then((res) => {
      dispatch(toggleSecondModalClose('loader'));
      Notification('success', {
        message: res.data.message,
      });
      dispatch(reloadData());
      dispatch(selectWorkOrder([]));
    })
    .catch((error) => {
      console.error(error);
      dispatch(toggleSecondModalClose('loader'));
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    });
};

export const completeWorkOrder = (id, qtyDevices) => (dispatch) => {
  dispatch(toggleModal(true, 'loader', true));
  axios
    .post('/api/users/complete_work_order', { work_order_id: id, qtyDevices })
    .then(() => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('success', {
        message: 'Work Order Completed',
      });
      dispatch(reloadData());
      dispatch(fetchWorkOrderById(id));
    })
    .catch((error) => {
      dispatch(toggleSecondModalClose('loader', true));
      dispatch(fetchWorkOrderById(id));
      console.error(error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    });
};

export const fetchNearByContractors = (workOrderId, range = 50) => (dispatch) => {
  const fetchData = async () => {
    dispatch(setLoadedStatus({ availableApplicantsLoaded: false }));
    const response = await axios.post('/api/client/nearby_contractor', {
      workOrderId,
      range,
    });
    dispatch(fetchAvailableApplicants(response.data));
  };
  fetchData();
};

export const publishWorkOrder = (id) => (dispatch) => {
  dispatch(toggleModal(true, 'loader', true));
  axios
    .post('/api/users/publish_work_order', { work_order_id: id })
    .then((res) => {
      Notification('success', {
        message: res.data.message,
      });
      dispatch(toggleSecondModalClose('loader'));
      dispatch(reloadData());
      dispatch(getAccountBalanceByClient());
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('error', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
      dispatch(toggleSecondModalClose('loader'));
    });
};

// ---Report-Issue-Actions-start---
export const createNewIssueReport = (newIssue) => (dispatch) => (
  axios
    .post('/api/reports/client_report_issue', newIssue)
    .then((res) => {
      Notification('success', {
        message: res.data.message,
      });
      fetchWorkOrderById(newIssue.work_order_id)(dispatch);
      return true;
    })
    .catch((error) => dispatch({
      type: GET_ERRORS,
      payload: error,
    }))
);

export const resolveIssueReport = (userType, issueInfo) => (dispatch) => {
  axios
    .patch(`/api/reports/${userType}_issue_resolved`, issueInfo)
    .then((res) => {
      Notification('success', {
        message: res.data.message,
      });
      fetchWorkOrderById(issueInfo.work_order_id)(dispatch);
    })
    .catch((error) => dispatch({
      type: GET_ERRORS,
      payload: error,
    }));
};

export const sendIssueAgain = (issueInfo) => (dispatch) => {
  axios
    .patch('/api/reports/issue_again', issueInfo)
    .then((res) => {
      Notification('success', {
        message: res.data.message,
      });
      fetchWorkOrderById(issueInfo.work_order_id)(dispatch);
    })
    .catch((error) => dispatch({
      type: GET_ERRORS,
      payload: error,
    }));
};

// ---Report-Issue-Actions-end---
export const saveApproveData = (data, fundsRequired = 0) => async (dispatch) => {
  if(fundsRequired >= 1000 && !await confirm(dispatch, fundsRequired))
      return;

  dispatch(toggleModal(true, 'loader', true));
  axios
    .patch('/api/orders/approved-data', data)
    .then((res) => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('success', {
        message: res.data.message,
      });
      dispatch(reloadData());
      dispatch(getAccountBalanceByClient());
      fetchWorkOrderById(data.work_order_id)(dispatch);
    })
    .catch((error) => {
      dispatch(toggleSecondModalClose('loader', true));
      // eslint-disable-next-line no-console
      console.error('error', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error.response?.data,
      });
    });
};

export const approvedWorkOrder = (data, fundsRequired = 0) => async (dispatch) => {
  if(fundsRequired >= 1000 && !await confirm(dispatch, fundsRequired))
    return;
  
  dispatch(toggleModal(true, 'loader', true));
  axios
    .post('/api/users/approved_work_order', data)
    .then((res) => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('success', {
        message: res.data.message,
      });
      dispatch(reloadData());
      dispatch(getAccountBalanceByClient());
      fetchWorkOrderById(data.work_order_id)(dispatch);
    })
    .catch((error) => {
      dispatch(toggleSecondModalClose('loader', true));
      // eslint-disable-next-line no-console
      console.error('error', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error.response?.data,
      });
    });
};

export const approvePayAdjustmentByContractor = (workOrderId) => (dispatch) => {
  axios
    .post('/api/users/approve_pay_adjustment_by_contractor', { work_order_id: workOrderId })
    .then((res) => {
      Notification('success', {
        message: res.data.message,
      });
      fetchWorkOrderById(workOrderId)(dispatch);
    })
    .catch((error) => {
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    });
};

// ---Check-In-Check-Out-start---
export const checkInCheckOutToWorkOrder = (workOrderId, checkInCheckOutId, data) => (dispatch) => {
  dispatch(toggleModal(true, 'loader', true));
  const reqType = checkInCheckOutId ? 'patch' : 'post';
  return axios[reqType](`/api/orders/${workOrderId}/check-in-check-outs${checkInCheckOutId ? `/${checkInCheckOutId}` : ''}`, data)
    .then((res) => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('success', {
        message: res.data.message,
      });
      dispatch(fetchWorkOrderById(workOrderId));
      return true;
    })
    .catch((error) => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('error', {
        message: error.response?.data?.message || `Check ${checkInCheckOutId ? 'Out' : 'In'} failed!`,
      });
      return false;
    });
};

export const deleteCheckInCheckOutData = (workOrderId, checkInCheckOutId) => (dispatch) => {
  dispatch(toggleModal(true, 'loader', true));
  axios
    .delete(`/api/orders/${workOrderId}/check-in-check-outs/${checkInCheckOutId}`)
    .then((res) => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('success', {
        message: res.data.message,
      });
      fetchWorkOrderById(workOrderId)(dispatch);
    })
    .catch((error) => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('error', {
        message: error.response?.data?.message || 'Edit data failed!',
      });
    });
};

export const editCheckInCheckOutData = (data, workOrderId, checkInCheckOutId) => (dispatch) => {
  dispatch(toggleModal(true, 'loader', true));
  return axios.post(`/api/orders/${workOrderId}/check-in-check-outs/${checkInCheckOutId}`, data)
    .then((res) => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('success', {
        message: res.data.message,
      });
      fetchWorkOrderById(workOrderId)(dispatch);
      return true;
    })
    .catch((error) => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('error', {
        message: error.response?.data?.message || 'Edit data failed!',
      });
      return false;
    });
};
// ---Check-In-Check-Out-end---

// ---Upload-Deliverables---
export const uploadDocument = (data) => (dispatch) => {
  dispatch(toggleModal(true, 'loader', true));
  return axios
    .patch('/api/orders/documents', data)
    .then((res) => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('success', {
        message: res.data.message,
      });
      fetchWorkOrderById(data.get('workOrderId'))(dispatch);
      return true;
    })
    .catch((error) => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('error', {
        message: error.response?.data?.message || 'Upload data failed!',
      });
      dispatch({
        type: GET_ERRORS,
        payload: error.response?.data,
      });
    });
};

export const deleteUpload = (link, workOrderId) => (dispatch) => {
  dispatch(toggleModal(true, 'loader', true));
  return axios
    .delete('/api/orders/documents', {
      data: {
        link,
        workOrderId,
      },
    })
    .then((res) => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('success', {
        message: res.data.message,
      });
      fetchWorkOrderById(workOrderId)(dispatch);
      return true;
    })
    .catch((error) => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('error', {
        message: error.response?.data?.message,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error.response?.data,
      });
    });
};
// ---Upload-Deliverables-End---

// ---Expenses---
export const saveExpense = (data) => (dispatch) => (
  axios
    .post('/api/expenses', data)
    .then((res) => {
      Notification('success', {
        message: res.data.message,
      });
      fetchWorkOrderById(data.workOrderId)(dispatch);
      return true;
    })
    .catch((error) => {
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error.response?.data,
      });
      return false;
    })
);

export const editExpense = (data) => (dispatch) => (
  axios
    .patch('/api/expenses', data)
    .then((res) => {
      Notification('success', {
        message: res.data.message,
      });
      fetchWorkOrderById(data.workOrderId)(dispatch);
      return true;
    })
    .catch((error) => {
      Notification('error', {
        message: error.response?.data?.message,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error.response?.data,
      });
    })
);

export const deleteExpense = (id, workOrderId) => (dispatch) => (
  axios
    .delete(`/api/expenses/?id=${id}`)
    .then((res) => {
      Notification('success', {
        message: res.data.message,
      });
      fetchWorkOrderById(workOrderId)(dispatch);
      return true;
    })
    .catch((error) => {
      Notification('error', {
        message: error.response?.data?.message,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error.response?.data,
      });
    })
);
// ---Expenses-End---

export const cancelWorkOrder = data => (dispatch) => (
  axios
    .patch('/api/orders/cancel', data)
    .then((res) => {
      Notification('success', {
        message: res.data.message,
      });
      dispatch(selectWorkOrder([]));
      dispatch(toggleModal(false));
      dispatch(reloadData());
    })
    .catch((error) => {
      Notification('error', {
        message: error.response?.data?.message,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error.response?.data,
      });
    })
);

export const sendContractorRate = (data) => (dispatch) => {
  axios.post('/api/feedback/rating', data)
    .then((res) => {
      if (res.data.success) {
        dispatch(toggleModal(true, 'messageRateModal'));
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

export const deleteWorkOrderDetails = (data, history) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  axios
    .post('/api/users/delete_work_order', data)
    .then(res => {
      Notification('success', {
        message: res.data.message,
      });
      dispatch(toggleModal(false, 'loader'));
      dispatch(selectWorkOrder([]));
      if (history.location.search) history.goBack();
      dispatch(reloadData());
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      // eslint-disable-next-line no-console
      console.error('error', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error.response?.data || error,
      });
    });
};

export const bulkEditWorkOrders = (bulkEditFields) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  axios
    .patch('/api/orders/bulk/edit', bulkEditFields)
    .then(res => {
      const notification = res.data.success ? 'success' : 'error'
      Notification(notification, {
        message: res.data.message,
      });
      dispatch(toggleModal(false, 'loader'));
      dispatch(selectWorkOrder([]));
      dispatch(reloadData());
      dispatch(getAccountBalanceByClient());
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      // eslint-disable-next-line no-console
      console.error('error', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error.response?.data || error,
      });
    });
};

export const assignContractor = (data, contractorId) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  axios
    .patch('/api/client/assigned-work-order', {
      ...data,
      contractorId,
    })
    .then(res => {
      dispatch(toggleModal(false, 'loader'));
      dispatch(selectWorkOrder([]));
      dispatch(reloadData());
      if (res.data.success) return Notification('success', res.data);
      if (res.data.successAssignWorkOrdersCount > 0) {
        Notification('success', res.data);
      }
      return Notification('error', {
        message: res.data.rejected.info.message,
        infoMessageArray: res.data.rejected.info.errorMessages,
      });
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      // eslint-disable-next-line no-console
      console.error('error', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error.response?.data || error,
      });
    });
};

export const unAssignWorkOrder = data => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  axios
    .patch('/api/client/unassigned_work_order', data)
    .then(res => {
      dispatch(toggleModal(false, 'loader'));
      dispatch(selectWorkOrder([]));
      dispatch(reloadData());
      if (res.data.success) return Notification('success', res.data);
      if (res.data.successUnAssignWorkOrdersCount > 0) {
        Notification('success', res.data);
      }
      return Notification('error', {
        message: res.data.rejected.info.message,
        infoMessageArray: res.data.rejected.info.errorMessages,
      });
    })
    .catch(error => {
      console.error('error', error);
      dispatch(toggleSecondModalClose('loader', true));
      Notification('error', { message: error.response?.data?.message || error.message });
      dispatch({
        type: GET_ERRORS,
        payload: error.response?.data || error,
      });
    });
};

export const getWorkOrdersForBulk = (data) => (dispatch) => (
  axios
    .post('/api/orders/bulk', data)
    .then(res => res.data.workOrders)
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error('error', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error.response?.data || error,
      });
    })
);

export const getApplicantsForBulkAssignToWorkOrders = data => (dispatch) => (
  axios
    .post('/api/client/bulk/applicants', data)
    .then(res => res.data?.payload?.contractors)
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error('error', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error.response?.data || error,
      });
    })
);

export const sendInviteFromWorkOrderToContractor = (
  data, stopReloadOnSuccess,
) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  console.log({data})
  return axios
    .post('/api/invites/bulk/work-orders', data)
    .then(res => {
      Notification(
        res.data.success ? 'success' : 'error',
        {
          message: res.data.message,
          infoMessageArray: res.data?.payload?.errorMessages || [],
        },
      );
      dispatch(toggleSecondModalClose('loader', stopReloadOnSuccess));
      dispatch(selectWorkOrder([]));
      if (!stopReloadOnSuccess) dispatch(reloadData());
      dispatch(getAccountBalanceByClient());
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      // eslint-disable-next-line no-console
      console.error('error', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error.response?.data || error,
      });
    });
};

export const sendInvitesFromWorkOrderToContractors = (
  workOrderId, contractorsId, stopReloadOnSuccess,
) => dispatch => {
  if (!contractorsId.length) {
    Notification('warn', { message: 'Can\'t invite zero contractors!' });
    return false;
  }
  dispatch(toggleModal(true, 'loader', true));
  return axios
    .post('/api/invites/bulk/contractors', {
      workOrderId,
      contractorsId,
    })
    .then(res => {
      Notification(
        res.data.success ? 'success' : 'error',
        {
          message: res.data.message,
          infoMessageArray: res.data?.payload?.errorMessages || [],
        },
      );
      dispatch(toggleSecondModalClose('loader', stopReloadOnSuccess));
      if (!stopReloadOnSuccess) dispatch(reloadData());
      dispatch(getAccountBalanceByClient());
      return true;
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      // eslint-disable-next-line no-console
      console.error('error', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error.response?.data || error,
      });
      return false;
    });
};

export const bulkApproveWorkOrders = (data) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  axios
    .post('/api/orders/bulk/approve', data)
    .then(res => {
      dispatch(toggleModal(false, 'loader'));
      dispatch(selectWorkOrder([]));
      dispatch(getAccountBalanceByClient());
      dispatch(reloadData());
      if (res.data.successApprovedWorkOrdersCount > 0) {
        Notification('success', res.data);
      }
      if (!res.data.success) {
        Notification('error', {
          message: res.data.rejected.info.message,
          infoMessageArray: res.data.rejected.info.errorMessages,
        });
      }
    })
    .catch(error => {
      dispatch(toggleModal(false, 'loader'));
      dispatch(selectWorkOrder([]));
      dispatch(getAccountBalanceByClient());
      dispatch(reloadData());
      // eslint-disable-next-line no-console
      console.error('error', error);
      Notification('error', {
        message: `Some work order return with errors:\n${error.response?.data?.message || error.message}`,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error.response?.data || error,
      });
    });
};

export const saveTasks = (workOrderId, tasks) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  return axios.post('/api/tasks', {
    workOrderId,
    tasks,
  })
    .then(() => {
      dispatch(toggleSecondModalClose('loader', true));
    })
    .catch(error => {
      dispatch(reloadData());
      dispatch(toggleSecondModalClose('loader', true));
      console.error('error', error);
      Notification('error', error.response?.data?.message || error.message);
      dispatch({
        type: GET_ERRORS,
        payload: error.response?.data || error,
      });
    });
};

export const submitApply = (
  workOrder,
  formData,
  toggleModal,
  isCounterOffer,
) => dispatch => {
  const {
    basePayBidAmount,
    variablePayBidAmount,
    basicType,
    comment,
    amountExpense,
    descriptionExpense,
    startDate,
    startTime,
  } = formData;

  let contractorApply = {};

  if (!isCounterOffer) {
    contractorApply.isCounterOffer = false;
    contractorApply.workOrderId = workOrder._id;
    contractorApply.comment = comment;
  } else {
    const startDateTime = startDate || new Date(workOrder.startDate);
    const amount = Number(basePayBidAmount || workOrder.amount);
    const variableAmount = Number(variablePayBidAmount || workOrder.variableAmount);
    const expenseAmount = Number(amountExpense);
    if (!amount) {
      return Notification('warning', { message: 'Please enter the bid amount for base pay.' });
    }
    if (
      !comment
          || (parseFloat(workOrder.amount).toFixed(2) !== parseFloat(amount).toFixed(2)
          || parseFloat(workOrder.variableAmount).toFixed(2) !== parseFloat(variableAmount).toFixed(2)) && comment.trim() === ''
    ) {
      return Notification('warning', { message: 'Please add a comment as you changed the bid amount.' });
    }

    // if (!startDateTime) {
    //   return Notification('warning', { message: 'Please select start date.' });
    // }

    if (descriptionExpense && !amountExpense) {
      return Notification('warning', { message: 'Please add amount expense as you added description.' });
    }

    if (amountExpense && !descriptionExpense) {
      return Notification('warning', { message: 'Please add a description as you added amount expense.' });
    }

    contractorApply = {
      workOrderId: workOrder._id,
      basicType,
      bidAmountBase: amount,
      bidAmountVariable: variableAmount || 0,
      comment,
      startDate: combineDateAndTime(startDateTime),
      startTime,
      amountExpense: expenseAmount || undefined,
      descriptionExpense,
      isCounterOffer: true,
    };
  }

  dispatch(toggleModal(true, 'loader', true));
  return axios
    .post('/api/users/apply_work_order', contractorApply)
    .then(res => {
      Notification('success', { message: res.data.message || 'Application Successful!' });
      dispatch(toggleSecondModalClose('loader'));
      dispatch(reloadData());
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      // eslint-disable-next-line no-console
      console.error('apply_work_order error: ', error);
      Notification('error', { message: error.response?.data?.message || error.message });
    });
};

export const changeCustomField = data => dispatch => {
  axios
    .patch('/api/contractor/custom-field-value', data)
    .then(res => {
      Notification('success', res.data);
    })
}
export const acceptInvite = data => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  axios
    .patch('/api/contractor/invites/accept', data)
    .then(res => {
      dispatch(toggleSecondModalClose('loader'));
      dispatch(selectWorkOrder([]));
      dispatch(reloadData());
      if (res.data?.success) return Notification('success', res.data);
      if (res.data?.payload?.successAssignWorkOrdersCount > 0) {
        Notification('success', res.data);
      }
      return Notification('error', {
        message: res.data?.payload?.rejected?.info?.message,
        infoMessageArray: res.data?.payload?.rejected?.info?.errorMessages,
      });
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      console.error('error: ', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};

export const confirmWorkOrder = workOrdersId => dispatch => {
  axios.patch('/api/orders/confirm', { workOrdersId })
    .then(res => {
      Notification('success', {
        message: res.data.message,
      });
      dispatch(reloadData());
    })
    .catch(error => {
      console.error('error: ', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};

export const copyWorkOrder = (workOrderId, copyCount) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  axios.post('/api/users/copy_work_order',
    {
      work_order_id: workOrderId,
      no_count: copyCount,
    })
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

export const sendRecruitMail = (workOrderId) => dispatch => {
  axios.post('/api/orders/send-recruits-mail', { workOrderId })
    .then(res => {
      Notification('success', {
        message: res.data.message,
      });
      dispatch(reloadData());
    })
}

export const unRouteWorkOrder = (
  workOrderId,
  contractorId,
  // message,
) => dispatch => {
  const data = {
    workOrderId,
    contractorId,
    // reason: message,
  };
  dispatch(toggleModal(true, 'loader', true));
  axios
    .post('/api/orders/un-routed', data)
    .then(res => {
      dispatch(toggleSecondModalClose('loader'));
      Notification('success', res.data);
      dispatch(reloadData());
    }).catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      console.error('error: ', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};

export const cancelApplication = (workOrderId) => dispatch => {
  const data = {
    work_order_id: workOrderId,
  };
  axios
    .post('/api/users/cancel_application', data)
    .then(res => {
      dispatch(toggleSecondModalClose('loader'));
      Notification(res.data.success ? 'success' : 'error', {
        message: res.data.message,
      });
      dispatch(reloadData());
    }).catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      console.error('error: ', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};

export const addWorkOrderProjectOrCompany = (linkName, name) => dispatch => {
  const data = { name };
  dispatch(toggleModal(true, 'loader', true));
  return axios
    .post(`/api/${linkName}`, data)
    .then(res => {
      dispatch(toggleSecondModalClose('loader'));
      Notification('success', res.data);
      return res.data;
    }).catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      console.error('error: ', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
      return error;
    });
};

export const editWorkOrderProjectOrCompany = (linkName, id, name) => dispatch => {
  const data = {
    name,
    id,
  };
  dispatch(toggleModal(true, 'loader', true));
  return axios
    .patch(`/api/${linkName}`, data)
    .then(res => {
      dispatch(toggleSecondModalClose('loader'));
      Notification('success', res.data);
      return res.data;
    }).catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      console.error('error: ', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};

export const deleteWorkOrderProjectOrCompany = (linkName, id) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  return axios
    .delete(`/api/${linkName}/?id=${id}`)
    .then(res => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('success', res.data);
      return res.data;
    }).catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      console.error('error: ', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};

export const fetchCountries = () => async dispatch => {
  try {
    dispatch(toggleModal(true, 'loader', true));
    const response = await axios.get('/api/address/getAllCountries');
    dispatch(toggleSecondModalClose('loader', true));
    return response.data;
  } catch (error) {
    dispatch(toggleSecondModalClose('loader', true));
    console.error('error: ', error);
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
    return [];
  }
};

export const fetchStatesOfCountry = (countryId) => async dispatch => {
    try {
        dispatch(toggleModal(true, 'loader', true));

        const response = await axios.get('/api/address/getStatesOfCountry');
        const countries = response.data?.payload?.states || [];

        const country = countries.find(c => c.label === countryId || c.label.toUpperCase() === countryId.toUpperCase());

        const states = country?.options || [];

        console.log(states);
        dispatch(toggleSecondModalClose('loader', true));

        return states;

    } catch (error) {
        dispatch(toggleSecondModalClose('loader', true));
        console.error('error: ', error);
        Notification('error', {
            message: error.response?.data?.message || error.message,
        });
        return [];
    }
};



export const createWorkOrder = (data, history, pathname) => async dispatch => {
  const payload = JSON.parse(data.get('values'))
  const fundsRequired = calculateFundsRequiredSum(payload)


  if(fundsRequired >= 1000 && !await confirm(dispatch, fundsRequired))
    return;

  dispatch(toggleModal(true, 'loader', true));
  axios.post('/api/orders', data)
    .then((res) => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('success', res.data);
      dispatch(toggleModal(false, 'viewDetailsWorkOrderModal'));
      dispatch(reloadData());
      history.push(pathname);
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('error', {
        message: error.response?.data?.message || error.message || 'Upload data failed!',
      });
    });
};

export const editWorkOrderDetails = (data, history, pathname) => async dispatch => {
  const payload = JSON.parse(data.get('values'))
  const fundsRequired = calculateFundsRequiredSum(payload)


  if(fundsRequired >= 1000 && !await confirm(dispatch, fundsRequired))
    return;

  dispatch(toggleModal(true, 'loader', true));
  axios.patch('/api/orders', data)
    .then(() => {
      dispatch(toggleSecondModalClose('loader', true));
      dispatch(reloadData());
      Notification('success', {
        message: 'Edit Work Order Successfully',
      });
      history.push(pathname);
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('error', {
        message: error.response?.data?.message || error.message || 'Upload data failed!',
      });
    });
};

// eslint-disable-next-line consistent-return
export const exportWorkOrders = (data, userType) => dispatch => {
  if (!data?.workOrdersId?.length && !data.filters) {
    return Notification('warning', {
      message: 'Please select any work order to export',
    });
  }
  dispatch(toggleModal(true, 'loader', true));
  const link = userType === 'superAdmin'
    ? '/api/admin/export/work-orders'
    : `/api/orders/export/${userType}s`;
  axios
    .post(link, data)
    .then(res => {
      if (res.data.success) {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(new Blob([res.data.file], { type: 'text/csv' }));
        link.href = url;
        link.setAttribute('download', 'file.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        Notification('error', {
          message: res.data.message,
        });
      }
      dispatch(toggleModal(false, 'loader'));
      dispatch(selectWorkOrder([]));
    })
    .catch(error => {
      dispatch(toggleModal(false, 'loader'));
      // eslint-disable-next-line no-console
      console.error('error', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};

export const payForWorkOrders = data => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  axios
    .patch('/api/orders/paid', data)
    .then(res => {
      dispatch(toggleSecondModalClose('loader'));
      dispatch(selectWorkOrder([]));
      dispatch(reloadData());
      if (res.data?.success) return Notification('success', res.data);
      if (res.data?.payload?.successWorkOrdersCount > 0) {
        Notification('success', res.data);
      }
      return Notification('error', {
        message: res.data?.payload?.rejected?.info?.message,
        infoMessageArray: res.data?.payload?.rejected?.info?.errorMessages,
      });
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      console.error('error: ', error);
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    });
};

export const setCurrentTemplate = template => ({
  type: SET_CURRENT_TEMPLATE,
  payload: template,
});

export const fetchWorkOrderTemplateById = (templateId) => (dispatch) => (
  axios.get(`/api/templates/${templateId}`)
    .then(res => {
      const { template } = res.data.payload;
      dispatch(setCurrentTemplate(template));
    })
    .catch(error => {
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
    })
);

export const createWorkOrderTemplate = (data, history, isAwaitReturn) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  return axios
    .post('/api/templates', data)
    // eslint-disable-next-line consistent-return
    .then((res) => {
      dispatch(toggleSecondModalClose('loader'));
      Notification('success', res.data);
      if (isAwaitReturn) return res?.data?.payload?.newDocument?._id;
      dispatch(reloadData());
      history.push('/templates');
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader'));
      Notification('error', {
        message: error.response?.data?.message || error.message || 'Upload data failed!',
      });
      return false;
    });
};

export const editWorkOrderTemplate = (data, history) => dispatch => {
  dispatch(toggleModal(true, 'loader'));
  axios.patch('/api/templates', data)
    .then(res => {
      dispatch(toggleSecondModalClose('loader'));
      dispatch(reloadData());
      Notification('success', res.data);
      history.push('/templates');
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader'));
      Notification('error', {
        message: error.response?.data?.message || error.message || 'Upload data failed!',
      });
    });
};

export const renameWorkOrderTemplate = (name, id) => dispatch => {
  dispatch(toggleModal(true, 'loader'));
  axios.patch('/api/templates/rename', { name, id })
    .then(res => {
      dispatch(toggleSecondModalClose('loader'));
      dispatch(reloadData());
      Notification('success', res.data);
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader'));
      Notification('error', {
        message: error.response?.data?.message || error.message || 'Rename failed!',
      });
    });
};

export const deleteWorkOrderTemplate = id => dispatch => {
  dispatch(toggleModal(true, 'loader'));
  axios.delete(`/api/templates?id=${id}`)
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

export const copyWorkOrderTemplate = (name, id) => dispatch => {
  dispatch(toggleModal(true, 'loader'));
  axios.patch('/api/templates/copy', { name, id })
    .then(res => {
      dispatch(toggleSecondModalClose('loader'));
      dispatch(reloadData());
      Notification('success', res.data);
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader'));
      Notification('error', {
        message: error.response?.data?.message || error.message || 'Rename failed!',
      });
    });
};

export const createWorkOrderTemplateByWorkOrder = (name, id) => dispatch => {
  dispatch(toggleModal(true, 'loader'));
  axios.patch('/api/templates/copy/work-order', { name, id })
    .then(res => {
      dispatch(toggleSecondModalClose('loader'));
      dispatch(reloadData());
      Notification('success', res.data);
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader'));
      Notification('error', {
        message: error.response?.data?.message || error.message || 'Rename failed!',
      });
    });
};

export const createCustomField = (name) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  return axios.post('/api/orders/custom-fields', { name })
    .then(res => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification(res.data.success ? 'success' : 'warning', {
        message: res.data.message,
      });
      dispatch(reloadData());
      return res.data;
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
      return error.response?.data || error;
    });
};
export const createApprovalCode = (name, required) => dispatch => {
  dispatch(toggleModal(true, 'loader', true));
  return axios.post('/api/orders/client-approval-codes', { name, required })
    .then(res => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification(res.data.success ? 'success' : 'warning', {
        message: res.data.message,
      });
      dispatch(reloadData());
      return res.data;
    })
    .catch(error => {
      dispatch(toggleSecondModalClose('loader', true));
      Notification('error', {
        message: error.response?.data?.message || error.message,
      });
      return error.response?.data || error;
    });
};

const confirm = async (dispatch, fundsRequired) => {
  const message = `This work order is being posted for $${fundsRequired}! Do you wish to continue?`

  return new Promise((resolve) => dispatch(toggleModal(true, 'confirmModal', true, {
    onAccept: () => resolve(true),
    header: message,
    buttonLabels: {
      reject: 'No',
      confirm: 'Yes'
    },
  })))
}