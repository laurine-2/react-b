import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Sidebar from './Sidebar'; // Assurez-vous d'avoir un composant Sidebar
import Header from './Header'; // Assurez-vous d'avoir un composant Header

const AdminDashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <h1>Welcome, {user?.firstname} {user?.lastname}</h1>
          <p>This is the Admin Dashboard.</p>
          {/* Ajoutez d'autres composants et fonctionnalités spécifiques pour les administrateurs */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
