// ©2024 Austin App House. All rights reserved.
import React from 'react';
// import { MDBCol } from 'mdbreact';
import { Field } from 'redux-form';
import InputField from '../../customFields/InputField';
import ProjectAndCompanyField from './projectAndCompanyField';
// import ControlElement from '../../../ControlElement';

const MarksSection = ({
  toggleModal,
  hideElements = {},
  requirements,
}) => (
  <>
    {/* <ControlElement hide={hideElements?.customTagId}>
      <div>
        <Field
          name="customTagId"
          component={InputField}
          type="text"
          placeholder="Company WO ID"
          label="Company WO ID"
          required={requirements !== 'disabled'}
          className="flex-column font-size-08"
          inputClassName="form-control custom-input-style"
        />
      </div>
    </ControlElement> */}
    <div>
      <Field
        name="title"
        component={InputField}
        type="text"
        placeholder="Title"
        label="Title"
        required={requirements !== 'disabled'}
        className="flex-column font-size-08"
        inputClassName="form-control custom-input-style"
      />
    </div>
    <ProjectAndCompanyField
      name="projectInfo"
      label="Project"
      linkName="projects"
      addButtonLabel="Create Project"
      toggleModal={toggleModal}
      className="font-size-08"
    />
    <ProjectAndCompanyField
      name="woCompanyInfo"
      label="Company"
      linkName="wo-companies"
      addButtonLabel="Add Company"
      toggleModal={toggleModal}
      className="font-size-08"
    />
  </>
);

export default MarksSection;
