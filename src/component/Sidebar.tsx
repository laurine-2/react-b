import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { MdQuestionAnswer } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";

import { FaAngleRight, FaUsers, FaTasks, FaListAlt } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import "./Sidebar.css";
import { RootState } from "../store/index";

const Sidebar: React.FC = () => {
  // Extract the user object directly from the Redux state
  const { user } = useSelector((state: RootState) => state.auth);
  console.log("User:", user);
  console.log("User Role:", user?.role);

  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState(1);

  const handleSubmenuClick = (tabIndex: number) => {
    setActiveTab(activeTab === tabIndex ? null : tabIndex);
  };

  return (
    <div className="sidebar">
      {/* {user && user.role === 'user' && ( */}
      <ul>
        <li
          style={{
            padding: "10px",
            backgroundColor: selectedItem === 1 ? "#0d3c6b" : "",
          }}
          onClick={() => setSelectedItem(1)}
        >
          <Link to="/categories">
            <span className="icon">
              <FaListAlt />
            </span>
            Catégories Quiz
          </Link>
        </li>
        <li
          style={{
            padding: "10px",
            backgroundColor: selectedItem === 2 ? "#0d3c6b" : "",
          }}
          onClick={() => setSelectedItem(2)}
        >
          <Link to="/quizzes">
            <span className="icon">
              <MdQuestionAnswer />
            </span>
            Réaliser un quiz
          </Link>
        </li>
        <li
          style={{
            padding: "10px",
            backgroundColor: selectedItem === 3 ? "#0d3c6b" : "",
          }}
          onClick={() => setSelectedItem(3)}
        >
          <Link to="/results">
            <span className="icon">
              <FaTasks />
            </span>
            Résultats des quiz
          </Link>
        </li>
        <li
          style={{
            padding: "10px",
            backgroundColor: selectedItem === 4 ? "#0d3c6b" : "",
          }}
          onClick={() => setSelectedItem(4)}
        >
          <Link to="#">
            <span className="icon">
              <GiTeacher />
            </span>
            Comparer ses résultats
          </Link>
        </li>

        <li
          style={{
            padding: "10px",
            backgroundColor: selectedItem === 5 ? "#0d3c6b" : "",
          }}
          onClick={() => setSelectedItem(5)}
        >
          <Link to="/profil">
            <span className="icon">
              <FaUsers />
            </span>
            profil
          </Link>
        </li>

        <li
          style={{
            padding: "10px",
            backgroundColor: selectedItem === 6 ? "#0d3c6b" : "",
          }}
          onClick={() => setSelectedItem(6)}
        >
          <Link to="/profil">
            <span className="icon">
              <IoIosSettings />
            </span>
            Paramètres
          </Link>
        </li>
      </ul>
      {/* )} */}
      {user && user.role === "manager" && (
        <ul>
          <li>
            <Link to="/profil">
              <span className="icon">
                <FaUsers />
              </span>
              profil
            </Link>
          </li>
          <li>
            <Button
              className={`w-100 ${activeTab === 2 ? "active" : ""}`}
              onClick={() => handleSubmenuClick(2)}
            >
              <span className="icon">
                <MdQuestionAnswer />
              </span>
              Quizzes
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === 2 && (
              <div className="submenuWrapper">
                <ul className="submenu">
<<<<<<< HEAD
                  <li><Link to="/quizzes/list">Quiz List</Link></li>
                  <li><Link to="/quizzes/create">Create Quiz</Link></li>
=======
                  <li>
                    <Link to="/quizzes/list">Quiz List</Link>
                  </li>
                  {/* <li><Link to="/quizzes/create">Create Quiz</Link></li> */}
>>>>>>> ee458bbe3338de9ad576f0aa09465177048e201a
                </ul>
              </div>
            )}
          </li>
          <li>
            <Link to="/create-category">
              <span className="icon">
                <FaListAlt />
              </span>
              Category
            </Link>
          </li>
          <li>
            <Link to="/question">
              <span className="icon">
                <FaListAlt />
              </span>
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
              <span className="icon">
                <FaListAlt />
              </span>
              Voir les réponses des utilisateurs
            </Link>
          </li>

          <li>
            <Link to="/team-performance">
              <span className="icon">
                <FaUsers />
              </span>
              Voir les performances des membres de son équipe
            </Link>
          </li>
        </ul>
      )}
      {user && user.role === "admin" && (
        <ul>
          <li>
            <Link to="/profil">
              <span className="icon">
                <FaUsers />
              </span>
              profil
            </Link>
          </li>
          <li>
            <Link to="/manage-users">
              <span className="icon">
                <FaUsers />
              </span>
              Gérer les utilisateurs
            </Link>
          </li>
          <li>
            <Link to="/manage-managers">
              <span className="icon">
                <FaUsers />
              </span>
              Gérer les gestionnaires
            </Link>
          </li>
          <li>
            <Link to="/manage-admins">
              <span className="icon">
                <FaUsers />
              </span>
              Gérer les administrateurs
            </Link>
          </li>
          <li>
            <Link to="/manage-categories">
              <span className="icon">
                <FaListAlt />
              </span>
              Gérer toutes les catégories de quiz
            </Link>
          </li>
          <li>
            <Link to="/manage-quizzes">
              <span className="icon">
                <MdQuestionAnswer />
              </span>
              Gérer tous les quiz
            </Link>
          </li>
          <li>
            <Link to="/site-performance">
              <span className="icon">
                <FaTasks />
              </span>
              Voir l'ensemble des performances sur le site
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
