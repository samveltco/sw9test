// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';
import { MDBCol } from 'mdbreact';
import CheckboxField from '../../customFields/CheckboxField';
import InputField from '../../customFields/InputField';

const createWorkOrderReduxFormSelector = formValueSelector('createWorkOrderReduxForm');

const CreateTemplateSection = ({
  currentWorkOrderId, templateId, isCreateTemplate,
}) => (
  <>
    {
      !currentWorkOrderId && !templateId
        ? (
          <>
            <MDBCol>
              <Field
                name="isCreateTemplate"
                component={CheckboxField}
                type="checkbox"
                label="Create Template"
                className="padding-bottom-05 d-flex"
                labelClassName="float-right"
              />
            </MDBCol>
            {
              isCreateTemplate
                ? (
                  <MDBCol>
                    <Field
                      name="templateName"
                      component={InputField}
                      type="text"
                      placeholder="Template Name"
                      label="Template Name"
                      className="font-size-08"
                      inputClassName="form-control custom-input-style"
                      labelClassName="padding-right-10 text-in-one-line"
                    />
                  </MDBCol>
                )
                : <></>
            }
          </>
        )
        : <></>
    }
  </>
);

const mapStateToProps = state => ({
  isCreateTemplate: createWorkOrderReduxFormSelector(state, 'isCreateTemplate'),
});

export default connect(mapStateToProps)(CreateTemplateSection);
