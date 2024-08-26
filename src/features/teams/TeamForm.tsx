// src/features/teams/TeamForm.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../users/userSlice'; // Assuming you have a user slice
import { addTeam, updateTeam } from './teamSlice';
import { RootState, AppDispatch } from '../../store';
import { Button, Form, Modal } from 'react-bootstrap';

interface TeamFormProps {
  show: boolean;
  handleClose: () => void;
  editMode?: boolean;
  existingTeam?: { id: number; name: string; manager_id: number };
}

const TeamForm: React.FC<TeamFormProps> = ({ show, handleClose, editMode = false, existingTeam = null }) => {
  const [name, setName] = useState(existingTeam ? existingTeam.name : '');
  const [managerId, setManagerId] = useState(existingTeam ? existingTeam.manager_id : '');
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers()); // Load users when the form is shown
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editMode && existingTeam) {
      dispatch(updateTeam({ id: existingTeam.id, name, manager_id: Number(managerId) }));
    } else {
      dispatch(addTeam({ name, manager_id: Number(managerId) }));
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? 'Edit Team' : 'Add New Team'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTeamName">
            <Form.Label>Team Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter team name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formManagerId" className="mt-3">
            <Form.Label>Select Manager</Form.Label>
            <Form.Control
              as="select"
              value={managerId}
              onChange={(e) => setManagerId(e.target.value)}
              required
            >
              <option value="">Select a manager</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstname} {user.lastname}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TeamForm;
