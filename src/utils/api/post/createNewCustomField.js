// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const createNewCustomField = async name => {
  try {
    const res = await axios.post('/api/orders/custom-fields', {
      name,
    });

    Notification(res.data.success ? 'success' : 'warning', {
      message: res.data.message,
    });

    return {
      success: res.data.success,
      message: res.data.message,
    };
  } catch (error) {
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export default createNewCustomField;
