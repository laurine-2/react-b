import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuiz } from './quizSlice';
import { fetchCategories } from '../categories/categorySlice'; // Importez votre slice des catégories
import { Button, Modal, Form } from 'react-bootstrap';


const QuizForm = ({ show, handleClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories); // Récupérer les catégories depuis le store

  useEffect(() => {
    dispatch(fetchCategories()); // Charger les catégories lors du montage du composant
  }, [dispatch]);

  console.log("Categories in form:", categories); // Vérifiez les données ici

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addQuiz({ title, description, category_id: categoryId }));
    setTitle('');
    setDescription('');
    setCategoryId('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add/Edit Quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formQuizTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter quiz title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formQuizDescription" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter quiz description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formCategoryId" className="mt-3">
  <Form.Label>Category</Form.Label>
  <Form.Control
    as="select"
    value={categoryId}
    onChange={(e) => setCategoryId(e.target.value)}
    required
  >
    <option value="">Select a category</option>
    {Array.isArray(categories) && categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
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

export default QuizForm;
