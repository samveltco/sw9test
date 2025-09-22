// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { MDBCol } from 'mdbreact';
import { Field, formValueSelector, change, } from 'redux-form';
import UploadDocumentsField from './UploadDocumentsField';
import CheckboxField from '../../../customFields/CheckboxField';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'withroute';

const createWorkOrderReduxFormSelector = formValueSelector('createWorkOrderReduxForm');

const UploadDocumentsSection = ({
  removePreviousDocuments,
  change,
  canUpload,
  toggleModal,
  formName = 'createWorkOrderReduxForm',
}) => {
  const { documentVisibility } = useSelector((state) => state.form[`${formName}`]).values;

  return (
    <MDBCol>
      <Field
        name="isNeedDeliverables"
        component={CheckboxField}
        label="Deliverables Required"
        className="padding-bottom-05 d-flex"
        labelClassName="float-right"
      />
      <Field name="documents" component={({
        input,
      }) => <UploadDocumentsField
          input={input}
          change={change}
          formName={formName}
          removePreviousDocuments={removePreviousDocuments}
          documentVisibility={documentVisibility}
          toggleModal={toggleModal}
        />}
      />
    </MDBCol>
  )
}
  ;

// export default UploadDocumentsSection;
const mapStateToProps = state => ({
  removePreviousDocuments: createWorkOrderReduxFormSelector(state, 'removePreviousDocuments'),
  canUpload: createWorkOrderReduxFormSelector(state, 'canUpload'),
})
const mapDispatchToProps = {
  change,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(UploadDocumentsSection));