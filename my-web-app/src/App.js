import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import LandingPage from './components/Home/LandingPage';
import { getLoggedInUser } from './utils/auth';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <LandingPage />
            </PrivateRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

const PrivateRoute = ({ children }) => {
  return getLoggedInUser() ? children : <Navigate to="/login" />;
};

export default App;
