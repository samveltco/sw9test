import React from 'react';

export interface PreferredGroup {
  id: string;
  name: string;
  members: number | string;
}

interface PreferredGroupsTableProps {
  groups: PreferredGroup[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const PreferredGroupsTable: React.FC<PreferredGroupsTableProps> = ({ groups, onEdit, onDelete }) => {
  return (
    <table className="custom_table">
      <thead>
        <tr>
          <th className="name">Group name</th>
          <th className="value">Members</th>
          <th className="type">Action</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((g) => (
          <tr key={g.id}>
            <td data-th="Group name">{g.name}</td>
            <td data-th="Members">{g.members}</td>
            <td data-th="Action">
              <div className="row_block">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="icon_pencil" onClick={(e) => { e.preventDefault(); onEdit(g.id); }}>edit</a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="icon_delete" onClick={(e) => { e.preventDefault(); onDelete(g.id); }}>close</a>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PreferredGroupsTable; 