// ©2024 Austin App House. All rights reserved.
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, reduxForm } from 'redux-form';
import { MDBCol, MDBRow } from 'mdbreact';
import { toggleModal } from '../../../storage/actions/modalsActions';
import Notification from '../../notification';
import defaultInitialValues from '../../../utils/reduxForm/InitialValues/companyInformationBySuperAdmin';
import ControlButtonsSection from './section/companyInformationBySuperAdmin/ControlButtonsSection';
import Fee from './section/companyInformationBySuperAdmin/Fee';

let CompanyInformationBySuperAdmin = ({
  handleSubmit,
  error,
  companyInfo,
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
      <MDBRow>
        <MDBCol md="6">
          <h4>{companyInfo.name}</h4>
        </MDBCol>
        <Fee />
      </MDBRow>
      <MDBRow>
        <MDBCol>
          <h6>{companyInfo.creatorName}</h6>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol>
          <a href={`tel:${companyInfo.creatorPhone}`}>{companyInfo.creatorPhone}</a>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol>
          <a href={`mailto:${companyInfo.creatorEmail}`}>{companyInfo.creatorEmail}</a>
        </MDBCol>
      </MDBRow>
      <ControlButtonsSection closeModal={closeModal} />
    </Form>
  );
};

CompanyInformationBySuperAdmin = reduxForm({
  form: 'companyInformationBySuperAdminReduxForm',
})(CompanyInformationBySuperAdmin);

const mapDispatchToProps = {
  toggleModal,
};

const mapStateToProps = state => ({
  initialValues: state.modalState?.editCompanyBySuperAdmin?.type?.processingFee
    ? ({
      processingFee: state.modalState?.editCompanyBySuperAdmin?.type?.processingFee * 100,
      companyId: state.modalState?.editCompanyBySuperAdmin?.type?.value,
    })
    : defaultInitialValues,
  companyInfo: state.modalState?.editCompanyBySuperAdmin?.type,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyInformationBySuperAdmin);
