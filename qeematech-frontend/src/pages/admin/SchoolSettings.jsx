import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import api from '../../api/axios';
import { toast } from 'react-hot-toast';

const SchoolSettings = () => {
  const [schoolData, setSchoolData] = useState({
    schoolName: '',
    phone: '',
    schoolLogo: null
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchSchoolInfo = async () => {
      try {
        const res = await api.get('/profile/school');
        if (res.data.data.school) {
          const { name, phone, logo } = res.data.data.school;
          setSchoolData({ schoolName: name, phone: phone || '', schoolLogo: null });
          setPreview(logo); 
        }
      } catch (error) {
        toast.error('Failed to load school settings');
      } finally {
        setFetching(false);
      }
    };
    fetchSchoolInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      const file = files[0];
      setSchoolData(prev => ({ ...prev, schoolLogo: file }));
      setPreview(URL.createObjectURL(file)); 
    } else {
      setSchoolData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append('schoolName', schoolData.schoolName);
    formData.append('phone', schoolData.phone);
    if (schoolData.schoolLogo) {
      formData.append('logo', schoolData.schoolLogo);
    }

    try {
      await api.patch('/profile/school/update', formData);
      toast.success('School settings updated successfully!');
    } catch (error) {
      toast.error('Failed to update school settings');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="flex justify-center py-20 animate-spin">🌀</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">School Profile Settings</h1>
          <p className="text-gray-500 mb-8">Update your institution's public information.</p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col items-center p-6 bg-blue-50 rounded-xl border border-blue-100">
              <div className="relative w-40 h-40 rounded-lg shadow-md overflow-hidden bg-white mb-4 border-2 border-blue-200">
                {preview ? (
                  <img src={preview.startsWith('blob') ? preview : preview} 
                       className="w-full h-full object-contain p-2" alt="School Logo" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-blue-300">No Logo</div>
                )}
              </div>
              <label className="cursor-pointer bg-white px-4 py-2 rounded-full text-sm font-semibold text-blue-600 shadow-sm border border-blue-200 hover:bg-blue-50 transition">
                Change School Logo
                <input type="file" name="logo" onChange={handleChange} className="hidden" accept="image/*" />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Institution Name" name="schoolName" value={schoolData.schoolName} onChange={handleChange} />
              <Input label="Official Phone Number" name="phone" value={schoolData.phone} onChange={handleChange} />
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-100">
              <Button type="submit" isLoading={loading} className="w-full md:w-64">
                Save School Settings
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SchoolSettings;