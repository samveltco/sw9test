import React, { useEffect } from 'react';
import LandingPage from "../components/landing/LandingPage";
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
 
    return (
        <div>
          <LandingPage/>
        </div>
    );
};

export default Landing;
