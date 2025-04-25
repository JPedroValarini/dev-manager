import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const EditLevelModal = ({ isOpen, onClose, level, onSubmit }) => {
  const [levelName, setLevelName] = useState("");

  // Atualiza o estado quando o prop 'level' muda
  useEffect(() => {
    if (level) {
      setLevelName(level.name);
    }
  }, [level]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!levelName.trim()) return;
    
    await onSubmit({ level: levelName });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Editar Nível</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <FiX className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Nível</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={levelName}
              onChange={(e) => setLevelName(e.target.value)}
              required
            />
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
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLevelModal;