import React, { useRef, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import getTemplatesList from '../utils/api/get/getTemplatesList';
import { connect } from 'react-redux';
import { getAccountBalanceByClient } from '../store/actions/profile';
import { fetchWorkOrderById, fetchWorkOrderTemplateById, setCurrentTemplate, setCurrentWorkOrder } from '../store/actions/workOrdersActions';
import { toggleModal } from '../store/actions/modalsActions';
import PayInfoSection from '../components/createWorkOrder/payInfoSection';
import CustomSelect from '../components/Select';
import { Form, reduxForm } from 'redux-form';
import defaultInitialValues from '../utils/reduxForm/InitialValues/createWorkOrderReduxForm';

import '../sass/order/order-l.scss'
import '../sass/order/order-m.scss'
import '../sass/order/order.scss'
import InputField from '../components/layout/reduxForm/customFields/InputField';
import MarksSection from '../components/createWorkOrder/MarksSection';
import CreateOrAddCustomFieldToWorkOrder from '../components/models/CreateOrAddCustomFieldToWorkOrder';
import DateSection from '../components/createWorkOrder/DateSection';
import AddressSection from '../components/createWorkOrder/AddressSection';
import RemoteWFHSection from '../components/createWorkOrder/RemoteWFHSection';
import WorkTypeSection from '../components/createWorkOrder/WorkTypeSection';


let CreateWorkOrderReduxForm: any = ({
  mainContainer,
  currentWorkOrder,
  fetchWorkOrderById,
  getAccountBalanceByClient,
  modalState,
  setCurrentWorkOrder,
  match,
  setCurrentTemplate,
  fetchWorkOrderTemplateById,
  toggleModal,
}: any) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [templates, setTemplates] = useState([]);
  const params = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isCustomFieldsModalOpen, setIsCustomFieldsModalOpen] = useState(false);

  const showModal = (e: any) => {
    e.preventDefault();
    toggleModal(true, 'createOrAddCustomFieldToWorkOrder');
    console.log('modalState', modalState);
    setIsCustomFieldsModalOpen(true);
  };
  const hideModal = (e: any) => {
    e.preventDefault();
    toggleModal(false, 'createOrAddCustomFieldToWorkOrder');
    setIsCustomFieldsModalOpen(false);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isFormTouched, setFormTouched] = useState(false);

  const getSingleWorkOrder = async (id?: string) => {
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
  }, []);

  const changeSelectedTemplate = async (select: any) => {
    setIsLoading(true);
    setSelectedTemplate(select);
    if (!select) {
      await setCurrentTemplate({});
    } else {
      await fetchWorkOrderTemplateById(select.value);
    }
    setIsLoading(false);
  };

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Layout>
      <Form onSubmit={handleSubmit}>
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
                // styles={customSelectStyle}
                options={templates}
                value={selectedTemplate}
                onChange={changeSelectedTemplate}
                placeholder="Select Template"
              />
            </div>
          </div>
        </div>

        <PayInfoSection isWorkOrderAssigned={currentWorkOrder?.status === 'assigned'} />
        <MarksSection />
        

        <div className="add_btns">
          <button className="standard_btn icon_plus" aria-label="add custom field" onClick={showModal}>Add custom field</button>
          <button className="standard_btn icon_plus" aria-label="Add Required Steps">Add Required Steps</button>
          <button className="standard_btn icon_plus" aria-label="Add Client Approval Code">Add Client Approval Code</button>
        </div>

        <div className="fields_group">
          <div className="block_title">Custom filds</div>
          <table className="custom_table">
            <thead>
              <tr>
                <th className="name">Name</th>
                <th className="value">Value</th>
                <th className="type">Type</th>
                <th className="action">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-th="Name">Reference #</td>
                <td data-th="Value">asdas</td>
                <td data-th="Type">Show to contractor upon assignment</td>
                <td data-th="Action">
                  <div className="row_block">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#" className="icon_pencil">edit</a>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#" className="icon_delete">close</a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="block_title">Add Required Steps</div>
          <table className="custom_table">
            <thead>
              <tr>
                <th className="arrival">NamPre Arrival Requirements</th>
                <th className="site">On Site Requirements</th>
                <th className="completion">Completion Requirements</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-th="NamPre Arrival Requirements">Name 1<a href="" className="icon_close">close</a></td>
                <td data-th="On Site Requirements">Name 2<a href="" className="icon_close">close</a></td>
                <td data-th="Completion Requirements">Name 3 <a href="" className="icon_close">close</a></td>
              </tr>
              <tr>
                <td data-th="NamPre Arrival Requirements"></td>
                <td data-th="On Site Requirements">Name <a href="" className="icon_close">close</a></td>
                <td data-th="Completion Requirements">Name <a href="" className="icon_close">close</a></td>
              </tr>
              <tr>
                <td data-th="NamPre Arrival Requirements"></td>
                <td data-th="On Site Requirements">Name <a href="" className="icon_close">close</a></td>
                <td data-th="Completion Requirements"></td>
              </tr>
            </tbody>
          </table>
        </div>

      <DateSection />
        
      <AddressSection />

      <div className="separate">OR</div>

      <RemoteWFHSection />

      <WorkTypeSection onChange={() => {}} />
       

        <div className="fields_group">
          <div className="field_col">
            <label className="field_name" htmlFor="work_description">Work Description*</label>
            <div className="field_block">
              <textarea name="work_description" id="work_description" maxLength={500} placeholder="Type here"></textarea>
            </div>
          </div>
        </div>

        <div className="fields_group">
          <div className="field_col">
            <label className="field_name" htmlFor="total_required">Total Required*</label>
            <div className="field_block">
              <textarea name="total_required" id="total_required" maxLength={500} placeholder="Type here"></textarea>
            </div>
          </div>
        </div>

        <div className="fields_group">
          <div className="field_col">
            <label className="field_name" htmlFor="confidential_information">Confidential Information: (Shown ONLY After Assigned)</label>
            <div className="field_block">
              <textarea name="confidential_information" id="confidential_information" maxLength={500} placeholder="Type here"></textarea>
            </div>
          </div>
        </div>

        <div className="fields_group">
          <div className="group_subtitle">Contact Info*</div>
          <div className="field_col">
            <label className="field_name" htmlFor="name">Name</label>
            <div className="field_block">
              <input type="text" name="name" id="name" maxLength={50} placeholder="Name" />
            </div>
          </div>
          <div className="field_col">
            <label className="field_name" htmlFor="role">Role</label>
            <div className="field_block">
              <input type="text" name="role" id="role" maxLength={50} placeholder="Role" />
            </div>
          </div>
          <div className="field_col">
            <label className="field_name" htmlFor="email">Email</label>
            <div className="field_block">
              <input type="text" name="email" id="email" maxLength={50} placeholder="Email" />
            </div>
          </div>
          <div className="field_col">
            <label className="field_name" htmlFor="phone">Other phone</label>
            <div className="field_block">
              <input type="text" name="phone" id="phone" maxLength={15} placeholder="Phone" />
            </div>
          </div>
          <div className="field_col">
            <label className="field_name" htmlFor="mobile">Mobile</label>
            <div className="field_block">
              <input type="text" name="mobile" id="mobile" maxLength={50} placeholder="Mobile" />
            </div>
          </div>
          <div className="add_btns">
            <button className="standard_btn icon_plus" aria-label="add">Add</button>
          </div>
        </div>

        <div className="fields_group">
          <div className="field_col">
            <label className="field_name" htmlFor="notification_team">Select Team for Notification</label>
            <div className="field_block">
              <select name="notification_team" id="notification_team">
                <option>Select</option>
                <option value="1">Value 1</option>
                <option value="2">Value 2</option>
                <option value="3">Value 3</option>
                <option value="4">Value 4</option>
              </select>
            </div>
          </div>
        </div>

        <div className="fields_group">
          <label className="check_btn">
            <input type="checkbox" name="deliverables_required" />
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

        <div className="fields_group">
          <label className="check_btn">
            <input type="checkbox" name="create_template" />
            Create Template
          </label>
        </div>
      </div>

      <div className="create_actions">
        <button className="standard_btn dark_btn" aria-label="cancel">Cancel</button>
        <button className="standard_btn light_btn" aria-label="save as draft">Save as draft</button>
        <button className="standard_btn lightest_btn" aria-label="save and publish">Save &amp; Publish</button>
      </div>


      </Form>
    </Layout>
  );
};

CreateWorkOrderReduxForm = reduxForm({
  form: 'createWorkOrderReduxForm',
})(CreateWorkOrderReduxForm);


const mapDispatchToProps = {
  getAccountBalanceByClient,
  fetchWorkOrderById,
  setCurrentWorkOrder,
  setCurrentTemplate,
  fetchWorkOrderTemplateById,
  toggleModal,
};

const mapStateToProps = (state: any) => ({
  currentWorkOrder: state.workOrder.currentWorkOrder,
  modalState: state.modalState,
  initialValues: state.workOrder.currentWorkOrder?._id
    ? state.workOrder.currentWorkOrder
    : state.workOrder.currentTemplate?.templateId
      ? ({
        ...defaultInitialValues,
        ...state.workOrder.currentTemplate,
      })
      : defaultInitialValues,
});

// export default CreateWorkOrder;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateWorkOrderReduxForm);
