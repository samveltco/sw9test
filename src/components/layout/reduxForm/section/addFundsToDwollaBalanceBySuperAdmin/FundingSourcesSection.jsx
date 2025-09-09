// ©2024 Austin App House. All rights reserved.
import React, { useEffect, useState } from 'react';
import { Field } from 'redux-form';
import { MDBCol, MDBRow } from 'mdbreact';
import ReactSelectField from '../../customFields/ReactSelectField';
import getFundingSourcesList from '../../../../../utils/api/get/getFundingSourcesList';

const FundingSourcesSection = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fundingSources, setFundingSources] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    const newFundingSourcesList = await getFundingSourcesList();
    setFundingSources(newFundingSourcesList);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <MDBRow className="h-paddings-half">
        <MDBCol className="flex-box flex-column">
          <Field
              name="fundingSource"
              component={ReactSelectField}
              className="flex-column"
              placeholder="Funding Source"
              options={fundingSources}
              label="Use Existing Bank Info"
              customSelectStyleType="white"
              isLoading={isLoading}
              isClearable
              required={props.isRequired ?? true}
          />
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default FundingSourcesSection;
