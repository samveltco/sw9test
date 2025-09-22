// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';


const getContractorsList = async () => {
  try {
    const response = await axios.get('/api/users/contractors');
    return response.data.contractors.map((contractor) => (
      {
        value: contractor,
        label: `${contractor.name} - ${contractor.unique_id} - ${contractor.address || '!?ADDRESS!?'}, ${contractor.city?.label || '!?CITY!?'}, ${contractor.state?.label || '!?STATE!?'} ${contractor.zipcode || '!?ZIPCODE!?'}`,
      }
    )) || []
  } catch (error) {
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
    return [];
  }
};

export default getContractorsList;
