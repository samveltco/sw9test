// ©2024 Austin App House. All rights reserved.
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { SubmissionError, submit, change as changeFieldValue } from 'redux-form';

import { toggleModal } from '../../store/actions/modalsActions';
import Notification from '../notification';
import CreateClientApprovalCodeReduxForm from '../layout/reduxForm/CreateClientApprovalCode';
import { createApprovalCode } from '../../store/actions/workOrdersActions';
import getApprovalCodesList from '../../utils/api/get/getApprovalCodesList';
import CustomSelect from '../Select';

const CreateOrAddClientApprovalCodeToWorkOrder = ({
  modalState,
  toggleModal,
  submit,
}) => {
  const dispatch = useDispatch();
  const [approvalCodes, setApprovalCodes] = useState([]);
  const [selectedApprovalCode, setSelectedApprovalCode] = useState(null);

  const createApprovalCodesOptionsForSelect = list => (
    list.map(code => ({
      value: code._id,
      label: code.name,
      required: code.required,
    }))
  );

  const fetchClientApprovalCodes = async () => {
    const newApprovalCodes = await getApprovalCodesList();
    const selected = Array.isArray(modalState.type?.value)
      ? modalState.type.value
      : [];
    if (!(selected.length > 0)) {
      return setApprovalCodes(createApprovalCodesOptionsForSelect(newApprovalCodes));
    }
    const selectedIds = selected.map(item => item._id || item.value);
    setApprovalCodes(
      createApprovalCodesOptionsForSelect(
        newApprovalCodes.filter(code => !selectedIds.includes(code._id)),
      ),
    );
  };

  useEffect(() => {
    fetchClientApprovalCodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = () => {
    toggleModal(!modalState.isOpen, 'createOrAddClientApprovalCodeToWorkOrder');
  };

  const getApprovalCodeInfo = async (name, required) => {
    if (selectedApprovalCode?.value) {
      return ({
        approvalCodeId: selectedApprovalCode.value,
        name: selectedApprovalCode.label,
      });
    }
    const result = await dispatch(createApprovalCode(name, required));
    if (!result.success) throw new SubmissionError({ _error: result.message });
    return ({
      approvalCodeId: result?.payload?.newDocument?._id,
      name: result?.payload?.newDocument?.name,
    });
  };

  const onSubmit = async (values, dispatchRedux, props) => {
    const { name, isRequired } = values;
    if (!props.dirty && !selectedApprovalCode?.value) {
      return Notification('warning', { message: 'None changes found!' });
    }
    const required = isRequired?.value === undefined ? false : isRequired.value;
    const approvalCodeInfo = await getApprovalCodeInfo(name, required);
    const approvalCode = {
      approvalCodeId: approvalCodeInfo.approvalCodeId,
      name: approvalCodeInfo.name,
      required,
    };
    addApprovalCodeToWorkOrder(approvalCode);
    return {};
  };

  const handlerSubmit = event => {
    event.preventDefault();
    submit('createClientApprovalCodeReduxForm');
  };

  const addApprovalCodeToWorkOrder = approvalCode => {
    const formName = modalState.type?.form || 'createWorkOrderReduxForm';
    const fieldName = modalState.type?.field || 'clientApprovalCodes';
    const current = Array.isArray(modalState.type?.value) ? modalState.type.value : [];
    const nextValue = current.length > 0 ? [...current, approvalCode] : [approvalCode];
    dispatch(changeFieldValue(formName, fieldName, nextValue));
    closeModal();
  };

  return (
    <div className="modal_block custom_fields showed">
      <div className="modal_container">
        <div className="modal_head">
          <div className="modal_title">Add Client Approval Code</div>
          <button className="close_btn icon_close" aria-label="close" onClick={closeModal}></button>
        </div>
        <div className="modal_body">
          <div className="field_col">
            <label className="field_name" htmlFor="approvalCodeSelect">Select Approval Code</label>
            <div className="field_block">
              <CustomSelect
                inputId="approvalCodeSelect"
                isClearable
                isSearchable
                options={approvalCodes}
                value={selectedApprovalCode}
                onChange={setSelectedApprovalCode}
                placeholder="Select Approval Code"
              />
            </div>
          </div>
          <div className="separate">OR</div>
          <CreateClientApprovalCodeReduxForm
            enableReinitialize
            onSubmit={onSubmit}
            disabled={!!selectedApprovalCode?.value}
            initialValues={selectedApprovalCode?.value ? { name: selectedApprovalCode.label, isRequired: selectedApprovalCode.required } : {}}
          />
        </div>
        <div className="modal_footer">
          <button className="standard_btn dark_btn" aria-label="add" onClick={handlerSubmit}>Add</button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  toggleModal,
  submit,
};

const mapStateToProps = state => ({
  modalState: state.modalState.createOrAddClientApprovalCodeToWorkOrder,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrAddClientApprovalCodeToWorkOrder);


