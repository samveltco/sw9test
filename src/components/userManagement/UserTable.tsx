import React from 'react';

export interface UserRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
}

interface UserTableProps {
  users: UserRow[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <table className="custom_table">
      <thead>
        <tr>
          <th className="name">First name</th>
          <th className="last">Last Name</th>
          <th className="email">Email</th>
          <th className="phone">Phone</th>
          <th className="role">Role</th>
          <th className="status">Status</th>
          <th className="action">Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td data-th="First name">{u.firstName}</td>
            <td data-th="Last Name">{u.lastName}</td>
            <td data-th="Email">{u.email}</td>
            <td data-th="Phone">{u.phone}</td>
            <td data-th="Role">{u.role}</td>
            <td data-th="Status">{u.status}</td>
            <td data-th="Action">
              <div className="row_block">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="icon_pencil" onClick={(e) => { e.preventDefault(); onEdit(u.id); }}>edit</a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="icon_delete" onClick={(e) => { e.preventDefault(); onDelete(u.id); }}>close</a>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable; 