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


let CreateWorkOrderReduxForm: any = ({
  mainContainer,
  currentWorkOrder,
  fetchWorkOrderById,
  getAccountBalanceByClient,
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
    setModalIsOpen(true);
  };
  const hideModal = (e: any) => {
    e.preventDefault();
    setModalIsOpen(false);
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

        <div className="fields_group">
          <div className="field_col">
            <label className="field_name" htmlFor="date_start">Date*</label>
            <div className="field_block">
              <input type="date" name="date_start" id="date_start" maxLength={50} placeholder="Title" />
            </div>
            <div className="field_block">
              <input type="date" name="date_end" id="date_end" maxLength={50} placeholder="Title" />
            </div>
          </div>
          <div className="field_col">
            <label className="field_name" htmlFor="time">Time*</label>
            <div className="field_block">
              <select name="time_start" id="time_start">
                <option>00:00</option>
                <option value="1">01:00</option>
                <option value="2">02:00</option>
                <option value="3">03:00</option>
                <option value="4">04:00</option>
              </select>
            </div>
            <div className="field_block">
              <select name="time_end" id="time_end">
                <option>00:00</option>
                <option value="1">01:00</option>
                <option value="2">02:00</option>
                <option value="3">03:00</option>
                <option value="4">04:00</option>
              </select>
            </div>
          </div>
          <div className="field_col">
            <label className="field_name" htmlFor="site_id">Site ID*</label>
            <div className="field_block">
              <input type="text" name="site_id" id="site_id" maxLength={50} placeholder="Site ID" />
            </div>
          </div>
          <div className="field_col">
            <label className="field_name" htmlFor="site_name">Site Name*</label>
            <div className="field_block">
              <input type="text" name="site_name" id="site_name" maxLength={50} placeholder="Site Name" />
            </div>
          </div>
        </div>

        <div className="fields_group">
          <div className="group_subtitle">Site Address</div>
          <div className="field_col">
            <label className="field_name" htmlFor="street_address">Street Address*</label>
            <div className="field_block">
              <input type="text" name="street_address" id="street_address" maxLength={50} placeholder="Street Address" />
            </div>
          </div>
          <div className="field_col">
            <label className="field_name" htmlFor="bidg_suite">Bldg, Suite, Etc.</label>
            <div className="field_block">
              <input type="text" name="bidg_suite" id="bidg_suite" maxLength={50} placeholder="Bldg, Suite, Etc." />
            </div>
          </div>
          <div className="field_col">
            <label className="field_name" htmlFor="city">City</label>
            <div className="field_block">
              <input type="text" name="city" id="city" maxLength={50} placeholder="City" />
            </div>
          </div>
          <div className="field_col">
            <label className="field_name" htmlFor="state">State</label>
            <div className="field_block">
              <select name="state" id="state">
                <option>State</option>
                <option value="1">Value 1</option>
                <option value="2">Value 2</option>
                <option value="3">Value 3</option>
                <option value="4">Value 4</option>
              </select>
            </div>
          </div>
          <div className="field_col">
            <label className="field_name" htmlFor="zip">Zip</label>
            <div className="field_block">
              <input type="text" name="zip" id="zip" maxLength={50} placeholder="Zip" />
            </div>
          </div>
          <div className="field_col">
            <label className="field_name" htmlFor="country">Country</label>
            <div className="field_block">
              <select name="country" id="country">
                <option>Country</option>
                <option value="1">Value 1</option>
                <option value="2">Value 2</option>
                <option value="3">Value 3</option>
                <option value="4">Value 4</option>
              </select>
            </div>
          </div>
        </div>

        <div className="separate">OR</div>
        <div className="checkbox_list">
          <label className="check_btn">
            <input type="checkbox" name="remote_wfh" />
            Remote/WFH
          </label>
          <label className="check_btn">
            <input type="checkbox" name="project_manager" />
            Project Manager
          </label>
          <label className="check_btn">
            <input type="checkbox" name="project_coordinator" />
            Project Coordinator
          </label>
          <label className="check_btn">
            <input type="checkbox" name="project_administrator" />
            Project Administrator
          </label>
          <label className="check_btn">
            <input type="checkbox" name="other_misc" />
            Other/Misc.
          </label>
        </div>

        <div className="fields_group">
          <div className="field_col">
            <label className="field_name" htmlFor="work_type">Work Type*</label>
            <div className="field_block">
              <select name="work_type" id="work_type">
                <option>Work Type</option>
                <option value="1">Value 1</option>
                <option value="2">Value 2</option>
                <option value="3">Value 3</option>
                <option value="4">Value 4</option>
              </select>
            </div>
          </div>
        </div>

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

      <div className={`modal_block custom_fields ${modalIsOpen ? 'showed' : ''}`} >
        <div className="modal_container">
          <div className="modal_head">
            <div className="modal_title">Custom Field</div>
            <button className="close_btn icon_close" aria-label="close" onClick={hideModal}></button>
          </div>
          <div className="modal_body">
            <div className="field_col">
              <label className="field_name" htmlFor="project1">Select Custom Field</label>
              <div className="field_block">
                <select name="project" id="project1">
                  <option>Select</option>
                  <option value="1">Value 1</option>
                  <option value="2">Value 2</option>
                  <option value="3">Value 3</option>
                  <option value="4">Value 4</option>
                </select>
              </div>
            </div>
            <div className="separate">OR</div>
            <div className="field_col">
              <label className="field_name" htmlFor="name1">Name*</label>
              <div className="field_block">
                <input type="text" name="company_wo_id" id="name1" maxLength={50} placeholder="Field name" />
              </div>
            </div>
            <br />
            <br />
            <div className="field_col">
              <label className="field_name" htmlFor="Value">Value</label>
              <div className="field_block">
                <input type="text" name="company_wo_id" id="Value" maxLength={50} placeholder="Field name" />
              </div>
            </div>
            <div className="field_col">
              <label className="field_name" htmlFor="type">Type*</label>
              <div className="field_block">
                <select name="project" id="type">
                  <option>Select</option>
                  <option value="1">Value 1</option>
                  <option value="2">Value 2</option>
                  <option value="3">Value 3</option>
                  <option value="4">Value 4</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal_footer">
            <button className="standard_btn dark_btn" aria-label="add">Add</button>
          </div>
        </div>
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
