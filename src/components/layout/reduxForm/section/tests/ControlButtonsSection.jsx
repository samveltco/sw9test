// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { MDBBtn, MDBCol, MDBRow } from 'mdbreact';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

const ControlButtonsSection = ({
  submit,
}) => {
  const handlerSave = async event => {
    event.preventDefault();
    submit('testsReduxForm');
  };

  return (
    <MDBRow className="no-margins">
      <MDBCol className="flex-box justify-content-center">
        <MDBBtn
          color="success"
          type="button"
          name="submit"
          onClick={handlerSave}
        >
          Submit
        </MDBBtn>
      </MDBCol>
    </MDBRow>
  );
};

const mapDispatchToProps = {
  submit,
};

export default connect(null, mapDispatchToProps)(ControlButtonsSection);
