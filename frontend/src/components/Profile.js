import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setProfile(data);
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = async () => {
    const token = localStorage.getItem('authToken');
    const response = await fetch('http://localhost:5000/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profile)
    });

    const data = await response.json();
    alert(data.msg);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <input
        type="text"
        placeholder="Username"
        value={profile.username || ''}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
        className="p-2 border border-gray-300 rounded w-full mb-4"
      />
      <button 
        onClick={handleProfileUpdate} 
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Update Profile
      </button>
    </div>
  );
};

export default Profile;
