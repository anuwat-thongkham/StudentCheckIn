import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from '../page/HomePage';
import StudentIndexPage from '../page/StudentIndexPage';
import TeacherIndexPage from '../page/TeacherIndexPage';
const BASE_URL = '/StudentCheckIn/';
const ApplicationRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/StudentCheckIn/' element={<HomePage />} />
        <Route path='/StudentCheckIn/StudentIndexPage' element={<StudentIndexPage />} />
        <Route path='/StudentCheckIn/TeacherIndexPage' element={<TeacherIndexPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ApplicationRouter;
