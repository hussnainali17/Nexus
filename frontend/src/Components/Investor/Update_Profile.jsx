import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';

const Update_Profile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    bio: '',
    investmentInterests: [],
    portfolioCompanies: [],
    avatar: '',
  });
  const [avatar, setAvatar] = useState('/public/images/bernd-dittrich-pYlBAu3de0w-unsplash.jpg');
  const [showAvatarUrlInput, setShowAvatarUrlInput] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const fetchInvestor = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile/${user}`, { withCredentials: true });
        const data = response.data;
        
        setForm({
          name: data.name || '',
          email: data.email || '',
          bio: data.profile?.bio || '',
          investmentInterests: data.profile?.investmentInterests || [],
          portfolioCompanies: data.profile?.portfolioCompanies || [],
          avatar: data.profile?.avatar || '/public/images/Avatar.png',
        });
        setAvatar(data.profile?.avatar || '/public/images/Avatar.png');
      } catch (error) {
        console.error('Error fetching investor profile:', error);
      }
    };
    fetchInvestor();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e, key) => {
    setForm({ ...form, [key]: e.target.value.split(',').map(item => item.trim()) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = localStorage.getItem('user');
    const payload = { ...form, avatar };
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/profile/${user}`, payload, { withCredentials: true });
      alert('Profile updated!');
      //navigate('/investor/profile');
    } catch (error) {
      alert('Error updating profile',error);
    }
  };

  const handleAvatarUrlChange = (e) => {
    setAvatar(e.target.value);
    setForm(prev => ({ ...prev, avatar: e.target.value }));
  };

  return (
    <div className="w-[95%] m-auto p-4 md:w-[90%]">
        <NavBar props="Back" isProfilePage={true}/>
      <form onSubmit={handleSubmit} className="w-full bg-white rounded-lg shadow-lg p-8 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center mb-2">Update Investor Profile</h2>
        <div className="flex flex-col items-center justify-center gap-4 mb-4">
          <img
            src={avatar}
            alt="Investor Avatar"
            className="w-32 h-32 rounded-full object-cover shadow border-4 border-blue-200"
          />
          {showAvatarUrlInput ? (
            <input
              type="text"
              placeholder="Paste image URL and press Enter or blur"
              className="border rounded p-2 w-full mt-2"
              onBlur={() => setShowAvatarUrlInput(false)}
              onKeyDown={e => { if (e.key === 'Enter') setShowAvatarUrlInput(false); }}
              onChange={handleAvatarUrlChange}
              value={avatar}
              autoFocus
            />
          ) : (
            <button
              type="button"
              className="text-sm font-medium text-gray-700 cursor-pointer bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition-all"
              onClick={() => setShowAvatarUrlInput(true)}
            >
              Change Image
            </button>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <label className="font-semibold">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <label className="font-semibold">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <label className="font-semibold">Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" rows={2} />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <label className="font-semibold">Investment Interests <span className="text-xs text-gray-500">(comma separated)</span></label>
            <input name="investmentInterests" value={form.investmentInterests.join(', ')} onChange={e => handleArrayChange(e, 'investmentInterests')} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <label className="font-semibold">Portfolio Companies <span className="text-xs text-gray-500">(comma separated)</span></label>
            <input name="portfolioCompanies" value={form.portfolioCompanies.join(', ')} onChange={e => handleArrayChange(e, 'portfolioCompanies')} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>
        <button type="submit" className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition-all mt-6 self-center">Update Profile</button>
      </form>
    </div>
  );
};

export default Update_Profile;