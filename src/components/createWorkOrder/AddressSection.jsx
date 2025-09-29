import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, change } from 'redux-form';
import { fetchCountries, fetchStatesOfCountry } from '../../store/actions/workOrdersActions';
import findOption from '../../utils/addressSection/findOption';
import InputField from '../layout/reduxForm/customFields/InputField';
import CustomSelect from '../Select';
import handlerValidateZipCode from '../../utils/addressSection/handlerValidateZipCode';
import ReactSelectField from '../layout/reduxForm/customFields/ReactSelectField';

const createWorkOrderReduxFormSelector = formValueSelector('createWorkOrderReduxForm');

const AddressSection = ({
  selectedState,
  country,
  change,
  fetchCountries,
  fetchStatesOfCountry,
  isRemote
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
      change('createWorkOrderReduxForm', 'state', '');
    } else if (!selectedState?.value || selectedState?.label) {
      const newState = findOption(newStates, ['label', 'value'], selectedState?.label, selectedState);
      change('createWorkOrderReduxForm', 'state', newState);
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
      change('createWorkOrderReduxForm', 'country', newCountry);
    } else if (newCountries.length && !country?.value && country?.label) {
      const newCountry = findOption(newCountries, ['name'], country?.label, country);
      change('createWorkOrderReduxForm', 'country', newCountry);
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!countries.length) getCountries();
    if (country?.label) getStates(country.label);
  }, [country]);

  if (!countries.length) return null;
  return (
    <>
    <div className="fields_group">
      <div className="group_subtitle">Site Address</div>
      <div className="field_col">
        <label className="field_name" htmlFor="street_address">Street Address*</label>
        <div className="field_block">
          <Field
            type="text"
            name="address1"
            id="street_address"
            maxLength={50}
            placeholder="Street Address"
            component={InputField}
          />
        </div>
      </div>
      <div className="field_col">
        <label className="field_name" htmlFor="bidg_suite">Bldg, Suite, Etc.</label>
        <div className="field_block">
          <Field
            type="text"
            name="address2"
            id="bidg_suite"
            maxLength={50}
            placeholder="Bldg, Suite, Etc."
            component={InputField}
          />
        </div>
      </div>
      <div className="field_col">
        <label className="field_name" htmlFor="city">City</label>
        <div className="field_block">
          <Field
            type="text"
            name="city"
            id="city"
            maxLength={50}
            placeholder="City"
            component={InputField}
          />
        </div>
      </div>
      <div className="field_col">
        <label className="field_name" htmlFor="state">State</label>
        <Field
          type="text"
          name="state"
          id="state"
          maxLength={50}
          placeholder="State"
          component={ReactSelectField}
          options={states}
        />
      </div>
      <div className="field_col">
        <label className="field_name" htmlFor="zip">Zip</label>
        <div className="field_block">
          <Field
            name="zipCode"
            component={InputField}
            type="text"
            placeholder="Zip / Postal Code"
            label=""
            required={!isRemote}
            disabled={isRemote}
            validate={value => handlerValidateZipCode(value, country)}
          />
        </div>
      </div>
      <div className="field_col">
        <label className="field_name" htmlFor="country">Country</label>
        <Field
          name="country"
          id="country"
          maxLength={50}
          placeholder="Country"
          component={ReactSelectField}
          options={countries}
          defaultValue={countries[1]}
          required={!isRemote}
          disabled={isRemote}
        />
      </div>
    </div>
    
    </>
  )
};

const mapDispatchToProps = {
  change,
  fetchCountries,
  fetchStatesOfCountry,
};

const mapStateToProps = state => ({
  country: createWorkOrderReduxFormSelector(state, 'country'),
  selectedState: createWorkOrderReduxFormSelector(state, 'state'),
  isRemote: createWorkOrderReduxFormSelector(state, 'isRemote'),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressSection);
