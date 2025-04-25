import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LevelsPage from "./pages/LevelsPage";
import DevelopersPage from "./pages/DevelopersPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LevelsPage />} />
          <Route path="/developers" element={<DevelopersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;