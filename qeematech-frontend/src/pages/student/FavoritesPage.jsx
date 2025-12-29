import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal'; 
import Button from '../../components/common/Button';
import api from '../../api/axios';
import { toast } from 'react-hot-toast';

const FavoritesPage = () => {
  const [state, setState] = useState({
    favorites: [],
    loading: true,
    selectedLesson: null,
    isModalOpen: false
  });

  const fetchFavorites = async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const response = await api.get('/favorites');
      const favs = response.data.data?.favorites || response.data.favorites || [];
      setState(prev => ({
        ...prev,
        favorites: favs,
        loading: false
      }));
    } catch (error) {
      toast.error('Failed to load favorites');
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleViewDetails = (lesson) => {
    setState(prev => ({ ...prev, selectedLesson: lesson, isModalOpen: true }));
  };

  const handleRemoveFavorite = async (lessonId) => {
    try {
      await api.post('/favorites/toggle', { lessonId });
      toast.success('Removed from favorites');
      setState(prev => ({
        ...prev,
        favorites: prev.favorites.filter(item => item.lessonId !== lessonId)
      }));
    } catch (error) {
      toast.error('Failed to remove');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Favorite Lessons</h1>
          <p className="text-gray-500 text-sm">You have {state.favorites.length} saved lessons</p>
        </div>

        {state.loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : state.favorites.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">Your favorites list is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {state.favorites.map((item) => (
              item.lesson && (
                <Card
                  key={item.id}
                  title={item.lesson.name}
                  description={item.lesson.description}
                  image={item.lesson.image} 
                  rating={item.lesson.rating}
                  isFavorite={true}
                  onFavoriteClick={() => handleRemoveFavorite(item.lessonId)}
                >
                  <Button 
                    variant="outline" 
                    className="text-xs py-1"
                    onClick={() => handleViewDetails(item.lesson)}
                  >
                    View Details
                  </Button>
                </Card>
              )
            ))}
          </div>
        )}
      </main>

      <Modal 
        isOpen={state.isModalOpen} 
        onClose={() => setState(prev => ({ ...prev, isModalOpen: false }))} 
        title={state.selectedLesson?.name}
      >
        {state.selectedLesson && (
          <div className="space-y-4">
            <img src={state.selectedLesson.image} className="w-full h-48 object-cover rounded-lg" alt="" />
            <p className="text-gray-600">{state.selectedLesson.description}</p>
            <Button onClick={() => setState(prev => ({ ...prev, isModalOpen: false }))} className="w-full">
              Close
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FavoritesPage;