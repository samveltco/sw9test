// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

export default async (search, filters, userType, activeTab = '') => {
  try {
    const response = await axios.post(`/api/${
      userType === 'superAdmin' ? 'admin' : 'orders'
    }/get_work_order_count_by_tabs`, {
      ...search,
      filters,
      activeTab
    });
    return response.data || {};
  } catch (error) {
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
    return {};
  }
};
