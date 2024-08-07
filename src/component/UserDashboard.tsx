import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Sidebar from './Sidebar'; 
import Header from './Header'; 
import './Dashboard.css';

const UserDashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <h1>Welcome, {user?.firstname} {user?.lastname}</h1>
          <p>This is the User Dashboard.</p>
          {/* Ajoutez d'autres composants et fonctionnalités spécifiques pour les utilisateurs */}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
