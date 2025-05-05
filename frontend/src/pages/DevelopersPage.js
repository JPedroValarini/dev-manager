import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiUser } from "react-icons/fi";
import Header from "../components/Header";
import api from "../services/api";
import EditDeveloperModal from "../components/EditDeveloperModal";
import CreateDeveloperModal from "../components/CreateDeveloperModal";

function DevelopersPage() {
  const [developers, setDevelopers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [developerToDelete, setDeveloperToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [developerToEdit, setDeveloperToEdit] = useState(null);
  const [levels, setLevels] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const devResponse = await api.getDevelopers();
        const formattedDevelopers = devResponse.data.map(dev => ({
          id: dev.id,
          name: dev.name,
          level: dev.level?.level || "Nível não definido",
          levelId: dev.level_id,
          sex: dev.sex,
          age: dev.age,
          birthDate: dev.birth_date,
          hobby: dev.hobby,
          joinDate: dev.created_at,
          skills: dev.hobby ? dev.hobby.split(' ') : []
        }));
        setDevelopers(formattedDevelopers);
        const levelsResponse = await api.getLevels();
        setLevels(levelsResponse.data || []);
      } catch (err) {
        setError("Erro ao carregar dados");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredDevelopers = developers
    .filter(dev =>
      dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dev.level.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(dev => activeTab === "all" || dev.level === activeTab);

  const handleDelete = async (id) => {
    try {
      await api.deleteDeveloper(id);
      setDevelopers(developers.filter(dev => dev.id !== id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Erro ao deletar desenvolvedor:", err);
      alert("Erro ao deletar desenvolvedor");
    }
  };

  const handleEdit = async (formData) => {
    try {
      setIsLoading(true);

      const formattedBirthDate = formData.birth_date.includes('T')
        ? formData.birth_date.split('T')[0]
        : formData.birth_date;

      const dataToSend = {
        name: formData.name,
        sex: formData.sex,
        birth_date: formattedBirthDate,
        hobby: formData.hobby || null,
        level_id: parseInt(formData.level_id)
      };

      await api.updateDeveloper(developerToEdit.id, dataToSend);

      const devResponse = await api.getDevelopers();
      const updatedDevelopers = devResponse.data.map(dev => ({
        id: dev.id,
        name: dev.name,
        level: dev.level?.level || "Nível não definido",
        levelId: dev.level_id,
        sex: dev.sex,
        age: dev.age,
        birthDate: dev.birth_date,
        hobby: dev.hobby,
        joinDate: dev.created_at,
        skills: dev.hobby ? dev.hobby.split(' ') : []
      }));

      setDevelopers(updatedDevelopers);
      setIsEditModalOpen(false);

    } catch (err) {
      console.error("Erro na atualização:", {
        error: err,
        response: err.response?.data
      });
      alert(`Falha na atualização: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      setIsLoading(true);

      const dataToSend = {
        name: formData.name,
        sex: formData.sex,
        birth_date: formData.birth_date,
        hobby: formData.hobby || null,
        level_id: parseInt(formData.level_id)
      };

      const response = await api.createDeveloper(dataToSend);
      const devResponse = await api.getDevelopers();
      const formattedDevelopers = devResponse.data.map(dev => ({
        id: dev.id,
        name: dev.name,
        level: dev.level?.level || "Nível não definido",
        levelId: dev.level_id,
        sex: dev.sex,
        age: dev.age,
        birthDate: dev.birth_date,
        hobby: dev.hobby,
        joinDate: dev.created_at,
        skills: dev.hobby ? dev.hobby.split(' ') : []
      }));

      setDevelopers(formattedDevelopers);
      setIsCreateModalOpen(false);
      alert('Desenvolvedor criado com sucesso!');

    } catch (err) {
      console.error("Erro ao criar desenvolvedor:", err);
      alert(`Erro ao criar desenvolvedor: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const openDeleteModal = (id) => {
    setDeveloperToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (developer) => {
    setDeveloperToEdit(developer);
    setIsEditModalOpen(true);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Júnior": return "bg-blue-100 text-blue-800";
      case "Pleno": return "bg-green-100 text-green-800";
      case "Sênior":
      case "Senior": return "bg-purple-100 text-purple-800";
      case "Tech Lead": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const calculateAverageExperience = () => {
    if (developers.length === 0) return 0;
    const totalAge = developers.reduce((sum, dev) => sum + dev.age, 0);
    return (totalAge / developers.length).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Header />
        <div className="flex justify-center items-center h-64">
          <p>Carregando desenvolvedores...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Time de Desenvolvedores</h1>
              <p className="mt-2 text-gray-600">Organize seu time de Desenvolvedores</p>
            </div>

            <button
              className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow hover:shadow-md transition-all hover:scale-105"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <FiPlus className="mr-2" />
              Adicionar
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
                  placeholder="Pesquisar Dev..."
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
                  Todos Devs
                </button>
                <button
                  onClick={() => setActiveTab("Júnior")}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${activeTab === "Júnior" ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  Juniors
                </button>
                <button
                  onClick={() => setActiveTab("Pleno")}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${activeTab === "Pleno" ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  Pleno
                </button>
                <button
                  onClick={() => setActiveTab("Sênior")}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${activeTab === "Sênior" ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  Sêniors
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
                      Desenvolvedores
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nível
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Habilidades
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Idade
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
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
                          {dev.age} anos
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-3">
                            <button
                              onClick={() => openEditModal(dev)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition-colors"
                              title="Editar"
                            >
                              <FiEdit2 className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => openDeleteModal(dev.id)}
                              className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors"
                              title="Deletar"
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
                        Nenhum desenvolvedor encontrado. Tente ajustar sua busca ou filtros.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-sm font-medium text-gray-500">Quantidade de Desenvolvedores</h3>
            <p className="mt-1 text-3xl font-semibold text-gray-900">{developers.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-sm font-medium text-gray-500">Desenvolvedores Sênior</h3>
            <p className="mt-1 text-3xl font-semibold text-purple-600">
              {developers.filter(d => d.level === "Sênior" || d.level === "Senior").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-sm font-medium text-gray-500">Idade Média</h3>
            <p className="mt-1 text-3xl font-semibold text-blue-600">
              {calculateAverageExperience()} anos
            </p>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirmar Exclusão</h3>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir este desenvolvedor? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(developerToDelete)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      <EditDeveloperModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        developer={developerToEdit}
        onSubmit={handleEdit}
        levels={levels}
      />

      <CreateDeveloperModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
        levels={levels}
      />

    </div>
  );
}

export default DevelopersPage;