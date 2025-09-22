// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const getCertificationTests = (certificationTypeId, history) => (
  axios.get(`/api/certificates/${certificationTypeId}/tests`)
    .then(res => {
      if (res.data.success) return res.data?.payload?.testInfo || {};
      Notification('warning', { message: res.data.message });
      history.push('/certifications');
      return {};
    })
    .catch(error => {
      Notification('error', { message: error.response?.data?.message || error.message });
      history.push('/certifications');
      return {};
    })
);

export default getCertificationTests;
