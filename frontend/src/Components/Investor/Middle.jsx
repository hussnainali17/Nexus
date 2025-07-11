import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Middle = () => {
    const [entrepreneurs, setEntrepreneurs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [requestStatus, setRequestStatus] = useState({}); // { entrepreneurId: 'pending' | 'accepted' }
    const navigate = useNavigate();

    const userId = localStorage.getItem('user');
    const requestedKey = `requested_entrepreneurs_${userId}`; // key for localStorage

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile/allentrepreneurs`);
                setEntrepreneurs(response.data);
            } catch (error) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Fetch status only for previously requested entrepreneurs
    useEffect(() => {
        const fetchPreviousStatuses = async () => {
            const stored = JSON.parse(localStorage.getItem(requestedKey)) || [];
            const statuses = { ...requestStatus };

            for (const entrepreneurId of stored) {
                try {
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/request/status/${entrepreneurId}`);
                    if (res.data?.status === 'pending' || res.data?.status === 'accepted') {
                        statuses[entrepreneurId] = res.data.status;
                    }
                } catch (err) {
                    console.error(`Error fetching status for ${entrepreneurId}`);
                }
            }
            setRequestStatus(statuses);
        };

        fetchPreviousStatuses();
    }, [entrepreneurs]);

    const handleRequest = async (entrepreneur) => {
        // Always use the entrepreneur profile's _id
        const entrepreneurId = entrepreneur._id;
        try {
            // Immediately show pending
            setRequestStatus(prev => ({ ...prev, [entrepreneurId]: 'pending' }));

            // Send request with the correct entrepreneurId
            await axios.post(`${import.meta.env.VITE_API_URL}/request/send`, {
                userId,
                entrepreneurId // <-- use the profile's _id only
            });

            // Store this entrepreneur ID locally
            const stored = JSON.parse(localStorage.getItem(requestedKey)) || [];
            if (!stored.includes(entrepreneurId)) {
                stored.push(entrepreneurId);
                localStorage.setItem(requestedKey, JSON.stringify(stored));
            }
        } catch (err) {
            alert('Failed to send request');
            setRequestStatus(prev => ({ ...prev, [entrepreneurId]: null }));
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
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
                            className='md:p-4 space-y-1 cursor-pointer bg-white hover:shadow-lg transition-shadow duration-150'
                            onClick={e => {
                                if (e.target.tagName === 'BUTTON') return;
                                navigate('/entrepreneur_profile', { state: { entrepreneur } });
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
                                                imageUrl: entrepreneur.user.imageUrl
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






// import { useEffect, useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// const Middle = () => {
//     const [entrepreneurs, setEntrepreneurs] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [requestStatus, setRequestStatus] = useState({}); // Track request status per entrepreneur
//     const navigate = useNavigate();

//     // Get investorId from localStorage (or auth context)
//     const userId = localStorage.getItem('user');
    

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile/allentrepreneurs`);
//                 setEntrepreneurs(response.data);
//             } catch (error) {
//                 setError('Error fetching data');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, []);

//     const handleRequest = async (entrepreneur) => {
//         try {
//             setRequestStatus(prev => ({ ...prev, [entrepreneur._id]: 'sending' }));
//             await axios.post(`${import.meta.env.VITE_API_URL}/request/send`, {
//                 userId: userId,
//                 entrepreneurId: entrepreneur.user._id || entrepreneur.user, // support both populated and id
//             });
//         } catch (err) {
//             alert('Failed to send request');
//         }
//     };

   
   

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//         <div>
//             <div className='flex flex-col text-center my-10'>
//                 <h1 className='text-2xl font-bold'>Looking for Global investment opportunities?</h1>
//                 <p className='mt-2 text-gray-600'>Browse our latest startup pitches from around the world and connect with entrepreneurs</p>
//             </div>

//             <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 px-4 md:px-12 py-8'>
//                 {entrepreneurs.map((entrepreneur) => {
                   
//                     return (
//                         <div
//                             key={entrepreneur._id}
//                             className='md:p-4 space-y-1 cursor-pointer bg-white hover:shadow-lg transition-shadow duration-150'
//                             onClick={e => {
//                                 // Prevent navigation if clicking on a button inside the card
//                                 if (e.target.tagName === 'BUTTON') return;
//                                 navigate('/entrepreneur_profile', { state: { entrepreneur } });
//                             }}
//                         >
//                             <img className='w-full h-auto md:h-[70%] object-cover' src={entrepreneur.businessImage} alt="" />
//                             <p className='font-semibold text-xl'>{entrepreneur.user.name} – {entrepreneur.startupName}</p>
//                             <p className='text-[14px]'>Start Investing From {entrepreneur.fundingNeed}$</p>
//                             <p className='text-gray-600'>
//                               {entrepreneur.startupDescription
//                                 ? entrepreneur.startupDescription.split(' ').slice(0, 20).join(' ') +
//                                   (entrepreneur.startupDescription.split(' ').length > 20 ? '...' : '')
//                                 : ''}
//                             </p>
//                             <div className='flex gap-2'>
//                                 <button
//                                     className='bg-blue-500 text-white py-2 px-4 rounded'
//                                     onClick={() => navigate('/chat', { state: { receiver: { _id: entrepreneur.user._id || entrepreneur.user, name: entrepreneur.user.name, imageUrl: entrepreneur.user.imageUrl } } })}
//                                 >
//                                     Message
//                                 </button>
//                                 <button onClick={() => handleRequest(entrepreneur)} className='bg-green-500 text-white py-2 px-4 rounded'>
//                                     Request
//                                 </button>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     )
// }

// export default Middle