// ©2024 Austin App House. All rights reserved.
import React from 'react';
// import { MDBCol } from 'mdbreact';
import { connect } from 'react-redux';
import { Field, formValueSelector, change } from 'redux-form';
import { fetchCountries } from '../../store/actions/workOrdersActions';
import CheckboxField from '../layout/reduxForm/customFields/CheckboxField';

const createWorkOrderReduxFormSelector = formValueSelector('createWorkOrderReduxForm');

const RemoteWFHSection = ({
  certificates,
  change,
  isRemote
}) => {

  return (
    <div className="checkbox_list">
      <label className="check_btn">
        <Field type="checkbox" name="remote_wfh" component={CheckboxField} />
        Remote/WFH
      </label>
      <label className="check_btn">
        <Field
          type="checkbox"
          name="projectManager"
          component={CheckboxField}
          onChange={(e) => {
            let values = [...(certificates || [])];
            if (e.target.checked) {
              values.push('Project Manager')
            } else {
              values = values.filter(item => item !== 'Project Manager')
            }
            change('createWorkOrderReduxForm', 'certificates', values);
          }}
          checked={certificates?.includes('Project Manager')}
          disabled={!isRemote}
        />
        Project Manager
      </label>
      <label className="check_btn">
        <Field
          type="checkbox"
          name="projectCoordinator"
          component={CheckboxField}
          onChange={(e) => {
            let values = [...(certificates || [])];
            if (e.target.checked) {
              values.push('Project Coordinator')
            } else {
              values = values.filter(item => item !== 'Project Coordinator')
            }
            change('createWorkOrderReduxForm', 'certificates', values);
          }}
          checked={true}
          disabled={!isRemote}
        />
        Project Coordinator
      </label>
      <label className="check_btn">
        <Field 
        onChange={(e) => {
                    let values = [...(certificates || [])];
                    if(e.target.checked) {
                      values.push('Project Coordinator')
                    } else {
                      values = values.filter(item => item !== 'Project Coordinator')
                    }
                    change('createWorkOrderReduxForm', 'certificates', values);
                  }}
                  checked={true}
                  disabled={!isRemote}
        type="checkbox" 
        name="projectAdministrator"
         component={CheckboxField} />
        Project Administrator
      </label>
      <label className="check_btn">
        <Field 
        type="checkbox" 
        name="otherMisc" 
        component={CheckboxField} 
        onChange={(e) => {
          let values = [...(certificates || [])];
          if(e.target.checked) {
            values.push('other')
          } else {
            values = values.filter(item => item !== 'other')
          }
          change('createWorkOrderReduxForm', 'certificates', values);
        }}
        checked={certificates?.includes('other')}
        disabled={!isRemote}
        />
        Other/Misc.
      </label>
    </div>
  )
  
};

const mapDispatchToProps = {
  change,
  fetchCountries,
};

const mapStateToProps = state => ({
  certificates: createWorkOrderReduxFormSelector(state, 'certificates'),
  isRemote: createWorkOrderReduxFormSelector(state, 'isRemote')
});

export default connect(mapStateToProps, mapDispatchToProps)(RemoteWFHSection);
