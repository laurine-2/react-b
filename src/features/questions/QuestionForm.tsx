import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion, updateQuestion } from './questionSlice';
import { fetchQuizzes } from '../quizzers/quizSlice'; // Importer l'action pour charger les quizzes
import { Button, Modal, Form } from 'react-bootstrap';

const QuestionForm = ({ show, handleClose, editMode = false, existingQuestion = null }) => {
  const [content, setContent] = useState(existingQuestion ? existingQuestion.content : '');
  const [quizId, setQuizId] = useState(existingQuestion ? existingQuestion.quiz_id : '');
  const [choices, setChoices] = useState(existingQuestion ? existingQuestion.choices : []);
  const dispatch = useDispatch();

  // Récupérer les quizzes depuis le Redux store
  const quizzes = useSelector((state) => state.quizzes.quizzes);
  const quizStatus = useSelector((state) => state.quizzes.status);

  useEffect(() => {
    if (quizStatus === 'idle') {
      dispatch(fetchQuizzes()); // Charger les quizzes si nécessaire
    }
  }, [quizStatus, dispatch]);

  const handleAddChoice = () => {
    setChoices([...choices, { content: '', is_correct: false }]);
  };

  const handleChoiceChange = (index, field, value) => {
    const newChoices = choices.map((choice, i) =>
      i === index ? { ...choice, [field]: value } : choice
    );
    setChoices(newChoices);
  };

  const handleDeleteChoice = (index) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionData = { content, quiz_id: quizId, choices };

    console.log("Quiz ID:", quizId); // Loguez les valeurs pour déboguer
  console.log("Question Data:", questionData);

    if (editMode) {
      dispatch(updateQuestion({ id: existingQuestion.id, questionData }));
    } else {
      dispatch(addQuestion({ quizId, questionData }));
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? 'Edit' : 'Add'} Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formQuestionContent">
            <Form.Label>Question Content</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter question content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formQuizId" className="mt-3">
            <Form.Label>Select Quiz</Form.Label>
            <Form.Control
              as="select"
              value={quizId}
              onChange={(e) => setQuizId(e.target.value)}
              required
            >
              <option value="">Select a quiz</option>
              {quizzes.map((quiz) => (
                <option key={quiz.id} value={quiz.id}>
                  {quiz.title}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formChoices" className="mt-3">
            <Form.Label>Choices</Form.Label>
            {choices.map((choice, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <Form.Control
                  type="text"
                  placeholder={`Choice ${index + 1}`}
                  value={choice.content}
                  onChange={(e) => handleChoiceChange(index, 'content', e.target.value)}
                  required
                  className="me-2"
                />
                <Form.Check
                  type="checkbox"
                  label="Correct"
                  checked={choice.is_correct}
                  onChange={(e) => handleChoiceChange(index, 'is_correct', e.target.checked)}
                  className="me-2"
                />
                <Button variant="danger" onClick={() => handleDeleteChoice(index)}>
                  Delete
                </Button>
              </div>
            ))}
            <Button variant="secondary" onClick={handleAddChoice} className="mt-2">
              Add Choice
            </Button>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default QuestionForm;
