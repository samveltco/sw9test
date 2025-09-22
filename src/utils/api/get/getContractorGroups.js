// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const getContractorGroups = async () => {
  try {
    const response = await axios.get('/api/contractor-groups');
    return response.data?.contractorGroups || [];
  } catch (error) {
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
    return [];
  }
};

export default getContractorGroups;
