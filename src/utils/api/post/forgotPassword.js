// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const forgotPassword = async (email, sms) => {
  try {
    const res = await axios.post('/api/auth/forgot_password', {
      email,
      sms
    });

    Notification(res.data.success ? 'success' : 'warning', {
      message: res.data.message,
    });

    return res.data.success;
  } catch (error) {
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
    return false;
  }
};

export default forgotPassword;
