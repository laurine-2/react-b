import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuiz } from './quizSlice';
import { fetchCategories } from '../categories/categorySlice';
import { Button, Modal, Form } from 'react-bootstrap';
import { RootState, AppDispatch } from '../../store'; // Importez les types RootState et AppDispatch

interface QuizFormProps {
  show: boolean;
  handleClose: () => void;
  quiz?: { title: string; description: string; category_id: number }; // Typage des props pour un quiz optionnel
}

const QuizForm: React.FC<QuizFormProps> = ({ show, handleClose, quiz }) => {
  const [title, setTitle] = useState(quiz?.title || '');
  const [description, setDescription] = useState(quiz?.description || '');
  const [categoryId, setCategoryId] = useState<number | ''>(quiz?.category_id || '');

  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.categories.categories);

  // Récupérer l'utilisateur à partir du store Redux
  const user = useSelector((state: RootState) => state.auth.user); // Assurez-vous que `auth.user` existe dans votre store Redux

  useEffect(() => {
    dispatch(fetchCategories()); // Charger les catégories lors du montage du composant
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifiez que `user` est bien défini avant de l'utiliser
    if (!user?.id) {
      alert('You must be logged in to create a quiz');
      return;
    }

    const newQuiz = {
      title,
      description,
      category_id: Number(categoryId),
      manager_id: user.id,  // Utilisez l'ID de l'utilisateur comme manager_id
    };

    dispatch(addQuiz(newQuiz))
      .then(response => {
        console.log('Quiz added:', response);
      })
      .catch(error => {
        console.error('Failed to add quiz:', error);
      });

    // Réinitialiser les champs après la soumission
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
              onChange={(e) => setCategoryId(Number(e.target.value))}
              required
            >
              <option value="">Select a category</option>
              {Array.isArray(categories) &&
                categories.map((category) => (
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
