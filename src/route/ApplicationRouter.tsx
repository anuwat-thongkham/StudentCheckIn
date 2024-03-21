import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from '../page/HomePage';
import StudentIndexPage from '../page/StudentIndexPage';
import TeacherIndexPage from '../page/TeacherIndexPage';

const ApplicationRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/StudentCheckIn/StudentIndexPage' element={<StudentIndexPage />} />
        <Route path='/StudentCheckIn/TeacherIndexPage' element={<TeacherIndexPage />} />
      </Routes>
    </Router>
  );
};

export default ApplicationRouter;
