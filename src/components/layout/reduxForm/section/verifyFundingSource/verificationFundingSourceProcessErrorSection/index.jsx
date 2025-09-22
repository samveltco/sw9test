// ©2024 Austin App House. All rights reserved.
import React from 'react';
import CriticalErrorMessage from './CriticalErrorMessage';
import SimpleError from './SimpleError';

const VerificationFundingSourceProcessErrorSection = ({ error }) => {
  switch (error) {
    case 'Too many attempts.': return <CriticalErrorMessage />;
    default: return <SimpleError message={error} />;
  }
};

export default VerificationFundingSourceProcessErrorSection;
