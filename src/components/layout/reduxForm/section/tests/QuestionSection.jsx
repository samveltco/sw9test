// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { Field } from 'redux-form';
import RadioGroupField from '../../customFields/RadioGroupField';

const options = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

const QuestionSection = ({ test }) => (
  <Field
    name={test.question}
    component={RadioGroupField}
    type="radiobox"
    label={test.question}
    options={
      test?.answers?.length > 0
        ? test.answers.map((answer, i) => ({
          label: `${options[i]}. ${answer}`,
          value: answer,
        }))
        : []
    }
    className="flex-column"
    inputClassName="text-align-left"
    paddingBottomClassName="no-paddings"
  />
);

export default QuestionSection;
