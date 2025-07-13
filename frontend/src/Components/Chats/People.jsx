import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const People = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [userProfile, setUserProfile] = useState(null);
    // TODO: Replace with actual user id logic
    const userId = localStorage.getItem('user');
    useEffect(() => {
        if (!userId) return;
        axios.get(`${import.meta.env.VITE_API_URL}/profile/${userId}`, { withCredentials: true })
            .then(res => {
                setUserProfile(res.data);
            });
    });

    useEffect(() => {
        if (!userId) return;
        axios.get(`${import.meta.env.VITE_API_URL}/chat/getInteractedUsers/${userId}`, { withCredentials: true })
            .then(res => setUsers(res.data))
            .catch(() => setUsers([]));
            
    }, []);
    // Fetch users who have interacted with the current user            
    const filteredUsers = users.filter(u => u.name?.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className='md:w-[50%] md:border-2 md:border-black md:mx-auto md:rounded-md h-screen flex flex-col bg-white'>
            {/* Sticky Header */}
            <div className='bg-gray-100 p-4 flex gap-4 items-center text-xl font-bold sticky top-0 z-10 border-b border-gray-200'>
                <i onClick={() => navigate(-1)} className="text-2xl fa-solid fa-arrow-left cursor-pointer md:hidden"></i>
                <img className='h-12 w-12 rounded-full object-cover' src={userProfile?.role === 'investor' ? userProfile?.profile?.avatar : userProfile?.profile?.entrepreneurImage} alt='' />
                <p className='ml-2'>{userProfile?.name}</p>-
                <p className='text-gray-500'>{userProfile?.role}</p>
            </div>
            {/* Search Bar */}
            <div className='flex items-center justify-between px-4 py-2 bg-white sticky top-[72px] z-10 border-b border-gray-100'>
                <input 
                    placeholder='Search...'
                    className='border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-200 text-base'
                    type='search'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            {/* People List */}
            <div className='flex-1 overflow-y-auto p-2 space-y-2 bg-white'>
                {filteredUsers.length === 0 ? (
                    <div className='text-center text-gray-400 mt-8'>No users found.</div>
                ) : (
                    filteredUsers.map((user) => (
                        <div
                            key={user._id}
                            className='flex border border-gray-200 rounded-md items-center gap-4 p-3 hover:bg-gray-100 cursor-pointer transition-colors duration-150'
                            onClick={() => navigate('/chat', { state: { receiver: { _id: user._id, name: user.name, imageUrl: user.role === 'investor' ? user.profile?.avatar : user.profile?.entrepreneurImage } } })}
                        >
                            <img className='h-12 w-12 rounded-full object-cover' src={user.role === 'investor' ? user.profile?.avatar : user.profile?.entrepreneurImage || '/public/images/Global Data Network_ An intricate visual….jpeg'} alt='' />
                            <div>
                                <p className='font-semibold text-base'>{user.name}</p>
                                <p className='text-gray-500 text-sm'>{user.role}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default People