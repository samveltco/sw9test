// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const getCompanyMembers = () => (
  axios.get('/api/users/get-clients')
    .then(res => {
      if (res.data.success) return res.data.clients || [];
      return [];
    })
    .catch(error => {
      console.error(error);
      Notification('error', { message: error.response?.data?.message || error.message });
    })
);

export default getCompanyMembers;
