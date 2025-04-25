import React, { useState } from "react";

function LevelsPage() {
  const [levels, setLevels] = useState([
    { id: 1, name: "Junior" },
    { id: 2, name: "Mid" },
    { id: 3, name: "Senior" },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this level?")) {
      setLevels(levels.filter(level => level.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="p-6 bg-blue-500 text-white rounded-md shadow-md">
        <h1 className="text-3xl">Levels</h1>
      </div>

      <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">ID</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level) => (
            <tr key={level.id} className="border-t hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{level.id}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{level.name}</td>
              <td className="px-6 py-4 text-sm">
                <button
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => alert(`Edit level ${level.name}`)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(level.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="mt-6 p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => alert("Add new level")}
      >
        Add Level
      </button>
    </div>
  );
}

export default LevelsPage;
