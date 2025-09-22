// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const getContractorCertificates = async () => {
  try {
    const response = await axios.get('/api/contractor/certificates');
    return response.data?.payload || [];
  } catch (error) {
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
    return [];
  }
};

export default getContractorCertificates;
