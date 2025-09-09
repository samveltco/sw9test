// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { connect } from 'react-redux';
import { MDBCol, MDBRow } from 'mdbreact';
import { Field, Form, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { toggleModal } from '../../../storage/actions/modalsActions';
import InputField from './customFields/InputField';
import VerificationFundingSourceProcessErrorSection from './section/verifyFundingSource/verificationFundingSourceProcessErrorSection';
import normalize from '../../../utils/reduxForm/normalize/amountToVerifyFundingSourceOnDwolla';

let VerifyFundingSourceReduxForm = ({
  handleSubmit,
  error,
}) => {
  const preventSubmitOnEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onKeyPress={preventSubmitOnEnter}
    >
      <MDBRow>
        <MDBCol>
          <Field
            name="amount1"
            component={InputField}
            type="text"
            placeholder="$0.00"
            label="Amount 1"
            required
            className="flex-column justify-content-center align-items-center"
            inputClassName="text-align-left"
            paddingBottomClassName="no-paddings"
            normalize={normalize}
          />
        </MDBCol>
        <MDBCol>
          <Field
            name="amount2"
            component={InputField}
            type="text"
            placeholder="$0.00"
            label="Amount 2"
            required
            className="flex-column justify-content-center align-items-center"
            inputClassName="text-align-left"
            paddingBottomClassName="no-paddings"
            normalize={normalize}
          />
        </MDBCol>
      </MDBRow>
      <VerificationFundingSourceProcessErrorSection error={error} />
    </Form>
  );
};

VerifyFundingSourceReduxForm = reduxForm({
  form: 'verifyFundingSourceReduxForm',
})(VerifyFundingSourceReduxForm);

const mapDispatchToProps = {
  toggleModal,
};

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(VerifyFundingSourceReduxForm));
