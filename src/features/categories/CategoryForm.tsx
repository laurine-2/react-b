import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from './categorySlice';
import { fetchTeams } from '../teams/teamSlice'; // Assurez-vous que l'action pour récupérer les équipes est importée
import { RootState, AppDispatch } from '../../store';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Interface pour une équipe
interface Team {
  id: number;
  name: string;
}

const CategoryForm: React.FC = () => {
  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ id: number; name: string; description: string; team_id: number } | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [teamId, setTeamId] = useState<number | ''>(''); // Ajout de l'état pour `team_id`

  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.categories.categories);
  const teams = useSelector((state: RootState) => state.teams.teams); // Récupération des équipes depuis le state Redux

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTeams()); // Récupération des équipes lors du montage du composant
  }, [dispatch]);

  const handleClose = () => {
    setShow(false);
    setSelectedCategory(null);
  };

  const handleShow = () => setShow(true);

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setName('');
    setDescription('');
    setTeamId(''); // Réinitialisation de la sélection de l'équipe
    handleShow();
  };

  const handleEditCategory = (category: { id: number; name: string; description: string; team_id: number }) => {
    setSelectedCategory(category);
    setName(category.name);
    setDescription(category.description);
    setTeamId(category.team_id); // Remplissage de la sélection de l'équipe
    handleShow();
  };

  const handleDeleteCategory = (categoryId: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteCategory(categoryId));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (teamId === '') {
      alert('Please select a team');
      return;
    }
    const categoryData = { name, description, team_id: Number(teamId) }; // Utilisation de `team_id`

    if (selectedCategory) {
      dispatch(updateCategory({ id: selectedCategory.id, ...categoryData }));
    } else {
      dispatch(addCategory(categoryData));
    }
    handleClose();
  };

  return (
    <div className="container mt-5">
      <Button variant="primary" onClick={handleAddCategory}>
        Add Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory ? 'Edit Category' : 'Add New Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCategoryDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category description"
                value={description}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCategoryTeam">
              <Form.Label>Team</Form.Label>
              <Form.Control
                as="select"
                value={teamId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setTeamId(Number(e.target.value))}
                required
              >
                <option value="">Select Team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
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

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(categories) &&
            categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <Button variant="info" className="me-2" onClick={() => handleEditCategory(category)}>
                    <FontAwesomeIcon icon={faEye} />
                  </Button>
                  <Button variant="warning" className="me-2" onClick={() => handleEditCategory(category)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteCategory(category.id)}>
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

export default CategoryForm;
