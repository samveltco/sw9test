// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';
import CheckboxField from '../layout/reduxForm/customFields/CheckboxField';
import InputField from '../layout/reduxForm/customFields/InputField';

const createWorkOrderReduxFormSelector = formValueSelector('createWorkOrderReduxForm');

const CreateTemplateSection = ({
  currentWorkOrderId, templateId, isCreateTemplate,
}) => (
  <>
    {
      !currentWorkOrderId && !templateId
        ? (
          <>
            <div className="fields_group">
              <label className="check_btn">

              <Field
                name="isCreateTemplate"
                component={CheckboxField}
                type="checkbox"
                label="Create Template"
                className="padding-bottom-05 d-flex"
                labelClassName="float-right"
                />
                Create Template
                </label>
            </div>
            {
              isCreateTemplate
                ? (
                  <div className="fields_group">
                    <div className="field_block">
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
                    </div>
                  </div>
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
