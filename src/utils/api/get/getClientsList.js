// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const getClientsList = async () => {
  try {
    const response = await axios.get('/api/client/list');
    return response.data?.data || [];
  } catch (error) {
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
    return [];
  }
};

export default getClientsList;
