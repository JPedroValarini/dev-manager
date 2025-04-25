import { Routes, Route } from 'react-router-dom';
import LevelsPage from '../pages/LevelsPage';
import HomePage from  '../pages/HomePage';
import DevelopersPage from '../pages/DevelopersPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/levels" element={<LevelsPage />} />
      <Route path="/developers" element={<DevelopersPage />} />
    </Routes>
  );
}
