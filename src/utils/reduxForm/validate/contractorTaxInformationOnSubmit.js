// ©2024 Austin App House. All rights reserved.
import Notification from '../../../components/notification';

const contractorTaxInformationOnSubmit = (values) => {
  const result = {};
  if (!values.address1 || !values.state?.label || !values.city) {
    result.address1 = 'Please enter correct address';
    result.state = 'Please enter correct address';
    result.city = 'Please enter correct address';
    Notification('warning', {
      message: 'Please enter correct address',
    });
  }
  const zi = values.country?.label === 'Canada'
    ? /^([A-CEGHJ-NPRSTVXY]\d[A-CEGHJ-NPRSTV-Z][ -]?\d[A-CEGHJ-NPRSTV-Z]\d)$/
    : /(^\d{5}$)|(^\d{5}-\d{5}$)/;
  if (!zi.test(values.zipCode)) {
    result.zipCode = 'Enter valid zipcode';
    Notification('warning', {
      message: 'Enter valid zipcode',
    });
  }
  if (!values.nameAssociatedWithTIN) {
    result.nameAssociatedWithTIN = 'Please enter correct Company Name';
    Notification('warning', {
      message: 'Please enter correct Company Name',
    });
  }

  if (!values.businessName) {
    result.businessName = 'Please enter correct Business Name';
    Notification('warning', {
      message: 'Please enter correct Business Name',
    });
  }

  const idType = values.isEINDisplayed ? 'EIN' : 'SSN';
  if (!values[idType]) {
    result[idType] = `Please enter correct ${idType}`;
    Notification('warning', {
      message: `Please enter correct ${idType}`,
    });
  }

  if (!values.entityType) {
    result.entityType = 'Please enter correct Entity Type';
    Notification('warning', {
      message: 'Please enter correct Entity Type',
    });
  }

  if (!values.isTaxInfoCorrect) {
    result.isTaxInfoCorrect = 'Please confirm that the tax information was entered correctly';
    Notification('warning', {
      message: 'Please confirm that the tax information was entered correctly',
    });
  }

  return result;
};

export default contractorTaxInformationOnSubmit;
