import React from 'react';

interface AddCustomFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: { name: string }) => void;
}

const AddCustomFieldModal: React.FC<AddCustomFieldModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = React.useState('');
  const popupRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (isOpen && popupRef.current) {
      // Next frame to ensure transition runs
      requestAnimationFrame(() => {
        popupRef.current && popupRef.current.classList.add('showed');
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="popup_block" ref={popupRef}>
      <div className="popup_container">
        <div className="popup_head">
          <div className="popup_title">Create custom field</div>
          <button className="close_btn icon_close" aria-label="close" onClick={onClose}></button>
        </div>
        <div className="popup_body">
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="name">Name</label>
            </div>
            <div className="field_block">
              <input id="name" type="text" name="name" maxLength={50} placeholder="Type her..." value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div className="popup_footer">
            <button className="standard_btn dark_btn" aria-label="cancel" onClick={onClose}>Cancel</button>
            <button className="standard_btn light_btn" aria-label="save as draft" onClick={() => onSave({ name })}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomFieldModal; 