import { Routes, Route } from 'react-router-dom';
import LevelsPage from '../pages/LevelsPage';
import DevelopersPage from '../pages/DevelopersPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LevelsPage />} />
      <Route path="/desenvolvedores" element={<DevelopersPage />} />
    </Routes>
  );
}
