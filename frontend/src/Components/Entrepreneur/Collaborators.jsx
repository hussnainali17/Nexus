import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react';

const Collaborators = () => {
    const [collaborators, setCollaborators] = useState([]);
    const navigate = useNavigate();
    const user = localStorage.getItem('user');

    useEffect(() => {
        const fetchCollaborators = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/request/collaborators/${user}`, { withCredentials: true });
                setCollaborators(res.data);
            } catch (err) {
                console.error('Failed to fetch collaborators', err);
            }
        };
        fetchCollaborators();
    }, []);

  return (
    <div className="w-full">
      <div className="font-bold text-2xl mb-6 text-center text-black">Collaborators List</div>
      <div className="flex overflow-x-auto gap-6 pb-2">
        {collaborators.map((collaborator) => (
          <div
            onClick={e => {
              if (e.target.tagName === 'BUTTON') return;
              navigate('/invest_ProfileView', { state: { ...collaborator.investorId } });
            }}
            key={collaborator._id}
            className="bg-white border border-gray-200 shadow-lg flex flex-col items-center rounded-xl p-6 min-w-[260px] max-w-xs transition-transform duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer group"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-black mb-3">
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                src={collaborator.investorId.avatar}
                alt="Investor Avatar"
              />
            </div>
            <div className="flex flex-col text-center gap-1 mb-3">
              <h5 className="text-lg font-bold text-black group-hover:text-blue-700 transition-colors duration-200">
                {collaborator.investorId.user.name}
              </h5>
              <p className="text-xs text-gray-600 group-hover:text-black transition-colors duration-200">
                {collaborator.investorId.user.email}
              </p>
            </div>
            <button
              className="bg-black text-white px-5 py-2 rounded-md text-sm font-semibold shadow hover:bg-white hover:text-black border border-black transition-colors duration-200"
              onClick={() => {
                const receiver = collaborator.investorId && collaborator.investorId.user
                  ? {
                      _id: collaborator.investorId.user._id || collaborator.investorId.user,
                      name: collaborator.investorId.user.name,
                      imageUrl: collaborator.investorId.avatar || '',
                    }
                  : null;
                if (receiver) {
                  navigate('/chat', { state: { receiver } });
                }
              }}
            >
              Message
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Collaborators