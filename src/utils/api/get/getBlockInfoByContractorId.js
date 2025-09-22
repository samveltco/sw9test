// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const getBlockInfoByContractorId = contractorId => (
  axios.get(`/api/client/contractors/${contractorId}/block`)
    .then(res => {
      if (res.data.success) return res.data.blockInfo;
      return {};
    })
    .catch(error => {
      console.error(error);
      Notification('error', { message: error.response?.data?.message || error.message });
    })
);

export default getBlockInfoByContractorId;
