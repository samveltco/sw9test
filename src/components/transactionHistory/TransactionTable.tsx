import React from 'react';

export interface TxRow {
  id: string;
  date: string;
  ip: string;
  description: string;
  payee: string;
  status: string;
  amount: string;
}

interface TransactionTableProps {
  rows: TxRow[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ rows, onEdit, onDelete }) => {
  return (
    <table className="custom_table">
      <thead>
        <tr>
          <th className="name">Data</th>
          <th className="last">Ip Address</th>
          <th className="email">Description</th>
          <th className="phone">Payee</th>
          <th className="role">Status</th>
          <th className="status">Amount</th>
          <th className="action">Action</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id}>
            <td data-th="Data">{r.date}</td>
            <td data-th="Ip Address">{r.ip}</td>
            <td data-th="Description">{r.description}</td>
            <td data-th="Payee">{r.payee}</td>
            <td data-th="Status">{r.status}</td>
            <td data-th="Amount">{r.amount}</td>
            <td data-th="Action">
              <div className="row_block">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="icon_pencil" onClick={(e) => { e.preventDefault(); onEdit(r.id); }}>edit</a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="icon_delete" onClick={(e) => { e.preventDefault(); onDelete(r.id); }}>close</a>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable; 