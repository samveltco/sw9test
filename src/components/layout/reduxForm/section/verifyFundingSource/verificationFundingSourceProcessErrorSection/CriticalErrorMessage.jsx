// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';

const CriticalErrorMessage = () => (
  <MDBContainer>
    <MDBRow className="justify-content-center">
      <MDBCol className="flex-grow-0">
        <h6 className="error-text text-in-one-line">Verification Failed!</h6>
      </MDBCol>
    </MDBRow>
    <MDBRow className="justify-content-center">
      <MDBCol className="flex-grow-0">
        <h6 className="error-text text-in-one-line">Dwolla has blocked this funding source.</h6>
      </MDBCol>
    </MDBRow>
    <MDBRow className="justify-content-center">
      <MDBCol className="flex-grow-0">
        <h6 className="error-text text-in-one-line">To re-verify you will need to:</h6>
      </MDBCol>
    </MDBRow>
    <MDBRow className="justify-content-center">
      <MDBCol className="flex-grow-0">
        <h6 className="error-text text-in-one-line">1. Delete this funding source.</h6>
      </MDBCol>
    </MDBRow>
    <MDBRow className="justify-content-center">
      <MDBCol className="flex-grow-0">
        <h6 className="error-text text-in-one-line">2. Wait 2 business days.</h6>
      </MDBCol>
    </MDBRow>
    <MDBRow className="justify-content-center">
      <MDBCol className="flex-grow-0">
        <h6 className="error-text text-in-one-line">3. Create a new funding source and verify it again.</h6>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
);

export default CriticalErrorMessage;
