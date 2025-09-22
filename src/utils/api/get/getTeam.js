// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const getTeam = async (teamId) => {
  try {
    const response = await axios.get(`/api/teams/${teamId}`);
    return response.data?.team || {};
  } catch (error) {
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
    return {};
  }
};

export default getTeam;
