// ©2024 Austin App House. All rights reserved.
import { formValueSelector, change } from 'redux-form';
import { connect } from 'react-redux';
import DividedPaySection from '../../../layout/reduxForm/section/workOrder/payInfoSection/DividedPaySection';

const createWorkOrderReduxFormSelector = formValueSelector('createWorkOrderReduxForm');

const mapDispatchToProps = {
  change,
};

const mapStateToProps = state => ({
  percentCommunication: createWorkOrderReduxFormSelector(state, 'percentCommunication'),
  percentWork: createWorkOrderReduxFormSelector(state, 'percentWork'),
  percentDeliverables: createWorkOrderReduxFormSelector(state, 'percentDeliverables'),
  reduxFormName: 'createWorkOrderReduxForm',
});

export default connect(mapStateToProps, mapDispatchToProps)(DividedPaySection);
