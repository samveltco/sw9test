// ©2024 Austin App House. All rights reserved.
import axios from 'axios';

const getTemplatesList = async () => {
  try {
    const response = await axios.get('/api/templates/list');
    return response.data?.payload?.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getTemplatesList;
