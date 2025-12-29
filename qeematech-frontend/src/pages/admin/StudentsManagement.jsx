import React from 'react';

const StudentsManagement = ({ 
  students, 
  onDelete, 
  search, 
  onSearchChange, 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-800">Students Management</h2>
        <input 
          type="text" 
          placeholder="Search by name or email..." 
          className="px-4 py-2 border rounded-lg w-full md:w-64 outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={onSearchChange}
        />
      </div>

      <StudentsTable students={students} onDelete={onDelete} />
      
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button 
              key={i} 
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-gray-50'}`}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const StudentsTable = ({ students, onDelete }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
    <table className="w-full text-left">
      <thead className="bg-gray-50 border-b border-gray-100">
        <tr>
          <th className="px-6 py-4 text-sm font-semibold text-gray-600">Student</th>
          <th className="px-6 py-4 text-sm font-semibold text-gray-600">Class / Year</th>
          <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {students.length > 0 ? students.map(student => (
          <tr key={student.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 overflow-hidden">
                {student.profileImage ? <img src={student.profileImage} alt="" className="w-full h-full object-cover" /> : (student.fullName ? student.fullName[0] : 'S')}
              </div>
              <div>
                <div className="font-bold">{student.fullName}</div>
                <div className="text-xs text-gray-500">{student.email}</div>
              </div>
            </td>
            <td className="px-6 py-4">
              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-medium">
                {student.class} - {student.academicYear}
              </span>
            </td>
            <td className="px-6 py-4 text-right">
              <button onClick={() => onDelete(student.id)} className="text-red-600 font-medium hover:underline">Delete Student</button>
            </td>
          </tr>
        )) : (
          <tr><td colSpan="3" className="px-6 py-10 text-center text-gray-400">No students found</td></tr>
        )}
      </tbody>
    </table>
  </div>
);

export default StudentsManagement;