import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../features/auth/authSlice";
import { Form, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    role: user.role, // Ajouter le rôle pour permettre la modification
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="dashboard">
        <h2>Mon Profil</h2>
        <div className="profil">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLastName" className="mt-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Afficher le rôle uniquement pour les administrateurs */}
            {user.role === "admin" && (
              <Form.Group controlId="formRole" className="mt-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </Form.Control>
              </Form.Group>
            )}
            <div className="send">
              <Button variant="primary" type="submit" className="mt-3 boutonSend">
                Mettre à jour
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
