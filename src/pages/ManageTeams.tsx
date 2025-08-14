import React, { useState } from 'react';
import Layout from '../components/Layout';
import { ManageTeamsTable, TeamRow, AddTeamModal } from '../components/manageTeams';

const ManageTeams: React.FC = () => {
  const [teams, setTeams] = useState<TeamRow[]>([
    { id: 't1', name: 'Reference #', members: 12 },
    { id: 't2', name: 'Reference #', members: 8 },
    { id: 't3', name: 'Reference #', members: 2 },
    { id: 't4', name: 'Reference #', members: 1 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const handleSave = ({ name, members }: { name: string; members: string[] }) => {
    setTeams((prev) => [{ id: `t${prev.length + 1}`, name, members: members.length }, ...prev]);
    setIsModalOpen(false);
  };

  const handleEdit = (id: string) => {
    console.log('edit', id);
  };

  const handleDelete = (id: string) => {
    setTeams((prev) => prev.filter((t) => t.id !== id));
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

      <div className="manage_teams_section">
        <div className="head_section">
          <h1 className="page_title">Manage Teams</h1>
          <button className="standard_btn icon_plus orange_btn" aria-label="Create work order" onClick={handleAdd}>Add Team</button>
        </div>
        <ManageTeamsTable teams={teams} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <AddTeamModal isOpen={isModalOpen} onClose={handleClose} onSave={handleSave} />
    </Layout>
  );
};

export default ManageTeams; 