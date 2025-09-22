// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

export const getStatus = (params) => {
  switch (params) {
    case 'upcoming-work':
      return { status: 'assigned' };
    case 'routed':
      return { status: 'routed' };
    case 'applied':
      return { applied_status: 'apply' };
    case 'completed':
      return { status: 'completed' };
    case 'approved':
      return { status: 'approved' };
    case 'draft':
      return { status: 'draft' };
    case 'available':
      return { status: 'published' };
    case 'assigned':
      return { status: 'assigned' };
    case 'paid':
      return { status: 'paid' };
    default:
      return { status: '' };
  }
};

export default async (currentPage, perPage, params, search, filters, sortBy, userType) => {
  try {
    const response = await axios.post(`/api/${
      userType === 'superAdmin' ? 'admin' : 'orders'
    }/work-orders`, {
      ...getStatus(params),
      ...search,
      currentPage,
      perPage,
      filters,
      sortBy,
    });
    return response.data.Work_Order || [];
  } catch (error) {
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
    return [];
  }
};
