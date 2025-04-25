import React, { useState } from "react";

function DevelopersPage() {
  const [developers, setDevelopers] = useState([
    { id: 1, name: "João", level: "Junior" },
    { id: 2, name: "Maria", level: "Mid" },
    { id: 3, name: "Pedro", level: "Senior" },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this developer?")) {
      setDevelopers(developers.filter(dev => dev.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="p-6 bg-blue-500 text-white rounded-md shadow-md">
        <h1 className="text-3xl">Developers</h1>
      </div>

      <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">ID</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Level</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {developers.map((dev) => (
            <tr key={dev.id} className="border-t hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{dev.id}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{dev.name}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{dev.level}</td>
              <td className="px-6 py-4 text-sm">
                <button
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => alert(`Edit developer ${dev.name}`)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(dev.id)}
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
        onClick={() => alert("Add new developer")}
      >
        Add Developer
      </button>
    </div>
  );
}

export default DevelopersPage;
