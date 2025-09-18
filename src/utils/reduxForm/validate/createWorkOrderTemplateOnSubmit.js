// ©2024 Austin App House. All rights reserved.
import Notification from '../../../components/notification';

const createWorkOrderTemplateOnSubmit = (values) => {
  const result = {};
  if (!values.name) {
    result.name = 'Enter Template Name';
    Notification('warning', {
      message: 'Enter Template Name',
    });
  }
  if (
    (
      values.percentCommunication
      || values.percentWork
      || values.percentDeliverables
    )
    && (
      parseFloat(values.percentCommunication)
      + parseFloat(values.percentWork)
      + parseFloat(values.percentDeliverables)
    ) !== 100
  ) {
    result.percentCommunication = 'Soft Skils, Work and Deliverables should total to 100%.';
    result.percentWork = 'Soft Skils, Work and Deliverables should total to 100%.';
    result.percentDeliverables = 'Soft Skils, Work and Deliverables should total to 100%.';
    Notification('warning', {
      message: 'Soft Skils, Work and Deliverables should total to 100%.',
    });
  }
  if (!(Number(values.amount) > 0) || !(Number(values.quantity) > 0)) {
    result.amount = 'Please enter correct amount and quantity in base pay section';
    result.quantity = 'Please enter correct amount and quantity in base pay section';
    Notification('warning', {
      message: 'Please enter correct amount and quantity in base pay section',
    });
  }
  if (values.variableAmount && !(Number(values.variableAmount) > 0)) {
    result.variableAmount = 'Variable amount can\'t be negative';
    Notification('warning', {
      message: 'Variable amount can\'t be negative',
    });
  }
  if (
    values.variableAmount
    && (
      !Number(values.variablePayAfter)
      || !Number(values.maxQuantity)
      || (Number(values.maxQuantity) <= Number(values.variablePayAfter))
    )
  ) {
    result.maxQuantity = 'Max Qty mast be greater than After';
    Notification('warning', {
      message: 'Max Qty mast be greater than After',
    });
  }
  return result;
};

export default createWorkOrderTemplateOnSubmit;
