// ©2024 Austin App House. All rights reserved.
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import BasePaySection from '../../../layout/reduxForm/section/workOrder/payInfoSection/BasePaySection';

const createWorkOrderReduxFormSelector = formValueSelector('createWorkOrderReduxForm');

const mapStateToProps = state => ({
  amount: createWorkOrderReduxFormSelector(state, 'amount'),
  bidAmountBase: createWorkOrderReduxFormSelector(state, 'bidAmountBase'),
  quantity: createWorkOrderReduxFormSelector(state, 'quantity'),
  basicType: createWorkOrderReduxFormSelector(state, 'basicType'),
});

export default connect(mapStateToProps)(BasePaySection);
