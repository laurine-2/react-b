// src/features/users/UserForm.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './userSlice';
import { fetchTeams } from '../teams/teamSlice'; // Importez l'action fetchTeams
import { Button, Form, Modal } from 'react-bootstrap';
import { RootState, AppDispatch } from '../../store';

interface UserFormProps {
  show: boolean;
  handleClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ show, handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [password, setPassword] = useState('');
  const [teamId, setTeamId] = useState<number | null>(null);

  const { teams, status: teamStatus } = useSelector((state: RootState) => state.teams);

  useEffect(() => {
    if (teamStatus === 'idle') {
      dispatch(fetchTeams());
    }
  }, [teamStatus, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addUser({ firstname, lastname, email, role, password, team_id: teamId }));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Form fields */}
          <Form.Group controlId="firstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="lastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {/* Team selection */}
          <Form.Group controlId="team">
            <Form.Label>Assign to Team</Form.Label>
            <Form.Select value={teamId || ''} onChange={(e) => setTeamId(Number(e.target.value))}>
              <option value="">Select a Team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Add User
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserForm;
