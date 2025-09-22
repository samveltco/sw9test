// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

const ControlButtonsSection = ({
  closeModal,
  submit,
}) => {
  const cancel = (event) => {
    event.preventDefault();
    closeModal();
  };

  const handlerSave = async event => {
    event.preventDefault();
    submit('companyInformationBySuperAdminReduxForm');
  };

  return (
    <div className="flex-box justify-content-end">
      <MDBBtn
        className="grey lighten-2"
        type="button"
        onClick={cancel}
      >
        Cancel
      </MDBBtn>
      <MDBBtn
        color="success"
        type="button"
        name="save"
        onClick={handlerSave}
      >
        Save
      </MDBBtn>
    </div>
  );
};

const mapDispatchToProps = {
  submit,
};

export default connect(null, mapDispatchToProps)(ControlButtonsSection);
