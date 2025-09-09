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
    submit('verifyFundingSourceReduxForm');
  };

  return (
    <MDBRow className="no-margins">
      <MDBCol className="flex-box justify-content-center">
        <MDBBtn
          color="info"
          type="button"
          name="save"
          onClick={handlerSave}
        >
          Submit
        </MDBBtn>
        <MDBBtn
          color="red"
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
