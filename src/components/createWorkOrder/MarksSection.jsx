import React from 'react';
import { Field } from 'redux-form';
import InputField from '../layout/reduxForm/customFields/InputField';
import SelectField from '../layout/reduxForm/customFields/ReactSelectField';

const MarksSection = ({ projects, companies }) => (
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
        <Field
          component={SelectField}
          name="projectInfo"
          id="project"
          options={projects}
        />
    </div>
    <div className="field_col">
      <label className="field_name" htmlFor="company">Select Company <button aria-label="Create Company">Create Company</button></label>
        <Field
          component={SelectField}
          name="woCompanyInfo"
          id="woCompanyInfo"
          options={companies}
        />
    </div>
  </div>
);

export default MarksSection;