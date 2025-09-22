// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const getClients = async () => {
  try {
    const response = await axios.get('/api/users/get-clients');
    return response.data?.clients || [];
  } catch (error) {
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
    return [];
  }
};

export default getClients;
