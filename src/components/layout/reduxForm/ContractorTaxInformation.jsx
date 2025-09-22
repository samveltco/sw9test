// ©2024 Austin App House. All rights reserved.
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, reduxForm } from 'redux-form';
import { withRouter } from 'withroute';
import { MDBContainer } from 'mdbreact';
import { toggleModal } from '../../../storage/actions/modalsActions';
import Notification from '../../notification';
import defaultInitialValues from '../../../utils/reduxForm/InitialValues/contractorTaxInformation';
import TINSection from './section/contractorTaxInformation/TINSection';
import EntitySection from './section/contractorTaxInformation/entitySection';
import CertificationSection from './section/contractorTaxInformation/CertificationSection';
import Electronic1099Section from './section/contractorTaxInformation/Electronic1099Section';

let ContractorTaxInformationReduxForm = ({
  handleSubmit,
  error,
  initialValues,
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
      className="font-size-08"
    >
      <MDBContainer className="padding-bottom-10">
        <EntitySection />
        <TINSection initialValues={initialValues} />
        <CertificationSection />
        <Electronic1099Section />
      </MDBContainer>
    </Form>
  );
};

ContractorTaxInformationReduxForm = reduxForm({
  form: 'contractorTaxInformationReduxForm',
})(ContractorTaxInformationReduxForm);

const mapDispatchToProps = {
  toggleModal,
};

const mapStateToProps = state => ({
  initialValues: state.profile?.taxInfo?.entityType
    ? state.profile?.taxInfo
    : defaultInitialValues,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ContractorTaxInformationReduxForm));
