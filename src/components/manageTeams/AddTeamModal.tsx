import React from 'react';

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: { name: string; members: string[] }) => void;
}

const mockMembers = new Array(8).fill('Stephanie Bledsoe');

const AddTeamModal: React.FC<AddTeamModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = React.useState('');
  const [selected, setSelected] = React.useState<number[]>([]);
  const popupRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (isOpen && popupRef.current) {
      requestAnimationFrame(() => {
        popupRef.current && popupRef.current.classList.add('showed');
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggle = (idx: number, checked: boolean) => {
    setSelected((prev) => (checked ? [...prev, idx] : prev.filter((i) => i !== idx)));
  };

  const save = () => onSave({ name, members: selected.map((i) => mockMembers[i]) });

  return (
    <div className="popup_block" ref={popupRef}>
      <div className="popup_container">
        <div className="popup_head">
          <div className="popup_title">Add team</div>
          <button className="close_btn icon_close" aria-label="close" onClick={onClose}></button>
        </div>
        <div className="popup_body">
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="teamName">Team name</label>
            </div>
            <div className="field_block">
              <input id="teamName" type="text" name="teamName" maxLength={50} placeholder="Type her..." value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div className="field_row">
            <div className="field_name">
              <label htmlFor="Members">Members</label>
            </div>
            <div className="checkbox_list">
              {mockMembers.map((m, idx) => (
                <label className="check_btn" key={idx}>
                  <input type="checkbox" name={`member_${idx}`} onChange={(e) => toggle(idx, e.target.checked)} />
                  {m}
                </label>
              ))}
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

export default AddTeamModal; 