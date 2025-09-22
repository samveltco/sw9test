// import React, { useState } from 'react';
// import Layout from '../components/Layout';
// import { ManageCustomTable, CustomFieldGroup, AddCustomFieldModal } from '../components/manageCustom';
// import {createCustomField} from "../store/actions/workOrdersActions";
// import {useDispatch} from "react-redux";
//
// const ManageCustom: React.FC = () => {
//   const [groups, setGroups] = useState<CustomFieldGroup[]>([
//     { id: 'c1', name: 'Reference #' },
//     { id: 'c2', name: 'Reference #' },
//     { id: 'c3', name: 'Reference #' },
//     { id: 'c4', name: 'Reference #' },
//   ]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const dispatch = useDispatch()
//
//   const handleAdd = () => setIsModalOpen(true);
//   const handleClose = () => setIsModalOpen(false);
//     const handleSave = async ({ name }: { name: string }) => {
//         try {
//             const res = await dispatch<any>(createCustomField(name));
//             if (res?.success && res.data?.id) {
//                 setGroups((prev) => [{ id: res.data.id, name }, ...prev]);
//                 setIsModalOpen(false);
//             } else {
//                 console.error('No id returned from server');
//             }
//         } catch (err) {
//             console.error('Failed to create custom field', err);
//         }
//     };
//
//   const handleEdit = (id: string) => {
//     console.log('edit', id);
//   };
//
//   const handleDelete = (id: string) => {
//     setGroups((prev) => prev.filter((g) => g.id !== id));
//   };
//
//   return (
//     <Layout>
//       <div className="welcome_block">
//         <div className="welcome_words">
//           Hey <span className="user_name">Mani,</span> welcome back!
//         </div>
//         <div className="welcome_info">Welcome to The Valyant Group</div>
//         <div className="available_funds">Funds Available: $1,268.22</div>
//       </div>
//
//       <div className="manage_section">
//         <div className="head_section">
//           <h1 className="page_title">Custom Fields</h1>
//           <button className="standard_btn icon_plus orange_btn" aria-label="Create work order" onClick={handleAdd}>Add Custom Fields</button>
//         </div>
//
//         <ManageCustomTable groups={groups} onEdit={handleEdit} onDelete={handleDelete} />
//       </div>
//
//       <AddCustomFieldModal isOpen={isModalOpen} onClose={handleClose} onSave={handleSave} />
//     </Layout>
//   );
// };
//
// export default ManageCustom;

// src/pages/ManageCustom.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { ManageCustomTable, CustomFieldGroup } from '../components/manageCustom';
import AddCustomFieldModal from '../components/manageCustom/AddCustomFieldModal';
import {createCustomField} from "../store/actions/workOrdersActions";
import { useDispatch } from "react-redux";
import getCustomFieldsList from "../utils/api/get/getCoustomFieldsList";

const ManageCustom: React.FC = () => {
    const [groups, setGroups] = useState<CustomFieldGroup[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingField, setEditingField] = useState<CustomFieldGroup | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const fetchedGroups = await getCustomFieldsList('');
                setGroups(fetchedGroups);
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
                const res = await dispatch<any>(createCustomField(name));
                if (res?.success && res.data?.id) {
                    setGroups(prev => [{ id: res.data.id, name }, ...prev]);
                    handleClose();
                } else {
                    console.error('No id returned from server');
                }
            } catch (err) {
                console.error('Failed to create custom field', err);
            }
    };

    const handleEdit = (id: string) => {
        const field = groups.find(g => g.id === id);
        if (field) {
            setEditingField(field);
            setIsModalOpen(true);
        }
    };

    const handleDelete = (id: string) => {
        setGroups(prev => prev.filter(g => g.id !== id));
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
