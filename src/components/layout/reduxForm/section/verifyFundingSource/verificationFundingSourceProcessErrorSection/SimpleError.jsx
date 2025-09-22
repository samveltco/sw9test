// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { MDBCol, MDBRow } from 'mdbreact';

const SimpleError = ({ message }) => (
  <MDBRow className="justify-content-center h-paddings">
    <MDBCol>
      <h6 className="error-text no-margins text-align-center">{message}</h6>
    </MDBCol>
  </MDBRow>
);

export default SimpleError;
