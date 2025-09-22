import React from 'react';

interface ManageCustomTableProps {
    groups: CustomFieldGroup[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export interface CustomFieldGroup {
    id: string;
    name: string;
}

const ManageCustomTable: React.FC<ManageCustomTableProps> = ({ groups, onEdit, onDelete }) => {
    return (
        <table className="custom_table">
            <thead>
            <tr>
                <th className="name">Group name</th>
                <th className="type">Action</th>
            </tr>
            </thead>
            <tbody>
            {groups.map((g) => (
                <tr key={g.id}>
                    <td data-th="Group name">{g.name}</td>
                    <td data-th="Action">
                        <div className="row_block">
                            <a href="#" className="icon_pencil" onClick={(e) => { e.preventDefault(); onEdit(g.id); }}>edit</a>
                            <a href="#" className="icon_delete" onClick={(e) => { e.preventDefault(); onDelete(g.id); }}>delete</a>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ManageCustomTable;
