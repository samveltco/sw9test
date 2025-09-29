import React, { useEffect, useState } from 'react';
import CustomSelect from '../layout/reduxForm/customFields/ReactSelectField';
import { Field } from 'redux-form';
import axios from 'axios';

const WorkTypeSection = ({ onChange }) => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    axios.get('/api/users/fetch_tools_detail')
      .then((res) => {
        setTools(res.data.tools.map((item) => ({
          label: item.title,
          // eslint-disable-next-line no-underscore-dangle
          value: item._id,
          item,
        })));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('error', error);
      });
    return () => onChange([]);
  }, []);

  return (
    <div className="fields_group">
    <div className="field_col">
      <label className="field_name" htmlFor="work_type">Work Type*</label>
      <Field name="work_type" id="work_type" component={CustomSelect} options={tools} />
    </div>
  </div>
  );
};

export default WorkTypeSection;