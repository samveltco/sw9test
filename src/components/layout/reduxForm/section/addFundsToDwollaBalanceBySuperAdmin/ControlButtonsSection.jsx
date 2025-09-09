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
    submit('addFundsToDwollaBalanceBySuperAdminReduxForm');
  };

  return (
    <>
      <MDBRow>
        <MDBCol md="8">
          <label>Click here to agree that the process may take 4-5 business days</label>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol className="flex-box h-paddings-half justify-content-end align-items-center">
          <MDBBtn
            style={{
              padding: '0.3rem 0.5rem',
              color: '#333333',
              backgroundColor: '#00ff54',
            }}
            color="success"
            type="button"
            name="save"
            onClick={handlerSave}
          >
            <MDBIcon far className="vwimg" icon="credit-card" />
            Submit
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
    </>
  );
};

const mapDispatchToProps = {
  submit,
};

export default connect(null, mapDispatchToProps)(ControlButtonsSection);
