// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const getCompaniesList = async (sortBy) => {
  try {
    const response = await axios.get('/api/admin/companies', {
      params: {
        sortBy: sortBy?.value,
        sortDirection: sortBy.direction,
      },
    });
    return response.data?.payload?.companies || [];
  } catch (error) {
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
    return [];
  }
};

export default getCompaniesList;
