// ©2024 Austin App House. All rights reserved.
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { toggleModal } from '../../../storage/actions/modalsActions';
import Notification from '../../notification';
import defaultInitialValues from '../../../utils/reduxForm/InitialValues/contractorBankingInformation';
import InputField from './customFields/InputField';
import ReactSelectField from './customFields/ReactSelectField';
import SectionContainerOneCol from '../SectionContainerOneCol';
import TermsSection from './section/contractorBankingInformation/TermsSection';
import { accountStatusOptions, accountTypeOptions } from '../../../utils/constans_old';

let ContractorBankingInformationReduxForm = ({
  handleSubmit,
  error,
  initialValues,
  change,
  acceptedPrivacyPolicy
}) => {
  useEffect(() => {
    if (error) Notification('error', { message: error });
  }, [error]);

  const preventSubmitOnEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const clearOnFocus = (event, name) => {
    if (event.target.value === initialValues[name]) change(name, '');
  };

  useEffect(() => {
    if(acceptedPrivacyPolicy) {
      change('acceptTerms', true)
    }
  }, [acceptedPrivacyPolicy])

  return (
    <Form
      onSubmit={handleSubmit}
      onKeyPress={preventSubmitOnEnter}
    >
      <SectionContainerOneCol>
        <Field
          name="bankName"
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
          name="accountType"
          component={ReactSelectField}
          className="flex-column"
          label="Account Type"
          placeholder="Account Type (pers/business)"
          options={accountTypeOptions}
          required
          paddingBottomClassName="no-paddings"
          inputClassName="width-inherit input-field no-paddings"
          customSelectStyleType="white"
        />
        <Field
          name="name"
          component={InputField}
          type="text"
          placeholder="Account Owner Name"
          label="Account Owner Name"
          required
          className="flex-column"
          inputClassName="width-inherit input-field"
          paddingBottomClassName="no-paddings"
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
          onFocus={clearOnFocus}
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
          onFocus={clearOnFocus}
        />
        <Field
          name="email"
          component={InputField}
          type="email"
          placeholder="Email address for payment notifications"
          label="Email address"
          required
          className="flex-column"
          inputClassName="width-inherit input-field"
          paddingBottomClassName="no-paddings"
        />
      </SectionContainerOneCol>
      <TermsSection />
    </Form>
  );
};

ContractorBankingInformationReduxForm = reduxForm({
  form: 'contractorBankingInformationReduxForm',
})(ContractorBankingInformationReduxForm);

const mapDispatchToProps = {
  toggleModal,
};

const mapStateToProps = state => ({
  initialValues: state.profile?.bankInfo?.account
    ? state.profile?.bankInfo
    : defaultInitialValues,
    acceptedPrivacyPolicy: state.profile?.policingAgreements
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ContractorBankingInformationReduxForm));
