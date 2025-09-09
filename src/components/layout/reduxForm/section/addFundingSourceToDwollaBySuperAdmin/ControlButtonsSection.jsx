// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { MDBBtn, MDBCol, MDBRow } from 'mdbreact';
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
    submit('addFundingSourceToDwollaBySuperAdminReduxForm');
  };

  return (
    <MDBRow className="no-margins">
      <MDBCol className="flex-box justify-content-start p-0">
        <MDBBtn
          className="ml-0"
          color="success"
          type="button"
          name="save"
          onClick={handlerSave}
        >
          Save And Verify
        </MDBBtn>
        <MDBBtn
          className="grey lighten-2"
          type="button"
          onClick={cancel}
        >
          Cancel
        </MDBBtn>
      </MDBCol>
    </MDBRow>
  );
};

const mapDispatchToProps = {
  submit,
};

export default connect(null, mapDispatchToProps)(ControlButtonsSection);
