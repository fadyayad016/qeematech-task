import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    class: '',
    academicYear: '',
    phone: '',
    profileImage: null
  });

  const [preview, setPreview] = useState(null); 
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'profileImage') {
      const file = files[0];
      setFormData(prev => ({ ...prev, profileImage: file }));
      setPreview(URL.createObjectURL(file)); 
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(); 
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    
    const result = await register(data);
    if (result.success) navigate('/');
  };

  return (
    <div className="min-h-screen py-10 bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">Create Student Account</h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 flex flex-col items-center mb-4">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 overflow-hidden mb-2 bg-gray-100">
              {preview ? <img src={preview} className="w-full h-full object-cover" /> : null}
            </div>
            <input type="file" name="profileImage" onChange={handleChange} className="text-xs" />
          </div>

          <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
          <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
          <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
          <Input label="Class" name="class" value={formData.class} onChange={handleChange} />
          <Input label="Academic Year" name="academicYear" value={formData.academicYear} onChange={handleChange} />

          <Button type="submit" className="md:col-span-2 mt-4">Register Now</Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;