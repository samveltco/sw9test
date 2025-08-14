import React from 'react';

interface AddGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: { name: string; type: string }) => void;
}

const AddGroupModal: React.FC<AddGroupModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('');
  const popupRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (isOpen && popupRef.current) {
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
          <div className="popup_title">Add group</div>
          <button className="close_btn icon_close" aria-label="close" onClick={onClose}></button>
        </div>
        <div className="popup_body">
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="groupName">Group name</label>
            </div>
            <div className="field_block">
              <input
                id="groupName"
                type="text"
                name="groupName"
                maxLength={50}
                placeholder="Type her..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="groupType">Group type</label>
            </div>
            <div className="field_block">
              <select
                id="groupType"
                name="groupType"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="1">Value 1</option>
                <option value="2">Value 2</option>
                <option value="3">Value 3</option>
                <option value="4">Value 4</option>
                <option value="5">Value 5</option>
                <option value="6">Value 6</option>
              </select>
            </div>
          </div>

          <div className="popup_footer">
            <button className="standard_btn dark_btn" aria-label="cancel" onClick={onClose}>Cancel</button>
            <button
              className="standard_btn light_btn"
              aria-label="save as draft"
              onClick={() => onSave({ name, type })}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGroupModal; 