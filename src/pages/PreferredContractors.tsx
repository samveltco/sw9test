import React, { useState } from 'react';
import Layout from '../components/Layout';
import { PreferredGroupsTable, PreferredGroup, AddGroupModal } from '../components/preferred';

const PreferredContractors: React.FC = () => {
  const [groups, setGroups] = useState<PreferredGroup[]>([
    { id: 'g1', name: 'Reference #', members: 'asdas' },
    { id: 'g2', name: 'Reference #', members: 'asdas' },
    { id: 'g3', name: 'Reference #', members: 'asdas' },
    { id: 'g4', name: 'Reference #', members: 'asdas' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const handleSave = ({ name }: { name: string; type: string }) => {
    setGroups((prev) => [{ id: `g${prev.length + 1}`, name, members: 0 }, ...prev]);
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

      <div className="preferred_section">
        <div className="head_section">
          <h1 className="page_title">Preferred Contractor Groups</h1>
          <button className="standard_btn icon_plus orange_btn" aria-label="Create work order" onClick={handleAdd}>Add group</button>
        </div>

        <PreferredGroupsTable groups={groups} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <AddGroupModal isOpen={isModalOpen} onClose={handleClose} onSave={handleSave} />
    </Layout>
  );
};

export default PreferredContractors; 