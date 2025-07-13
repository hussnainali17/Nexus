import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';

const Middle = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Replace with actual entrepreneurId from auth/localStorage
  const entrepreneurId = localStorage.getItem('user');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/request/view/${entrepreneurId}`,{ withCredentials: true });
        setRequests(res.data);
      } catch (err) {
        setError('Failed to fetch requests');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [entrepreneurId]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/request/update/${id}`, { status: newStatus },{withCredentials: true});
      setRequests(prev => prev.map(req => req._id === id ? { ...req, status: newStatus } : req));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const getBadgeClasses = (status) => {
    switch (status) {
      case 'accepted':
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
  
     
    <div className='flex flex-col mt-5'>
      {requests.length === 0 && <div className="text-gray-500 text-center">No collaboration requests.</div>}
      <div className='font-bold text-lg mb-2'>Collaboration Requests</div>
      {requests.map((req) => (
        <div key={req._id}  className="bg-white shadow-md rounded-xl p-5 mb-4 w-full">
          <div className="flex justify-between items-start">
            {/* Left side: Image + Info */}
            <div onClick={()=>{navigate('/invest_ProfileView', { state: { ...req.investorId } })}} className="flex items-start gap-4">
              <img
                src={req.investorId.avatar || '/images/Avatar.png'}
                alt="Investor Avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h5 className="text-lg font-semibold">
                  {req.investorId && req.investorId.user && req.investorId.user.name ? req.investorId.user.name : 'Investor'}
                </h5>
                <p className="text-sm text-gray-500">
                  {req.investorId && req.investorId.user && req.investorId.user.email ? `Email: ${req.investorId.user.email}` : ''}
                </p>
              </div>
            </div>
            {/* Status Badge */}
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getBadgeClasses(req.status)}`}>
              {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
            </span>
          </div>
          {/* Message Button */}
          <div className="mt-4 flex gap-2">
            <button
              className="bg-blue-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-600"
              onClick={() => {
                // Pass investor user data as receiver
                const receiver = req.investorId && req.investorId.user
                  ? {
                      _id: req.investorId.user._id || req.investorId.user,
                      name: req.investorId.user.name,
                      imageUrl: req.investorId.avatar || '',
                    }
                  : null;
                if (receiver) {
                  navigate('/chat', { state: { receiver } });
                }
              }}
            >
              Message
            </button>
            {/* Accept/Reject Buttons (only show if status is Pending) */}
            {req.status === 'pending' && (
              <>
                <button
                  onClick={() => handleStatusChange(req._id, 'accepted')}
                  className="bg-green-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusChange(req._id, 'rejected')}
                  className="border border-red-500 text-red-500 px-4 py-1.5 rounded-md text-sm hover:bg-red-50"
                >
                  Reject
                </button>
              </>
            )}
          </div>
        </div>
      ))}


    
    </div>
  );
};

export default Middle;