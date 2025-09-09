// ©2024 Austin App House. All rights reserved.
import Notification from '../../../components/notification';
import { getTimeIn24Format } from '../../getTimeIn24Format';

const createWorkOrderReduxFormOnSubmit = (values) => {
  const result = {};
  if (
    (
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
  if (!values?.contactInfo?.length) {
    result.contactInfo = 'Please enter Contact';
    Notification('warning', {
      message: 'Please enter Contact',
    });
  }
  if (!(Number(values.amount) > 0) || !(Number(values.quantity) > 0)) {
    result.amount = 'Please enter correct amount and quantity in base pay section';
    result.quantity = 'Please enter correct amount and quantity in base pay section';
    Notification('warning', {
      message: 'Please enter correct amount and quantity in base pay section',
    });
  }
  if (!values.customTagId || !values.title) {
    result.customTagId = 'Please enter work order title and id';
    result.title = 'Please enter work order title and id';
    Notification('warning', {
      message: 'Please enter work order title and id',
    });
  }
  if (!values.startDate || !values.startTime || !values.endDate) {
    result.startTime = 'Please enter correct start time and date';
    result.startDate = 'Please enter correct start time and date';
    result.endDate = 'Please enter correct end date';
    Notification('warning', {
      message: 'Please enter correct start time and date',
    });
    Notification('warning', {
      message: 'Please enter correct end date',
    });
  } else {
    const endDate = new Date(values.endDate).setHours(24, 0, 0, -1);
    const startDate = getTimeIn24Format(new Date(values.startDate), values.startTime);
    if ((endDate - startDate) < 0) {
      result.endDate = 'End date is earlier than the start date.';
      Notification('warning', {
        message: 'End date is earlier than the start date.',
      });
    }
  }
  if(values.isRemote && !values.projectManager && !values.projecctCoordinator && !values.projectAdministrator && !values.otherMisc) {
    result.isRemote = 'please enter certification type';
    Notification('warning', {
      message: 'please enter certification type',
    });
  }
  if ((!values.address1 || !values.state?.label || !values.city) && !values.isRemote) {
    result.address1 = 'Please enter correct address';
    result.state = 'Please enter correct address';
    result.city = 'Please enter correct address';
    Notification('warning', {
      message: 'Please enter correct address',
    });
  }
  if (!values.siteId || !values.siteName) {
    result.siteId = 'Please enter site id and site name';
    result.siteName = 'Please enter site id and site name';
    Notification('warning', {
      message: 'Please enter site id and site name',
    });
  }
  if (!values.workTypes?.length) {
    result.workTypes = 'Please choose your work type';
    Notification('warning', {
      message: 'Please choose your work type',
    });
  }
  if (!values.description) {
    result.description = 'Please enter work description';
    Notification('warning', {
      message: 'Please enter work description',
    });
  }
  const zi = values.country?.label === 'Canada'
    ? /^([A-CEGHJ-NPRSTVXY]\d[A-CEGHJ-NPRSTV-Z][ -]?\d[A-CEGHJ-NPRSTV-Z]\d)$/
    : /(^\d{5}$)|(^\d{5}-\d{5}$)/;
  if (!zi.test(values.zipCode) && !values.isRemote) {
    result.zipCode = 'Enter valid zipcode';
    Notification('warning', {
      message: 'Enter valid zipcode',
    });
  }
  if (values.variableAmount && !(Number(values.variableAmount) >= 0)) {
    result.variableAmount = 'Variable amount can\'t be negative';
    Notification('warning', {
      message: 'Variable amount can\'t be negative',
    });
  }
  if (Number(values.variableAmount) && (+values.maxQuantity <= +values.variablePayAfter)) {
    result.maxQuantity = 'Max Qty mast be greater than After';
    Notification('warning', {
      message: 'Max Qty mast be greater than After',
    });
  }
  if (values.isCreateTemplate && !values.templateName) {
    result.templateName = 'Enter Template Name';
    Notification('warning', {
      message: 'Enter Template Name',
    });
  }
  return result;
};

export default createWorkOrderReduxFormOnSubmit;
