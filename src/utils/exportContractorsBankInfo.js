// ©2024 Austin App House. All rights reserved.
import fileDownload from 'js-file-download';
import axios from 'axios';
import Notification from '../components/notification';

const exportContractorsBankInfo = async () => {
  await axios.get('/admin/contractors/bankinfo/export', {
    responseType: 'blob',
  }).then((res) => {
    fileDownload(res.data, 'bankInfo.xlsx');
  }).catch((error) => {
    Notification('error', { message: error.response?.data?.message || error.message });
  });
};

export default exportContractorsBankInfo;
