// ©2024 Austin App House. All rights reserved.
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';
import { withRouter } from 'withroute';
import { toggleModal } from '../../../storage/actions/modalsActions';
import Notification from '../../notification';
import defaultInitialValues from '../../../utils/reduxForm/InitialValues/addFundingSourceToDwollaBySuperAdmin';
import InputField from './customFields/InputField';
import ReactSelectField from './customFields/ReactSelectField';
import SectionContainerOneCol from '../../SectionContainerOneCol';
import { accountStatusOptions } from '../../../utils/constans_old';

let AddFundingSourceToDwollaBySuperAdminReduxForm = ({
  handleSubmit,
  error,
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
      <SectionContainerOneCol>
        <Field
          name="name"
          component={InputField}
          type="text"
          placeholder="Bank Name"
          label="Bank Name"
          required
          className="flex-column"
          inputClassName="width-inherit input-field"
          paddingBottomClassName="no-paddings"
        />
        <Field
          name="accountStatus"
          component={ReactSelectField}
          className="flex-column"
          label="Checking or Savings Acct"
          placeholder="Checking or Savings Acct"
          options={accountStatusOptions}
          required
          paddingBottomClassName="no-paddings"
          inputClassName="width-inherit input-field no-paddings"
          customSelectStyleType="white"
        />
        <Field
          name="routing"
          component={InputField}
          type="text"
          placeholder="Routing Number"
          label="Routing"
          required
          className="flex-column"
          inputClassName="width-inherit input-field"
          paddingBottomClassName="no-paddings"
        />
        <Field
          name="account"
          component={InputField}
          type="text"
          placeholder="Account Number"
          label="Account"
          required
          className="flex-column"
          inputClassName="width-inherit input-field"
          paddingBottomClassName="no-paddings"
        />
      </SectionContainerOneCol>
    </Form>
  );
};

AddFundingSourceToDwollaBySuperAdminReduxForm = reduxForm({
  form: 'addFundingSourceToDwollaBySuperAdminReduxForm',
})(AddFundingSourceToDwollaBySuperAdminReduxForm);

const mapDispatchToProps = {
  toggleModal,
};

const mapStateToProps = () => ({
  initialValues: defaultInitialValues,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AddFundingSourceToDwollaBySuperAdminReduxForm));
