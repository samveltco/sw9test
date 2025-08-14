import React from 'react';

export interface TeamRow {
  id: string;
  name: string;
  members: number | string;
}

interface ManageTeamsTableProps {
  teams: TeamRow[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ManageTeamsTable: React.FC<ManageTeamsTableProps> = ({ teams, onEdit, onDelete }) => {
  return (
    <table className="custom_table">
      <thead>
        <tr>
          <th className="name">Team name</th>
          <th className="value">Members</th>
          <th className="type">Action</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((t) => (
          <tr key={t.id}>
            <td data-th="Team name">{t.name}</td>
            <td data-th="Members">{t.members}</td>
            <td data-th="Action">
              <div className="row_block">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="icon_pencil" onClick={(e) => { e.preventDefault(); onEdit(t.id); }}>edit</a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="icon_delete" onClick={(e) => { e.preventDefault(); onDelete(t.id); }}>close</a>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ManageTeamsTable; 