// ©2024 Austin App House. All rights reserved.
import { SubmissionError } from 'redux-form';
import validate from '../validate/tests';
import Notification from '../../../components/notification';
import { submitCertificationTests } from '../../../storage/actions/profile';

const testsOnSubmit = async (values, dispatch, props) => {
  const validationErrors = validate(props);
  if (Object.keys(validationErrors).length) throw new SubmissionError(validationErrors);
  if (!props.dirty) return Notification('warning', { message: 'None changes found!' });
  const {
    certificationTypeId,
  } = props;
  await dispatch(submitCertificationTests(
    certificationTypeId,
    values,
    props.history,
    props.reset,
  ));
  return {};
};

export default testsOnSubmit;
