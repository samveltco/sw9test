// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const getContractorDetails = contractorId => (
  axios.get(`/api/client/contractors/${contractorId}`)
    .then(res => (res.data.success ? res.data.payload?.contractorDetails : {}))
    .catch(error => {
      Notification('error', { message: error.response?.data?.message || error.message });
      return {};
    })
);

export default getContractorDetails;
