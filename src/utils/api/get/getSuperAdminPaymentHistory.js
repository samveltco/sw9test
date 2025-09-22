// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const getSuperAdminPaymentHistory = async (sortBy) => {
  try {
    const response = await axios.get('/api/dwolla/history', {
      params: {
        sortBy: sortBy?.value,
        sortDirection: sortBy.direction,
      },
    });
    return response.data?.payload?.payments || [];
  } catch (error) {
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
    return [];
  }
};

export default getSuperAdminPaymentHistory;
