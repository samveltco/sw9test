import React, { useState } from 'react';
import Layout from '../components/Layout';
import { ManageCustomTable, CustomFieldGroup, AddCustomFieldModal } from '../components/manageCustom';

const ManageCustom: React.FC = () => {
  const [groups, setGroups] = useState<CustomFieldGroup[]>([
    { id: 'c1', name: 'Reference #' },
    { id: 'c2', name: 'Reference #' },
    { id: 'c3', name: 'Reference #' },
    { id: 'c4', name: 'Reference #' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const handleSave = ({ name }: { name: string }) => {
    setGroups((prev) => [{ id: `c${prev.length + 1}`, name }, ...prev]);
    setIsModalOpen(false);
  };

  const handleEdit = (id: string) => {
    console.log('edit', id);
  };

  const handleDelete = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
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
          <button className="standard_btn icon_plus orange_btn" aria-label="Create work order" onClick={handleAdd}>Add Custom Fields</button>
        </div>

        <ManageCustomTable groups={groups} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <AddCustomFieldModal isOpen={isModalOpen} onClose={handleClose} onSave={handleSave} />
    </Layout>
  );
};

export default ManageCustom; 