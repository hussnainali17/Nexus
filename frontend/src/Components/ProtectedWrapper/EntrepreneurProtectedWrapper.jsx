import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const EntrepreneurProtectedWrapper = ({ children }) => {
  const userId = localStorage.getItem('user');
  const [loading, setLoading] = useState(true);
  const [isEntrepreneur, setIsEntrepreneur] = useState(false);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      setIsEntrepreneur(false);
      return;
    }
    axios.get(`${import.meta.env.VITE_API_URL}/profile/${userId}`, { withCredentials: true })
      .then(res => {
        console.log('User profile:', res.data);
        setIsEntrepreneur(res.data?.role === 'entrepreneur');
      })
      .catch(() => setIsEntrepreneur(false))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!isEntrepreneur) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default EntrepreneurProtectedWrapper;