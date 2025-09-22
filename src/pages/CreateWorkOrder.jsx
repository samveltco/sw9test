import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getAccountBalanceByClient } from '../store/actions/profile';
import { fetchWorkOrderById, fetchWorkOrderTemplateById, setCurrentTemplate, setCurrentWorkOrder, } from '../store/actions/workOrdersActions';
import PayInfoSection from '../components/createWorkOrder/payInfoSection';
import CustomSelect from '../components/Select';
import { Form, reduxForm } from 'redux-form';
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

let CreateWorkOrderReduxForm = ({
  currentWorkOrder,
  fetchWorkOrderById,
  getAccountBalanceByClient,
  setCurrentWorkOrder,
  setCurrentTemplate,
  fetchWorkOrderTemplateById,
  toggleModal,
}) => {
  const [templates, setTemplates] = useState([]);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isFormTouched, setFormTouched] = useState(false);

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
  }, []);

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

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Layout>
      <Form onSubmit={handleSubmit} onChange={() => setFormTouched(true)}>
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
          <MarksSection />

          <CustomFieldsSection toggleModal={toggleModal} />

          <div className="fields_group">
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
          <button className="standard_btn lightest_btn" aria-label="save and publish">Save & Publish</button>
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

const mapStateToProps = (state) => ({
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateWorkOrderReduxForm); 