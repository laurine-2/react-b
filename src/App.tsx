import React from 'react';
import Home from '../src/component/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/features/auth/Login';
import Register from '../src/features/auth/Register';
import Logout from '../src/features/auth/Logout';
import UserDashboard from './component/UserDashboard';
import ManagerDashboard from './component/ManagerDashboard';
import AdminDashboard from './component/AdminDashboard';
import PrivateRoute from '../src/component/PrivateRoute';

const App: React.FC = () => {
  return (
    
      
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<PrivateRoute />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
        
      </Routes>
    
      
   
  );
};

export default App;
