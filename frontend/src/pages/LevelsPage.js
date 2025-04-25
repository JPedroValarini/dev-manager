import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import Header from "../components/Header";
import api from "../services/api";
import LevelModal from "../components/LevelModal";
import EditLevelModal from "../components/EditLevelModal";

function LevelsPage() {
  const [levels, setLevels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [levelToDelete, setLevelToDelete] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await api.getLevels();
        const formattedLevels = response.data.map(level => ({
          id: level.id,
          name: level.level,
          color: getLevelColor(level.level),
          createdAt: level.created_at
        }));
        setLevels(formattedLevels);
      } catch (err) {
        setError("Erro ao carregar níveis");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLevels();
  }, []);

  const getLevelColor = (levelName) => {
    switch(levelName.toLowerCase()) {
      case "júnior": return "bg-blue-100 text-blue-800";
      case "pleno": return "bg-green-100 text-green-800";
      case "sênior": 
      case "senior": return "bg-purple-100 text-purple-800";
      case "tech lead": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddLevel = async (levelData) => {
    try {
      const response = await api.createLevel(levelData);
      const newLevel = {
        id: response.data.id,
        name: response.data.level,
        color: getLevelColor(response.data.level),
        createdAt: response.data.created_at
      };
      setLevels([...levels, newLevel]);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Erro ao criar nível:", err);
      alert("Erro ao criar nível");
    }
  };

  const handleEditLevel = async (levelData) => {
    try {
      const response = await api.updateLevel(currentLevel.id, levelData);
      setLevels(levels.map(l => l.id === currentLevel.id ? { 
        ...l, 
        name: response.data.level,
        color: getLevelColor(response.data.level)
      } : l));
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Erro ao editar nível:", err);
      alert("Erro ao editar nível");
    }
  };

  const filteredLevels = levels.filter(level =>
    level.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await api.deleteLevel(id);
      setLevels(levels.filter(level => level.id !== id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Erro ao deletar nível:", err);
      alert("Erro ao deletar nível");
    }
  };

  const openDeleteModal = (id) => {
    setLevelToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (level) => {
    setCurrentLevel(level);
    setIsEditModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Header />
        <div className="flex justify-center items-center h-64">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Header />
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erro! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Header />

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Níveis</h1>
              <p className="mt-2 text-gray-600">Crie e organize os Níveis dos Desenvolvedores</p>
            </div>
            
            <button
              className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow hover:shadow-md transition-all hover:scale-105"
              onClick={() => setIsAddModalOpen(true)}
            >
              <FiPlus className="mr-2" />
              Adicionar
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Pesquisar..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden rounded-xl">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nivéis
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLevels.length > 0 ? (
                    filteredLevels.map((level) => (
                      <tr key={level.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{level.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${level.color}`}>
                            {level.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-3">
                            <button
                              onClick={() => openEditModal(level)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition-colors"
                              title="Edit"
                            >
                              <FiEdit2 className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => openDeleteModal(level.id)}
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
                      <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                        Nenhum Nível cadastrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <LevelModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddLevel}
      />

      <EditLevelModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        level={currentLevel}
        onSubmit={handleEditLevel}
      />

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirma a exclusão?</h3>
            <p className="text-gray-600 mb-6">Não será possível recuperar depois. Tem certeza que deseja excluir?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(levelToDelete)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LevelsPage;