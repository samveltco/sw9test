import React, { useState } from 'react';
import Layout from '../components/Layout';
import SearchActions from '../components/dashboard/SearchActions';
import TabsFilter from '../components/dashboard/TabsFilter';
import SortingControls from '../components/dashboard/SortingControls';
import WorkOrderCard, { WorkOrder } from '../components/dashboard/WorkOrderCard';
import { useAuth } from '../hooks/useAuth';
import { User } from '../types';

const Dashboard: React.FC = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');
  const [sortBy, setSortBy] = useState('start_date');
  const [ascending, setAscending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();

  const workOrders: WorkOrder[] = [
    {
      id: '1',
      title: 'copy 1 - Service Call - POS Service Call',
      createdBy: 'Stephanie Bledsoe100%',
      win: '11044997',
      companyWOID: '00169494',
      startDate: '11/6/202002:00PM',
      endDate: '11/30/202005:00PM',
      assignedTo: 'Might Deployment',
      phone: '+(402) 202-2996',
      email: 'mightdeployment@gmail.com',
      price: '$50.000',
      calcInfo: 'Base: 50/flat for 2 hr(s) = 50\nTotal est value = $50.00',
      status: ['UNCONFIRMED', 'ON HOLD'],
      messages: 0,
      location: 'Stillwater, Minnesota 55082'
    },
  ];

  const tabs = [
    { key: 'all', label: 'All', count: 84 },
    { key: 'draft', label: 'Draft', count: 20 },
    { key: 'available', label: 'Available', count: 11 },
    { key: 'routed', label: 'Routed', count: 1 },
    { key: 'completed', label: 'Completed', count: 3 },
    { key: 'paid', label: 'Paid', count: 7 }
  ];

  const handleImportClick = () => {
    console.log('Import work orders');
  };

  const handleCreateWorkOrder = () => {
    console.log('Create work order');
  };

  const handleExport = () => {
    console.log('Export to Excel');
  };

  const handleShowModal = () => {
    console.log('Show modal');
  };

  const handleApplyFilter = () => {
    console.log('Apply filter');
    setShowFilter(false);
  };

  const handleResetFilter = () => {
    console.log('Reset filter');
  };

  const handleDuplicate = (id: string) => {
    console.log('Duplicate work order:', id);
  };

  const handleViewDetails = (id: string) => {
    console.log('View details for work order:', id);
  };

  const handleFindContractors = (id: string) => {
    console.log('Find contractors for work order:', id);
  };

  const handleViewApplicants = (id: string) => {
    console.log('View applicants for work order:', id);
  };

  const handleCreateTemplate = (id: string) => {
    console.log('Create template from work order:', id);
  };

  return (
    <Layout>
      <div className="welcome_block">
        <div className="welcome_words">
          Hey <span className="user_name">{user?.firstName || 'User'},</span> welcome back!
        </div>
        <div className="welcome_info">Welcome to The Valyant Group</div>
        <div className="available_funds">Funds Available: $1,268.22</div>
      </div>

      <SearchActions
        onImportClick={handleImportClick}
        onCreateWorkOrder={handleCreateWorkOrder}
        onExport={handleExport}
      />

      <TabsFilter
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        onShowModal={handleShowModal}
      />

      <SortingControls
        sortBy={sortBy}
        onSortChange={setSortBy}
        ascending={ascending}
        onAscendingChange={setAscending}
        showFilter={showFilter}
        onToggleFilter={() => setShowFilter(!showFilter)}
        onApplyFilter={handleApplyFilter}
        onResetFilter={handleResetFilter}
        currentPage={currentPage}
        totalPages={24}
        onPageChange={setCurrentPage}
      />

      <div className="cards_list">
        <span className="shadow_block top_shadow"></span>
        {workOrders.map((order) => (
          <WorkOrderCard
            key={order.id}
            workOrder={order}
            onDuplicate={handleDuplicate}
            onViewDetails={handleViewDetails}
            onFindContractors={handleFindContractors}
            onViewApplicants={handleViewApplicants}
            onCreateTemplate={handleCreateTemplate}
          />
        ))}
        <span className="shadow_block bottom_shadow"></span>
      </div>
    </Layout>
  );
};

export default Dashboard; 