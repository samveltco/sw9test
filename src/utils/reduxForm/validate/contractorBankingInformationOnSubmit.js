// ©2024 Austin App House. All rights reserved.
import { isEmailValid, isNameSymbolsOnly } from '../../validators';

const contractorBankingInformationOnSubmit = (values) => {
  const result = {};

  if (!values.bankName.trim()) {
    result.bankName = 'Please enter Bank Name';
  }

  if (!isEmailValid(values.email)) {
    result.email = 'Please enter valid Email';
  }

  if (values.name.trim() === '') {
    result.name = 'Please enter Account Owner Name';
  } else if (!isNameSymbolsOnly(values.name)) {
    result.name = 'The Account Owner Name can only contain letters and characters "-" and "."';
  } else if (values.name.trim() !== values.name) {
    result.name = 'The Account Owner Name can\'t start or end with spaces';
  }

  if (!values.routing) {
    result.routing = 'Please enter Routing';
  }

  if (!values.account) {
    result.account = 'Please enter Account';
  }

  if (!values?.accountType?.value) {
    result.accountType = 'Please select Account Type';
  }

  if (!values?.accountStatus?.value) {
    result.accountStatus = 'Please select Account Status';
  }

  if (!values.acceptTerms) {
    result.acceptTerms = 'Please agree to terms & policies';
  }

  return result;
};

export default contractorBankingInformationOnSubmit;
