// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const getCustomFieldsList = async (name) => {
  try {
    const response = await axios.get('/api/orders/custom-fields', {
      params: {
        name: name || '',
      },
    });
    return response.data?.payload?.customFields || [];
  } catch (error) {
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
    return [];
  }
};

export default getCustomFieldsList;
