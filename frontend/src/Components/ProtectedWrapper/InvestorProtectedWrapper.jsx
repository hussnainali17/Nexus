import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const InvestorProtectedWrapper = ({ children }) => {
  const userId = localStorage.getItem('user');
  const [loading, setLoading] = useState(true);
  const [isInvestor, setIsInvestor] = useState(false);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      setIsInvestor(false);
      return;
    }
    axios.get(`${import.meta.env.VITE_API_URL}/profile/${userId}`, { withCredentials: true })
      .then(res => {
        setIsInvestor(res.data?.role === 'investor');
        
      })
      .catch(() => setIsInvestor(false))
      .finally(() => setLoading(false));
      
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!isInvestor) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default InvestorProtectedWrapper;