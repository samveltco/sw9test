import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getAccountBalanceByClient } from '../store/actions/profile';
import { fetchWorkOrderById, fetchWorkOrderTemplateById, setCurrentTemplate, setCurrentWorkOrder, } from '../store/actions/workOrdersActions';
import PayInfoSection from '../components/createWorkOrder/payInfoSection';
import CustomSelect from '../components/Select';
import { Field, Form, reduxForm } from 'redux-form';
import defaultInitialValues from '../utils/reduxForm/InitialValues/createWorkOrderReduxForm';

import '../sass/order/order-l.scss';
import '../sass/order/order-m.scss';
import '../sass/order/order.scss';
import MarksSection from '../components/createWorkOrder/MarksSection';
import DateSection from '../components/createWorkOrder/DateSection';
import AddressSection from '../components/createWorkOrder/AddressSection';
import RemoteWFHSection from '../components/createWorkOrder/RemoteWFHSection';
import WorkTypeSection from '../components/createWorkOrder/WorkTypeSection';
import CustomFieldsSection from '../components/createWorkOrder/customFields';
import getTemplatesList from '../utils/api/get/getTemplatesList';
import { toggleModal } from '../store/actions/modalsActions';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TasksSection from '../components/createWorkOrder/tasks';
import CreateTemplateSection from '../components/createWorkOrder/CreateTemplateSection';
import ClientApprovalCodeSection from '../components/createWorkOrder/clientApprovalCode';
import EditorField from '../components/layout/reduxForm/customFields/EditorField';
import ContactInfoField from '../components/layout/reduxForm/customFields/ContactInfoField';
import TeamsSection from '../components/createWorkOrder/TeamsSection';
import CheckboxField from '../components/layout/reduxForm/customFields/CheckboxField';
import onSubmit from '../utils/reduxForm/onSubmit/createWorkOrder';
import ControlButtonsForCreateAndEditWorkOrder from '../components/createWorkOrder/ControlButtonsForCreateAndEditWorkOrder';

let CreateWorkOrderReduxForm = ({
  currentWorkOrder,
  fetchWorkOrderById,
  getAccountBalanceByClient,
  setCurrentWorkOrder,
  setCurrentTemplate,
  fetchWorkOrderTemplateById,
  toggleModal,
  initialValues,
  templateId,
  addressDisabled,
  handleSubmit,
}) => {
  const [templates, setTemplates] = useState([]);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isFormTouched, setFormTouched] = useState(false);
  const [projects, setProjects] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [teams, setTeams] = useState([]);

  const getSingleWorkOrder = async (id) => {
    if (!id) {
      await setCurrentWorkOrder({});
    } else if (id !== currentWorkOrder?._id) {
      await fetchWorkOrderById(id);
    }
    setIsLoading(false);
  };

  const fetchTemplatesList = async () => {
    const newTemplatesList = await getTemplatesList();
    setTemplates(newTemplatesList);
  };

  useEffect(() => {
    getAccountBalanceByClient();
    setCurrentTemplate({});
    getSingleWorkOrder(params?.id);
    fetchTemplatesList();
    fetchProjectsList();
    fetchCompaniesList();
    fetchTeamsList();
  }, []);

  const fetchProjectsList = () => {
    axios.get('/api/projects')
      .then((res) => {
        if (res.data.success) {
          setProjects(res.data.payload?.data?.map(({ _id, name }) => ({
            value: _id,
            label: name,
          })));
        }
        setIsLoading(false);
      })

    // setProjects(newProjectsList);
  };
  const fetchTeamsList = () => {
    axios.get('/api/teams')
      .then((res) => {
        if (res.data.success) {
          setTeams(res.data.payload?.data?.map(({ _id, name }) => ({
            value: _id,
            label: name,
          })));
        }
        setIsLoading(false);
      })

    // setProjects(newProjectsList);
  };

  const fetchCompaniesList = () => {
    axios.get('/api/wo-companies')
      .then((res) => {
        if (res.data.success) {
          setCompanies(res.data.payload?.data?.map(({ _id, name }) => ({
            value: _id,
            label: name,
          })));
        }
        setIsLoading(false);
      })
  };

  const changeSelectedTemplate = async (select) => {
    setIsLoading(true);
    setSelectedTemplate(select);
    if (!select) {
      await setCurrentTemplate({});
    } else {
      await fetchWorkOrderTemplateById(select.value);
    }
    setIsLoading(false);
  };

  const handlerSelectTemplate = (select) => {
    if (!isFormTouched) return changeSelectedTemplate(select);
    toggleModal(
      true,
      'confirmModal',
      true,
      {
        onAccept: () => changeSelectedTemplate(select),
        header: 'Are you sure (all fields will be rewrite)?',
        buttonLabels: { reject: 'Cancel' },
      },
    );
  };



  return (
    <Layout>
      {isLoading ? <div>loading...</div> : (
      <Form onSubmit={handleSubmit(onSubmit)} onChange={() => setFormTouched(true)}>
        <h1 className="page_title icon_plus">Create work order</h1>

        <div className="create_fields">
          <div className="fields_group">
            <div className="field_row">
              <div className="field_name">
                <label htmlFor="use_template">Use Template</label>
              </div>
              <div className="field_block">
                <CustomSelect
                  id='use_template'
                  isClearable
                  options={templates}
                  value={selectedTemplate}
                  onChange={handlerSelectTemplate}
                  placeholder="Select Template"
                />
              </div>
            </div>
          </div>

          <PayInfoSection isWorkOrderAssigned={currentWorkOrder?.status === 'assigned'} />
          <MarksSection projects={projects} companies={companies} />

          <CustomFieldsSection toggleModal={toggleModal} />

          <TasksSection toggleModal={toggleModal} />

          <ClientApprovalCodeSection toggleModal={toggleModal} />

          <DateSection />

          <AddressSection />

          <div className="separate">OR</div>

          <RemoteWFHSection />

          <WorkTypeSection onChange={() => { }} />

          <Field
            component={EditorField}
            label="Work Description"
            required
            name="description"
            className="flex-column"
          />
          <br />
          <Field
            component={EditorField}
            label="Tools Required"
            name="customTools"
            className="flex-column"
          />
          <br />
          <Field
            component={EditorField}
            label="Confidential Information: (Shown ONLY After Assigned)"
            // required
            name="confidential"
            className="flex-column"
          />
          <br />





          {/* <Field
            name="contactInfo"
            component={ContactInfoField}
            label="Contact Info"
            placeholder="Add Contact"
            required
            className="flex-column font-size-08"
            inputClassName="form-control"
          /> */}


          <div className="fields_group">
            <TeamsSection formName="createWorkOrderReduxForm" />
          </div>


          <div className="fields_group">
            <label className="check_btn">
              <Field
                name="isNeedDeliverables"
                component={CheckboxField}
                label="Deliverables Required"
                className="padding-bottom-05 d-flex"
                labelClassName="float-right"
              />
              Deliverables Required
            </label>
          </div>

          <div className="fields_group">
            <div className="add_btns">
              <label className="standard_btn icon_upload">
                <input type="file" name="file_attach" />
                Drag and drop your fail here or click here to add file
              </label>
            </div>
          </div>

          <CreateTemplateSection templateId={templateId} currentWorkOrderId={currentWorkOrder?._id} />
          {/* <label className="check_btn">
              <Field
                name="isCreateTemplate"
                component={CheckboxField}
                label="Create Template"
                className="padding-bottom-05 d-flex"
                labelClassName="float-right"
              />
              Create Template
            </label> */}
        </div>

        {/* <div className="create_actions">
          <button className="standard_btn dark_btn" aria-label="cancel">Cancel</button>
          <button className="standard_btn light_btn" aria-label="save as draft">Save as draft</button>
          <button className="standard_btn lightest_btn" aria-label="save and publish">Save & Publish</button>
        </div> */}
        <ControlButtonsForCreateAndEditWorkOrder />
      </Form>
      )}
    </Layout>
  );
};

CreateWorkOrderReduxForm = reduxForm({
  form: 'createWorkOrderReduxForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
})(CreateWorkOrderReduxForm);

const mapDispatchToProps = {
  getAccountBalanceByClient,
  fetchWorkOrderById,
  setCurrentWorkOrder,
  setCurrentTemplate,
  fetchWorkOrderTemplateById,
  toggleModal,
};

const mapStateToProps = (state) => ({
  currentWorkOrder: state.workOrder.currentWorkOrder,
  templateId: state.workOrder.currentTemplate?.templateId,
  addressDisabled: state.workOrder.addressDisabled,
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
)(CreateWorkOrderReduxForm); 