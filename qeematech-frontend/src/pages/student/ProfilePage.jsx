import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../../components/layout/Navbar';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api/axios';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const { user, updateUser } = useAuth(); 
  const navigate = useNavigate(); 
  
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    class: user?.class || '',
    academicYear: user?.academicYear || '',
    schoolName: user?.schoolName || '',
    image: null
  });

  const [preview, setPreview] = useState(user?.profileImage || user?.schoolLogo || null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setProfileData(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setProfileData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    Object.keys(profileData).forEach(key => {
      if (profileData[key]) formData.append(key, profileData[key]);
    });

    try {
      const res = await api.patch('/profile/update-me', formData);
      
      if (res.data.status === 'success') {
        updateUser(res.data.data.user); 
      }

      toast.success('Profile updated successfully!');
      
      setTimeout(() => {
        navigate('/');
      }, 1000);

    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile Settings</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center pb-6 border-b border-gray-100">
              <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 mb-4">
                {preview ? (
                  <img 
                    src={preview.startsWith('blob') ? preview : preview} 
                    className="w-full h-full object-cover" 
                    alt="Profile" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
              </div>
              <input type="file" name="image" onChange={handleChange} className="text-sm text-gray-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Full Name" name="fullName" value={profileData.fullName} onChange={handleChange} />
              <Input label="Email" name="email" value={profileData.email} disabled className="opacity-70" />
              <Input label="Phone Number" name="phone" value={profileData.phone} onChange={handleChange} />

              {user?.role === 'STUDENT' && (
                <>
                  <Input label="Class" name="class" value={profileData.class} onChange={handleChange} />
                  <Input label="Academic Year" name="academicYear" value={profileData.academicYear} onChange={handleChange} />
                </>
              )}

              {user?.role === 'ADMIN' && (
                <Input label="School Name" name="schoolName" value={profileData.schoolName} onChange={handleChange} className="md:col-span-2" />
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" isLoading={loading} className="w-full md:w-48">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;