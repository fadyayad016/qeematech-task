import React from 'react';

const Input = ({ label, type = "text", placeholder, value, onChange, name, error, className = "" }) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
          error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
        }`}
      />
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
};

export default Input;