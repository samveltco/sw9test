// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const getCertificateInfo = cetificateTypeId => (
  axios.get(`/api/certificates/${cetificateTypeId}/video`)
    .then(res => {
      if (res.data.success) return res.data.payload;
      Notification('warning', { message: res.data.message });
      return {};
    })
    .catch(error => {
      Notification('error', { message: error.response?.data?.message || error.message });
      return {};
    })
);

export default getCertificateInfo;
