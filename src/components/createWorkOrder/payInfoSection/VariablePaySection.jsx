// ©2024 Austin App House. All rights reserved.
import { formValueSelector, change } from 'redux-form';
import { connect } from 'react-redux';
import VariablePaySection from '../../../layout/reduxForm/section/workOrder/payInfoSection/VariablePaySection';

const createWorkOrderReduxFormSelector = formValueSelector('createWorkOrderReduxForm');

const mapDispatchToProps = {
  change,
};

const mapStateToProps = state => ({
  basicType: createWorkOrderReduxFormSelector(state, 'basicType'),
  variableType: createWorkOrderReduxFormSelector(state, 'variableType'),
  quantity: createWorkOrderReduxFormSelector(state, 'quantity'),
  variablePayAfter: createWorkOrderReduxFormSelector(state, 'variablePayAfter'),
  maxQuantity: createWorkOrderReduxFormSelector(state, 'maxQuantity'),
  reduxFormName: 'createWorkOrderReduxForm',
});

export default connect(mapStateToProps, mapDispatchToProps)(VariablePaySection);
