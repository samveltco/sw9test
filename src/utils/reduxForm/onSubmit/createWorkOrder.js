// ©2024 Austin App House. All rights reserved.
import { SubmissionError } from 'redux-form';
import {
  editWorkOrderDetails,
  createWorkOrder,
  createWorkOrderTemplate,
} from '../../../store/actions/workOrdersActions';
import validate from '../validate/createWorkOrderOnSubmit';
import { getLocalISODate } from '../../getDateWithOffset';

const createWorkOrderReduxForm = async (values, dispatch, props) => {
  console.log(values)
  const validationErrors = validate(values);
  console.log(validationErrors)
  if (Object.keys(validationErrors).length) throw new SubmissionError(validationErrors);

  const pathname = `/dashboard/${props.activeTab}`;
  const project = values.projectInfo && values.projectInfo.value
    ? { projectId: values.projectInfo.value } : {};
  const woCompany = values.woCompanyInfo && values.woCompanyInfo.value
    ? { woCompanyId: values.woCompanyInfo.value } : {};
  const templateId = props.templateId
    ? { templateId: props.templateId } : {};
  // const startDate = combineDateAndTime(values.startDate, values.startTime);
  const startDate = getLocalISODate(values.startDate, true, true);
  const endDate = getLocalISODate(values.endDate, true, true);
  const fd = new FormData();
  const order = {
    ...values,
    startDate,
    endDate,
    ...project,
    ...woCompany,
    ...templateId,
    toolsId: values.workTypes.map(item => item.value),
    teamId: values.teams ? values.teams.value : null,
  };

  fd.append('values', JSON.stringify(order));
  if (values.documents?.length && values.canUpload) {
    values.documents.forEach(doc => {
      if (typeof doc === 'string') {
        fd.append('oldDocuments', doc);
      } else {
        fd.append('documents', doc);
      }
    });
  }
  if (props?.currentWorkOrder?._id) {
    fd.append('workOrderId', props?.currentWorkOrder?._id);
    dispatch(editWorkOrderDetails(
      fd,
      props.history,
      pathname,
    ));
  } else {
    if (values.isCreateTemplate) {
      fd.append('name', values.templateName);
      const templateId = await dispatch(createWorkOrderTemplate(fd, props.history, true));
      if (!templateId) return {};
      fd.delete('values');
      fd.append('values', JSON.stringify({
        ...order,
        templateId,
      }));
    }
    dispatch(createWorkOrder(fd, props.history, pathname));
  }
  return {};
};

export default createWorkOrderReduxForm;
