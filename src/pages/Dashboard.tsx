import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import SearchActions from '../components/dashboard/SearchActions';
import TabsFilter from '../components/dashboard/TabsFilter';
import SortingControls from '../components/dashboard/SortingControls';
import WorkOrderCard, { WorkOrder } from '../components/dashboard/WorkOrderCard';
import { useNavigate } from 'react-router-dom';
import { getWorkOrders } from '../utils/api/get/getWorkOrders';
import {jwtDecode} from 'jwt-decode';
import '../sass/home/index.scss';
import '../sass/home/index-l.scss';
import '../sass/home/index-m.scss';

interface TokenPayload {
    userType: string;
}

const Dashboard: React.FC = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [selectedTab, setSelectedTab] = useState('all');
    const [sortBy, setSortBy] = useState('start_date');
    const [ascending, setAscending] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [workOrders, setWorkOrders] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem('jwtToken');
    let userType: string | null = null;
    if (token) {
        try {
            const decoded = jwtDecode<TokenPayload>(token);
            userType = decoded.userType;
        } catch (error) {
            console.error('Invalid token:', error);
        }
    }

    useEffect(() => {
        getWorkOrders(1, 10, 'assigned', {}, {}, { startDate: 1 }, 'orders').then(result => {
            const tmpWorkOrders = result.map((order: any) => {
                if (order?.clientInfo?.ratings) {
                    const { total, count } = order.clientInfo.ratings;
                    order.clientInfo.ratings = ((total / (count * 3)) * 100).toFixed(2).replace(/\.?0+$/, '');
                }
                return order;
            });
            setWorkOrders(tmpWorkOrders);
        });
    }, []);

    // Все вкладки
    const allTabs = [
        { key: 'upcoming-work', label: 'Upcoming Work', count: 4 },
        { key: 'draft', label: 'Draft', count: 20 },
        { key: 'available', label: 'Available', count: 11 },
        { key: 'routed', label: 'Routed', count: 1 },
        { key: 'assigned', label: 'Assigned', count: 1 },
        { key: 'applied', label: 'Applied', count: 4 },
        { key: 'completed', label: 'Completed', count: 3 },
        { key: 'approved', label: 'Approved', count: 7 },
        { key: 'paid', label: 'Paid', count: 7 },
        { key: 'all', label: 'All', count: 84 }
    ];

    const tabs = (() => {
        if (userType === 'contractor') {
            return allTabs.filter(tab =>
                ['upcoming-work', 'available', 'routed', 'applied', 'completed', 'approved', 'paid'].includes(tab.key)
            );
        } else if (userType === 'client') {
            return allTabs.filter(tab =>
                ['draft', 'available', 'routed', 'assigned', 'completed', 'approved', 'paid', 'all'].includes(tab.key)
            );
        }else if (userType === 'superAdmin') {
            return allTabs.filter(tab =>
                ['draft', 'available', 'routed', 'assigned', 'completed', 'approved', 'paid', 'all'].includes(tab.key)
            );
        }
        return allTabs;
    })();

    const handleImportClick = () => console.log('Import work orders');
    const handleCreateWorkOrder = () => {
        console.log('Create work order');
        navigate('/create-work-order');
    };
    const handleExport = () => console.log('Export to Excel');
    const handleShowModal = () => console.log('Show modal');
    const handleApplyFilter = () => { console.log('Apply filter'); setShowFilter(false); };
    const handleResetFilter = () => console.log('Reset filter');
    const handleDuplicate = (id: string) => console.log('Duplicate work order:', id);
    const handleViewDetails = (id: string) => console.log('View details for work order:', id);
    const handleFindContractors = (id: string) => console.log('Find contractors for work order:', id);
    const handleViewApplicants = (id: string) => console.log('View applicants for work order:', id);
    const handleCreateTemplate = (id: string) => console.log('Create template from work order:', id);

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
        </Layout>
    );
};

export default Dashboard;
