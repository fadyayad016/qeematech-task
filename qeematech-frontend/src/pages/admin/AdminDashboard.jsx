import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import api from '../../api/axios';
import { toast } from 'react-hot-toast';
import StudentsManagement from './StudentsManagement'; 

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('lessons');
  const [state, setState] = useState({
    lessons: [],
    students: [], 
    stats: { studentCount: 0, lessonCount: 0, favoriteCount: 0 },
    loading: true,
    isModalOpen: false,
    editingLesson: null, 
    formData: { name: '', description: '', rating: '', image: null },
    studentSearch: '',
    studentPage: 1,
    studentTotalPages: 1
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  const fetchLessons = async () => {
    try {
      const res = await api.get('/lessons');
      setState(prev => ({ ...prev, lessons: res.data.lessons, loading: false }));
    } catch (err) { toast.error('Failed to load lessons'); }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get('/admin/stats');
      setState(prev => ({ ...prev, stats: res.data.data }));
    } catch (err) { console.error('Failed to load stats'); }
  };

  const fetchStudents = async () => {
    try {
      const res = await api.get(`/admin/students?page=${state.studentPage}&search=${state.studentSearch}`);
      setState(prev => ({ 
        ...prev, 
        students: res.data.data.students,
        studentTotalPages: res.data.data.totalPages 
      }));
    } catch (err) { toast.error('Failed to load students'); }
  };

  useEffect(() => { 
    fetchLessons(); 
    fetchStats(); 
  }, []);

  useEffect(() => {
    if (activeTab === 'students') fetchStudents();
  }, [activeTab, state.studentPage, state.studentSearch]);

  const toggleModal = (lesson = null) => {
    setState(prev => ({
      ...prev,
      isModalOpen: !prev.isModalOpen,
      editingLesson: lesson,
      formData: lesson ? { ...lesson } : { name: '', description: '', rating: '', image: null }
    }));
    setPreviewUrl(lesson ? lesson.image : null);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setState(prev => ({ ...prev, formData: { ...prev.formData, image: file } }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setState(prev => ({ ...prev, formData: { ...prev.formData, [name]: value } }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', state.formData.name);
    data.append('description', state.formData.description);
    data.append('rating', state.formData.rating);
    if (state.formData.image instanceof File) data.append('image', state.formData.image);

    try {
      if (state.editingLesson) {
        await api.patch(`/lessons/${state.editingLesson.id}`, data);
        toast.success('Lesson updated');
      } else {
        await api.post('/lessons', data);
        toast.success('Lesson added');
      }
      toggleModal();
      fetchLessons();
      fetchStats();
    } catch (err) { toast.error('Operation failed'); }
  };

  const handleDeleteLesson = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) return;
    try {
      await api.delete(`/lessons/${id}`);
      toast.success('Lesson deleted');
      fetchLessons();
      fetchStats();
    } catch (err) { toast.error('Delete failed'); }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await api.delete(`/admin/students/${id}`);
      toast.success('Student deleted');
      fetchStudents();
      fetchStats();
    } catch (err) { toast.error('Delete failed'); }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Students" value={state.stats.studentCount} icon="👤" bgColor="bg-blue-50" textColor="text-blue-600" />
          <StatCard title="Total Lessons" value={state.stats.lessonCount} icon="📚" bgColor="bg-green-50" textColor="text-green-600" />
          <StatCard title="Total Favorites" value={state.stats.favoriteCount} icon="❤️" bgColor="bg-red-50" textColor="text-red-600" />
        </div>

        <div className="flex gap-8 mb-8 border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('lessons')}
            className={`pb-4 text-sm font-bold transition-all ${activeTab === 'lessons' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            📚 Lessons Management
          </button>
          <button 
            onClick={() => setActiveTab('students')}
            className={`pb-4 text-sm font-bold transition-all ${activeTab === 'students' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            👥 Students Management
          </button>
        </div>

        {activeTab === 'lessons' ? (
          <div className="animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Lessons Management</h2>
              <Button onClick={() => toggleModal()}>+ Add Lesson</Button>
            </div>
            <LessonsTable lessons={state.lessons} onEdit={toggleModal} onDelete={handleDeleteLesson} />
          </div>
        ) : (
          <StudentsManagement 
            students={state.students}
            onDelete={handleDeleteStudent}
            search={state.studentSearch}
            onSearchChange={(e) => setState(prev => ({ ...prev, studentSearch: e.target.value, studentPage: 1 }))}
            currentPage={state.studentPage}
            totalPages={state.studentTotalPages}
            onPageChange={(pageNum) => setState(prev => ({ ...prev, studentPage: pageNum }))}
          />
        )}
      </main>

      <Modal isOpen={state.isModalOpen} onClose={() => toggleModal()} title={state.editingLesson ? 'Edit Lesson' : 'Add New Lesson'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Lesson Name" name="name" value={state.formData.name} onChange={handleInputChange} />
          <Input label="Description" name="description" value={state.formData.description} onChange={handleInputChange} />
          <Input label="Rating" name="rating" type="number" value={state.formData.rating} onChange={handleInputChange} />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Lesson Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleInputChange} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          </div>
          <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden border border-dashed border-gray-300 flex items-center justify-center mt-2">
            {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" /> : <span className="text-gray-400 text-sm">Image preview will appear here</span>}
          </div>
          <Button type="submit" className="w-full mt-6">{state.editingLesson ? 'Update' : 'Create'}</Button>
        </form>
      </Modal>
    </div>
  );
};

const StatCard = ({ title, value, icon, bgColor, textColor }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 transition-transform hover:scale-[1.02]">
    <div className={`w-14 h-14 ${bgColor} ${textColor} rounded-2xl flex items-center justify-center text-2xl`}>{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  </div>
);

const LessonsTable = ({ lessons, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
    <table className="w-full text-left">
      <thead className="bg-gray-50 border-b border-gray-100">
        <tr>
          <th className="px-6 py-4 text-sm font-semibold text-gray-600">Lesson</th>
          <th className="px-6 py-4 text-sm font-semibold text-gray-600">Rating</th>
          <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {lessons.length > 0 ? lessons.map(lesson => (
          <tr key={lesson.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 flex items-center gap-3">
              <img src={lesson.image} className="w-12 h-12 rounded-lg object-cover bg-gray-200" alt="" />
              <div>
                <div className="font-bold text-gray-800">{lesson.name}</div>
                <div className="text-xs text-gray-500 line-clamp-1">{lesson.description}</div>
              </div>
            </td>
            <td className="px-6 py-4 text-yellow-500 font-bold">⭐ {lesson.rating}</td>
            <td className="px-6 py-4 text-right">
              <button onClick={() => onEdit(lesson)} className="text-blue-600 mr-4 font-medium hover:underline">Edit</button>
              <button onClick={() => onDelete(lesson.id)} className="text-red-600 font-medium hover:underline">Delete</button>
            </td>
          </tr>
        )) : (
          <tr><td colSpan="3" className="px-6 py-10 text-center text-gray-400">No lessons found</td></tr>
        )}
      </tbody>
    </table>
  </div>
);

export default AdminDashboard;