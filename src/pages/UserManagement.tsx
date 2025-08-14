import React, { useState } from 'react';
import Layout from '../components/Layout';
import { UserTable, UserRow, AddUserModal } from '../components/userManagement';

type NewUserPayload = { firstName: string; lastName: string; email: string; phone: string; role: string };

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserRow[]>([
    { id: 'u1', firstName: 'Reference #', lastName: 'Gerald', email: 'Referenc #', phone: '(402) 202-2996', role: 'Admin', status: 'Accepted' },
    { id: 'u2', firstName: 'Manager', lastName: '8', email: 'Referenc #', phone: '(402) 202-2996', role: 'Admin', status: 'Pending' },
    { id: 'u3', firstName: 'Reference #', lastName: 'Gerald', email: 'Referenc #', phone: '(402) 202-2996', role: 'Admin', status: 'Accepted' },
    { id: 'u4', firstName: 'Manager', lastName: '8', email: 'Referenc #', phone: '(402) 202-2996', role: 'Admin', status: 'Pending' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const handleSave = (payload: NewUserPayload) => {
    setUsers((prev) => [
      { id: `u${prev.length + 1}`, status: 'Pending', ...payload },
      ...prev
    ]);
    setIsModalOpen(false);
  };

  const handleEdit = (id: string) => {
    console.log('edit', id);
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
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

      <div className="management_section">
        <div className="head_section">
          <h1 className="page_title">User Management</h1>
          <button className="standard_btn icon_plus orange_btn" aria-label="Create work order" onClick={handleAdd}>Add User</button>
        </div>

        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <AddUserModal isOpen={isModalOpen} onClose={handleClose} onSave={handleSave} />
    </Layout>
  );
};

export default UserManagement; 