import { useEffect, useState } from "react";
import { FiCode, FiUsers, FiTrendingUp, FiBarChart2 } from "react-icons/fi";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import api from "../services/api";

function HomePage() {
  const [developers, setDevelopers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await api.getDevelopers();
        setDevelopers(response.data);
      } catch (err) {
        setError("Erro ao carregar desenvolvedores");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  const calculateAverageExperience = () => {
    if (developers.length === 0) return 0;
    const totalAge = developers.reduce((sum, dev) => sum + dev.age, 0);
    return (totalAge / developers.length).toFixed(1);
  };

  const seniorCount = developers.filter(
    dev => dev.level?.level === "Sênior" || dev.level?.level === "Senior"
  ).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
        <Header />
        <div className="flex justify-center items-center h-64">
          <p>Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
        <Header />
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erro! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <Header />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 pt-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            DevManager <span className="text-blue-600">Pro</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            O sistema completo para gerenciamento de desenvolvedores e seus níveis hierárquicos.
            Tenha controle total sobre sua equipe de tecnologia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <StatCard
            icon={FiUsers}
            title="Quantidade Desenvolvedores"
            value={developers.length}
            iconBgColor="bg-blue-100"
            iconTextColor="text-blue-600"
          />
          <StatCard
            icon={FiTrendingUp}
            title="Nível Sênior"
            value={seniorCount}
            iconBgColor="bg-green-100"
            iconTextColor="text-green-600"
          />
          <StatCard
            icon={FiBarChart2}
            title="Exp. Média"
            value={`${calculateAverageExperience()} anos`}
            iconBgColor="bg-purple-100"
            iconTextColor="text-purple-600"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-4">
                  <FiCode size={20} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Sistema Especializado</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Nosso sistema foi desenvolvido especificamente para gestão de carreiras em tecnologia.
                Cadastre desenvolvedores, defina níveis hierárquicos e acompanhe o crescimento da sua equipe.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                  <span>Cadastro completo de desenvolvedores</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                  <span>Gestão de níveis hierárquicos</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                  <span>Relatórios e análises</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 flex items-center justify-center p-8">
              <div className="relative w-full h-64">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-lg opacity-20"></div>
                <div className="absolute inset-4 bg-white rounded-md shadow-sm flex items-center justify-center">
                  <div className="text-center p-6">
                    <FiCode className="mx-auto text-4xl text-blue-600 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">DevManager Pro</h3>
                    <p className="text-gray-500 mt-2">Sua equipe em um só lugar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Pronto para gerenciar sua equipe de desenvolvedores?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Utilize o menu superior para acessar as seções de desenvolvedores e níveis hierárquicos.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;