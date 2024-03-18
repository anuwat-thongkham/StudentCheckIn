import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../page/HomePage'

const ApplicationRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/StudentCheckIn" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ApplicationRouter;
