import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Select from '../Select';
import { uniqBy } from 'lodash';
import createGroup from '../../utils/api/post/createContractorGroup';
import { Form, Field, reduxForm } from 'redux-form';
import getGroup from '../../utils/api/get/getContractorGroup';
import updateGroup from '../../utils/api/patch/updateContractorGroup';
import InputField from '../layout/reduxForm/customFields/InputField';

let AddGroupModal = ({ isOpen, onClose, onSave, handleSubmit, submitting, selectedGroup, initialize }) => {
  const popupRef = useRef(null);
  const [contractors, setContractors] = useState([]);
  const [selectedContractors, setSelectedContractors] = useState([]);
  const [group, setGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && popupRef.current) {
      requestAnimationFrame(() => {
        popupRef.current && popupRef.current.classList.add('showed');
      });
      if (selectedGroup) {
        setIsLoading(true);
        getGroup(selectedGroup)
          .then(res => {
            setGroup(res);
            initialize && initialize({ groupName: res?.name || '' });
          })
          .finally(() => setIsLoading(false));
      } 
      fetchContractors();
      
    }
  }, [isOpen, selectedGroup]);


  const fetchContractors = () => {

    axios.get('/api/users/contractors')
      .then((res) => {
        const newContractorsList = res.data.contractors || [];
        setContractors(newContractorsList.map((contractor) => (
          {
            value: contractor,
            label: `${contractor.name} - ${contractor.unique_id} - ${contractor.address || '!?ADDRESS!?'}, ${contractor.city?.label || '!?CITY!?'}, ${contractor.state?.label || '!?STATE!?'} ${contractor.zipcode || '!?ZIPCODE!?'}`,
          }
        )));
        // console.log(group)
        if (group) {
          setSelectedContractors(newContractorsList.filter(contractor => group.groupUsers.some(user => user.userId === contractor.userId)).map(contractor => (
            {
              value: contractor,
              label: `${contractor.name} - ${contractor.unique_id} - ${contractor.address || '!?ADDRESS!?'}, ${contractor.city?.label || '!?CITY!?'}, ${contractor.state?.label || '!?STATE!?'} ${contractor.zipcode || '!?ZIPCODE!?'}`,
            }
          )));
          setIsLoading(false);
        }

      });
  };

  const onSubmit = async (values) => {
    selectedGroup ? await updateGroup({
      _id: selectedGroup,
      name: values?.groupName?.trim(),
      contractorIds: selectedContractors.map(contractor => contractor.value.userId),
    }) : await createGroup({
      name: values?.groupName?.trim(),
      contractorIds: selectedContractors.map(contractor => contractor.value.userId),
    });

    onClose();
  };


  if (!isOpen) return null;

  return (
    <div className="popup_block" ref={popupRef}>
      <div className="popup_container">
        <div className="popup_head">
          <div className="popup_title">Add group</div>
          <button className="close_btn icon_close" aria-label="close" onClick={onClose}></button>
        </div>
        {isLoading ? <div className="popup_loader">Loading...</div> : (
        <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="popup_body">
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="groupName">Group name</label>
            </div>
            <div className="field_block">
              <Field
                component={InputField}
                id="groupName"
                type="text"
                name="groupName"
                maxLength={50}
                placeholder="Type here..."
              />
            </div>
          </div>
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="groupType">Group type</label>
            </div>
            <div className="field_block">
              <Select
                options={contractors}
                value={{ label: 'Type to find contractors!' }}
                placeholder="Type to find contractors!"

                onChange={(e) => setSelectedContractors(prev => uniqBy([...prev, e], 'value.userId'))}
              />

            </div>
          </div>
          <div className="field_row" style={{width: 'max-content'}}>
            <table className="custom_table">
              <tbody>
                {selectedContractors.map((contractor) => (
                  <tr key={contractor.value.userId}>
                    <td>{contractor.label}</td>
                    <td>
                      <div className='row_block'>
                        <a
                          href="#"
                          className="icon_delete"
                          aria-label="close"
                          onClick={() =>
                            setSelectedContractors(prev => prev.filter(item => item.value.userId !== contractor.value.userId))
                          }>close</a>
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          <div className="popup_footer">
            <button className="standard_btn dark_btn" aria-label="cancel" type="button" onClick={onClose}>Cancel</button>
            <button
              className="standard_btn light_btn"
              aria-label="save"
              type="submit"
              disabled={submitting}
            >
              Save
            </button>
            </div>
          </div>
          </Form>
        )}
      </div>
    </div>
  );
};

AddGroupModal = reduxForm({
  form: 'addContractorGroupForm',
})(AddGroupModal);

export default AddGroupModal; 