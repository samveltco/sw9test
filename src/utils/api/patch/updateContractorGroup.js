// ©2024 Austin App House. All rights reserved.
import axios from 'axios';
import Notification from '../../../components/notification';

const updateGroup = async values => {
  try {
    const res = await axios.patch('api/contractor-groups/update', {
      name: values.name,
      usersIds: values.contractorIds,
      groupId: values._id,
    });

    Notification(res.data.success ? 'success' : 'warning', {
      message: res.data.message,
    });
    return {
      success: res.data.success,
      message: res.data.message,
    };
  } catch (error) {
    Notification('error', {
      message: error.response?.data?.message || error.message,
    });
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export default updateGroup;
