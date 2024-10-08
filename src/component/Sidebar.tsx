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
            <Link to="/profil">
              <span className="icon"><FaUsers /></span>
              profil
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
            <Link to="/profil">
              <span className="icon"><FaUsers /></span>
              profil
            </Link>
          </li>
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
              Category
            </Link>
          </li>
          <li>
            <Link to="/question">
              <span className="icon"><FaListAlt /></span>
              Question
            </Link>
          </li>
          {/* <li>
            <Link to="/answer">
            <span className="icon"><FaListAlt/></span>
            Answer 
            </Link>
          </li> */}
          <li>
          <Link to="/user-answers">
            <span className="icon"><FaListAlt /></span>
            Voir les réponses des utilisateurs
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
            <Link to="/profil">
              <span className="icon"><FaUsers /></span>
              profil
            </Link>
          </li>
          <li>
            <Link to="/teams">
              <span className="icon"><FaUsers /></span>
              Create team
            </Link>
          </li>
          <li>
            <Link to="/users">
              <span className="icon"><FaUsers /></span>
              user
            </Link>
          </li>
          {/* <li>
            <Link to="/manage-managers">
              <span className="icon"><FaUsers /></span>
              manager
            </Link>
          </li>
          <li>
            <Link to="/manage-admins">
              <span className="icon"><FaUsers /></span>
              admin
            </Link>
          </li> */}

          {/* <li>
            <Link to="/create-category">
              <span className="icon"><FaListAlt /></span>
              Category
            </Link>
          </li> */}

          <li>
            <Link to="/manage-categories">
              <span className="icon"><FaListAlt /></span>
              manager category de quiz
            </Link>
          </li>
          
          
          <li>
            <Link to="/site-performance">
              <span className="icon"><FaTasks /></span>
              site perform
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;