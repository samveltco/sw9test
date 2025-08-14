import React from 'react';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: { firstName: string; lastName: string; email: string; phone: string; role: string }) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = React.useState({ firstName: '', lastName: '', email: '', phone: '', role: '' });
  const popupRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (isOpen && popupRef.current) {
      requestAnimationFrame(() => {
        popupRef.current && popupRef.current.classList.add('showed');
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const save = () => onSave(form);

  return (
    <div className="popup_block" ref={popupRef}>
      <div className="popup_container">
        <div className="popup_head">
          <div className="popup_title">Add user</div>
          <button className="close_btn icon_close" aria-label="close" onClick={onClose}></button>
        </div>
        <div className="popup_body">
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="firstName">First Name*</label>
            </div>
            <div className="field_block">
              <input id="firstName" type="text" name="firstName" maxLength={50} placeholder="Type her..." value={form.firstName} onChange={onChange} />
            </div>
          </div>
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="lastName">Last Name*</label>
            </div>
            <div className="field_block">
              <input id="lastName" type="text" name="lastName" maxLength={50} placeholder="Type her..." value={form.lastName} onChange={onChange} />
            </div>
          </div>
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="email">Email*</label>
            </div>
            <div className="field_block">
              <input id="email" type="text" name="email" maxLength={50} placeholder="Type her..." value={form.email} onChange={onChange} />
            </div>
          </div>
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="phone">Phone number*</label>
            </div>
            <div className="field_block">
              <input id="phone" type="text" name="phone" maxLength={15} placeholder="Type her..." value={form.phone} onChange={onChange} />
            </div>
          </div>
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="role">Role</label>
            </div>
            <div className="field_block">
              <input id="role" type="text" name="role" maxLength={50} placeholder="Type her..." value={form.role} onChange={onChange} />
            </div>
          </div>
          <div className="popup_footer">
            <button className="standard_btn dark_btn" aria-label="cancel" onClick={onClose}>Cancel</button>
            <button className="standard_btn light_btn" aria-label="save as draft" onClick={save}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal; 