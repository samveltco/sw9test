// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const getFundingSourcesList = async (status = 'verified') => {
  try {
    const response = await axios.get('/api/dwolla/funding-sources', {
      params: { status },
    });
    return response.data?.payload?.fundingSources || [];
  } catch (error) {
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
    return [];
  }
};

export default getFundingSourcesList;
