// ©2024 Austin App House. All rights reserved.
import React, { useEffect, useState } from 'react';
import { MDBCol } from 'mdbreact';
import axios from 'axios';
import { Field } from 'redux-form';
import Notification from '../../../../../notification';
import Loader from '../../../../../dashboard/common/Loader';
import ReactSelectField from '../../../customFields/ReactSelectField';

const ProjectAndCompanyField = ({
  name,
  label,
  linkName,
  addButtonLabel,
  toggleModal,
  className,
  required,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState([]);

  const fetchOptions = async () => {
    setIsLoading(true);
    axios.get(`/api/${linkName}`)
      .then((res) => {
        if (res.data.success) {
          setOptions(res.data.payload.data.map(({ _id, name }) => ({
            value: _id,
            label: name,
          })));
        }
        setIsLoading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('error', error);
        Notification('error', { message: error.response?.data?.message || error.message });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const handlerOpenModal = () => {
    const modalTypeData = {
      name: label,
      linkName,
      options,
      updateData: setOptions,
    };
    toggleModal(true, 'projectAndCompanyControlModal', false, modalTypeData);
  };

  return (
    <MDBCol className={className}>
      <div>
        <label className="no-margins">
          {`Select ${label} - `}
          <span className="requiredField">{required ? '*' : ''}</span>
          {
            addButtonLabel
              ? (
                <button
                  type="button"
                  className="disabled-standard-button-style"
                  style={{ color: '#13b5cc' }}
                  onClick={handlerOpenModal}
                >
                  {addButtonLabel}
                </button>
              )
              : <></>
          }
        </label>
      </div>
      {
        isLoading
          ? <Loader />
          : (
            <Field
              name={name}
              component={ReactSelectField}
              className="flex-column"
              options={options}
            />
          )
      }
    </MDBCol>
  );
};

export default ProjectAndCompanyField;
