// ©2024 Austin App House. All rights reserved.
import { SubmissionError } from 'redux-form';
import {
  createWorkOrderTemplate,
  editWorkOrderTemplate,
} from '../../../storage/actions/workOrdersActions';
import validate from '../validate/createWorkOrderTemplateOnSubmit';

const createWorkOrderTemplateOnSubmit = (values, dispatch, props) => {
  if (!Object.keys(values).length) throw new SubmissionError({ _error: 'Empty Template!' });
  const validationErrors = validate(values);
  if (Object.keys(validationErrors).length) throw new SubmissionError(validationErrors);
  const project = values.projectInfo && values.projectInfo.value
    ? { projectId: values.projectInfo.value } : {};
  const woCompany = values.woCompanyInfo && values.woCompanyInfo.value
    ? { woCompanyId: values.woCompanyInfo.value } : {};
  const toolsId = values.workTypes && values.workTypes.length
    ? values.workTypes.map(item => item.value) : [];
  const fd = new FormData();
  fd.append('name', values.name);
  fd.append('values', JSON.stringify({
    ...values,
    ...project,
    ...woCompany,
    toolsId,
    teamId: values.teams ? values.teams.value : null,
  }));
  if (values.documents?.length) {
    values.documents.forEach(doc => {
      if (typeof doc === 'string') {
        fd.append('oldDocuments', doc);
      } else {
        fd.append('documents', doc);
      }
    });
  }
  if (props?.currentTemplate?.templateId) {
    fd.append('templateId', props?.currentTemplate?.templateId);
    dispatch(editWorkOrderTemplate(fd, props.history));
  } else {
    dispatch(createWorkOrderTemplate(fd, props.history));
  }
  return {};
};

export default createWorkOrderTemplateOnSubmit;
