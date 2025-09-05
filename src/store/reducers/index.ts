// ©2024 Austin App House. All rights reserved.
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import workOrderReducer from './workOrdersReducer';
import modal from './modalReducer';
import applicationStateReducer from './applicationStateReducer';
import messageReducer from './messageReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  errors: errorReducer,
  workOrder: workOrderReducer,
  modalState: modal,
  applicationState: applicationStateReducer,
  messagesCount: messageReducer,
  form: formReducer,
});
