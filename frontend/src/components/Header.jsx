import { Link, useLocation } from "react-router-dom";
import { FiUsers, FiLayers, FiHome, FiChevronDown } from "react-icons/fi";

const Header = () => {
  const location = useLocation();

  const getNavLinkClass = (path) => 
    `flex items-center px-5 py-3 rounded-lg transition-colors text-sm font-medium ${
      location.pathname === path 
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <div class="px-4">
      <div className="bg-white shadow-sm max-w-7xl mx-auto border rounded-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-[6rem]">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 mr-10">
                Dev<span className="text-blue-600">Manager</span>
              </h1>
              
              <nav className="flex space-x-4">
                <Link to="/" className={getNavLinkClass('/')}>
                  <FiHome className="mr-2" />
                  Dashboard
                </Link>
                <Link to="/levels" className={getNavLinkClass('/levels')}>
                  <FiLayers className="mr-2" />
                  Levels
                </Link>
                <Link to="/developers" className={getNavLinkClass('/developers')}>
                  <FiUsers className="mr-2" />
                  Developers
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;