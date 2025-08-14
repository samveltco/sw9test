import React, { useState } from 'react';
import Layout from '../components/Layout';
import { TransactionTable, TxRow, AddFundsModal } from '../components/transactionHistory';

const TransactionHistory: React.FC = () => {
  const [rows, setRows] = useState<TxRow[]>([
    { id: 'tx1', date: 'Gerald', ip: 'Referenc #', description: 'Referenc #', payee: '(402) 202-2996', status: 'Admin', amount: 'Accepted' },
    { id: 'tx2', date: 'Gerald', ip: 'Referenc #', description: 'Referenc #', payee: '(402) 202-2996', status: 'Admin', amount: 'Accepted' },
    { id: 'tx3', date: 'Gerald', ip: 'Referenc #', description: 'Referenc #', payee: '(402) 202-2996', status: 'Admin', amount: 'Accepted' },
    { id: 'tx4', date: 'Gerald', ip: 'Referenc #', description: 'Referenc #', payee: '(402) 202-2996', status: 'Admin', amount: 'Accepted' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const handleSave = () => setIsModalOpen(false);

  const handleEdit = (id: string) => console.log('edit', id);
  const handleDelete = (id: string) => setRows((prev) => prev.filter((r) => r.id !== id));

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
          <h1 className="page_title">Transaction History</h1>
          <button className="standard_btn icon_card green_btn" aria-label="Create work order" onClick={handleAdd}>Add Founds</button>
        </div>

        <TransactionTable rows={rows} onEdit={handleEdit} onDelete={handleDelete} />

        <div className="all_price"><span>Balance:</span> $1,268.22</div>
        <div className="paging">
          <ul>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <li><a href="#" className="prev_page icon_prev inactive">Prev</a></li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <li><a href="#" className="current_page">1</a></li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <li><a href="#">2</a></li>
            <li><span>...</span></li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <li><a href="#">24</a></li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <li><a href="#" className="next_page icon_next">Next</a></li>
          </ul>
        </div>
      </div>

      <AddFundsModal isOpen={isModalOpen} onClose={handleClose} onSave={handleSave} />
    </Layout>
  );
};

export default TransactionHistory; 