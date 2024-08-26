// src/features/teams/TeamList.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams, deleteTeam } from './teamSlice';
import { RootState, AppDispatch } from '../../store';
import { Table, Button } from 'react-bootstrap';
import TeamForm from './TeamForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const TeamList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const teams = useSelector((state: RootState) => state.teams.teams);
  const status = useSelector((state: RootState) => state.teams.status);
  const error = useSelector((state: RootState) => state.teams.error);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<{ id: number; name: string; manager_id: number } | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTeams());
    }
  }, [status, dispatch]);

  const handleShowModal = (team = null) => {
    setCurrentTeam(team);
    setEditMode(!!team);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleDeleteTeam = (id: number) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      dispatch(deleteTeam(id));
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <Button variant="primary" onClick={() => handleShowModal()}>
        Add Team
      </Button>

      <TeamForm show={showModal} handleClose={handleCloseModal} editMode={editMode} existingTeam={currentTeam} />

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Manager</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{team.id}</td>
              <td>{team.name}</td>
              <td>{team.manager_id}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleShowModal(team)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button variant="danger" onClick={() => handleDeleteTeam(team.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TeamList;
