// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import DatePickedField from '../layout/reduxForm/customFields/DatePickerField';
import TimePickedField from '../layout/reduxForm/customFields/TimePickerField';
import { endDateFilter, startDateFilter } from '../../utils/pickerDateFilters';
import InputField from '../layout/reduxForm/customFields/InputField';

const createWorkOrderReduxFormSelector = formValueSelector('createWorkOrderReduxForm');

const DateSection = ({ startDate }) => (
  <div className="fields_group">
          <div className="field_col">
            <label className="field_name" htmlFor="date_start">Date*</label>
            <div className="field_block">
              <Field 
              type="date" 
              name="startDate" 
              id="date_start" 
              maxLength={50} 
              placeholder="Title"
              filterDate={startDateFilter}
              component={DatePickedField}
              />
            </div>
            <div className="field_block">
              <Field 
              type="date" 
              name="endDate" 
              id="date_end"
              filterDate={(date) => endDateFilter(date, startDate)}
              maxLength={50} 
              placeholder="Title" 
              component={DatePickedField}
              />
            </div>
          </div>
          <div className="field_col">
            <label className="field_name" htmlFor="time">Time*</label>
            <div className="field_block">
              <Field 
              name="startTime" 
              id="time_start" 
              component={TimePickedField}
               />
            </div>
            <div className="field_block">
              <Field 
              name="endTime" 
              id="time_end" 
              component={TimePickedField}
              />
            </div>
          </div>
          <div className="field_col">
            <label className="field_name" htmlFor="site_id">Site ID*</label>
            <div className="field_block">
              <Field 
              name="siteId" 
              id="site_id" 
              maxLength={50} 
              placeholder="Site ID" 
              component={InputField}
              />
            </div>
          </div>
          <div className="field_col">
            <label className="field_name" htmlFor="site_name">Site Name*</label>
            <div className="field_block">
              <Field 
              name="siteName" 
              id="site_name" 
              maxLength={50} 
              placeholder="Site Name" 
              component={InputField}
              />
            </div>
          </div>
        </div>
);

const mapStateToProps = state => ({
  startDate: createWorkOrderReduxFormSelector(state, 'startDate'),
});

export default connect(mapStateToProps)(DateSection);
