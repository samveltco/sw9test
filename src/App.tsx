import React, {useEffect, useRef} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

import Dashboard from './pages/Dashboard.jsx';
import FindContractor from './pages/FindContractor';
import CreateWorkOrder from './pages/CreateWorkOrder.jsx';
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
import {useDispatch} from "react-redux";
import {init} from "./store/actions/authActions";
// import './sass/imports/main';
import './sass/custom_styles/custom_styles.scss';
import "react-datepicker/dist/react-datepicker.css";
import Modal from './components/modals';
import About from "./pages/About";
import LocateTechs from "./pages/LocateTechs";
import LocateWorks from "./pages/LocateWorks";
import Solution from "./pages/Solution";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch<any>(init());
    }, [dispatch]);
  
    if (isLoading) {
      return <div>Loading...</div>;
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/home" replace />;
};

function App() {
  const mainContainer = useRef(null);
  return (
    <Router>
      <div className="App" ref={mainContainer}>
        
        <Modal mainContainer={(mainContainer.current as unknown as HTMLElement) || document.body} />
        <Routes>
          <Route path="/home" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/locate_techs" element={<LocateTechs />} />
          <Route path="/locate_works" element={<LocateWorks />} />
          <Route path="/solution" element={<Solution />} />
          <Route path="*"  element={<ProtectedRoute><Dashboard mainContainer={mainContainer} /></ProtectedRoute>} />
          <Route path="/admin-recruits" element={<ProtectedRoute><AdminRecruits /></ProtectedRoute>} />
          <Route path="/contractor-main" element={<ProtectedRoute><ContractorMain /></ProtectedRoute>} />
          <Route path="/admin-main" element={<ProtectedRoute><AdminMain /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard mainContainer={mainContainer} /></ProtectedRoute>} />
          <Route path="/find-contractor" element={<ProtectedRoute><FindContractor /></ProtectedRoute>} />
          <Route path="/create-work-order" element={<ProtectedRoute><CreateWorkOrder /></ProtectedRoute>} />
          <Route path="/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
          <Route path="/payment-methods" element={<ProtectedRoute><PaymentMethods /></ProtectedRoute>} />
          <Route path="/transaction-history" element={<ProtectedRoute><TransactionHistory /></ProtectedRoute>} />
          <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
          <Route path="/preferred-contractors" element={<ProtectedRoute><PreferredContractors /></ProtectedRoute>} />
          <Route path="/pm-tools" element={<ProtectedRoute><PMTools /></ProtectedRoute>} />
          <Route path="/manage-teams" element={<ProtectedRoute><ManageTeams /></ProtectedRoute>} />
          <Route path="/manage-custom" element={<ProtectedRoute><ManageCustom /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
