import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import SearchActions from '../components/dashboard/SearchActions';
import TabsFilter from '../components/dashboard/TabsFilter';
import SortingControls from '../components/dashboard/SortingControls';
import WorkOrderCard, { WorkOrder } from '../components/dashboard/WorkOrderCard';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../sass/home/index.scss';
import '../sass/home/index-l.scss';
import '../sass/home/index-m.scss';
import Modal from '../components/modals';
import getWorkOrderCountByTabs from '../utils/api/get/getWorkOrderCountByTabs';
import Tabs from '../components/dashboard/Tabs';
import { connect } from 'react-redux';
import { tabs } from '../utils/constants';
import prepareFilters from '../utils/prepareFilters';

import {
    setCurrentWorkOrder,
    fetchApplicantsForWorkOrder,
    publishWorkOrder,
    acceptInvite, confirmWorkOrder,
    exportWorkOrders,
    createWorkOrderTemplateByWorkOrder,

} from '../store/actions/workOrdersActions';
import { toggleModal, toggleSecondModalClose } from '../store/actions/modalsActions';
import getWorkOrders from '../utils/api/get/getWorkOrders';
import { setMessagesCount, setMessagesSeen } from '../store/actions/messageCountAction';


import {
    selectWorkOrder,
    setActiveTab,
    setPage,
} from '../store/actions/applicationStateActions';


const Dashboard = ({
    auth,
    profile,
    activeTab,
    isReload,
    match,
    history,
    search,
    filters,
    sortBy,
    selectedWorkOrders,
    selectWorkOrder,
    mainContainer,
    setActiveTab,
    toggleModal,
    setCurrentWorkOrder,
    fetchApplicantsForWorkOrder,
    setMessagesCount,
    messagesCount,
    setMessagesSeen,
    publishWorkOrder,
    acceptInvite,
    confirmWorkOrder,
    currentPage,
    perPage,
    setPage,
    exportWorkOrders,
    createWorkOrderTemplateByWorkOrder,
    toggleSecondModalClose,
}) => {
    const [showFilter, setShowFilter] = useState(false);
    const [selectedTab, setSelectedTab] = useState('all');
    const [ascending, setAscending] = useState(false);
    const [workOrders, setWorkOrders] = useState([]);
    const [workOrderCountByTabs, setWorkOrderCountByTabs] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem('jwtToken');
    let userType = null;
    if (token) {
        try {
            const decoded = jwtDecode(token);
            userType = decoded.userType;
        } catch (error) {
            console.error('Invalid token:', error);
        }
    }


    // useEffect(() => {
    //     getWorkOrders(1, 10, 'assigned', {}, {}, { startDate: 1 }, 'orders').then(result => {
    //         const tmpWorkOrders = result.map((order) => {
    //             if (order?.clientInfo?.ratings) {
    //                 const { total, count } = order.clientInfo.ratings;
    //                 order.clientInfo.ratings = ((total / (count * 3)) * 100).toFixed(2).replace(/\.?0+$/, '');
    //             }
    //             return order;
    //         });
    //         setWorkOrders(tmpWorkOrders);
    //     });
    // }, []);

    const fetchData = async () => {
        // if (workOrders.length) {
        //   selectWorkOrder([]);
        // }
        toggleModal(true, 'loader', true);
        const tmpFilters = prepareFilters(filters);
        setIsLoading(true);
        getWorkOrderCountByTabs(search, tmpFilters, auth?.user?.userType, activeTab).then(response => {
            setIsLoading(false);
            setWorkOrderCountByTabs(response?.payload?.workOrderCountByTabs || {});


            if (response.success) {
                const totalWorkOrders = response?.payload?.workOrderCountByTabs[activeTab];
                const countOfPages = Math.max(Math.ceil(totalWorkOrders / perPage), 1);
                if (countOfPages < currentPage) {
                    return setPage(countOfPages);
                }
            }
        });

        getWorkOrders(
            currentPage,
            perPage,
            activeTab,
            search,
            tmpFilters,
            { [sortBy.sortType]: sortBy.order },
            auth?.user?.userType,
        ).then(result => {
            const tmpWorkOrders = result.map(order => {
                if (order?.clientInfo?.ratings) {
                    const { total, count } = order.clientInfo.ratings;
                    // eslint-disable-next-line no-param-reassign
                    order.clientInfo.ratings = ((total / (count * 3)) * 100).toFixed(2).replace(/\.?0+$/, '');
                }
                return order;
            });
            setWorkOrders(tmpWorkOrders);
            toggleSecondModalClose('loader', true);
        })
        // const result = await 
    };
    
    useEffect(() => {
        // const { tab } = match.params;
        fetchData();
      },
      [
        activeTab, sortBy,
        filters, search,
        isReload, currentPage,
        perPage,
      ]);

    const changeActiveTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
            // history.push(`/dashboard/${tab}`);
        }
    };

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

    // const tabs = (() => {
    //     if (userType === 'contractor') {
    //         return allTabs.filter(tab =>
    //             ['upcoming-work', 'available', 'routed', 'applied', 'completed', 'approved', 'paid'].includes(tab.key)
    //         );
    //     } else if (userType === 'client') {
    //         return allTabs.filter(tab =>
    //             ['draft', 'available', 'routed', 'assigned', 'completed', 'approved', 'paid', 'all'].includes(tab.key)
    //         );
    //     } else if (userType === 'superAdmin') {
    //         return allTabs.filter(tab =>
    //             ['draft', 'available', 'routed', 'assigned', 'completed', 'approved', 'paid', 'all'].includes(tab.key)
    //         );
    //     }
    //     return allTabs;
    // })();

    const handleImportClick = () => console.log('Import work orders');
    const handleCreateWorkOrder = () => {
        console.log('Create work order');
        navigate('/create-work-order');
    };
    const handleExport = () => console.log('Export to Excel');
    const handleShowModal = () => console.log('Show modal');
    const handleApplyFilter = () => { console.log('Apply filter'); setShowFilter(false); };
    const handleResetFilter = () => console.log('Reset filter');
    const handleDuplicate = (id) => console.log('Duplicate work order:', id);
    const handleViewDetails = (id) => console.log('View details for work order:', id);
    const handleFindContractors = (id) => console.log('Find contractors for work order:', id);
    const handleViewApplicants = (id) => console.log('View applicants for work order:', id);
    const handleCreateTemplate = (id) => console.log('Create template from work order:', id);

    return (
        <Layout>
            <SearchActions
                onImportClick={handleImportClick}
                onCreateWorkOrder={handleCreateWorkOrder}
                onExport={handleExport}
            />

            {/* <TabsFilter
                tabs={tabs}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                onShowModal={handleShowModal}
            /> */}

            <div className="switch_actions">
                <div className="switch_btns">


                    <Tabs
                        style={{ display: 'flex' }}
                        tabs={tabs[auth.user.userType]}
                        activeTab={activeTab}
                        handler={changeActiveTab}
                        isCounting={isLoading}
                        workOrderCountByTabs={workOrderCountByTabs}
                    />
                </div>
            </div>
            <SortingControls
                sortBy={sortBy}
                // onSortChange={setSortBy}
                ascending={ascending}
                onAscendingChange={setAscending}
                showFilter={showFilter}
                onToggleFilter={() => setShowFilter(!showFilter)}
                onApplyFilter={handleApplyFilter}
                onResetFilter={handleResetFilter}
                currentPage={currentPage}
                totalPages={24}
            // onPageChange={setCurrentPage}
            />

            <div className="cards_list">
                <span className="shadow_block top_shadow"></span>
                {workOrders.map((order, index) => (
                    <WorkOrderCard
                        key={index}
                        workOrder={order}
                        messagesCount={{ unReadMessages: {} }}
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


const mapDispatchToProps = {
    setCurrentWorkOrder,
    fetchApplicantsForWorkOrder,
    toggleModal,
    setActiveTab,
    selectWorkOrder,
    setMessagesCount,
    setMessagesSeen,
    publishWorkOrder,
    acceptInvite,
    confirmWorkOrder,
    setPage,
    exportWorkOrders,
    createWorkOrderTemplateByWorkOrder,
    toggleSecondModalClose,
};

const mapStateToProps = state => ({
    auth: state.auth,
    messagesCount: state.messagesCount,
    profile: state.profile,
    filters: state.workOrder.filters,
    search: state.workOrder.searchData,
    sortBy: state.workOrder.sortBy,
    ...state.applicationState,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
// export default Dashboard;
