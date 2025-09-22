// ©2024 Austin App House. All rights reserved.
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';
import { MDBCol, MDBRow } from 'mdbreact';
import { toggleModal } from '../../../storage/actions/modalsActions';
import Notification from '../../notification';
import defaultInitialValues from '../../../utils/reduxForm/InitialValues/addFundsToDwollaBalanceBySuperAdmin';
import ControlButtonsSection from './section/addFundsToDwollaBalanceBySuperAdmin/ControlButtonsSection';
import InputField from './customFields/InputField';
import FundingSourcesSection
  from './section/addFundsToDwollaBalanceBySuperAdmin/FundingSourcesSection';

let AddFundsToDwollaBalanceBySuperAdmin = ({
  handleSubmit,
  error,
  closeModal,
}) => {
  useEffect(() => {
    if (error) Notification('error', { message: error });
  }, [error]);

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
      <FundingSourcesSection />
      <MDBRow className="h-paddings-half">
        <MDBCol>
          <Field
            required
            name="amount"
            component={InputField}
            type="number"
            placeholder="$ 0.00"
            label="Payment amount"
            className="font-size-08"
            inputClassName="form-control no-border-radius input-field width-inherit"
            labelClassName="padding-right-10"
          />
        </MDBCol>
      </MDBRow>
      <ControlButtonsSection closeModal={closeModal} />
    </Form>
  );
};

AddFundsToDwollaBalanceBySuperAdmin = reduxForm({
  form: 'addFundsToDwollaBalanceBySuperAdminReduxForm',
})(AddFundsToDwollaBalanceBySuperAdmin);

const mapDispatchToProps = {
  toggleModal,
};

const mapStateToProps = () => ({
  initialValues: defaultInitialValues,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddFundsToDwollaBalanceBySuperAdmin);
