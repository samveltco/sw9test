// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const getApprovalCodesList = async () => {
  try {
    const response = await axios.get('/api/orders/client-approval-codes');
    return response.data?.payload?.approvalCodes || [];
  } catch (error) {
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
    return [];
  }
};

export default getApprovalCodesList;
