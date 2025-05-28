// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProjectFilters from "./pages/ProjectFilers";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/filters" element={<ProjectFilters />} />
      </Routes>
    </Router>
  );
}

export default App;
