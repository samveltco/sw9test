// ©2024 Austin App House. All rights reserved.
import Notification from '../../../components/notification';

const validateTeam = (values) => {
  const result = {};

  if (!values.name.trim()) {
    result.name = 'Name field is empty';
    Notification('error', {
      message: 'Please enter name!',
    });
  }

  if (values.name?.length > 35) {
    result.name = 'Name is longer than maximum allowed length (35)';
    Notification('error', {
      message: 'Name is longer than maximum allowed length (35)',
    });
  }

  if (!values.members.length > 0) {
    result.members = 'There must be at least one member';
    Notification('error', {
      message: 'There must be at least one member',
    });
  }

  return result;
};

export default validateTeam;
