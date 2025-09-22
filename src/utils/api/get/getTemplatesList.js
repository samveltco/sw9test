// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const getTemplatesList = async () => {
  try {
    const response = await axios.get('/api/templates/list');
    return response.data?.payload?.data || [];
  } catch (error) {
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
    return [];
  }
};

export default getTemplatesList;
