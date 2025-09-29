// ©2024 Austin App House. All rights reserved.
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Field, change } from 'redux-form';
import { useSelector, useDispatch } from 'react-redux';
import ReactSelectField from '../layout/reduxForm/customFields/ReactSelectField';

const TeamSection = ({ formName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState([]);

  const dispatch = useDispatch();

  const { teamId } = useSelector((state) => state.form[`${formName}`]).values;

  const fetchOptions = () => {
    setIsLoading(true);
    axios.get('/api/teams')
      .then((res) => {
        if (res.data.success) {
          setOptions(
            res.data.teams.map(({ _id, name }) => {
              if (_id === teamId) {
                dispatch(change(formName, 'teams', { value: _id, label: name }));
              }
              return ({
                value: _id,
                label: name,
              });
            }),
          );
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <>
      <div className="field_col">
      <label className="field_name" htmlFor="notification_team">Select Team for Notification</label>


      <div className="field_block" style={{zIndex: '2'}}>
        {
          isLoading
            ? (
              <div>Loading...</div>
            )
            : (
              <Field
                name="teams"
                component={ReactSelectField}
                className="flex-column"
                options={options}
                isClearable
              />
            )
        }
      </div>
      </div>
    </>

  );
};

export default TeamSection;
