import React from 'react';
import { Field } from 'redux-form';
import InputField from '../layout/reduxForm/customFields/InputField';
import SelectField from '../layout/reduxForm/customFields/SelectField';

const MarksSection = () => (
  <div className="fields_group">
    <div className="field_col">
      <label className="field_name" htmlFor="company_wo_id">Company WO ID*</label>
      <div className="field_block">
        <Field
          component={InputField}
          type="text"
          name="customTagId"
          id="company_wo_id"
          maxLength={50}
          placeholder="Company WO ID"
        />
      </div>
    </div>
    <div className="field_col">
      <label className="field_name" htmlFor="title">Title</label>
      <div className="field_block">
        <Field
          component={InputField}
          type="text"
          name="title"
          id="title"
          maxLength={50}
          placeholder="Title"
        />
      </div>
    </div>
    <div className="field_col">
      <label className="field_name" htmlFor="project">Select Project <button aria-label="Create Project">Create Project</button></label>
      <div className="field_block">
        <Field
          component={SelectField}
          name="project"
          id="project"
          options={[
            { value: '1', label: 'Value 1' },
            { value: '2', label: 'Value 2' },
            { value: '3', label: 'Value 3' },
            { value: '4', label: 'Value 4' },
          ]}
        />
      </div>
    </div>
    <div className="field_col">
      <label className="field_name" htmlFor="company">Select Company <button aria-label="Create Company">Create Company</button></label>
      <div className="field_block">
        <Field
          component={SelectField}
          name="company"
          id="company"
          options={[
            { value: '1', label: 'Value 1' },
            { value: '2', label: 'Value 2' },
            { value: '3', label: 'Value 3' },
            { value: '4', label: 'Value 4' },
          ]}
        />
      </div>
    </div>
  </div>
);

export default MarksSection;