// ©2024 Austin App House. All rights reserved.
import {
  SET_CURRENT_WORK_ORDER,
  SET_APPLICANTS_FOR_CURRENT_WORK_ORDER,
  SET_ROUTED_FOR_CURRENT_WORK_ORDER, SET_CURRENT_APPLICANTS,
  FETCH_AVAILABLE_APPLICANTS,
  SET_LOADED_STATUS,
  SUBMIT_WORK_ORDER,
  SET_WORK_ORDER_FILTERS,
  SET_WORK_ORDER_SORT_BY,
  SET_WORK_ORDER_SEARCH,
  SET_CURRENT_TEMPLATE,
  SET_IS_DOWNLOAD_DOCUMENTS,
  SET_WORK_ORDER_SEARCH_RANGE
} from '../actions/types';

const initialState = {
  loaded: false,
  applicants: null,
  routedApplicants: null,
  currentApplicant: null,
  availableApplicants: null,
  submitWorkOrderInProcess: false,
  documentsDownloadInProcess: false,
  filters: {},
  sortBy: {
    sortType: 'startDate',
    order: 1,
  },
  searchData: {
    search: '',
    search_zip: '',
    range: 60,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADED_STATUS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_IS_DOWNLOAD_DOCUMENTS:
      return {
        ...state,
        documentsDownloadInProcess: action.payload,
      };
    case SET_CURRENT_WORK_ORDER:
      return {
        ...state,
        currentWorkOrder: action.payload,
        currentWorkOrderLoaded: true,
      };
    case SET_APPLICANTS_FOR_CURRENT_WORK_ORDER:
      return {
        ...state,
        applicants: action.payload,
        applicantsLoaded: true,
      };
    case SET_ROUTED_FOR_CURRENT_WORK_ORDER:
      return {
        ...state,
        routedApplicants: action.payload,
        routedApplicantsLoaded: true,
      };
    case SET_CURRENT_APPLICANTS:
      return {
        ...state,
        currentApplicant: action.payload,
        currentApplicantLoaded: true,
      };
    case FETCH_AVAILABLE_APPLICANTS:
      return {
        ...state,
        availableApplicants: action.payload,
        availableApplicantsLoaded: true,
      };
    case SUBMIT_WORK_ORDER:
      return {
        ...state,
        submitWorkOrderInProcess: action.payload,
      };
    case SET_WORK_ORDER_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case SET_WORK_ORDER_SORT_BY:
      return {
        ...state,
        sortBy: {
          ...state.sortBy,
          ...action.payload,
        },
      };
    case SET_WORK_ORDER_SEARCH:
      return {
        ...state,
        searchData: action.payload,
      };
    case SET_WORK_ORDER_SEARCH_RANGE:
      return {
        ...state,
        searchData: {...state.searchData, range: action.payload},
      };
    case SET_CURRENT_TEMPLATE:
      return {
        ...state,
        currentTemplate: action.payload,
      };
    default:
      return state;
  }
}
