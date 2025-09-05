import React from 'react';
import Layout from '../components/Layout';

const CreateWorkOrder209: React.FC = () => {
  return (
    <Layout>
      <div className="page-content" style={{ height: 'calc(100vh - 120px)' }}>
        <iframe
          title="Create Work Order (Legacy 209)"
          src="/legacy/209/create_work_order.html"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    </Layout>
  );
};

export default CreateWorkOrder209; 