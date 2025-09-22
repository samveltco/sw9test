// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { connect } from 'react-redux';

import { SubmissionError, submit } from 'redux-form';
import { toggleModal } from '../../store/actions/modalsActions';
import Notification from '../notification';
import validate from '../../utils/reduxForm/validate/createCustomField';
import CreateCustomFieldReduxForm from '../layout/reduxForm/CreateCustomField';
import CustomSelect from '../Select';

const EditCustomFieldModal = ({
  modalState,
  toggleModal,
  submit,
}) => {
  const closeModal = () => {
    toggleModal(!modalState.isOpen, 'editCustomFieldModal');
  };

  console.log(modalState)

  const addCustomFieldToWorkOrder = customFiled => {
    if (!(modalState.type?.input.value?.length > 0)) {
      modalState.type.input.onChange([customFiled]);
    } else if (modalState.type?.index > 0 || modalState.type?.index === 0) {
      const newCustomFields = modalState.type?.input.value.map((item, index) => (
        index !== modalState.type?.index
          ? item
          : customFiled
      ));
      modalState.type.input.onChange(newCustomFields);
    } else {
      modalState.type.input.onChange([...modalState.type?.input.value, customFiled]);
    }
    closeModal();
  };

  const onSubmit = async (values, dispatch, props) => {
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length) throw new SubmissionError(validationErrors);
    if (!props.dirty) return Notification('warning', { message: 'None changes found!' });
    const {
      name,
      value,
      type,
      customFieldId,
    } = values;
    addCustomFieldToWorkOrder({
      customFieldId,
      name,
      value,
      type: type.value,
    });
    return {};
  };

  const handlerSubmit = async event => {
    event.preventDefault();
    submit('createCustomFieldReduxForm');
  };

  return (
    <div className="modal_block custom_fields showed" >
    <div className="modal_container">
      <div className="modal_head">
        <div className="modal_title">
        Edit Custom Field
          
        </div>
        <button className="close_btn icon_close" aria-label="close" onClick={closeModal}></button>
      </div>
      <div className="modal_body">
        <CreateCustomFieldReduxForm
          enableReinitialize
          onSubmit={onSubmit}
          initialValues={modalState?.type?.field || {}}
          disabled
        />
      </div>
      <div className="modal_footer">
        <button className="standard_btn dark_btn" aria-label="add" onClick={handlerSubmit}>save</button>
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
  modalState: state.modalState.editCustomFieldModal,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomFieldModal);
