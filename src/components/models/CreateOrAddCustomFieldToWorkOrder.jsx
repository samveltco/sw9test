// ©2024 Austin App House. All rights reserved.
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { SubmissionError, submit } from 'redux-form';

import { toggleModal } from '../../store/actions/modalsActions';
import Notification from '../notification';
import CreateCustomFieldReduxForm from '../layout/reduxForm/CreateCustomField';
import validate from '../../utils/reduxForm/validate/createCustomField';
import { createCustomField } from '../../store/actions/workOrdersActions';
import getCustomFieldsList from '../../utils/api/get/getCoustomFieldsList';
import CustomSelect from '../Select';

const CreateOrAddCustomFieldToWorkOrder = ({
  modalState,
  toggleModal,
  submit,
}) => {
  const [customFields, setCustomFields] = useState([]);
  const [selectedCustomField, setSelectedCustomField] = useState();

  const createCustomFieldsOptionsForSelect = list => (
    list.map(customField => ({
      value: customField._id,
      label: customField.name,
    }))
  );

  // eslint-disable-next-line consistent-return
  const fetchCustomFields = async () => {
    const newCustomFields = await getCustomFieldsList();
    if (!(modalState.type?.input.value?.length > 0)) {
      return setCustomFields(
        createCustomFieldsOptionsForSelect(newCustomFields),
      );
    }
    const selectedCustomFieldsIds = modalState.type?.input.value.map(item => (
      item._id || item.value
    ));
    setCustomFields(
      createCustomFieldsOptionsForSelect(
        newCustomFields.filter(customField => !selectedCustomFieldsIds.includes(
          customField._id,
        )),
      ),
    );
  };

  useEffect(() => {
    fetchCustomFields();
  }, []);

  const closeModal = () => {
    toggleModal(!modalState.isOpen, 'createOrAddCustomFieldToWorkOrder');
  };

  const getCustomFieldInfo = async (name, dispatch) => {
    if (selectedCustomField?.value) {
      return ({
        customFieldId: selectedCustomField.value,
        name: selectedCustomField.label,
      });
    }
    const result = await dispatch(createCustomField(name));
    if (!result.success) throw new SubmissionError({ _error: result.message });
    return ({
      customFieldId: result?.payload?.newDocument?._id,
      name: result?.payload?.newDocument?.name,
    });
  };

  const onSubmit = async (values, dispatch, props) => {
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length) throw new SubmissionError(validationErrors);
    if (!props.dirty) return Notification('warning', { message: 'None changes found!' });
    const {
      name,
      value,
      type,
    } = values;
    const customFieldInfo = await getCustomFieldInfo(name, dispatch);
    addCustomFieldToWorkOrder({
      customFieldId: customFieldInfo.customFieldId,
      name: customFieldInfo.name,
      value,
      type: type.value,
    });
    return {};
  };

  // eslint-disable-next-line consistent-return
  const handlerSubmit = event => {
    event.preventDefault();
    submit('createCustomFieldReduxForm');
  };

  const addCustomFieldToWorkOrder = customFiled => {
    if (!(modalState.type?.input.value?.length > 0)) {
      modalState.type.input.onChange([customFiled]);
    } else {
      modalState.type.input.onChange([...modalState.type?.input.value, customFiled]);
    }
    closeModal();
  };

  console.log('asddsa', modalState);
  return (
    <div className="modal_block custom_fields showed" >
      <div className="modal_container">
        <div className="modal_head">
          <div className="modal_title">Custom Field</div>
          <button className="close_btn icon_close" aria-label="close" onClick={closeModal}></button>
        </div>
        <div className="modal_body">
          <div className="field_col">
            <label className="field_name" htmlFor="project1">Select Custom Field</label>
            <div className="field_block">
              <CustomSelect
                options={customFields}
                value={selectedCustomField}
                onChange={setSelectedCustomField}
                placeholder="Select Custom Field"
              />
            </div>
          </div>
          <div className="separate">OR</div>
          <CreateCustomFieldReduxForm
            enableReinitialize
            onSubmit={onSubmit}
            disabled={!!selectedCustomField?.value}
            initialValues={selectedCustomField?.value ? { name: selectedCustomField.label } : {}}
          />
        </div>
        <div className="modal_footer">
          <button className="standard_btn dark_btn" aria-label="add">Add</button>
        </div>
      </div>
    </div>
  )
  // return (
  //   <MDBModal
  //     className="applypop modal-width-500"
  //     isOpen={modalState.isOpen}
  //     toggle={closeModal}
  //     fullHeight
  //     position="right"
  //   >
  //     <MDBModalBody style={{ color: 'white' }}>
  //       <MDBRow className="h-paddings-half">
  //         <MDBCol style={{ textAlign: 'left' }}>
  //           <h5
  //             className="font-weight-bold"
  //             style={{ marginBottom: '15px' }}
  //           >
  //             Add Custom Field
  //           </h5>
  //         </MDBCol>
  //         <MDBCol md="2" style={{ textAlign: 'end' }}>
  //           <MDBIcon
  //             far
  //             icon="times-circle"
  //             onClick={closeModal}
  //             size="lg"
  //             className="blue-grey-text"
  //           />
  //         </MDBCol>
  //       </MDBRow>
  //       <MDBRow>
  //         <MDBCol>
  //           <Select
  //             isClearable
  //             isSearchable
  //             options={customFields}
  //             value={selectedCustomField}
  //             styles={customSelectStyle}
  //             onChange={setSelectedCustomField}
  //             placeholder="Select Custom Field"
  //           />
  //         </MDBCol>
  //       </MDBRow>
  //       <MDBRow className="h-paddings-half">
  //         <MDBCol style={{ textAlign: 'left' }}>
  //           <h5
  //             className="font-weight-bold"
  //             style={{ marginBottom: '15px' }}
  //           >
  //             - OR -
  //           </h5>
  //         </MDBCol>
  //       </MDBRow>
  //       <MDBRow className="h-paddings-half">
  //         <MDBCol style={{ textAlign: 'left' }}>
  //           <h6
  //             className="font-weight-bold"
  //             style={{ marginBottom: '15px' }}
  //           >
  //             Create Custom Field
  //           </h6>
  //         </MDBCol>
  //       </MDBRow>
  //       <CreateCustomFieldReduxForm
  //         enableReinitialize
  //         onSubmit={onSubmit}
  //         disabled={!!selectedCustomField?.value}
  //         initialValues={selectedCustomField?.value ? { name: selectedCustomField.label } : {}}
  //       />
  //       <MDBRow>
  //         <MDBCol>
  //           <div style={{ textAlign: 'end' }}>
  //             <MDBBtn
  //               type="button"
  //               color="secondary"
  //               onClick={closeModal}
  //               className="clientclose"
  //             >
  //               Close
  //             </MDBBtn>
  //             <MDBBtn
  //               color="primary"
  //               className="clientsave"
  //               type="submit"
  //               onClick={handlerSubmit}
  //             >
  //               Save
  //             </MDBBtn>
  //           </div>
  //         </MDBCol>
  //       </MDBRow>
  //     </MDBModalBody>
  //   </MDBModal>
  // );
};

const mapDispatchToProps = {
  toggleModal,
  submit,
};

const mapStateToProps = state => ({
  modalState: state.modalState.createOrAddCustomFieldToWorkOrder,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrAddCustomFieldToWorkOrder);
