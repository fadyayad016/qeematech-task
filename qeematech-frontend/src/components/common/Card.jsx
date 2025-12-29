import React from 'react';

const Card = ({ image, title, description, rating, isFavorite, onFavoriteClick, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        {onFavoriteClick && (
          <button 
            onClick={onFavoriteClick}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:scale-110 transition-transform"
          >
            <span className={isFavorite ? "text-red-500" : "text-gray-400"}>
              {isFavorite ? "❤️" : "🤍"}
            </span>
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2 h-10">{description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-yellow-500 font-bold">⭐ {rating}</span>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;