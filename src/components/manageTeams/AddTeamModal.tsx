import React from 'react';
import getClients from "../../utils/api/get/getClients";

interface AddTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (payload: { id?: string; name: string; members: string[] }) => void;
    editingTeam?: { id: string; name: string; membersIds?: string[] };
}

const AddTeamModal: React.FC<AddTeamModalProps> = ({
                                                       isOpen,
                                                       onClose,
                                                       onSave,
                                                       editingTeam,
                                                   }) => {
    const [name, setName] = React.useState('');
    const [selected, setSelected] = React.useState<number[]>([]);
    const [clients, setClients] = React.useState<any[]>([]);
    const popupRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (isOpen) {
            const fetchClients = async () => {
                const data = await getClients();
                setClients(data);
            };
            fetchClients();
        }
    }, [isOpen]);

    React.useEffect(() => {
        if (isOpen && editingTeam) {
            setName(editingTeam.name);

            const selectedIndexes = clients
                .map((c, idx) => (editingTeam.membersIds?.includes(c.userId) ? idx : -1))
                .filter(idx => idx !== -1);

            setSelected(selectedIndexes);
        } else if (isOpen) {
            setName('');
            setSelected([]);
        }
    }, [isOpen, editingTeam, clients]);

    React.useEffect(() => {
        if (isOpen && popupRef.current) {
            requestAnimationFrame(() => {
                popupRef.current?.classList.add('showed');
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const toggle = (idx: number, checked: boolean) => {
        setSelected(prev => (checked ? [...prev, idx] : prev.filter(i => i !== idx)));
    };

    const save = () => {
        const chosen = selected.map(i => clients[i]?.userId);
        onSave({ id: editingTeam?.id, name, members: chosen });
    };

    return (
        <div className="popup_block" ref={popupRef}>
            <div className="popup_container">
                <div className="popup_head">
                    <div className="popup_title">
                        {editingTeam ? "Edit team" : "Add team"}
                    </div>
                    <button className="close_btn icon_close" aria-label="close" onClick={onClose}></button>
                </div>
                <div className="popup_body">
                    <div className="field_row">
                        <div className="field_name">
                            <label htmlFor="teamName">Team name</label>
                        </div>
                        <div className="field_block">
                            <input
                                id="teamName"
                                type="text"
                                name="teamName"
                                maxLength={50}
                                placeholder="Type here..."
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field_row">
                        <div className="field_name" style={{ display: 'flex', alignSelf: 'start' }}>
                            <label>Members</label>
                        </div>
                        <div className="checkbox_list" style={{ display: "flex", flexDirection: "column" }}>
                            {clients.map((client, idx) => (
                                <label className="check_btn" key={client._id}>
                                    <input
                                        type="checkbox"
                                        name={`member_${idx}`}
                                        checked={selected.includes(idx)}
                                        onChange={e => toggle(idx, e.target.checked)}
                                    />
                                    {client.name}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="popup_footer">
                        <button className="standard_btn dark_btn" aria-label="cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="standard_btn light_btn" aria-label="save" onClick={save}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTeamModal;
