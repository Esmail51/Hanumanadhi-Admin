import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import IndividualLakeDetails from './pages/IndividualLake/IndividualLake';

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
        <Route path="/lake/:id" element={<IndividualLakeDetails />} />
    </Routes>
  </Router>
);

export default AppRoutes;