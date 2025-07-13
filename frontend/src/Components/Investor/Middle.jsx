import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Middle = () => {
    const [entrepreneurs, setEntrepreneurs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [requestStatus, setRequestStatus] = useState({});
    const navigate = useNavigate();

    const userId = localStorage.getItem('user');

    // Show error bar for 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    // Fetch entrepreneurs
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile/allentrepreneurs`, {
                    withCredentials: true
                });
                setEntrepreneurs(response.data);
            } catch (error) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Fetch request statuses from backend
    useEffect(() => {
        const fetchRequestStatuses = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/request/sent/${userId}`, {
                    withCredentials: true
                });

                const statuses = {};
                res.data.forEach(req => {
                    statuses[req.entrepreneurId] = req.status;
                });

                setRequestStatus(statuses);
            } catch (err) {
                console.error('Error fetching request statuses');
            }
        };

        fetchRequestStatuses();
    }, []);

    const handleRequest = async (entrepreneur) => {
        const entrepreneurId = entrepreneur._id;
        try {
            // Optimistically show pending
            setRequestStatus(prev => ({ ...prev, [entrepreneurId]: 'pending' }));

            await axios.post(`${import.meta.env.VITE_API_URL}/request/send`, {
                userId,
                entrepreneurId
            }, { withCredentials: true });

            // Backend will reflect actual status on refresh/device switch
        } catch (err) {
            setError(err.response?.data.msg || 'Failed to send request');
            setRequestStatus(prev => ({ ...prev, [entrepreneurId]: null }));
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {error && (
                <div className="fixed top-5 left-1/2 transform -translate-x-1/2 px-8 py-4 rounded-lg shadow-2xl z-50 bg-gradient-to-r from-red-600 via-red-500 to-pink-500 text-white font-semibold text-center text-sm sm:text-base animate-pulse ring-2 ring-red-300 backdrop-blur-md">
  ⚠️ {error}
</div>

            )}

            <div className='flex flex-col text-center my-10'>
                <h1 className='text-2xl font-bold'>Looking for Global investment opportunities?</h1>
                <p className='mt-2 text-gray-600'>Browse our latest startup pitches from around the world and connect with entrepreneurs</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 px-4 md:px-12 py-8'>
                {entrepreneurs.map((entrepreneur) => {
                    const status = requestStatus[entrepreneur._id];

                    return (
                        <div
                            key={entrepreneur._id}
                            className='md:p-4 space-y-1 cursor-pointer bg-white'
                            onClick={e => {
                                if (e.target.tagName === 'BUTTON') return;
                                navigate('/entre_profileView', { state: { entrepreneur } });
                            }}
                        >
                            <img className='w-full h-auto md:h-[70%] object-cover' src={entrepreneur.businessImage} alt="" />
                            <p className='font-semibold text-xl'>{entrepreneur.user.name} – {entrepreneur.startupName}</p>
                            <p className='text-[14px]'>Start Investing From {entrepreneur.fundingNeed}$</p>
                            <p className='text-gray-600'>
                                {entrepreneur.startupDescription
                                    ? entrepreneur.startupDescription.split(' ').slice(0, 20).join(' ') +
                                      (entrepreneur.startupDescription.split(' ').length > 20 ? '...' : '')
                                    : ''}
                            </p>

                            <div className='flex gap-2'>
                                <button
                                    className='bg-blue-500 text-white py-2 px-4 rounded'
                                    onClick={() => navigate('/chat', {
                                        state: {
                                            receiver: {
                                                _id: entrepreneur.user._id || entrepreneur.user,
                                                name: entrepreneur.user.name,
                                                imageUrl: entrepreneur.entrepreneurImage
                                            }
                                        }
                                    })}
                                >
                                    Message
                                </button>

                                {status === 'pending' ? (
                                    <button disabled className='bg-yellow-500 text-white py-2 px-4 rounded'>Pending</button>
                                ) : status === 'accepted' ? (
                                    <button disabled className='bg-blue-600 text-white py-2 px-4 rounded'>Accepted</button>
                                ) : (
                                    <button
                                        onClick={() => handleRequest(entrepreneur)}
                                        className='bg-green-500 text-white py-2 px-4 rounded'
                                    >
                                        Request
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Middle;