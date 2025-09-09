// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { Form, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import SectionContainerOneCol from '../SectionContainerOneCol';
import QuestionSection from './section/tests/QuestionSection';
import ControlButtonsSection from './section/tests/ControlButtonsSection';

let TestsReduxForm = ({
  handleSubmit,
  tests,
}) => {
  const preventSubmitOnEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onKeyPress={preventSubmitOnEnter}
    >
      <SectionContainerOneCol>
        {
          tests.map(test => (
            <QuestionSection
              key={test.question}
              test={test}
            />
          ))
        }
      </SectionContainerOneCol>
      {
        tests?.length > 0
          ? <ControlButtonsSection />
          : <></>
      }
    </Form>
  );
};

TestsReduxForm = reduxForm({
  form: 'testsReduxForm',
})(TestsReduxForm);

export default withRouter(TestsReduxForm);
