// ©2024 Austin App House. All rights reserved.
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Field, Form, formValueSelector, reduxForm } from 'redux-form';
import { MDBCol, MDBRow } from 'mdbreact';
import axios from "axios";
import Notification from '../../notification';
import InputField from './customFields/InputField';
import CheckboxField from './customFields/CheckboxField';
import SectionContainerOneCol from "../SectionContainerOneCol";
import ReactSelectField from "./customFields/ReactSelectField";
import { toggleModal } from '../../../storage/actions/modalsActions';
import { accountStatusOptions, localCurrencySettings } from "../../../utils/constans_old";
import FundingSourcesSection from './section/addFundsToDwollaBalanceBySuperAdmin/FundingSourcesSection';

let AddFundingSourceAndFundsToDwollaBalance = ({
  fundingSource,
  paymentAmount,
  handleSubmit,
  error,
  closeModal
}) => {
  const [isUseExistingFundingSource, setIsUseExistingFundingSource] = useState(!!fundingSource)
  const [finallyAmount, setFinallyAmount] = useState(0)
  const [fee, setFee] = useState(0)
  const [processingFee, setProcessingFee] = useState(0)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setIsUseExistingFundingSource(!!fundingSource)
  }, [fundingSource])

  useEffect(() => {
    setFee(paymentAmount * processingFee || 0)
    setFinallyAmount(+ paymentAmount + processingFee * paymentAmount || 0)
  }, [paymentAmount])

  useEffect(() => {
    if (error) Notification('error', { message: error });
  }, [error]);

    const fetchData = async () => {
      await getCompanyProcessingFee()
    }

    const getCompanyProcessingFee = () => (
    axios.get('/api/companies/processing-fee')
      .then(res => setProcessingFee(res.data?.payload?.processingFee))
      .catch(error => {
        Notification('error', error)
        closeModal()
      })
  );

  const preventSubmitOnEnter = (event) => {
    if (event.key !== 'Enter') return;

    event.preventDefault()
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onKeyPress={preventSubmitOnEnter}
    >
      <FundingSourcesSection isRequired={false}/>
      <MDBRow>
        <MDBCol md="6" style={{textAlign: 'center'}}>
          <label>OR</label>
        </MDBCol>
      </MDBRow>
      <SectionContainerOneCol>
        <h5>Enter new Bank Info</h5>
        <Field
          disabled={isUseExistingFundingSource}
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
          disabled={isUseExistingFundingSource}
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
          disabled={isUseExistingFundingSource}
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
          disabled={isUseExistingFundingSource}
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
        <Field
          required
          name="amount"
          component={InputField}
          type="number"
          placeholder="$ 0.00"
          label="Payment amount"
          className="font-size-08 mt-4"
          inputClassName="form-control no-border-radius input-field width-inherit"
          labelClassName="padding-right-10"
        />
        <div className="d-flex justify-content-between font-size-10">
          <span>Processing Fee:</span>
          <span>{fee.toLocaleString('en-US', localCurrencySettings)}</span>
        </div>
        <div className="d-flex justify-content-between font-size-10 mb-4">
          <span>Total:</span>
          <span>{finallyAmount.toLocaleString('en-US', localCurrencySettings)}</span>
        </div>
        <Field
          required
          name="agree"
          component={CheckboxField}
          label="Click here to agree to processing fees"
          className="font-size-08 mt-4"
          inputClassName="form-control no-border-radius input-field width-inherit"
          labelClassName="padding-right-10"
        />
      </SectionContainerOneCol>
    </Form>
  );
};

AddFundingSourceAndFundsToDwollaBalance = reduxForm({
  form: 'addFundingSourceAndFundsToDwollaBalance',
})(AddFundingSourceAndFundsToDwollaBalance);

const mapDispatchToProps = {
  toggleModal,
};

const mapStateToProps = (state) => {
  const selector = formValueSelector('addFundingSourceAndFundsToDwollaBalance')

  return {
    fundingSource: selector(state, 'fundingSource'),
    paymentAmount: selector(state, 'amount')
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddFundingSourceAndFundsToDwollaBalance);
