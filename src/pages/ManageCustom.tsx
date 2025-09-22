import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ManageCustomTable, {CustomFieldGroup} from '../components/manageCustom/ManageCustomTable';
import AddCustomFieldModal from '../components/manageCustom/AddCustomFieldModal';
import { createCustomField } from "../store/actions/workOrdersActions";
import { useDispatch } from "react-redux";
import getCustomFieldsList from "../utils/api/get/getCoustomFieldsList";
import updateCustomFieldName from "../utils/api/patch/updateCustomFieldName";
import deleteCustomFieldTemplate from "../utils/api/delete/deleteCustomFieldTemplate";

const ManageCustom: React.FC = () => {
    const [groups, setGroups] = useState<CustomFieldGroup[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingField, setEditingField] = useState<CustomFieldGroup | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const fetchedGroups = await getCustomFieldsList('');
                const mappedGroups = fetchedGroups
                    .filter(Boolean)
                    .map((g: any) => ({ id: g._id, name: g.name }));
                setGroups(mappedGroups);
            } catch (err) {
                console.error('Failed to fetch custom fields', err);
            }
        };
        fetchGroups();
    }, []);

    const handleAdd = () => setIsModalOpen(true);
    const handleClose = () => {
        setIsModalOpen(false);
        setEditingField(null);
    };

    const handleSave = async ({ name }: { name: string }) => {
        try {
            if (editingField) {
                const res = await updateCustomFieldName(editingField.id, name);
                if (res.success) {
                    setGroups(prev =>
                        prev.map(g =>
                            g.id === editingField.id ? { ...g, name } : g
                        )
                    );
                    handleClose();
                }
            } else {
                const res = await dispatch<any>(createCustomField(name));
                if (res?.success && res.data?._id) {
                    setGroups(prev => [{ id: res.data._id, name }, ...prev]);
                    handleClose();
                } else {
                    console.error('No id returned from server');
                }
            }
        } catch (err) {
            console.error('Failed to save custom field', err);
        }
    };

    const handleEdit = (id: string) => {
        const field = groups.find(g => g.id === id);
        if (field) {
            setEditingField(field);
            setIsModalOpen(true);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteCustomFieldTemplate(id);
            if (res.success) {
                setGroups(prev => prev.filter(g => g.id !== id));
            } else {
                console.warn('Failed to delete custom field:', res.message);
            }
        } catch (err) {
            console.error('Error deleting custom field:', err);
        }
    };


    return (
        <Layout>
            <div className="welcome_block">
                <div className="welcome_words">
                    Hey <span className="user_name">Mani,</span> welcome back!
                </div>
                <div className="welcome_info">Welcome to The Valyant Group</div>
                <div className="available_funds">Funds Available: $1,268.22</div>
            </div>

            <div className="manage_section">
                <div className="head_section">
                    <h1 className="page_title">Custom Fields</h1>
                    <button
                        className="standard_btn icon_plus orange_btn"
                        aria-label="Create work order"
                        onClick={handleAdd}
                    >
                        Add Custom Fields
                    </button>
                </div>

                <ManageCustomTable groups={groups} onEdit={handleEdit} onDelete={handleDelete} />
            </div>

            <AddCustomFieldModal
                isOpen={isModalOpen}
                onClose={handleClose}
                onSave={handleSave}
                initialName={editingField?.name || ''}
            />
        </Layout>
    );
};

export default ManageCustom;
