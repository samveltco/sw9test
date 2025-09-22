// ©2024 Austin App House. All rights reserved.
import React, { useEffect, useState } from 'react';
import { MDBCol } from 'mdbreact';
import { connect } from 'react-redux';
import { Field, formValueSelector, change } from 'redux-form';
import InputField from '../../../customFields/InputField';
import { fetchCountries, fetchStatesOfCountry } from '../../../../../../storage/actions/workOrdersActions';
import ReactSelectField from '../../../customFields/ReactSelectField';
import findOption from '../../../../../../utils/addressSection/findOption';
import handlerValidateZipCode from '../../../../../../utils/addressSection/handlerValidateZipCode';

const contractorTaxInformationReduxFormSelector = formValueSelector('contractorTaxInformationReduxForm');

const AddressSection = ({
  selectedState,
  country,
  change,
  fetchCountries,
  fetchStatesOfCountry,
}) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const getStates = async countryId => {
    const newStates = await fetchStatesOfCountry(countryId);
    setStates(newStates);
    if (!newStates.some(item => (
      item.isoCode === selectedState?.value
      || item.isoCode === selectedState?.label
      || item.label === selectedState?.label
    ))) {
      change('contractorTaxInformationReduxForm', 'state', '');
    } else if (!selectedState?.value || selectedState?.label) {
      const newState = findOption(newStates, ['label', 'value'], selectedState?.label, selectedState);
      change('contractorTaxInformationReduxForm', 'state', newState);
    }
  };

  const getCountries = async () => {
    const newCountriesList = await fetchCountries();
    const newCountries = newCountriesList.map(item => ({
      ...item, value: item.isoCode, label: item.name,
    }));
    setCountries(newCountries);
    if (newCountries.length && !country?.value && !country?.label) {
      const newCountry = findOption(newCountries, ['name'], 'United States');
      change('contractorTaxInformationReduxForm', 'country', newCountry);
    } else if (newCountries.length && !country?.value && country?.label) {
      const newCountry = findOption(newCountries, ['name'], country?.label, country);
      change('contractorTaxInformationReduxForm', 'country', newCountry);
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!countries.length) getCountries();
    if (country?.value) getStates(country.value);
  }, [country]);

  return (
    <>
      <MDBCol md="6">
        <Field
          name="address1"
          component={InputField}
          type="text"
          placeholder="Street Address"
          label="Address1:"
          required
          className="font-size-08"
          inputClassName="max-width-half"
        />
      </MDBCol>
      <MDBCol md="6">
        <Field
          name="address2"
          component={InputField}
          type="text"
          placeholder="Bldg, Suite, Etc."
          label="Address2:"
          className="font-size-08"
          inputClassName="max-width-half"
        />
      </MDBCol>
      <MDBCol md="6">
        <Field
          name="city"
          component={InputField}
          type="text"
          placeholder="City"
          label="City:"
          required
          className="font-size-08"
          inputClassName="max-width-half"
        />
      </MDBCol>
      <MDBCol md="6">
        <Field
          name="state"
          component={ReactSelectField}
          placeholder="State"
          options={states}
          required
          label="State:"
          className="font-size-08"
          inputClassName="min-width-half"
          customSelectStyleType="white"
        />
      </MDBCol>
      <MDBCol md="6">
        <Field
          name="zipCode"
          component={InputField}
          type="text"
          placeholder="Zip / Postal Code"
          label="Zip:"
          required
          className="font-size-08"
          inputClassName="max-width-half"
          validate={value => handlerValidateZipCode(value, country)}
        />
      </MDBCol>
    </>
  );
};

const mapDispatchToProps = {
  change,
  fetchCountries,
  fetchStatesOfCountry,
};

const mapStateToProps = state => ({
  country: contractorTaxInformationReduxFormSelector(state, 'country'),
  selectedState: contractorTaxInformationReduxFormSelector(state, 'state'),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressSection);
