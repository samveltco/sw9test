// ©2024 Austin App House. All rights reserved.
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import FundsInfoSection from '../../../layout/reduxForm/section/workOrder/payInfoSection/FundsInfoSection';

const createWorkOrderReduxFormSelector = formValueSelector('createWorkOrderReduxForm');

const mapStateToProps = state => ({
  amount: createWorkOrderReduxFormSelector(state, 'amount'),
  bidAmountBase: createWorkOrderReduxFormSelector(state, 'bidAmountBase'),
  quantity: createWorkOrderReduxFormSelector(state, 'quantity'),
  basicType: createWorkOrderReduxFormSelector(state, 'basicType'),
  variableAmount: createWorkOrderReduxFormSelector(state, 'variableAmount'),
  variablePayAfter: createWorkOrderReduxFormSelector(state, 'variablePayAfter'),
  maxQuantity: createWorkOrderReduxFormSelector(state, 'maxQuantity'),
  profile: state.profile,
});

export default connect(mapStateToProps)(FundsInfoSection);
