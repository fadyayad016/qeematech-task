import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import api from '../../api/axios';
import { toast } from 'react-hot-toast';

const StudentLessons = () => {
  const [state, setState] = useState({
    lessons: [],
    loading: true,
    search: '',
    currentPage: 1,
    totalPages: 1,
    selectedLesson: null, 
  isModalOpen: false
  });

  const fetchLessons = async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const response = await api.get(`/lessons?page=${state.currentPage}&search=${state.search}`);
      setState(prev => ({
        ...prev,
        lessons: response.data.lessons,
        totalPages: response.data.pagination.pages,
        loading: false
      }));
    } catch (error) {
      toast.error('Failed to load lessons');
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [state.currentPage, state.search]);

  const handleToggleFavorite = async (lessonId) => {
    try {
      await api.post('/favorites/toggle', { lessonId });
      toast.success('Favorites updated');
      fetchLessons(); 
    } catch (error) {
      toast.error('Action failed');
    }
  };


  const handleViewDetails = (lesson) => {
  setState(prev => ({
    ...prev,
    selectedLesson: lesson,
    isModalOpen: true
  }));
};

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Available Lessons</h1>
          <div className="w-full md:w-96">
            <Input 
              placeholder="Search by lesson name..." 
              value={state.search}
              onChange={(e) => setState(prev => ({ ...prev, search: e.target.value, currentPage: 1 }))}
            />
          </div>
        </div>

        {state.loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : state.lessons.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500">No lessons found matching your search.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {state.lessons.map((lesson) => (
                <Card
                  key={lesson.id}
                  title={lesson.name}
                  description={lesson.description}
                  image={`http://localhost:5000${lesson.image}`}
                  rating={lesson.rating}
                  isFavorite={lesson.isFavorite} // القيمة تأتي من الباك اند
                  onFavoriteClick={() => handleToggleFavorite(lesson.id)}
                >
                  <Button variant="outline" className="text-xs py-1" onClick={() => handleViewDetails(lesson)} >View Details</Button>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-12 gap-2">
              <Button 
                variant="outline" 
                disabled={state.currentPage === 1}
                onClick={() => setState(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
              >
                Previous
              </Button>
              <span className="flex items-center px-4 font-medium">
                Page {state.currentPage} of {state.totalPages}
              </span>
              <Button 
                variant="outline" 
                disabled={state.currentPage === state.totalPages}
                onClick={() => setState(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
              >
                Next
              </Button>

            </div>
          </>
        )}
      </main>
<Modal 
  isOpen={state.isModalOpen} 
  onClose={() => setState(prev => ({ ...prev, isModalOpen: false }))} 
  title={state.selectedLesson?.name}
>
  {state.selectedLesson && (
    <div className="space-y-4">
       <img src={state.selectedLesson.image} className="w-full h-48 object-cover rounded-lg" />
       <p>{state.selectedLesson.description}</p>
       <Button onClick={() => setState(prev => ({ ...prev, isModalOpen: false }))} className="w-full">
         Close
       </Button>
    </div>
  )}
</Modal>
    </div>
  );
};

export default StudentLessons;