// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const varifyEmail = async (verify) => {
  try {
    const res = await axios.post('/api/auth/verify_email', {
      verify,
    });

    Notification(res.data.success ? 'success' : 'warning', {
      message: res.data.message,
    });

    return { success: res.data.success, email: res.data.payload.email };
  } catch (error) {
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
    return { success: false };
  }
};

export default varifyEmail;
