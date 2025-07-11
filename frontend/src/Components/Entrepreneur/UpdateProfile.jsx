import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    bio: '',
    startupName: '',
    startupDescription: '',
    fundingNeed: '',
    pitchDeckLink: ''
  });
  const [businessImage, setBusinessImage] = useState('/public/images/charles-forerunner-3fPXt37X6UQ-unsplash.jpg');
  const [entrepreneurImage, setEntrepreneurImage] = useState('/public/images/bernd-dittrich-pYlBAu3de0w-unsplash.jpg');
  const [showBusinessUrlInput, setShowBusinessUrlInput] = useState(false);
  const [showEntrepreneurUrlInput, setShowEntrepreneurUrlInput] = useState(false);

  const user = localStorage.getItem('user');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/profile/${user}`)
      .then(response => {
        const data = response.data;
        setForm({
          name: data.name || '',
          email: data.email || '',
          bio: data.profile?.bio || '',
          startupName: data.profile?.startupName || '',
          startupDescription: data.profile?.startupDescription || '',
          fundingNeed: data.profile?.fundingNeed || '',
          pitchDeckLink: data.profile?.pitchDeckLink || '',
          businessImage: data.profile?.businessImage || '/public/images/charles-forerunner-3fPXt37X6UQ-unsplash.jpg',
          entrepreneurImage: data.profile?.entrepreneurImage || '/public/images/bernd-dittrich-pYlBAu3de0w-unsplash.jpg'
        });
        setBusinessImage(data.profile?.businessImage || '/public/images/charles-forerunner-3fPXt37X6UQ-unsplash.jpg');
        setEntrepreneurImage(data.profile?.entrepreneurImage || '/public/images/bernd-dittrich-pYlBAu3de0w-unsplash.jpg');
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, businessImage, entrepreneurImage };
    axios.post(`${import.meta.env.VITE_API_URL}/profile/${user}`, payload)
      .then(() => {
        alert('Profile updated!');
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

 
  const handleBusinessImageUrlChange = (e) => {
    setBusinessImage(e.target.value);
    setForm(prev => ({ ...prev, businessImage: e.target.value }));
  };
  const handleEntrepreneurImageUrlChange = (e) => {
    setEntrepreneurImage(e.target.value);
    setForm(prev => ({ ...prev, entrepreneurImage: e.target.value }));
  };

  return (
    <div className="w-[95%] m-auto p-4 md:w-[90%] ">
        <NavBar props="Back" isProfilePage={true}/>
      <form onSubmit={handleSubmit} className="w-full bg-white rounded-lg shadow-lg p-8 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center mb-2">Update Business Details</h2>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/2 flex flex-col items-center gap-2 justify-center">
            <img className="w-full md:w-70 h-48 object-cover rounded-lg shadow" src={businessImage} alt="Business" />
            {showBusinessUrlInput ? (
              <input
                type="text"
                placeholder="Paste image URL and press Enter or blur"
                className="border rounded p-2 w-full mt-2"
                onBlur={() => setShowBusinessUrlInput(false)}
                onKeyDown={e => { if (e.key === 'Enter') setShowBusinessUrlInput(false); }}
                onChange={handleBusinessImageUrlChange}
                value={businessImage}
                autoFocus
              />
            ) : (
              <button
                type="button"
                className="text-sm font-medium text-gray-700 cursor-pointer bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition-all"
                onClick={() => setShowBusinessUrlInput(true)}
              >
                Change Image
              </button>
            )}
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <label className="font-semibold">Business Name</label>
            <input name="startupName" value={form.startupName} onChange={handleChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <label className="font-semibold">Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" rows={2} />
            <label className="font-semibold">Startup Description</label>
            <textarea name="startupDescription" value={form.startupDescription} onChange={handleChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" rows={2} />
            <label className="font-semibold">Funding Needed</label>
            <input name="fundingNeed" value={form.fundingNeed} onChange={handleChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <label className="font-semibold">Pitch Deck Link</label>
            <input name="pitchDeckLink" value={form.pitchDeckLink} onChange={handleChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>
        <div className="w-full h-px bg-gray-300 my-4"></div>
        <h2 className="text-2xl font-bold text-center">Entrepreneur Details</h2>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex gap-2 flex-col items-center md:gap-2 justify-center w-full md:w-1/3">
            <img className="h-24 w-24 rounded-full object-cover shadow" src={entrepreneurImage} alt="Entrepreneur" />
            {showEntrepreneurUrlInput ? (
              <input
                type="text"
                placeholder="Paste image URL and press Enter or blur"
                className="border rounded p-2 w-full mt-2"
                onBlur={() => setShowEntrepreneurUrlInput(false)}
                onKeyDown={e => { if (e.key === 'Enter') setShowEntrepreneurUrlInput(false); }}
                onChange={handleEntrepreneurImageUrlChange}
                value={entrepreneurImage}
                autoFocus
              />
            ) : (
              <button
                type="button"
                className="text-sm md:w-30 font-medium text-gray-700 cursor-pointer bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition-all"
                onClick={() => setShowEntrepreneurUrlInput(true)}
              >
                Change Image
              </button>
            )}
          </div>
          <div className="flex flex-col gap-3 w-full md:w-2/3">
            <label className="font-semibold">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <label className="font-semibold">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <label className="font-semibold">Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" rows={2} />
          </div>
        </div>
        <button type="submit" className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition-all mt-6 self-center">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
