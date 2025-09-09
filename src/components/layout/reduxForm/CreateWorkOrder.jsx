// ©2024 Austin App House. All rights reserved.
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import SectionContainer from '../SectionContainer';
import PayInfoSection from '../../createWorkOrder/formFields/payInfoSection';
import MarksSection from './section/workOrder/MarksSection';
import CustomFieldsSection from './section/workOrder/customFieldsSection';
import TasksSection from './section/workOrder/tasksSection';
import DateSection from '../../createWorkOrder/formFields/DateSection';
import SiteInfoSection from '../../createWorkOrder/formFields/SiteInfoSection';
import AddressSection from '../../createWorkOrder/formFields/AddressSection';
import WorkOrderWorkTypesSection from './section/workOrder/WorkTypesSection';
import EditorField from './customFields/EditorField';
import ContactInfoSection from './section/workOrder/ContactInfoSection';
import UploadDocumentsSection from './section/workOrder/uploadDocumentsSection';
import CreateTemplateSection from './section/workOrder/CreateTemplateSection';
import ControlButtonsForCreateAndEditWorkOrder from '../../createWorkOrder/formFields/ControlButtonsForCreateAndEditWorkOrder';
import { toggleModal } from '../../../storage/actions/modalsActions';
import Notification from '../../notification';
import defaultInitialValues from '../../../utils/reduxForm/InitialValues/createWorkOrderReduxForm';
import TeamSection from '../../createWorkOrder/formFields/TeamSection';
import RemoteWFHSection from '../../createWorkOrder/formFields/Remote-WFHSection';
import ClientApprovalCodeSection from './section/workOrder/clietnApprovalSection';

let CreateWorkOrderReduxForm = ({
  handleSubmit,
  error,
  toggleModal,
  history,
  currentWorkOrder,
  templateId,
  anyTouched,
  setTouched,
}) => {
  useEffect(() => {
    setTouched(anyTouched);
  }, [anyTouched]);

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
        <PayInfoSection isWorkOrderAssigned={currentWorkOrder?.status === 'assigned'} />
        <MarksSection
          toggleModal={toggleModal}
        />
        <CustomFieldsSection
          toggleModal={toggleModal}
        />
        <TasksSection />
        <ClientApprovalCodeSection toggleModal={toggleModal}/>
        <DateSection />
        <SiteInfoSection />
        <AddressSection />
        <div className='ml-3'>- OR -</div>
        <RemoteWFHSection />
        <WorkOrderWorkTypesSection />
        <Field
          component={EditorField}
          label="Work Description"
          required
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
          label="Confidential Information: (Shown ONLY After Assigned)"
          name="confidential"
          className="flex-column"
        />
        <ContactInfoSection />
        <TeamSection formName="createWorkOrderReduxForm" />
        <UploadDocumentsSection toggleModal={toggleModal} />
        <CreateTemplateSection templateId={templateId} currentWorkOrderId={currentWorkOrder?._id} />
      </SectionContainer>
      <ControlButtonsForCreateAndEditWorkOrder
        editingWorkOrderStatus={currentWorkOrder?.status}
        history={history}
      />
    </Form>
  );
};

CreateWorkOrderReduxForm = reduxForm({
  form: 'createWorkOrderReduxForm',
})(CreateWorkOrderReduxForm);

const mapDispatchToProps = {
  toggleModal,
};

const mapStateToProps = state => ({
  activeTab: state.applicationState.activeTab,
  currentWorkOrder: state.workOrder.currentWorkOrder,
  addressDisabled: state.workOrder.addressDisabled,
  templateId: state.workOrder.currentTemplate?.templateId,
  // eslint-disable-next-line no-nested-ternary
  initialValues: state.workOrder.currentWorkOrder?._id
    ? state.workOrder.currentWorkOrder
    : state.workOrder.currentTemplate?.templateId
      ? ({
        ...defaultInitialValues,
        ...state.workOrder.currentTemplate,
      })
      : defaultInitialValues,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CreateWorkOrderReduxForm));
