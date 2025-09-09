// ©2024 Austin App House. All rights reserved.
import React from 'react';
import {
  MDBBtn, MDBCol, MDBIcon, MDBRow,
} from 'mdbreact';
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
    submit('addFundingSourceAndFundsToDwollaBalance');
  };

  return (
    <>
      <MDBRow>
        <MDBCol md="8">
          <label>Click here to agree that the process may take 4-5 business days</label>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol className="flex-box h-paddings-half align-items-center">
          <MDBBtn
            className="text-dark"
            color="success"
            type="button"
            name="save"
            onClick={handlerSave}
          >
            <MDBIcon far className="vwimg" icon="credit-card" />
            Submit
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </>
  );
};

const mapDispatchToProps = {
  submit,
};

export default connect(null, mapDispatchToProps)(ControlButtonsSection);
