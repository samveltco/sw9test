// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { Form, reduxForm } from 'redux-form';
import { withRouter } from 'withroute';
import {
  MDBBtn, MDBRow, MDBCardText
} from 'mdbreact';

const UnsubscribeFromNotificationsReduxForm = ({ handleSubmit, submit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <div className="headingdivr">
        <MDBCardText>We're sorry to see you go! To unsubscribe from all promotional messages associated with <b>Source W9</b> please click the Unsubscribe button below. </MDBCardText>
      </div>
      
      <MDBRow style={{ justifyContent: 'center' }}>
        <MDBBtn color="info" onClick={submit} style={{ textTransform: 'none' }}>
          Unsubscribe
        </MDBBtn>
      </MDBRow>
    </Form>
  );
};

export default withRouter(reduxForm({
  form: 'unsubscribeFromNotificationsReduxForm',
})(React.memo(UnsubscribeFromNotificationsReduxForm)));
