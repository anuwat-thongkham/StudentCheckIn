import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from '../page/HomePage';
import StudentIndexPage from '../page/StudentIndexPage';
import TeacherIndexPage from '../page/TeacherIndexPage';
import CreateAccountIndexPage from '../page/CreateAccountIndexPage';
import CreateAccountStudentPage from '../page/CreateAccountStudentPage';
import CreateAccountTeacherPage from '../page/CreateAccountTeacherPage';
import SumaryCheckInPage from '../page/SumaryCheckInPage';
import PinCheckInPage from '../page/PinCheckInPage';
import CreateCheckInPage from '../page/CreateCheckInPage';
import CheckInDisplayPage from '../page/CheckInDisplayPage';
import CheckInStudentDisplayPage from '../page/CheckInStudentDisplayPage';
import TeacherHistoryPage from '../page/TeacherHistoryPage';

const ApplicationRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/StudentCheckIn/StudentIndexPage' element={<StudentIndexPage />} />
        <Route path='/StudentCheckIn/TeacherIndexPage' element={<TeacherIndexPage />} />
        <Route path='/StudentCheckIn/CreateAccountIndexPage' element={<CreateAccountIndexPage />} />
        <Route path='/StudentCheckIn/CreateAccountStudentPage' element={<CreateAccountStudentPage />} />
        <Route path='/StudentCheckIn/CreateAccountTeacherPage' element={<CreateAccountTeacherPage />} />
        <Route path='/StudentCheckIn/SumaryCheckInPage' element={<SumaryCheckInPage />} />
        <Route path='/StudentCheckIn/PinCheckInPage' element={<PinCheckInPage />} />
        <Route path='/StudentCheckIn/CreateCheckInPage' element={<CreateCheckInPage />} />
        <Route path='/StudentCheckIn/CheckInDisplayPage' element={<CheckInDisplayPage />} />
        <Route path='/StudentCheckIn/CheckInStudentDisplayPage' element={<CheckInStudentDisplayPage />} />
        <Route path='/StudentCheckIn/TeacherHistoryPage' element={<TeacherHistoryPage />} />
      </Routes>
    </Router>
  );
};

export default ApplicationRouter;
