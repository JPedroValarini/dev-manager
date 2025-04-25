import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const CreateDeveloperModal = ({ isOpen, onClose, onSubmit, levels }) => {
  const [formData, setFormData] = useState({
    name: "",
    level_id: "",
    sex: "",
    birth_date: "",
    hobby: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos obrigatórios
    if (!formData.name || !formData.level_id || !formData.sex || !formData.birth_date) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      console.error("Erro ao criar desenvolvedor:", err);
      alert(`Erro ao criar desenvolvedor: ${err.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Adicionar Desenvolvedor</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome*</label>
              <input
                type="text"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nível*</label>
              <select
                name="level_id"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.level_id}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um nível</option>
                {levels && levels.map(level => (
                  <option key={level.id} value={level.id.toString()}>
                    {level.level || level.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sexo*</label>
                <select
                  name="sex"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.sex}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Nascimento*</label>
                <input
                  type="date"
                  name="birth_date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.birth_date}
                  onChange={handleChange}
                  required
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hobby</label>
              <input
                type="text"
                name="hobby"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.hobby}
                onChange={handleChange}
                placeholder="Ex: Programar, Ler, Jogar futebol"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Criar Desenvolvedor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDeveloperModal;