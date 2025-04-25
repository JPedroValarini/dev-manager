import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const LevelModal = ({ isOpen, onClose, onSubmit }) => {
  const [levelName, setLevelName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!levelName.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit({ level: levelName });
      setLevelName("");
      onClose();
    } catch (error) {
      console.error("Erro ao criar nível:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Adicionar Novo Nível</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="level-name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Nível
            </label>
            <input
              type="text"
              id="level-name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={levelName}
              onChange={(e) => setLevelName(e.target.value)}
              placeholder="Ex: Júnior, Pleno, Sênior"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={isSubmitting || !levelName.trim()}
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LevelModal;