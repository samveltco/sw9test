import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages
import Dashboard from './pages/Dashboard';
import FindContractor from './pages/FindContractor';
import CreateWorkOrder from './pages/CreateWorkOrder';
import UserManagement from './pages/UserManagement';
import PaymentMethods from './pages/PaymentMethods';
import TransactionHistory from './pages/TransactionHistory';
import Templates from './pages/Templates';
import PreferredContractors from './pages/PreferredContractors';
import PMTools from './pages/PMTools';
import ManageTeams from './pages/ManageTeams';
import ManageCustom from './pages/ManageCustom';
import Landing from './pages/Landing';
import AdminRecruits from './pages/AdminRecruits';
import ContractorMain from './pages/ContractorMain';
import AdminMain from './pages/AdminMain';
import './utils/api';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/admin-recruits" element={<AdminRecruits />} />
          <Route path="/contractor-main" element={<ContractorMain />} />
          <Route path="/admin-main" element={<AdminMain />} />
          <Route path="/find-contractor" element={<FindContractor />} />
          <Route path="/create-work-order" element={<CreateWorkOrder />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/preferred-contractors" element={<PreferredContractors />} />
          <Route path="/pm-tools" element={<PMTools />} />
          <Route path="/manage-teams" element={<ManageTeams />} />
          <Route path="/manage-custom" element={<ManageCustom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
