// ©2024 Austin App House. All rights reserved.
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';
import { withRouter } from 'withroute';
import { MDBCol } from 'mdbreact';
import SectionContainer from '../SectionContainer';
import PayInfoSection from '../../createWorkOrderTemplate/formFields/payInfoSection';
import MarksSection from './section/workOrder/MarksSection';
import CustomFieldsSection from './section/workOrder/customFieldsSection';
import TasksSection from './section/workOrder/tasksSection';
import WorkOrderWorkTypesSection from './section/workOrder/WorkTypesSection';
import EditorField from './customFields/EditorField';
import ContactInfoSection from './section/workOrder/ContactInfoSection';
import UploadDocumentsSection from './section/workOrder/uploadDocumentsSection';
import ControlButtons from '../../createWorkOrderTemplate/formFields/ControlButtons';
import { toggleModal } from '../../../storage/actions/modalsActions';
import Notification from '../../notification';
import defaultInitialValues from '../../../utils/reduxForm/InitialValues/createWorkOrderTemplate';
import TimeSection from '../../createWorkOrderTemplate/formFields/TimeSection';
import InputField from './customFields/InputField';
import TeamSection from '../../createWorkOrder/formFields/TeamSection';
import ClientApprovalCodeSection from './section/workOrder/clietnApprovalSection';

let CreateWorkOrderTemplateReduxForm = ({
  handleSubmit,
  error,
  toggleModal,
  history,
}) => {
  useEffect(() => {
    if (error) Notification('error', { message: error });
  }, [error]);

  const preventSubmitOnEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <Form onSubmit={handleSubmit} onKeyPress={preventSubmitOnEnter}>
      <SectionContainer>
        <MDBCol className="flex-grow-0" style={{ minWidth: 'max-content' }}>
          <Field
            required
            name="name"
            component={InputField}
            type="text"
            placeholder="Template Name"
            label="Name"
            className="font-size-08"
            inputClassName="form-control custom-input-style"
            labelClassName="padding-right-10"
          />
        </MDBCol>
        <PayInfoSection />
        <MarksSection
          toggleModal={toggleModal}
          hideElements={{ customTagId: true }}
          requirements="disabled"
        />
        <CustomFieldsSection
          toggleModal={toggleModal}
        />
        <TasksSection />
        <ClientApprovalCodeSection toggleModal={toggleModal}/>
        <TimeSection />
        <MDBCol className="flex-grow-0" style={{ minWidth: 'max-content' }}>
          <Field
            name="siteName"
            component={InputField}
            type="text"
            placeholder="Site Name"
            label="Site Name"
            className="flex-column font-size-08"
            inputClassName="form-control custom-input-style"
          />
        </MDBCol>
        <WorkOrderWorkTypesSection requirements="disabled" />
        <Field
          component={EditorField}
          label="Work Description"
          name="description"
          className="flex-column"
        />
        <Field
          component={EditorField}
          label="Tools Required"
          name="customTools"
          className="flex-column"
        />
        <Field
          component={EditorField}
          label="Confidential Information"
          name="confidential"
          className="flex-column"
        />
        <TeamSection formName="createWorkOrderTemplateReduxForm" />
        <ContactInfoSection requirements="disabled" />
        <UploadDocumentsSection 
          toggleModal={toggleModal}
          formName="createWorkOrderTemplateReduxForm"
          documentVisibility={{}}
        />
      </SectionContainer>
      <ControlButtons
        history={history}
      />
    </Form>
  );
};

CreateWorkOrderTemplateReduxForm = reduxForm({
  form: 'createWorkOrderTemplateReduxForm',
})(CreateWorkOrderTemplateReduxForm);

const mapDispatchToProps = {
  toggleModal,
};

const mapStateToProps = state => ({
  currentTemplate: state.workOrder.currentTemplate,
  initialValues: state.workOrder.currentTemplate?.templateId
    ? state.workOrder.currentTemplate
    : defaultInitialValues,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CreateWorkOrderTemplateReduxForm));
