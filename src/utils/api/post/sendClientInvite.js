// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const sendClientInvite = async clientInfo => {
  try {
    const res = await axios.post('/api/users/sendInviteToClientUser', {
      ...clientInfo,
    });

    Notification(res.data.success ? 'success' : 'warning', {
      message: res.data.message,
    });

    return res.data;
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

export default sendClientInvite;
