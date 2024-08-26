import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuizzes, deleteQuiz } from './quizSlice';
import { Table, Button, Modal } from 'react-bootstrap';
import QuizForm from './QuizForm';
import { RootState, AppDispatch } from '../../store';
import { Quiz } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

const QuizList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const quizzes = useSelector((state: RootState) => state.quizzes.quizzes);
  const status = useSelector((state: RootState) => state.quizzes.status);
  const error = useSelector((state: RootState) => state.quizzes.error);

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchQuizzes());
    }
  }, [status, dispatch]);

  const handleShowModal = (quiz: Quiz | null) => {
    setSelectedQuiz(quiz);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedQuiz(null);
  };

  const handleViewQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedQuiz(null);
  };

  const handleDeleteQuiz = (quizId: number) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      dispatch(deleteQuiz(quizId));
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
      <Button variant="primary" onClick={() => handleShowModal(null)}>
        Add Quiz
      </Button>

      <QuizForm show={showModal} handleClose={handleCloseModal} quiz={selectedQuiz} />

      {quizzes && quizzes.length > 0 ? (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Category ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.id}>
                <td>{quiz.id}</td>
                <td>{quiz.title}</td>
                <td>{quiz.description}</td>
                <td>{quiz.category_id}</td>
                <td>
                  <Button variant="info" className="me-2" onClick={() => handleViewQuiz(quiz)}>
                    <FontAwesomeIcon icon={faEye} />
                  </Button>
                  <Button variant="warning" className="me-2" onClick={() => handleShowModal(quiz)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteQuiz(quiz.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>No quizzes available</div>
      )}

      <Modal show={showViewModal} onHide={handleCloseViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Quiz Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedQuiz && (
            <>
              <p><strong>ID:</strong> {selectedQuiz.id}</p>
              <p><strong>Title:</strong> {selectedQuiz.title}</p>
              <p><strong>Description:</strong> {selectedQuiz.description}</p>
              <p><strong>Category ID:</strong> {selectedQuiz.category_id}</p>
              <p><strong>Manager ID:</strong> {selectedQuiz.manager_id ? selectedQuiz.manager_id : 'N/A'}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QuizList;
