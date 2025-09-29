// ©2024 Austin App House. All rights reserved.
import React, { useRef, useState } from 'react';
import Notification from '../../../notification';
import { isEmailValid, normalizePhoneInput } from '../../../../utils/validators';

const ContractorInfoAddEdit = ({
  contractorToEdit = {},
  returnContractor,
  closeEdit,
  inputClassName,
}) => {
  const [mobile, setMobile] = useState(contractorToEdit?.mobile || '');
  const [officePhone, setOfficePhone] = useState(contractorToEdit?.ofc_phn || '');

  const formRef = useRef();

  const onSubmit = (event) => {
    event.preventDefault();
    const {
      fname,
      role,
      email,
      // eslint-disable-next-line camelcase
      ofc_phn,
      mobile,
    } = formRef.current;
    if (!isEmailValid(email.value)) {
      Notification('error', { message: 'Invalid email address!' });
    } else {
      const result = {
        fname: (fname && fname.value ? fname.value.trim() : ''),
        role: (role && role.value ? role.value.trim() : ''),
        email: (email && email.value ? email.value.trim() : ''),
        ofc_phn: (ofc_phn && ofc_phn.value ? ofc_phn.value.trim() : ''),
        mobile: (mobile && mobile.value ? mobile.value.trim() : ''),
      };
      returnContractor(result);
      formRef.current.reset();
      setMobile('');
      setOfficePhone('');
    }
  };

  return (
    <form ref={formRef} className="flex-box contact-form">
      <div className="fields_group">

        <div className="field_col">
          <label className="field_name" htmlFor="fname">Name</label>
          <div className="field_block">
            <input type="text" name="fname" id="fname" maxLength={50} defaultValue={contractorToEdit.fname || ''} placeholder="Name" />
          </div>
        </div>
       
        <div className="field_col">
          <label className="field_name" htmlFor="role">Role</label>
          <div className="field_block">
            <input
              type="text"
              className={`small-input border-none-with-padding full-width ${inputClassName || ''}`}
              name="role"
              placeholder="Role"
              defaultValue={contractorToEdit.role}
            />
          </div>
        </div>
        <div className="field_col">
          <label className="field_name" htmlFor="email">Email</label>
          <div className="field_block">
            <input
              type="email"
              className={`small-input border-none-with-padding full-width ${inputClassName || ''}`}
              name="email"
              placeholder="Email"
              defaultValue={contractorToEdit.email}
              required
            />
          </div>
        </div>
        <div className="field_col">
          <label className="field_name" htmlFor="ofc_phn">Office Phone</label>
          <div className="field_block">
            <input
              type="phone"
              className={`small-input border-none-with-padding full-width ${inputClassName || ''}`}
              name="ofc_phn"
              placeholder="Office Phone"
              value={officePhone}
              onChange={event => setOfficePhone(normalizePhoneInput(event.target.value))}
            />
          </div>
        </div>
        <div className="field_col">
          <label className="field_name" htmlFor="mobile">Mobile</label>
          <div className="field_block">
            <input
              type="phone"
              className={`small-input border-none-with-padding full-width ${inputClassName || ''}`}
              name="mobile"
              placeholder="Mobile"
              value={mobile}
              onChange={event => setMobile(normalizePhoneInput(event.target.value))}
            />
          </div>
        </div>
        <div className="add_btns" style={{ justifyContent: 'center' }}>
          {
            contractorToEdit.email
              ? (
                <>
                  <button type="button" className="icon_btn" onClick={onSubmit} aria-label="save">
                    ✓
                  </button>
                  <button type="button" className="icon_btn" onClick={closeEdit} aria-label="close">
                    ✕
                  </button>
                </>
              )
              : <button type="button" className="standard_btn icon_plus" onClick={onSubmit}>Add</button>
          }
        </div>
      </div>
    </form>
  );
};

export default ContractorInfoAddEdit;


