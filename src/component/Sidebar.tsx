import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { MdQuestionAnswer } from 'react-icons/md';
import { FaAngleRight, FaUsers, FaTasks, FaListAlt } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import './Sidebar.css';
import { RootState } from '../store/index';

const Sidebar: React.FC = () => {
  // Extract the user object directly from the Redux state
  const { user } = useSelector((state: RootState) => state.auth);
  console.log('User:', user);
  console.log('User Role:', user?.role);

  const [activeTab, setActiveTab] = useState<number | null>(null);

  const handleSubmenuClick = (tabIndex: number) => {
    setActiveTab(activeTab === tabIndex ? null : tabIndex);
  };

  return (
    <div className="sidebar">
      {user && user.role === 'user' && (
        <ul>
          <li>
            <Link to="/profile">
              <span className="icon"><FaUsers /></span>
              Voir/modifier le profil
            </Link>
          </li>
          <li>
            <Link to="/categories">
              <span className="icon"><FaListAlt /></span>
              Parcourir les catégories de quiz
            </Link>
          </li>
          <li>
            <Link to="/quizzes">
              <span className="icon"><MdQuestionAnswer /></span>
              Réaliser un quiz
            </Link>
          </li>
          <li>
            <Link to="/results">
              <span className="icon"><FaTasks /></span>
              Voir les résultats des quiz
            </Link>
          </li>
          <li>
            <Link to="/compare">
              <span className="icon"><GiTeacher /></span>
              Comparer ses résultats
            </Link>
          </li>
        </ul>
      )}
      {user && user.role === 'manager' && (
        <ul>
          <li>
            <Button
              className={`w-100 ${activeTab === 2 ? "active" : ""}`}
              onClick={() => handleSubmenuClick(2)}
            >
              <span className="icon"><MdQuestionAnswer /></span>
              Quizzes
              <span className="arrow"><FaAngleRight /></span>
            </Button>
            {activeTab === 2 && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li><Link to="/quizzes/list">Quiz List</Link></li>
                  <li><Link to="/quizzes/create">Create Quiz</Link></li>
                </ul>
              </div>
            )}
          </li>
          <li>
            <Link to="/create-category">
              <span className="icon"><FaListAlt /></span>
              Créer une catégorie de quiz
            </Link>
          </li>
          <li>
            <Link to="/edit-category">
              <span className="icon"><FaTasks /></span>
              Éditer une catégorie de quiz
            </Link>
          </li>
          <li>
            <Link to="/delete-category">
              <span className="icon"><FaTasks /></span>
              Supprimer une catégorie de quiz
            </Link>
          </li>
          <li>
            <Link to="/team-performance">
              <span className="icon"><FaUsers /></span>
              Voir les performances des membres de son équipe
            </Link>
          </li>
        </ul>
      )}
      {user && user.role === 'admin' && (
        <ul>
          <li>
            <Link to="/profile">
              <span className="icon"><FaUsers /></span>
              Voir/modifier le profil
            </Link>
          </li>
          <li>
            <Link to="/manage-users">
              <span className="icon"><FaUsers /></span>
              Gérer les utilisateurs
            </Link>
          </li>
          <li>
            <Link to="/manage-managers">
              <span className="icon"><FaUsers /></span>
              Gérer les gestionnaires
            </Link>
          </li>
          <li>
            <Link to="/manage-admins">
              <span className="icon"><FaUsers /></span>
              Gérer les administrateurs
            </Link>
          </li>
          <li>
            <Link to="/manage-categories">
              <span className="icon"><FaListAlt /></span>
              Gérer toutes les catégories de quiz
            </Link>
          </li>
          <li>
            <Link to="/manage-quizzes">
              <span className="icon"><MdQuestionAnswer /></span>
              Gérer tous les quiz
            </Link>
          </li>
          <li>
            <Link to="/site-performance">
              <span className="icon"><FaTasks /></span>
              Voir l'ensemble des performances sur le site
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
