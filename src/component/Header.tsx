import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import logo2 from "../assets/image/logo2.jpeg";
import Button from "@mui/material/Button";
import {
  MdDarkMode,
  MdMenuOpen,
  MdOutlineLightMode,
  MdOutlineMailOutline,
  MdPerson,
} from "react-icons/md";
import { IoSearch, IoCartOutline, IoShieldCheckmarkSharp } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import './Header.css';

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenNotificationDrop, setIsOpenNotificationDrop] = useState(false);
  const openMyAcc = Boolean(anchorEl);
  const openNotification = Boolean(isOpenNotificationDrop);

  const handleOpenMyAccDrop = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMyAccDrop = () => {
    setAnchorEl(null);
  };

  const handleCloseNotificationsDrop = () => {
    setIsOpenNotificationDrop(false);
  };

  const handleOpenNotificationsDrop = () => {
    setIsOpenNotificationDrop(true);
  };

  // Obtenez les informations de l'utilisateur à partir du store Redux
  const user = useSelector((state: RootState) => state.auth.user);

  // Fonction pour afficher des informations spécifiques en fonction du rôle de l'utilisateur
  const renderUserInfo = () => {
    if (!user) return null;

    switch (user.role) {
      case 'admin':
        return (
          <>
            <p>Admin: {user.firstname} {user.lastname}</p>
            <p>Manage Users, Managers, and Quizzes</p>
          </>
        );
      case 'manager':
        return (
          <>
            <p>Manager: {user.firstname} {user.lastname}</p>
            <p>Manage Team Quizzes</p>
          </>
        );
      default:
        return (
          <>
            <p>User: {user.firstname} {user.lastname}</p>
            <p>Participate in Quizzes</p>
          </>
        );
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo2} alt="Logo" />
            <span>BIMAC</span>
          </Link>
        </div>

        <div className="search-box">
          <Button className="menu-button">
            <MdMenuOpen />
          </Button>
          <div className="search-input">
            <IoSearch />
            <input type="text" placeholder="rechercher ici..." />
          </div>
        </div>

        <div className="actions">
          <Button className="action-button">
            <MdOutlineLightMode />
          </Button>
          <Button className="action-button">
            <IoCartOutline />
          </Button>
          <Button className="action-button">
            <MdOutlineMailOutline />
          </Button>

          <div className="dropdown">
            <Button className="action-button" onClick={handleOpenNotificationsDrop}>
              <FaRegBell />
            </Button>

            <Menu
              anchorEl={isOpenNotificationDrop ? document.body : null}
              className="dropdown-menu"
              open={openNotification}
              onClose={handleCloseNotificationsDrop}
              onClick={handleCloseNotificationsDrop}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <div className="menu-head">
                <h4>Notifications</h4>
              </div>

              <Divider className="menu-divider" />

              <div className="menu-scroll">
                <MenuItem onClick={handleCloseNotificationsDrop}>
                  <div className="menu-item">
                    <div className="user-img">
                      <MdPerson size={30} />
                    </div>
                    <div className="item-info">
                      <h4>
                        <span>
                          <b>{user?.firstname}</b> a ajouté une nouvelle liste <br />
                          <b>cliquez ici pour voir</b>
                        </span>
                      </h4>
                      <p className="item-time">few seconds ago</p>
                    </div>
                  </div>
                </MenuItem>
              </div>

              <div className="menu-footer">
                <Button className="footer-button">
                  Voir toutes les notifications
                </Button>
              </div>
            </Menu>
          </div>

          <div className="account">
            <Button className="account-button" onClick={handleOpenMyAccDrop}>
              <div className="user-img">
                <MdPerson size={30} />
              </div>
              <div className="user-info">
                {renderUserInfo()}
              </div>
            </Button>

            <Menu
              anchorEl={anchorEl}
              className="dropdown-menu"
              open={openMyAcc}
              onClose={handleCloseMyAccDrop}
              onClick={handleCloseMyAccDrop}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleCloseMyAccDrop}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                My Account
              </MenuItem>
              <MenuItem onClick={handleCloseMyAccDrop}>
                <ListItemIcon>
                  <IoShieldCheckmarkSharp />
                </ListItemIcon>
                Reset Password
              </MenuItem>
              <MenuItem onClick={handleCloseMyAccDrop}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
