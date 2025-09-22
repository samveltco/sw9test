import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import SearchActions from '../components/dashboard/SearchActions';
import TabsFilter from '../components/dashboard/TabsFilter';
import SortingControls from '../components/dashboard/SortingControls';
import WorkOrderCard from '../components/dashboard/WorkOrderCard';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getWorkOrders } from '../utils/api/get/getWorkOrders';
import '../sass/home/index.scss';
import '../sass/home/index-l.scss';
import '../sass/home/index-m.scss';
import Modal from '../components/modals';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType, sendContractorRate } from '../store/actions/workOrdersActions';
import { toggleModal } from '../store/actions/modalsActions';

const Dashboard = ({ mainContainer }) => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.workOrder.filters);
  const search = useSelector(state => state.workOrder.searchData);
  const sortBy = useSelector(state => state.workOrder.sortBy);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const paramsRoute = useParams();
  const [workOrders, setWorkOrders] = useState([]);

  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search);
      const typeParameter = params.get('type');
      switch (typeParameter) {
        case 'work-order': {
          dispatch(toggleModal(true, 'viewDetailsWorkOrderModal', false, { id: params.get('id'), win: params.get('win') }));
          const { tab } = paramsRoute;
          const pathname = tab ? `/dashboard/${tab}` : '/dashboard';
          navigate({ pathname, search: location.search }, { replace: true });
          break;
        }
        case 'contractor': {
          dispatch(toggleModal(true, 'contractorDetailsModal', false, { contractorId: params.get('id') }));
          break;
        }
        case 'thank_you_for_rate': {
          dispatch(sendContractorRate({ id: params.get('id'), rate: params.get('rate') }));
          break;
        }
        default: break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const tabToStatus = {
      available: 'published',
      assigned: 'assigned',
      completed: 'completed',
      approved: 'approved',
      paid: 'paid',
      draft: 'draft',
      routed: 'routed',
      all: '',
    };
    const status = tabToStatus[selectedTab] || '';
    getWorkOrders(currentPage, 10, status, search, filters, sortBy, 'orders').then(result => {
      const tmpWorkOrders = result.map(order => {
        if (order?.clientInfo?.ratings) {
          const { total, count } = order.clientInfo.ratings;
          order.clientInfo.ratings = ((total / (count * 3)) * 100).toFixed(2).replace(/\.?0+$/, '');
        }
        return order;
      });
      setWorkOrders(tmpWorkOrders);
    });
  }, [currentPage, selectedTab, search, filters, sortBy]);

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
    navigate('/create-work-order');
  };

  const handleExport = () => {
    console.log('Export to Excel');
  };

  const handleShowModal = () => {
    console.log('Show modal');
  };

  const handleApplyFilter = () => {
    setShowFilter(false);
  };

  const handleResetFilter = () => {
    console.log('Reset filter');
  };

  const handleDuplicate = (id) => {
    console.log('Duplicate work order:', id);
  };

  const handleViewDetails = (id) => {
    console.log('View details for work order:', id);
  };

  const handleFindContractors = (id) => {
    console.log('Find contractors for work order:', id);
  };

  const handleViewApplicants = (id) => {
    console.log('View applicants for work order:', id);
  };

  const handleCreateTemplate = (id) => {
    console.log('Create template from work order:', id);
  };

  return (
    <Layout>
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
        sortBy={sortBy?.sortType || 'startDate'}
        onSortChange={(value) => dispatch(setSortType('sortType', value))}
        ascending={(sortBy?.order || 1) === 1}
        onAscendingChange={(val) => dispatch(setSortType('order', val ? 1 : -1))}
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
        {workOrders.map((order, index) => (
          <WorkOrderCard
            key={index}
            workOrder={order}
            messagesCount={{unReadMessages: {}}}
            onDuplicate={handleDuplicate}
            onViewDetails={handleViewDetails}
            onFindContractors={handleFindContractors}
            onViewApplicants={handleViewApplicants}
            onCreateTemplate={handleCreateTemplate}
          />
        ))}
        <span className="shadow_block bottom_shadow"></span>
      </div>
      <Modal mainContainer={mainContainer.current} />
    </Layout>
  );
};

export default Dashboard; 