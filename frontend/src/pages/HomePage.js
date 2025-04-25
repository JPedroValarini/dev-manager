import { FiCode, FiUsers, FiTrendingUp, FiBarChart2 } from "react-icons/fi";
import Header from "../components/Header";

function HomePage() {
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
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <FiUsers size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Quantidade Desenvolvedores</p>
                <p className="text-2xl font-semibold">24</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <FiTrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Nível Sênior</p>
                <p className="text-2xl font-semibold">8</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <FiBarChart2 size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Exp. Média</p>
                <p className="text-2xl font-semibold">3.2 anos</p>
              </div>
            </div>
          </div>
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