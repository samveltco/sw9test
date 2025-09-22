// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const getGroup = async (groupId) => {
  try {
    const response = await axios.get(`/api/contractor-groups/${groupId}`);
    return response.data?.group || {};
  } catch (error) {
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
    return {};
  }
};

export default getGroup;
