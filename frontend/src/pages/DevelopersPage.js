import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiUser, FiStar } from "react-icons/fi";
import Header from "../components/Header";

function DevelopersPage() {
  const [developers, setDevelopers] = useState([
    { id: 1, name: "João Silva", level: "Junior", skills: ["React", "Node.js"], joinDate: "2023-01-15" },
    { id: 2, name: "Maria Souza", level: "Mid", skills: ["TypeScript", "AWS"], joinDate: "2022-05-20" },
    { id: 3, name: "Pedro Costa", level: "Senior", skills: ["Architecture", "Docker"], joinDate: "2021-11-03" },
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [developerToDelete, setDeveloperToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const filteredDevelopers = developers
    .filter(dev => 
      dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dev.level.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(dev => activeTab === "all" || dev.level === activeTab);

  const handleDelete = (id) => {
    setDevelopers(developers.filter(dev => dev.id !== id));
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = (id) => {
    setDeveloperToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const getLevelColor = (level) => {
    switch(level) {
      case "Junior": return "bg-blue-100 text-blue-800";
      case "Mid": return "bg-green-100 text-green-800";
      case "Senior": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <Header />

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Developers Team</h1>
              <p className="mt-2 text-gray-600">Manage your development team members</p>
            </div>
            
            <button
              className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow hover:shadow-md transition-all hover:scale-105"
              onClick={() => alert("Add new developer")}
            >
              <FiPlus className="mr-2" />
              Add New Developer
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search developers..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${activeTab === "all" ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  All Developers
                </button>
                <button
                  onClick={() => setActiveTab("Junior")}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${activeTab === "Junior" ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  Juniors
                </button>
                <button
                  onClick={() => setActiveTab("Mid")}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${activeTab === "Mid" ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  Mid-Level
                </button>
                <button
                  onClick={() => setActiveTab("Senior")}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${activeTab === "Senior" ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  Seniors
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden rounded-xl">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Developer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Skills
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDevelopers.length > 0 ? (
                    filteredDevelopers.map((dev) => (
                      <tr key={dev.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <FiUser className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{dev.name}</div>
                              <div className="text-sm text-gray-500">ID: {dev.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getLevelColor(dev.level)}`}>
                            {dev.level}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {dev.skills.map((skill, index) => (
                              <span key={index} className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(dev.joinDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-3">
                            <button
                              onClick={() => alert(`Edit developer ${dev.name}`)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition-colors"
                              title="Edit"
                            >
                              <FiEdit2 className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => openDeleteModal(dev.id)}
                              className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors"
                              title="Delete"
                            >
                              <FiTrash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        No developers found. Try adjusting your search or filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6">
        <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Developers</h3>
            <p className="mt-1 text-3xl font-semibold text-gray-900">{developers.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-sm font-medium text-gray-500">Senior Developers</h3>
            <p className="mt-1 text-3xl font-semibold text-purple-600">
              {developers.filter(d => d.level === "Senior").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-sm font-medium text-gray-500">Avg. Experience</h3>
            <p className="mt-1 text-3xl font-semibold text-blue-600">2.4 years</p>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this developer? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(developerToDelete)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Developer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DevelopersPage;