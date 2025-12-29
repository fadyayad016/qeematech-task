import React from 'react';

const Button = ({ children, onClick, type = "button", variant = "primary", isLoading, className = "" }) => {
  const baseStyles = "px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center disabled:opacity-50";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
      ) : null}
      {children}
    </button>
  );
};

export default Button;